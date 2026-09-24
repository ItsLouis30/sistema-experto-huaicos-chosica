from app.schemas.models import EvaluacionRequest, EvaluacionResponse, ExplicacionPaso
from app.inference.clips_engine import CLIPSEngine
from app.explanation.tracer import ExplanationTracer

class EvaluationService:
    """
    Capa de Servicios.
    Orquesta la comunicación entre los modelos de entrada/salida (Schemas)
    y el motor nativo de CLIPS.
    """
    def __init__(self):
        # Instanciamos el motor CLIPS y el explicador.
        self.motor = CLIPSEngine(rules_path="app/knowledge/rules.clp")
        self.explicador = ExplanationTracer(dictionary_path="app/knowledge/reglas.json")

    def evaluar_riesgo(self, request: EvaluacionRequest) -> EvaluacionResponse:
        # 1. Convertimos el modelo Pydantic (input validado) a un diccionario estándar
        hechos_iniciales = request.model_dump()
        
        # 2. Ejecutamos el Motor de Inferencia CLIPS (Forward Chaining)
        # Esto crea un entorno limpio, inserta los hechos, ejecuta y devuelve los resultados
        hechos_finales, traza_reglas = self.motor.ejecutar(hechos_iniciales)
        
        # 3. Generamos la justificación humana
        justificacion_raw = self.explicador.generar_explicacion(traza_reglas)
        justificacion = [ExplicacionPaso(**paso) for paso in justificacion_raw]
        
        # 4. Extraemos las conclusiones principales para la API
        riesgo = hechos_finales.get("nivel_riesgo")
        alerta = hechos_finales.get("nivel_alerta")
        
        return EvaluacionResponse(
            nivel_riesgo=riesgo,
            nivel_alerta=alerta,
            hechos_finales=hechos_finales,
            justificacion=justificacion
        )
