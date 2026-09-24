from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
import uuid

class CondicionRegla(BaseModel):
    variable: str = Field(..., description="Variable del sistema (ej. pendiente_terreno)")
    operador: str = Field(..., description="Operador lógico (==, >=, <=, !=, in)")
    valor: str = Field(..., description="Valor esperado de la variable")

class PropuestaReglaRequest(BaseModel):
    modulo: str = Field(..., description="Módulo del sistema (ej. Susceptibilidad Física)")
    nombre_regla: str = Field(..., description="Nombre corto descriptivo")
    antecedentes: List[CondicionRegla] = Field(..., description="Lista de condiciones (SI...)")
    consecuente_variable: str = Field(..., description="Variable deducida (ENTONCES...)")
    consecuente_valor: str = Field(..., description="Valor de salida del consecuente")
    fuente_conocimiento: str = Field(..., description="Fuente técnica oficial (CENEPRED, etc.)")
    justificacion_tecnica: str = Field(..., description="Explicación del porqué de la regla")
    autor_especialista: str = Field(..., description="Nombre o cargo del especialista")

class PropuestaRegla(PropuestaReglaRequest):
    id: str = Field(default_factory=lambda: f"PROP-{str(uuid.uuid4())[:8].upper()}")
    fecha_registro: datetime = Field(default_factory=datetime.utcnow)
    estado: str = Field(default="pendiente_revision", description="Estado de la propuesta")

class PropuestaReglaEstadoUpdate(BaseModel):
    estado: str = Field(..., description="Nuevo estado: aprobada, rechazada, pendiente_revision")
