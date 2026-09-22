# -*- coding: utf-8 -*-
import sys
import os
# Agregar el directorio backend al path para que 'app' sea reconocido
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.inference.working_memory import WorkingMemory
from app.inference.engine import ForwardChainingEngine

def test_inference_engine_susceptibilidad_alta():
    # 1. Configuramos los hechos de entrada (input del usuario)
    hechos_iniciales = {
        "pendiente_terreno": "alta",
        "tipo_suelo_superficial": "material_suelto",
        "antecedente_activacion": "sí"
    }
    memoria = WorkingMemory(hechos_iniciales)
    
    # 2. Inicializamos el motor
    # Nota: Se usa una ruta relativa desde la carpeta 'backend'
    motor = ForwardChainingEngine(rules_path="app/knowledge/reglas.json")
    
    # 3. Ejecutamos el encadenamiento hacia adelante
    memoria_final, traza_reglas = motor.ejecutar(memoria)
    
    # 4. Comprobaciones de la Base de Hechos
    assert memoria_final.obtener_hecho("susceptibilidad_base") == "alta", "Falló al deducir susceptibilidad_base"
    assert memoria_final.obtener_hecho("recurrencia") == "alta", "Falló al deducir recurrencia"
    
    # El motor debió deducir la susceptibilidad del terreno en el segundo ciclo
    assert memoria_final.obtener_hecho("susceptibilidad_terreno") == "alta", "Falló al deducir susceptibilidad_terreno"
    
    # 5. Comprobaciones de las Reglas Disparadas (Traza)
    assert "R1" in traza_reglas, "La regla R1 no se disparó"
    assert "R6" in traza_reglas, "La regla R6 no se disparó"
    assert "R8" in traza_reglas, "La regla R8 no se disparó"
    
    print("[OK] Todos los asserts pasaron exitosamente.")
    print("Hechos finales en memoria:", memoria_final.a_diccionario())
    print("Reglas disparadas:", traza_reglas)

if __name__ == '__main__':
    test_inference_engine_susceptibilidad_alta()
