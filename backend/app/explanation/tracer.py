import json
from typing import List, Dict, Any

class ExplanationTracer:
    """
    Módulo de Explicación.
    Toma la traza de reglas disparadas por el Motor de Inferencia y genera
    una justificación legible (humano-comprensible) de cómo se llegó a las conclusiones.
    """
    def __init__(self, rules_path: str = "app/knowledge/reglas.json"):
        self.rules_dict = self._load_rules_as_dict(rules_path)

    def _load_rules_as_dict(self, path: str) -> Dict[str, Dict[str, Any]]:
        """Carga las reglas y las indexa por su ID para búsquedas O(1)."""
        try:
            with open(path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                reglas = data.get("reglas", [])
                # Convertimos la lista en un diccionario { "R1": {datos_regla}, ... }
                return {regla["id"]: regla for regla in reglas}
        except FileNotFoundError:
            return {}

    def _formatear_objetivo(self, objetivo: Dict[str, str]) -> str:
        """Formatea el diccionario de objetivos en texto legible."""
        if "raw" in objetivo:
            return objetivo["raw"]
        
        conclusiones = []
        for variable, valor in objetivo.items():
            conclusiones.append(f"{variable} = '{valor}'")
        return ", ".join(conclusiones)

    def _formatear_condicion(self, condicion: str) -> str:
        """
        Limpia un poco la condición nativa de Python para que el usuario final
        (ciudadano o autoridad) la lea más amigable.
        """
        texto = condicion.replace("==", "=").replace(" and ", " Y ").replace(" or ", " O ")
        # Quitar comillas simples extrañas
        texto = texto.replace("'", "")
        return texto

    def generar_explicacion(self, reglas_disparadas: List[str]) -> List[Dict[str, Any]]:
        """
        Genera el reporte paso a paso de las deducciones del motor.
        """
        explicacion = []
        
        for indice, regla_id in enumerate(reglas_disparadas, start=1):
            regla_data = self.rules_dict.get(regla_id)
            
            if not regla_data:
                explicacion.append({
                    "paso": indice,
                    "regla_id": regla_id,
                    "error": "Regla no encontrada en la Base de Conocimiento"
                })
                continue
            
            condicion_legible = self._formatear_condicion(regla_data["condicion"])
            conclusion_legible = self._formatear_objetivo(regla_data.get("objetivo", {}))
            
            explicacion.append({
                "paso": indice,
                "regla_id": regla_id,
                "modulo": regla_data.get("modulo", "Desconocido"),
                "descripcion": regla_data.get("descripcion", ""),
                "por_que": f"Porque se cumplió: {condicion_legible}",
                "deduccion": f"Se determinó que {conclusion_legible}"
            })
            
        return explicacion
