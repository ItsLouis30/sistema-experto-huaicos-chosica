;; Base de Conocimiento en CLIPS (Motor Principal)

(defrule R1 "Susceptibilidad Física Alta"
    (pendiente_terreno alta)
    (tipo_suelo_superficial material_suelto)
    =>
    (assert (susceptibilidad_base alta))
    (assert (regla_disparada R1))
)

(defrule R2 "Susceptibilidad Física Media por Roca en Pendiente Fuerte"
    (pendiente_terreno alta)
    (tipo_suelo_superficial roca_consolidada)
    =>
    (assert (susceptibilidad_base media))
    (assert (regla_disparada R2))
)

(defrule R3 "Susceptibilidad Física Media por Pendiente Moderada"
    (pendiente_terreno media)
    (tipo_suelo_superficial material_suelto)
    =>
    (assert (susceptibilidad_base media))
    (assert (regla_disparada R3))
)

(defrule R4 "Susceptibilidad Física Baja en Pendiente Moderada"
    (pendiente_terreno media)
    (tipo_suelo_superficial roca_consolidada)
    =>
    (assert (susceptibilidad_base baja))
    (assert (regla_disparada R4))
)

(defrule R5 "Susceptibilidad Física Baja por Pendiente Plana"
    (pendiente_terreno baja)
    =>
    (assert (susceptibilidad_base baja))
    (assert (regla_disparada R5))
)

(defrule R6 "Recurrencia Histórica Alta"
    (antecedente_activacion sí)
    =>
    (assert (recurrencia alta))
    (assert (regla_disparada R6))
)

(defrule R7 "Recurrencia Histórica Baja"
    (antecedente_activacion no)
    =>
    (assert (recurrencia baja))
    (assert (regla_disparada R7))
)

(defrule R8 "Paso Directo de Susceptibilidad Alta"
    (susceptibilidad_base alta)
    =>
    (assert (susceptibilidad_terreno alta))
    (assert (regla_disparada R8))
)

(defrule R9 "Agravante Histórico sobre Susceptibilidad Media"
    (susceptibilidad_base media)
    (recurrencia alta)
    =>
    (assert (susceptibilidad_terreno alta))
    (assert (regla_disparada R9))
)

(defrule R10 "Mantenimiento de Susceptibilidad Media"
    (susceptibilidad_base media)
    (recurrencia baja)
    =>
    (assert (susceptibilidad_terreno media))
    (assert (regla_disparada R10))
)

(defrule R11 "Paso Directo de Susceptibilidad Baja"
    (susceptibilidad_base baja)
    =>
    (assert (susceptibilidad_terreno baja))
    (assert (regla_disparada R11))
)

(defrule R12 "Detonante Alto por Aviso Rojo"
    (aviso_senamhi rojo)
    =>
    (assert (detonante_meteorologico alto))
    (assert (regla_disparada R12))
)

(defrule R13 "Detonante Alto por Aviso Naranja y Lluvia Intensa"
    (aviso_senamhi naranja)
    (precipitacion_72h ?precipitacion_72h&:(>= ?precipitacion_72h 60))
    =>
    (assert (detonante_meteorologico alto))
    (assert (regla_disparada R13))
)

(defrule R14 "Detonante Medio por Aviso Naranja Moderado"
    (aviso_senamhi naranja)
    (precipitacion_72h ?precipitacion_72h&:(< ?precipitacion_72h 60))
    =>
    (assert (detonante_meteorologico medio))
    (assert (regla_disparada R14))
)

(defrule R15 "Detonante Medio por Aviso Amarillo"
    (aviso_senamhi amarillo)
    =>
    (assert (detonante_meteorologico medio))
    (assert (regla_disparada R15))
)

(defrule R16 "Detonante Bajo por Aviso Blanco"
    (aviso_senamhi blanco)
    =>
    (assert (detonante_meteorologico bajo))
    (assert (regla_disparada R16))
)

(defrule R17 "Detonante Bajo por Ausencia de Aviso"
    (aviso_senamhi sin_aviso)
    =>
    (assert (detonante_meteorologico bajo))
    (assert (regla_disparada R17))
)

(defrule R18 "Peligro Alto Crítico"
    (susceptibilidad_terreno alta)
    (detonante_meteorologico alto)
    =>
    (assert (nivel_peligro alto))
    (assert (regla_disparada R18))
)

(defrule R19 "Peligro Medio por Detonante Moderado"
    (susceptibilidad_terreno alta)
    (detonante_meteorologico medio)
    =>
    (assert (nivel_peligro medio))
    (assert (regla_disparada R19))
)

(defrule R20 "Peligro Bajo por Detonante Mínimo en Terreno Susceptible"
    (susceptibilidad_terreno alta)
    (detonante_meteorologico bajo)
    =>
    (assert (nivel_peligro bajo))
    (assert (regla_disparada R20))
)

(defrule R21 "Peligro Medio por Detonante Alto en Terreno Moderado"
    (susceptibilidad_terreno media)
    (detonante_meteorologico alto)
    =>
    (assert (nivel_peligro medio))
    (assert (regla_disparada R21))
)

(defrule R22 "Peligro Medio Equilibrado"
    (susceptibilidad_terreno media)
    (detonante_meteorologico medio)
    =>
    (assert (nivel_peligro medio))
    (assert (regla_disparada R22))
)

(defrule R23 "Peligro Bajo por Detonante Mínimo en Terreno Moderado"
    (susceptibilidad_terreno media)
    (detonante_meteorologico bajo)
    =>
    (assert (nivel_peligro bajo))
    (assert (regla_disparada R23))
)

(defrule R24 "Peligro Bajo por Susceptibilidad Mínima"
    (susceptibilidad_terreno baja)
    =>
    (assert (nivel_peligro bajo))
    (assert (regla_disparada R24))
)

(defrule R25 "Exposición Bruta Alta por Cercanía"
    (dist_quebrada ?dist_quebrada&:(<= ?dist_quebrada 100))
    =>
    (assert (exposicion_bruta alta))
    (assert (regla_disparada R25))
)

(defrule R26 "Exposición Bruta Media por Cono Lejano"
    (dist_quebrada ?dist_quebrada&:(> ?dist_quebrada 100))
    (ubic_cono_deyeccion sí)
    =>
    (assert (exposicion_bruta media))
    (assert (regla_disparada R26))
)

(defrule R27 "Exposición Bruta Baja Fuera de Zona"
    (dist_quebrada ?dist_quebrada&:(> ?dist_quebrada 100))
    (ubic_cono_deyeccion no)
    =>
    (assert (exposicion_bruta baja))
    (assert (regla_disparada R27))
)

(defrule R28 "Regla de Validación de Datos (Integridad Semántica)"
    (obra_mitigacion_cercana ausente)
    =>
    (assert (estado_obra_mitigacion no_aplica))
    (assert (regla_disparada R28))
)

(defrule R29 "Amortiguación de Exposición Alta por Dique Operativo"
    (exposicion_bruta alta)
    (obra_mitigacion_cercana presente)
    (estado_obra_mitigacion operativo)
    =>
    (assert (exposicion_ajustada media))
    (assert (regla_disparada R29))
)

(defrule R30 "Exposición Alta sin Mitigación Funcional"
    (exposicion_bruta alta)
    (obra_mitigacion_cercana presente)
    (estado_obra_mitigacion colmatada_o_deteriorada)
    =>
    (assert (exposicion_ajustada alta))
    (assert (regla_disparada R30))
)

(defrule R31 "Exposición Alta por Ausencia de Obra"
    (exposicion_bruta alta)
    (estado_obra_mitigacion no_aplica)
    =>
    (assert (exposicion_ajustada alta))
    (assert (regla_disparada R31))
)

(defrule R32 "Amortiguación de Exposición Media por Dique Operativo"
    (exposicion_bruta media)
    (obra_mitigacion_cercana presente)
    (estado_obra_mitigacion operativo)
    =>
    (assert (exposicion_ajustada baja))
    (assert (regla_disparada R32))
)

(defrule R33 "Mantenimiento de Exposición Media sin Mitigación Funcional"
    (exposicion_bruta media)
    (estado_obra_mitigacion colmatada_o_deteriorada|no_aplica)
    =>
    (assert (exposicion_ajustada media))
    (assert (regla_disparada R33))
)

(defrule R34 "Paso Directo de Exposición Baja"
    (exposicion_bruta baja)
    =>
    (assert (exposicion_ajustada baja))
    (assert (regla_disparada R34))
)

(defrule R35 "Fragilidad Estructural Elevada"
    (material_vivienda precaria)
    =>
    (assert (fragilidad_fisica alta))
    (assert (regla_disparada R35))
)

(defrule R36 "Fragilidad Estructural Reducida"
    (material_vivienda noble)
    =>
    (assert (fragilidad_fisica baja))
    (assert (regla_disparada R36))
)

(defrule R37 "Capacidad Alta (Entorno Óptimo)"
    (ruta_evacuacion_segura sí)
    (acceso_emergencia facil)
    (sistema_alerta_local presente)
    =>
    (assert (capacidad_respuesta alta))
    (assert (regla_disparada R37))
)

(defrule R38 "Capacidad Media (Falta de Alerta)"
    (ruta_evacuacion_segura sí)
    (acceso_emergencia facil)
    (sistema_alerta_local ausente)
    =>
    (assert (capacidad_respuesta media))
    (assert (regla_disparada R38))
)

(defrule R39 "Capacidad Media (Acceso Difícil)"
    (ruta_evacuacion_segura sí)
    (acceso_emergencia dificil)
    (sistema_alerta_local presente)
    =>
    (assert (capacidad_respuesta media))
    (assert (regla_disparada R39))
)

(defrule R40 "Capacidad Media (Solo Ruta Segura)"
    (ruta_evacuacion_segura sí)
    (acceso_emergencia dificil)
    (sistema_alerta_local ausente)
    =>
    (assert (capacidad_respuesta media))
    (assert (regla_disparada R40))
)

(defrule R41 "Capacidad Media (Factores Comunitarios sin Ruta)"
    (ruta_evacuacion_segura no)
    (acceso_emergencia facil)
    (sistema_alerta_local presente)
    =>
    (assert (capacidad_respuesta media))
    (assert (regla_disparada R41))
)

(defrule R42 "Capacidad Baja (Ausencia de Alerta y Ruta)"
    (ruta_evacuacion_segura no)
    (acceso_emergencia facil)
    (sistema_alerta_local ausente)
    =>
    (assert (capacidad_respuesta baja))
    (assert (regla_disparada R42))
)

(defrule R43 "Capacidad Baja (Difícil Acceso sin Ruta)"
    (ruta_evacuacion_segura no)
    (acceso_emergencia dificil)
    (sistema_alerta_local presente)
    =>
    (assert (capacidad_respuesta baja))
    (assert (regla_disparada R43))
)

(defrule R44 "Capacidad Baja Crítica"
    (ruta_evacuacion_segura no)
    (acceso_emergencia dificil)
    (sistema_alerta_local ausente)
    =>
    (assert (capacidad_respuesta baja))
    (assert (regla_disparada R44))
)

(defrule R45 "Vulnerabilidad Alta por Fragilidad en Zona Crítica"
    (exposicion_ajustada alta)
    (fragilidad_fisica alta)
    =>
    (assert (nivel_vulnerabilidad alta))
    (assert (regla_disparada R45))
)

(defrule R46 "Vulnerabilidad Alta por Incomunicación en Zona Crítica"
    (exposicion_ajustada alta)
    (fragilidad_fisica baja)
    (capacidad_respuesta baja)
    =>
    (assert (nivel_vulnerabilidad alta))
    (assert (regla_disparada R46))
)

(defrule R47 "Vulnerabilidad Media por Capacidad Moderada en Zona Crítica"
    (exposicion_ajustada alta)
    (fragilidad_fisica baja)
    (capacidad_respuesta media)
    =>
    (assert (nivel_vulnerabilidad media))
    (assert (regla_disparada R47))
)

(defrule R48 "Vulnerabilidad Media por Alta Respuesta en Zona Crítica"
    (exposicion_ajustada alta)
    (fragilidad_fisica baja)
    (capacidad_respuesta alta)
    =>
    (assert (nivel_vulnerabilidad media))
    (assert (regla_disparada R48))
)

(defrule R49 "Vulnerabilidad Alta por Fragilidad en Exposición Media"
    (exposicion_ajustada media)
    (fragilidad_fisica alta)
    (capacidad_respuesta baja)
    =>
    (assert (nivel_vulnerabilidad alta))
    (assert (regla_disparada R49))
)

(defrule R50 "Vulnerabilidad Media por Compensación (Fragilidad Alta, Capacidad Alta)"
    (exposicion_ajustada media)
    (fragilidad_fisica alta)
    (capacidad_respuesta alta)
    =>
    (assert (nivel_vulnerabilidad media))
    (assert (regla_disparada R50))
)

(defrule R51 "Vulnerabilidad Media por Compensación (Fragilidad Baja, Capacidad Baja)"
    (exposicion_ajustada media)
    (fragilidad_fisica baja)
    (capacidad_respuesta baja)
    =>
    (assert (nivel_vulnerabilidad media))
    (assert (regla_disparada R51))
)

(defrule R52 "Vulnerabilidad Media en Entorno Controlado"
    (exposicion_ajustada media)
    (fragilidad_fisica baja)
    (capacidad_respuesta media|alta)
    =>
    (assert (nivel_vulnerabilidad media))
    (assert (regla_disparada R52))
)

(defrule R53 "Vulnerabilidad Media por Fragilidad Alta en Zona Segura"
    (exposicion_ajustada baja)
    (fragilidad_fisica alta)
    =>
    (assert (nivel_vulnerabilidad media))
    (assert (regla_disparada R53))
)

(defrule R54 "Vulnerabilidad Media por Capacidad Baja en Zona Segura"
    (exposicion_ajustada baja)
    (fragilidad_fisica baja)
    (capacidad_respuesta baja)
    =>
    (assert (nivel_vulnerabilidad media))
    (assert (regla_disparada R54))
)

(defrule R55 "Vulnerabilidad Media por Capacidad Moderada en Zona Segura"
    (exposicion_ajustada baja)
    (fragilidad_fisica baja)
    (capacidad_respuesta media)
    =>
    (assert (nivel_vulnerabilidad media))
    (assert (regla_disparada R55))
)

(defrule R56 "Vulnerabilidad Baja por Entorno Resiliente Integral"
    (exposicion_ajustada baja)
    (fragilidad_fisica baja)
    (capacidad_respuesta alta)
    =>
    (assert (nivel_vulnerabilidad baja))
    (assert (regla_disparada R56))
)

(defrule R57 "Riesgo Alto Crítico"
    (nivel_peligro alto)
    (nivel_vulnerabilidad alta)
    =>
    (assert (nivel_riesgo alto))
    (assert (regla_disparada R57))
)

(defrule R58 "Riesgo Alto por Predominio de Peligro"
    (nivel_peligro alto)
    (nivel_vulnerabilidad media)
    =>
    (assert (nivel_riesgo alto))
    (assert (regla_disparada R58))
)

(defrule R59 "Riesgo Alto por Predominio de Vulnerabilidad"
    (nivel_peligro medio)
    (nivel_vulnerabilidad alta)
    =>
    (assert (nivel_riesgo alto))
    (assert (regla_disparada R59))
)

(defrule R60 "Riesgo Medio Diagonal"
    (nivel_peligro medio)
    (nivel_vulnerabilidad media)
    =>
    (assert (nivel_riesgo medio))
    (assert (regla_disparada R60))
)

(defrule R61 "Riesgo Medio por Extremos Opuestos (Peligro)"
    (nivel_peligro alto)
    (nivel_vulnerabilidad baja)
    =>
    (assert (nivel_riesgo medio))
    (assert (regla_disparada R61))
)

(defrule R62 "Riesgo Medio por Extremos Opuestos (Vulnerabilidad)"
    (nivel_peligro bajo)
    (nivel_vulnerabilidad alta)
    =>
    (assert (nivel_riesgo medio))
    (assert (regla_disparada R62))
)

(defrule R63 "Riesgo Bajo por Factores Mitigados"
    (nivel_peligro bajo)
    (nivel_vulnerabilidad media)
    =>
    (assert (nivel_riesgo bajo))
    (assert (regla_disparada R63))
)

(defrule R64 "Riesgo Bajo por Peligro Mitigado"
    (nivel_peligro medio)
    (nivel_vulnerabilidad baja)
    =>
    (assert (nivel_riesgo bajo))
    (assert (regla_disparada R64))
)

(defrule R65 "Riesgo Bajo Mínimo"
    (nivel_peligro bajo)
    (nivel_vulnerabilidad baja)
    =>
    (assert (nivel_riesgo bajo))
    (assert (regla_disparada R65))
)

(defrule R66 "Recomendación de Evacuación Preventiva"
    (aviso_senamhi rojo)
    (dist_quebrada ?dist_quebrada&:(<= ?dist_quebrada 50))
    (ubic_cono_deyeccion sí)
    =>
    (assert (nivel_alerta recomendacion_evacuacion_preventiva))
    (assert (regla_disparada R66))
)

