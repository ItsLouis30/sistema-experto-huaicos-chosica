from enum import Enum

class PendienteTerreno(str, Enum):
    ALTA = "alta"
    MEDIA = "media"
    BAJA = "baja"

class TipoSueloSuperficial(str, Enum):
    MATERIAL_SUELTO = "material_suelto"
    ROCA_CONSOLIDADA = "roca_consolidada"

class RespuestaSiNo(str, Enum):
    SI = "sí"
    NO = "no"

class AvisoSenamhi(str, Enum):
    ROJO = "rojo"
    NARANJA = "naranja"
    AMARILLO = "amarillo"
    BLANCO = "blanco"
    SIN_AVISO = "sin_aviso"

class ObraMitigacionCercana(str, Enum):
    PRESENTE = "presente"
    AUSENTE = "ausente"

class EstadoObraMitigacion(str, Enum):
    OPERATIVO = "operativo"
    COLMATADA_O_DETERIORADA = "colmatada_o_deteriorada"
    NO_APLICA = "no_aplica"

class MaterialVivienda(str, Enum):
    PRECARIA = "precaria"
    NOBLE = "noble"

class AccesoEmergencia(str, Enum):
    FACIL = "facil"
    DIFICIL = "dificil"

class SistemaAlertaLocal(str, Enum):
    PRESENTE = "presente"
    AUSENTE = "ausente"
