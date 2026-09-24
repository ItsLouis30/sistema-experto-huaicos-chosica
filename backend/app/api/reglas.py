import os
import re
from typing import List
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

CLIPS_FILE = os.path.join(os.path.dirname(__file__), "..", "knowledge", "rules.clp")

class ReglaSBC(BaseModel):
    id: str
    nombre: str
    condiciones: List[str]
    consecuencias: List[str]
    modulo: str
    fuente: str

def parsear_reglas_clips() -> List[ReglaSBC]:
    if not os.path.exists(CLIPS_FILE):
        return []
        
    with open(CLIPS_FILE, "r", encoding="utf-8") as f:
        contenido = f.read()

    # Regex para buscar (defrule ID "Nombre" [antecedentes] => [consecuentes])
    # Como CLIPS usa paréntesis, se puede buscar por bloques.
    # Una forma sencilla con expresiones regulares:
    reglas_raw = re.findall(r'\(defrule\s+(R\d+)\s+"([^"]+)"\s*(.*?)=>\s*(.*?)\)', contenido, re.DOTALL)
    
    lista_reglas = []
    for r_id, r_nombre, r_ant, r_cons in reglas_raw:
        # Limpiar saltos de línea
        antecedentes_str = [x.strip() for x in r_ant.split('\n') if x.strip()]
        consecuencias_str = [x.strip() for x in r_cons.split('\n') if x.strip() and x.strip() != ')']
        
        # Filtrar el (assert (regla_disparada ...)) para que no estorbe visualmente
        consecuencias_str = [x for x in consecuencias_str if "regla_disparada" not in x]
        
        # Asignar un módulo y fuente inferidos (o estáticos)
        modulo = "General"
        fuente = "Metodología Oficial"
        
        r_num = int(r_id[1:])
        if r_num <= 11:
            modulo = "Susceptibilidad Física"
            fuente = "CENEPRED / INGEMMET"
        elif r_num <= 17:
            modulo = "Detonante Meteorológico"
            fuente = "SENAMHI"
        elif r_num <= 24:
            modulo = "Peligro Físico"
            fuente = "CENEPRED"
        elif r_num <= 34:
            modulo = "Exposición"
            fuente = "INDECI / CENEPRED"
        elif r_num <= 44:
            modulo = "Vulnerabilidad Física"
            fuente = "INDECI"
        elif r_num <= 56:
            modulo = "Mitigación"
            fuente = "CENEPRED"
        elif r_num <= 65:
            modulo = "Vulnerabilidad Global"
            fuente = "CENEPRED"
        elif r_num == 66:
            modulo = "Riesgo Total"
            fuente = "CENEPRED"
            
        lista_reglas.append(ReglaSBC(
            id=r_id,
            nombre=r_nombre,
            condiciones=antecedentes_str,
            consecuencias=consecuencias_str,
            modulo=modulo,
            fuente=fuente
        ))
        
    return lista_reglas

@router.get("/", response_model=List[ReglaSBC])
def listar_reglas():
    return parsear_reglas_clips()
