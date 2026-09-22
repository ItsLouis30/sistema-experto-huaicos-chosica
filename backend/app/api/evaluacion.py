from fastapi import APIRouter, Depends
from app.schemas.models import EvaluacionRequest, EvaluacionResponse
from app.services.evaluation_service import EvaluationService

router = APIRouter()

# Instanciamos el servicio una sola vez al cargar el módulo.
# Esto asegura que el Motor de Inferencia cargue el JSON a memoria y no se vuelva a leer en cada Request.
_evaluation_service_instance = EvaluationService()

def get_evaluation_service() -> EvaluationService:
    return _evaluation_service_instance

@router.post("/evaluar", response_model=EvaluacionResponse, summary="Evaluar Riesgo por Huaicos")
def evaluar_riesgo(request: EvaluacionRequest, service: EvaluationService = Depends(get_evaluation_service)):
    """
    Recibe los datos del entorno y la vivienda (validados automáticamente por Pydantic).
    Ejecuta el Sistema Basado en el Conocimiento y devuelve el nivel de riesgo,
    los hechos deducidos y la traza de explicación paso a paso.
    """
    return service.evaluar_riesgo(request)
