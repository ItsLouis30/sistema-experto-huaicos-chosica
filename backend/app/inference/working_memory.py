from typing import Any, Dict

class WorkingMemory:
    """
    Base de Hechos (Memoria de Trabajo).
    Almacena los hechos iniciales y los que se van deduciendo durante la inferencia.
    """
    def __init__(self, hechos_iniciales: Dict[str, Any] = None):
        # Usamos .copy() para no mutar el diccionario original que nos pasen
        self.hechos: Dict[str, Any] = hechos_iniciales.copy() if hechos_iniciales else {}

    def agregar_hecho(self, clave: str, valor: Any):
        """Agrega un nuevo hecho o actualiza uno existente."""
        self.hechos[clave] = valor

    def obtener_hecho(self, clave: str) -> Any:
        """Obtiene el valor de un hecho. Retorna None si el hecho no existe."""
        return self.hechos.get(clave)

    def existe_hecho(self, clave: str) -> bool:
        """Verifica si un hecho específico ya fue ingresado o deducido."""
        return clave in self.hechos
        
    def a_diccionario(self) -> Dict[str, Any]:
        """Devuelve una copia del diccionario actual de hechos."""
        return self.hechos.copy()
