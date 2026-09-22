from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.evaluacion import router as evaluacion_router

# Instanciamos la aplicación FastAPI
app = FastAPI(
    title="Sistema Experto - Riesgo de Huaicos",
    description="API del Sistema Basado en el Conocimiento (SBC) para evaluar el riesgo en Lurigancho-Chosica.",
    version="1.0.0"
)

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Luego reemplazar con la URL del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registramos el router que acabamos de crear en app/api/evaluacion.py
# Todas las rutas tendrán el prefijo /api
app.include_router(evaluacion_router, prefix="/api", tags=["Evaluación"])

@app.get("/", tags=["Health"])
def root():
    return {
        "estado": "operativo",
        "mensaje": "¡El motor del Sistema Experto está en línea!",
        "documentacion": "Visita /docs para probar la API interactiva."
    }
