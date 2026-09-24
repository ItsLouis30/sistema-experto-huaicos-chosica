# -*- coding: utf-8 -*-
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.inference.clips_engine import CLIPSEngine
from app.explanation.tracer import ExplanationTracer

def test_inference_engine_susceptibilidad_alta():
    hechos_iniciales = {
        "pendiente_terreno": "alta",
        "tipo_suelo_superficial": "material_suelto",
        "antecedente_activacion": "sí",
        # Agregamos detonante alto para forzar que llegue al final
        "aviso_senamhi": "rojo",
        "precipitacion_72h": 80,
        "dist_quebrada": 40,
        "ubic_cono_deyeccion": "sí",
        "obra_mitigacion_cercana": "ausente",
        "estado_obra_mitigacion": "no_aplica",
        "material_vivienda": "precaria",
        "ruta_evacuacion_segura": "no",
        "acceso_emergencia": "dificil",
        "sistema_alerta_local": "ausente"
    }
    
    motor = CLIPSEngine(rules_path="app/knowledge/rules.clp")
    hechos_finales, traza_reglas = motor.ejecutar(hechos_iniciales)
    
    assert hechos_finales.get("susceptibilidad_base") == "alta", "Falló al deducir susceptibilidad_base"
    assert hechos_finales.get("recurrencia") == "alta", "Falló al deducir recurrencia"
    assert hechos_finales.get("susceptibilidad_terreno") == "alta", "Falló al deducir susceptibilidad_terreno"
    
    # Comprobar que CLIPS deduce el riesgo final
    assert hechos_finales.get("nivel_riesgo") == "alto", "Falló al deducir riesgo alto"
    
    assert "R1" in traza_reglas, "La regla R1 no se disparó"
    assert "R6" in traza_reglas, "La regla R6 no se disparó"
    assert "R8" in traza_reglas, "La regla R8 no se disparó"
    
    print("[OK] Todos los asserts pasaron exitosamente integrados con CLIPS.")
    print("Hechos finales en memoria:", hechos_finales)
    print("Reglas disparadas:", traza_reglas)
    
    print("\n--- JUSTIFICACIÓN DEL SISTEMA EXPERTO (CLIPS) ---")
    explicador = ExplanationTracer(dictionary_path="app/knowledge/reglas.json")
    justificacion = explicador.generar_explicacion(traza_reglas)
    
    for paso in justificacion:
        print(f"\nPaso {paso['paso']} (Regla {paso['regla_id']} - {paso['descripcion']})")
        print(f"   {paso['por_que']}")
        print(f"   => {paso['deduccion']}")

if __name__ == '__main__':
    test_inference_engine_susceptibilidad_alta()
