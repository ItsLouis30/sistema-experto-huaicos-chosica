| Capa              | Tecnología                                | Para qué                                    |
| ----------------- | ----------------------------------------- | ------------------------------------------- |
| Lenguaje          | **Python 3.12+**                          | Motor del SBC                               |
| API               | **FastAPI**                               | Comunicar frontend ↔ backend                |
| Validación        | **Pydantic**                              | Validar los valores legales del diccionario |
| BC                | **JSON**                                  | R1–R66 independientes del motor             |
| BH                | **Objetos Python / memoria de ejecución** | Hechos iniciales + conclusiones             |
| Motor             | **Python propio**                         | Encadenamiento hacia adelante               |
| Explicación       | **Python propio**                         | Traza de reglas disparadas                  |
| Tests             | **pytest**                                | Verificación de reglas y casos              |
| Documentación API | **Swagger/OpenAPI de FastAPI**            | Probar el backend                           |
| BD                | **No inicialmente**                       | No necesitamos persistencia para el SBC     |
