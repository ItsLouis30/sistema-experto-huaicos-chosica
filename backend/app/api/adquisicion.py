import json
import os
from typing import List
from fastapi import APIRouter, HTTPException
from app.schemas.adquisicion import PropuestaReglaRequest, PropuestaRegla, PropuestaReglaEstadoUpdate

router = APIRouter()

KNOWLEDGE_DIR = os.path.join(os.path.dirname(__file__), "..", "knowledge")
PROPUESTAS_FILE = os.path.join(KNOWLEDGE_DIR, "propuestas_reglas.json")

def load_propuestas() -> List[dict]:
    if not os.path.exists(PROPUESTAS_FILE):
        return []
    try:
        with open(PROPUESTAS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError:
        return []

def save_propuestas(propuestas: List[dict]):
    os.makedirs(KNOWLEDGE_DIR, exist_ok=True)
    with open(PROPUESTAS_FILE, "w", encoding="utf-8") as f:
        json.dump(propuestas, f, indent=2, ensure_ascii=False)

@router.post("/proponer", response_model=PropuestaRegla)
async def crear_propuesta(request: PropuestaReglaRequest):
    propuesta = PropuestaRegla(**request.model_dump())
    propuestas = load_propuestas()
    # Serializar datetime a string ISO para JSON
    propuesta_dict = propuesta.model_dump()
    propuesta_dict['fecha_registro'] = propuesta_dict['fecha_registro'].isoformat()
    propuestas.append(propuesta_dict)
    save_propuestas(propuestas)
    return propuesta

@router.get("/propuestas", response_model=List[PropuestaRegla])
async def obtener_propuestas():
    propuestas = load_propuestas()
    return propuestas

@router.patch("/propuestas/{id_propuesta}/estado", response_model=PropuestaRegla)
async def actualizar_estado_propuesta(id_propuesta: str, update: PropuestaReglaEstadoUpdate):
    propuestas = load_propuestas()
    for idx, p in enumerate(propuestas):
        if p.get("id") == id_propuesta:
            p["estado"] = update.estado
            save_propuestas(propuestas)
            return p
    raise HTTPException(status_code=404, detail="Propuesta no encontrada")
