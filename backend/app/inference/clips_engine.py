import clips
from typing import Dict, Any, Tuple, List

class CLIPSEngine:
    """
    Motor de Inferencia utilizando CLIPS (via clipspy).
    Reemplaza al motor ForwardChainingEngine original en Python.
    """
    def __init__(self, rules_path: str = "app/knowledge/rules.clp"):
        self.rules_path = rules_path
        
    def ejecutar(self, hechos_iniciales: Dict[str, Any]) -> Tuple[Dict[str, Any], List[str]]:
        """
        Crea un entorno limpio de CLIPS, inserta los hechos del usuario,
        ejecuta el encadenamiento hacia adelante y extrae los resultados.
        """
        # 1. Crear entorno independiente para no contaminar consultas concurrentes
        env = clips.Environment()
        
        # 2. Cargar las reglas
        env.load(self.rules_path)
        env.reset()
        
        # 3. Insertar hechos iniciales
        for clave, valor in hechos_iniciales.items():
            if valor is not None:
                # En CLIPS un hecho simple se ve como: (pendiente alta) o (precipitacion 60)
                env.assert_string(f"({clave} {valor})")
                
        # 4. Ejecutar el motor CLIPS (Forward Chaining)
        env.run()
        
        # 5. Extraer conclusiones finales y traza
        hechos_finales = {}
        reglas_disparadas = []
        
        for fact in env.facts():
            rel = fact.template.name
            if rel == "initial-fact":
                continue
                
            # Extraemos el valor del hecho (ej. 'alta' de '(pendiente alta)')
            # fact[0] obtiene el primer valor posicional
            valor = str(fact[0]) if len(fact) > 0 else True
            
            if rel == "regla_disparada":
                reglas_disparadas.append(valor)
            else:
                # Si el valor parece numérico, lo intentamos castear, sino lo dejamos como string
                try:
                    hechos_finales[rel] = float(valor) if '.' in valor else int(valor)
                except ValueError:
                    hechos_finales[rel] = valor
                
        return hechos_finales, reglas_disparadas
