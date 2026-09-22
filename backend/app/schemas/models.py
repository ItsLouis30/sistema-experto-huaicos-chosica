from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from app.knowledge.variables import (
    PendienteTerreno, TipoSueloSuperficial, RespuestaSiNo,
    AvisoSenamhi, ObraMitigacionCercana, EstadoObraMitigacion,
    MaterialVivienda, AccesoEmergencia, SistemaAlertaLocal
)

class EvaluacionRequest(BaseModel):
    """
    Molde de los datos que el Frontend debe enviar al Backend.
    FastAPI usará esto para validar automáticamente que no envíen datos basura.
    """
    pendiente_terreno: PendienteTerreno
    tipo_suelo_superficial: TipoSueloSuperficial
    antecedente_activacion: RespuestaSiNo
    aviso_senamhi: AvisoSenamhi
    precipitacion_72h: float = Field(..., ge=0.0, description="Precipitación en mm")
    dist_quebrada: float = Field(..., ge=0.0, description="Distancia en metros")
    ubic_cono_deyeccion: RespuestaSiNo
    obra_mitigacion_cercana: ObraMitigacionCercana
    estado_obra_mitigacion: EstadoObraMitigacion
    material_vivienda: MaterialVivienda
    ruta_evacuacion_segura: RespuestaSiNo
    acceso_emergencia: AccesoEmergencia
    sistema_alerta_local: SistemaAlertaLocal

class ExplicacionPaso(BaseModel):
    """Estructura de un paso individual en la justificación."""
    paso: int
    regla_id: str
    modulo: str
    descripcion: str
    por_que: str
    deduccion: str

class EvaluacionResponse(BaseModel):
    """
    Molde de la respuesta que el Backend le devolverá al Frontend.
    """
    nivel_riesgo: Optional[str] = None
    nivel_alerta: Optional[str] = None
    hechos_finales: Dict[str, Any]
    justificacion: List[ExplicacionPaso]
