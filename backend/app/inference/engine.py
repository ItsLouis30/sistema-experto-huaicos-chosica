import json
from typing import List, Dict, Any, Tuple
from app.inference.working_memory import WorkingMemory

class ForwardChainingEngine:
    """
    Motor de Inferencia utilizando Encadenamiento Hacia Adelante (Forward Chaining).
    """
    def __init__(self, rules_path: str = "app/knowledge/reglas.json"):
        self.rules = self._load_rules(rules_path)
        
    def _load_rules(self, path: str) -> List[Dict[str, Any]]:
        try:
            with open(path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                return data.get("reglas", [])
        except FileNotFoundError:
            return []

    def evaluar_condicion(self, condicion: str, hechos: Dict[str, Any]) -> bool:
        """
        Evalúa la condición lógica de una regla contra la Base de Hechos actual.
        Utiliza el entorno seguro de eval con los hechos como variables locales.
        Soporta operadores como ==, >=, <=, <, and, or, ().
        """
        try:
            # Deshabilitamos __builtins__ por seguridad pasándolo como diccionario vacío.
            resultado = eval(condicion, {"__builtins__": {}}, hechos)
            return bool(resultado)
        except NameError:
            # Ocurre cuando la regla pregunta por una variable que AÚN NO existe en la Base de Hechos.
            # En forward chaining, esto es normal, la regla se evaluará de nuevo en la siguiente pasada.
            return False
        except BaseException as e:
            # Captura errores de sintaxis u otros problemas
            print(f"Error evaluando condición '{condicion}': {e}")
            return False

    def ejecutar(self, memoria: WorkingMemory) -> Tuple[WorkingMemory, List[str]]:
        """
        Bucle principal del Encadenamiento Hacia Adelante.
        Retorna la Base de Hechos actualizada y la traza de reglas disparadas (para el módulo de explicación).
        """
        reglas_disparadas = []
        reglas_pendientes = self.rules.copy()
        
        # Bucle de inferencia: sigue mientras se puedan deducir hechos nuevos
        nuevos_hechos = True
        
        while nuevos_hechos:
            nuevos_hechos = False
            reglas_no_cumplidas_en_esta_pasada = []
            
            for regla in reglas_pendientes:
                condicion = regla["condicion"]
                hechos_actuales = memoria.a_diccionario()
                
                # Paso 1: Evaluar si el antecedente (SI) se cumple
                if self.evaluar_condicion(condicion, hechos_actuales):
                    # ¡La regla se dispara!
                    reglas_disparadas.append(regla["id"])
                    
                    # Paso 2: Extraer el consecuente (ENTONCES) y añadirlo a la Base de Hechos
                    objetivos = regla.get("objetivo", {})
                    for clave, valor in objetivos.items():
                        # Verificamos si realmente estamos añadiendo conocimiento nuevo
                        if memoria.obtener_hecho(clave) != valor:
                            memoria.agregar_hecho(clave, valor)
                            nuevos_hechos = True
                else:
                    # Si no se cumple, la guardamos para evaluarla en el siguiente ciclo
                    reglas_no_cumplidas_en_esta_pasada.append(regla)
                    
            # Las reglas pendientes para el siguiente ciclo son las que no se dispararon en este
            reglas_pendientes = reglas_no_cumplidas_en_esta_pasada
            
        return memoria, reglas_disparadas
