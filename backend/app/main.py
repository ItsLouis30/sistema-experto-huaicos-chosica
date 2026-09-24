from pathlib import Path
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.api.evaluacion import router as evaluacion_router
from app.api.adquisicion import router as adquisicion_router

# Instanciamos la aplicación FastAPI
app = FastAPI(
    title="Sistema Experto - Riesgo de Huaicos",
    description="API del Sistema Basado en el Conocimiento (SBC) para evaluar el riesgo en Lurigancho-Chosica.",
    version="1.1.0"
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
app.include_router(adquisicion_router, prefix="/api/conocimiento", tags=["Adquisición"])

@app.get("/api/salud", tags=["Health"])
def salud():
    return {
        "estado": "operativo",
        "mensaje": "¡El motor del Sistema Experto está en línea!",
        "documentacion": "Visita /docs para probar la API interactiva."
    }

# En producción el frontend compilado (frontend/dist) se sirve desde este mismo servidor.
# Se monta al final para que no tape las rutas /api y /docs.
FRONTEND_DIST = Path(__file__).resolve().parents[2] / "frontend" / "dist"
if FRONTEND_DIST.is_dir():
    app.mount("/", StaticFiles(directory=FRONTEND_DIST, html=True), name="frontend")
else:
    @app.get("/", tags=["Health"])
    def root():
        return salud()
