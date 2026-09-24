# Sistema Experto para la Prevención y Evaluación del Riesgo por Flujo de Detritos (Huaicos) en Lurigancho-Chosica

## 📌 Visión General del Proyecto
**Enfoque Principal:** Prevención y preparación ante desastres naturales (Gestión Prospectiva y Correctiva del Riesgo). No es un sistema de rescate en tiempo real, sino una herramienta para democratizar información técnica compleja, permitiendo que ciudadanos y autoridades locales identifiquen su nivel de riesgo y actúen preventivamente.

**Alineamiento Estratégico:** Objetivo de Desarrollo Sostenible (ODS) 13: Acción por el Clima.

**Marco Teórico y Normativo Oficial:**
- **CENEPRED:** Manual para la Evaluación de Riesgos Originados por Fenómenos Naturales (Riesgo = Peligro × Vulnerabilidad).
- **INGEMMET:** Estudios geodinámicos de quebradas de Lurigancho-Chosica (pendiente, suelo, registro histórico).
- **SENAMHI:** Niveles de avisos meteorológicos y umbrales de precipitación.
- **INDECI:** Protocolos operativos, rutas de evacuación y alertas tempranas.

---

## 🏛️ Arquitectura Estricta de Sistema Experto (SBC)

Este proyecto ha sido diseñado e implementado respetando **estrictamente la arquitectura de los Sistemas Basados en el Conocimiento (SBC)**. Cada componente teórico tiene una manifestación directa en el código:

### 1. Componentes Principales (Indispensables)
* **Base de Conocimiento (BC):** Repositorio declarativo e independiente donde residen las heurísticas y la normativa. Contiene 66 reglas operativas escritas en formato nativo `CLIPS` (`rules.clp`), aislando el conocimiento de la lógica de programación.
* **Base de Hechos (BH):** La "memoria de trabajo" del sistema. Inicia con los datos proporcionados por el usuario (ej. `(pendiente_terreno alta)`) y se enriquece dinámicamente con los hechos intermedios que el motor va infiriendo (ej. `(susceptibilidad_base media)`).
* **Motor de Inferencia:** El algoritmo central. Hemos implementado el motor oficial **C-CLIPS** (vía `clipspy`), ejecutando un razonamiento por encadenamiento hacia adelante (*Forward Chaining*). El motor evalúa exhaustivamente la BC contra la BH hasta alcanzar un estado de saturación lógica (el riesgo final).

### 2. Componentes Secundarios (100% Funcionales)
* **Módulo de Interfaz de Usuario:** Gobierna el diálogo entre el usuario y el sistema. Guiado visualmente por pasos, con iconografía semafórica y tooltips pedagógicos para métricas complejas (ej. diagramas interactivos para medir distancias al cauce).
* **Módulo de Explicación:** Otorga transparencia al "caja negra" de la IA. Permite trazar la ruta de razonamiento exacto, mostrando explícitamente al usuario qué reglas (ID y justificación técnica) se dispararon para deducir su nivel de riesgo.
* **Módulo de Adquisición de Conocimiento (Portal de Expertos):** Interfaz dedicada para el refinamiento de la Base de Conocimiento. Permite a los especialistas proponer nuevas reglas lógicas con sus respectivos antecedentes y consecuentes. Estas reglas no alteran la BC principal directamente, sino que pasan a un entorno de "Staging" o validación para su posterior homologación técnica.

---

## 📂 Mapeo de la Arquitectura al Repositorio

Para evidenciar la implementación del Sistema Experto, la estructura del proyecto refleja cada uno de sus 6 componentes teóricos:

```text
sistema-experto-g8/
├── backend/                  
│   ├── app/
│   │   ├── api/              # Controladores (Adquisición, Evaluación, Reglas)
│   │   ├── explanation/      # [Módulo de Explicación]: Traza las reglas disparadas
│   │   ├── inference/        # [Motor de Inferencia]: Enlace en C con CLIPS
│   │   ├── knowledge/        # [Base de Conocimiento]: rules.clp y staging de reglas
│   │   └── main.py           # Punto de entrada de la aplicación
│   │
│   └── tests/                # Pruebas unitarias sobre la Base de Hechos
│
├── frontend/                 # [Interfaz de Usuario]: SPA en React + Vite
│   ├── src/                  
│   │   ├── AdquisicionView.jsx # [Módulo de Adquisición de Conocimiento]
│   │   ├── ReglasView.jsx      # Visor dinámico de la Base de Conocimiento
│   │   └── App.jsx             # Flujo del evaluador ciudadano
│   └── package.json          
│
└── README.md                 # Este documento de presentación final
```

---

## 🛠️ Stack Tecnológico

| Capa / Módulo SBC | Tecnología                                | Justificación Técnica                       |
| ----------------- | ----------------------------------------- | ------------------------------------------- |
| **Motor & API**   | **Python 3.12+ / FastAPI**                | Orquestación eficiente y robusta del SBC.   |
| **Base de Conoc** | **CLIPS (.clp)**                          | Estándar de la industria para reglas lógicas|
| **Base de Hechos**| **Memoria C-CLIPS**                       | Inserción de hechos (`assert`) en tiempo real|
| **Inferencia**    | **clipspy (C-Binding)**                   | Velocidad de ejecución nativa en C          |
| **Validación**    | **Pydantic V2**                           | Garantiza que los hechos sean válidos       |
| **Interfaz (UI)** | **React.js + Vite + Tailwind CSS**        | Renderizado rápido y diseño centrado en UX  |

---

## 🚀 Cómo Ejecutar el Proyecto

El sistema está diseñado para ejecutarse localmente de forma modular, levantando el Motor Lógico (Backend) y el Sistema de Consulta (Frontend) de manera independiente.

### 1. Iniciar el Núcleo del SBC (Backend)
1. **Abre tu terminal** y ubícate en la carpeta del backend:
   ```bash
   cd backend
   ```
2. **Instala las dependencias lógicas**:
   ```bash
   pip install -r requirements.txt
   ```
3. **Inicia el servidor FastAPI**:
   ```bash
   uvicorn app.main:app --reload
   ```
   *El motor de inferencia ahora expone sus capacidades en `http://localhost:8000/docs` (Swagger).*

### 2. Iniciar el Módulo de Interfaz de Usuario (Frontend)
1. Con el backend corriendo en el puerto `8000`, abre una **nueva terminal**:
   ```bash
   cd frontend
   ```
2. **Instala las dependencias y ejecuta el servidor de UI**:
   ```bash
   pnpm install
   pnpm run dev
   ```
3. Abre [http://localhost:5173](http://localhost:5173) en tu navegador web. El sistema redirigirá automáticamente las consultas internas al Motor de Inferencia subyacente.
