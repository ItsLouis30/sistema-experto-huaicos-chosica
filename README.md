# Sistema Basado en el Conocimiento (SBC) para la Evaluación del Riesgo por Huaicos en Lurigancho-Chosica

## 📌 Visión General del Proyecto
**Enfoque Principal:** Prevención y preparación ante desastres naturales (Gestión Prospectiva y Correctiva del Riesgo). No es un sistema de rescate en tiempo real, sino una herramienta para democratizar información técnica compleja, permitiendo que ciudadanos y autoridades locales identifiquen su nivel de riesgo y actúen preventivamente.

**Alineamiento Estratégico:** Objetivo de Desarrollo Sostenible (ODS) 13: Acción por el Clima.

**Marco Teórico y Normativo Oficial:**
- **CENEPRED:** Manual para la Evaluación de Riesgos Originados por Fenómenos Naturales (Riesgo = Peligro × Vulnerabilidad).
- **INGEMMET:** Estudios geodinámicos de quebradas de Lurigancho-Chosica (pendiente, suelo, registro histórico).
- **SENAMHI:** Niveles de avisos meteorológicos y umbrales de precipitación.
- **INDECI:** Protocolos operativos, rutas de evacuación y alertas tempranas.

---

## 🏛️ Arquitectura del Sistema Experto

El proyecto sigue la arquitectura teórica de un Sistema Experto, separando el conocimiento del control lógico.

### 1. Componentes Principales (Indispensables)
* **Base de Conocimiento (BC):** Repositorio independiente donde se almacenan las reglas e hipótesis del dominio (ej. matrices CENEPRED).
* **Base de Hechos (BH):** Memoria temporal que almacena las entradas del usuario y los resultados deducidos.
* **Motor de Inferencia:** El algoritmo central que aplica razonamiento (encadenamiento hacia adelante/atrás) cruzando la BC y la BH.

### 2. Componentes Secundarios (Importantes)
* **Módulo de Interfaz de Usuario:** Gobierna el diálogo entre el usuario y el sistema (Sistema de Consulta).
* **Módulo de Explicación:** Permite trazar la ruta de razonamiento, mostrando qué reglas se dispararon para llegar a una conclusión.
* **Módulo de Adquisición de Conocimiento:** Facilita la inserción o edición de reglas sin modificar el código fuente.

---

## 📂 Estructura de Carpetas para el Equipo

Para mantener el orden y seguir la arquitectura conceptual, el repositorio está dividido en los siguientes módulos. **Por favor ubicar el código en la carpeta correspondiente:**

```text
sistema-experto-g8/
├── backend/                  
│   ├── app/                  # Núcleo del Sistema Experto (SBC)
│   │   ├── api/              # Endpoints de FastAPI
│   │   ├── explanation/      # Módulo de Explicación (Traza de reglas)
│   │   ├── inference/        # Motor de Inferencia y Base de Hechos
│   │   ├── knowledge/        # Base de Conocimiento (Reglas JSON)
│   │   ├── schemas/          # Modelos de Pydantic para validación de datos
│   │   ├── services/         # Lógica adicional del negocio
│   │   └── main.py           # Punto de entrada de la aplicación
│   ├── tests/                # Pruebas unitarias y de integración
│   └── requirements.txt      # Dependencias del proyecto
│
├── frontend/                 # Módulo de Interfaz de Usuario
│   ├── public/
│   └── src/                  
│
└── README.md                 # Este documento
```

---

## 🛠️ Stack Tecnológico

| Capa              | Tecnología                                | Para qué                                    |
| ----------------- | ----------------------------------------- | ------------------------------------------- |
| Lenguaje          | **Python 3.12+**                          | Motor del SBC                               |
| API               | **FastAPI**                               | Comunicar frontend ↔ backend                |
| Validación        | **Pydantic**                              | Validar los valores legales de entrada      |
| BC                | **JSON**                                  | Reglas independientes del motor             |
| BH                | **Objetos Python / memoria**              | Hechos iniciales + conclusiones             |
| Motor             | **Python propio**                         | Lógica de inferencia                        |
| Explicación       | **Python propio**                         | Traza de reglas disparadas                  |
| Tests             | **pytest**                                | Verificación de reglas y casos de prueba    |
| Documentación API | **Swagger/OpenAPI (FastAPI)**             | Interfaz para probar el backend fácilmente  |
| BD                | **No inicialmente**                       | El SBC vive en memoria durante la ejecución |

---

## 🚀 Cómo Ejecutar el Proyecto (Backend)

Todo el núcleo del Sistema Experto y la API ya están implementados. Sigue estos pasos para levantar el servidor localmente:

1. **Abre tu terminal** y ubícate en la carpeta del backend:
   ```bash
   cd backend
   ```

2. **Instala las dependencias**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Inicia el servidor FastAPI**:
   ```bash
   uvicorn app.main:app --reload
   ```

4. **Prueba la API y el Motor**:
   Abre tu navegador en [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs). 
   Ahí verás la interfaz de Swagger (OpenAPI) donde puedes probar el endpoint `/api/evaluar`. Ingresa un JSON de prueba y observa cómo el sistema te devuelve el nivel de riesgo y la justificación generada por el Módulo de Explicación.

### 🧪 Ejecutar Pruebas Unitarias
Para verificar el funcionamiento lógico del encadenamiento hacia adelante y la Base de Hechos sin levantar el servidor:
```bash
cd backend
python tests/test_inference.py
```
