import json
from typing import List, Dict, Any

class ExplanationTracer:
    """
    Módulo de Explicación.
    Toma la traza de reglas disparadas por el Motor CLIPS y genera
    una justificación legible (humano-comprensible) de cómo se llegó a las conclusiones.
    Utilizamos el reglas.json original únicamente como diccionario de traducción para 
    los textos amigables.
    """
    def __init__(self, dictionary_path: str = "app/knowledge/reglas.json"):
        self.rules_dict = self._load_rules_as_dict(dictionary_path)

    def _load_rules_as_dict(self, path: str) -> Dict[str, Dict[str, Any]]:
        try:
            with open(path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                reglas = data.get("reglas", [])
                return {regla["id"]: regla for regla in reglas}
        except FileNotFoundError:
            return {}

    def _formatear_condicion(self, condicion: str) -> str:
        texto = condicion.replace("==", "=").replace(" and ", " Y ").replace(" or ", " O ")
        texto = texto.replace("'", "")
        return texto

    def generar_explicacion(self, reglas_disparadas: List[str]) -> List[Dict[str, Any]]:
        explicacion = []
        for indice, regla_id in enumerate(reglas_disparadas, start=1):
            regla_data = self.rules_dict.get(regla_id)
            if not regla_data:
                continue
            
            condicion_legible = self._formatear_condicion(regla_data["condicion"])
            
            explicacion.append({
                "paso": indice,
                "regla_id": regla_id,
                "modulo": regla_data.get("modulo", "CLIPS Engine"),
                "descripcion": regla_data.get("descripcion", ""),
                "por_que": f"Porque se cumplió: {condicion_legible}",
                "deduccion": f"Regla {regla_id} aplicada por el motor CLIPS."
            })
            
        return explicacion
