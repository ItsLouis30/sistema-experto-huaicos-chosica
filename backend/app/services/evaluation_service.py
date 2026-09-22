from app.schemas.models import EvaluacionRequest, EvaluacionResponse, ExplicacionPaso
from app.inference.working_memory import WorkingMemory
from app.inference.engine import ForwardChainingEngine
from app.explanation.tracer import ExplanationTracer

class EvaluationService:
    """
    Capa de Servicios.
    Orquesta la comunicación entre los modelos de entrada/salida (Schemas)
    y el núcleo lógico (Base de Hechos, Motor de Inferencia y Módulo de Explicación).
    """
    def __init__(self):
        # Instanciamos el motor y el explicador aquí.
        # Al hacerlo una vez en el servicio, evitamos cargar el JSON del disco
        # por cada petición HTTP, mejorando muchísimo el rendimiento.
        self.motor = ForwardChainingEngine(rules_path="app/knowledge/reglas.json")
        self.explicador = ExplanationTracer(rules_path="app/knowledge/reglas.json")

    def evaluar_riesgo(self, request: EvaluacionRequest) -> EvaluacionResponse:
        # 1. Convertimos el modelo Pydantic (input validado) a un diccionario estándar
        hechos_iniciales = request.model_dump()
        
        # 2. Inicializamos una Base de Hechos fresca para esta petición específica
        memoria = WorkingMemory(hechos_iniciales)
        
        # 3. Ejecutamos el Motor de Inferencia
        memoria_final, traza_reglas = self.motor.ejecutar(memoria)
        
        # 4. Generamos la justificación humana
        justificacion_raw = self.explicador.generar_explicacion(traza_reglas)
        
        # Parseamos los diccionarios resultantes al esquema estricto ExplicacionPaso
        justificacion = [ExplicacionPaso(**paso) for paso in justificacion_raw]
        
        # 5. Extraemos las conclusiones principales para mandarlas a la raíz de la respuesta
        riesgo = memoria_final.obtener_hecho("nivel_riesgo")
        alerta = memoria_final.obtener_hecho("nivel_alerta")
        
        # 6. Retornamos el modelo final de respuesta
        return EvaluacionResponse(
            nivel_riesgo=riesgo,
            nivel_alerta=alerta,
            hechos_finales=memoria_final.a_diccionario(),
            justificacion=justificacion
        )
