DICCIONARIO DE VARIABLES Y VALORES LEGALES (DOMINIO DEL SBC)
pendiente_terreno: {"alta", "media", "baja"}
tipo_suelo_superficial: {"material_suelto", "roca_consolidada"}
antecedente_activacion: {"sí", "no"}
aviso_senamhi: {"rojo", "naranja", "amarillo", "blanco", "sin_aviso"}
precipitacion_72h: Numérico (Categorías lógicas: < 60, >= 60)
dist_quebrada: Numérico (Categorías lógicas: <= 50, > 50 y <= 100, > 100)
ubic_cono_deyeccion: {"sí", "no"}
obra_mitigacion_cercana: {"presente", "ausente"}
estado_obra_mitigacion: {"operativo", "colmatada_o_deteriorada", "no_aplica"}
material_vivienda: {"precaria", "noble"}
ruta_evacuacion_segura: {"sí", "no"}
acceso_emergencia: {"facil", "dificil"}
sistema_alerta_local: {"presente", "ausente"}

MÓDULO DE CONDICIONES FÍSICAS Y SUSCEPTIBILIDAD (INGEMMET) 
R1 — Susceptibilidad Física Alta 
SI pendiente_terreno = "alta" Y tipo_suelo_superficial = "material_suelto" 
ENTONCES susceptibilidad_base = "alta". 

R2 — Susceptibilidad Física Media por Roca en Pendiente Fuerte
SI pendiente_terreno = "alta" Y tipo_suelo_superficial = "roca_consolidada"
ENTONCES susceptibilidad_base = "media".

R3 — Susceptibilidad Física Media por Pendiente Moderada
SI pendiente_terreno = "media" Y tipo_suelo_superficial = "material_suelto"
ENTONCES susceptibilidad_base = "media".

R4 — Susceptibilidad Física Baja en Pendiente Moderada
SI pendiente_terreno = "media" Y tipo_suelo_superficial = "roca_consolidada"
ENTONCES susceptibilidad_base = "baja".

R5 — Susceptibilidad Física Baja por Pendiente Plana
SI pendiente_terreno = "baja"
ENTONCES susceptibilidad_base = "baja".

R6 — Recurrencia Histórica Alta
SI antecedente_activacion = "sí"
ENTONCES recurrencia = "alta".

R7 — Recurrencia Histórica Baja
SI antecedente_activacion = "no"
ENTONCES recurrencia = "baja".

R8 — Paso Directo de Susceptibilidad Alta
SI susceptibilidad_base = "alta"
ENTONCES susceptibilidad_terreno = "alta".

R9 — Agravante Histórico sobre Susceptibilidad Media
SI susceptibilidad_base = "media" Y recurrencia = "alta"
ENTONCES susceptibilidad_terreno = "alta".

R10 — Mantenimiento de Susceptibilidad Media
SI susceptibilidad_base = "media" Y recurrencia = "baja"
ENTONCES susceptibilidad_terreno = "media".

R11 — Paso Directo de Susceptibilidad Baja
SI susceptibilidad_base = "baja"
ENTONCES susceptibilidad_terreno = "baja".


MÓDULO DE DETONANTE METEOROLÓGICO (SENAMHI) 
R12 — Detonante Alto por Aviso Rojo 
SI aviso_senamhi = "rojo" 
ENTONCES detonante_meteorologico = "alto". 

R13 — Detonante Alto por Aviso Naranja y Lluvia Intensa
SI aviso_senamhi = "naranja" Y precipitacion_72h >= 60
ENTONCES detonante_meteorologico = "alto".

R14 — Detonante Medio por Aviso Naranja Moderado
SI aviso_senamhi = "naranja" Y precipitacion_72h < 60
ENTONCES detonante_meteorologico = "medio".

R15 — Detonante Medio por Aviso Amarillo
SI aviso_senamhi = "amarillo"
ENTONCES detonante_meteorologico = "medio".

R16 — Detonante Bajo por Aviso Blanco
SI aviso_senamhi = "blanco"
ENTONCES detonante_meteorologico = "bajo".

R17 — Detonante Bajo por Ausencia de Aviso
SI aviso_senamhi = "sin_aviso"
ENTONCES detonante_meteorologico = "bajo".


MÓDULO DE PELIGRO (MATRIZ CARTESIANA CENEPRED COMPLETA) 
R18 — Peligro Alto Crítico 
SI susceptibilidad_terreno = "alta" Y detonante_meteorologico = "alto" 
ENTONCES nivel_peligro = "alto". 

R19 — Peligro Medio por Detonante Moderado
SI susceptibilidad_terreno = "alta" Y detonante_meteorologico = "medio"
ENTONCES nivel_peligro = "medio".

R20 — Peligro Bajo por Detonante Mínimo en Terreno Susceptible
SI susceptibilidad_terreno = "alta" Y detonante_meteorologico = "bajo"
ENTONCES nivel_peligro = "bajo".

R21 — Peligro Medio por Detonante Alto en Terreno Moderado
SI susceptibilidad_terreno = "media" Y detonante_meteorologico = "alto"
ENTONCES nivel_peligro = "medio".

R22 — Peligro Medio Equilibrado
SI susceptibilidad_terreno = "media" Y detonante_meteorologico = "medio"
ENTONCES nivel_peligro = "medio".

R23 — Peligro Bajo por Detonante Mínimo en Terreno Moderado
SI susceptibilidad_terreno = "media" Y detonante_meteorologico = "bajo"
ENTONCES nivel_peligro = "bajo".

R24 — Peligro Bajo por Susceptibilidad Mínima
SI susceptibilidad_terreno = "baja"
ENTONCES nivel_peligro = "bajo".

MÓDULO DE EXPOSICIÓN Y MITIGACIÓN ESPACIAL 
R25 — Exposición Bruta Alta por Cercanía 
SI dist_quebrada <= 100 
ENTONCES exposicion_bruta = "alta". 

R26 — Exposición Bruta Media por Cono Lejano
SI dist_quebrada > 100 Y ubic_cono_deyeccion = "sí"
ENTONCES exposicion_bruta = "media".

R27 — Exposición Bruta Baja Fuera de Zona
SI dist_quebrada > 100 Y ubic_cono_deyeccion = "no"
ENTONCES exposicion_bruta = "baja".

R28 — Regla de Validación de Datos (Integridad Semántica)
SI obra_mitigacion_cercana = "ausente"
ENTONCES estado_obra_mitigacion = "no_aplica".

R29 — Amortiguación de Exposición Alta por Dique Operativo
SI exposicion_bruta = "alta" Y obra_mitigacion_cercana = "presente" Y estado_obra_mitigacion = "operativo"
ENTONCES exposicion_ajustada = "media".

R30 — Exposición Alta sin Mitigación Funcional
SI exposicion_bruta = "alta" Y obra_mitigacion_cercana = "presente" Y estado_obra_mitigacion = "colmatada_o_deteriorada"
ENTONCES exposicion_ajustada = "alta".

R31 — Exposición Alta por Ausencia de Obra
SI exposicion_bruta = "alta" Y estado_obra_mitigacion = "no_aplica"
ENTONCES exposicion_ajustada = "alta".

R32 — Amortiguación de Exposición Media por Dique Operativo
SI exposicion_bruta = "media" Y obra_mitigacion_cercana = "presente" Y estado_obra_mitigacion = "operativo"
ENTONCES exposicion_ajustada = "baja".

R33 — Mantenimiento de Exposición Media sin Mitigación Funcional
SI exposicion_bruta = "media" Y (estado_obra_mitigacion = "colmatada_o_deteriorada" O estado_obra_mitigacion = "no_aplica")
ENTONCES exposicion_ajustada = "media".

R34 — Paso Directo de Exposición Baja
SI exposicion_bruta = "baja"
ENTONCES exposicion_ajustada = "baja".

MÓDULO DE FRAGILIDAD Y CAPACIDAD DE RESPUESTA 
R35 — Fragilidad Estructural Elevada 
SI material_vivienda = "precaria" 
ENTONCES fragilidad_fisica = "alta". 

R36 — Fragilidad Estructural Reducida
SI material_vivienda = "noble"
ENTONCES fragilidad_fisica = "baja".

R37 — Capacidad Alta (Entorno Óptimo)
SI ruta_evacuacion_segura = "sí" Y acceso_emergencia = "facil" Y sistema_alerta_local = "presente"
ENTONCES capacidad_respuesta = "alta".

R38 — Capacidad Media (Falta de Alerta)
SI ruta_evacuacion_segura = "sí" Y acceso_emergencia = "facil" Y sistema_alerta_local = "ausente"
ENTONCES capacidad_respuesta = "media".

R39 — Capacidad Media (Acceso Difícil)
SI ruta_evacuacion_segura = "sí" Y acceso_emergencia = "dificil" Y sistema_alerta_local = "presente"
ENTONCES capacidad_respuesta = "media".

R40 — Capacidad Media (Solo Ruta Segura)
SI ruta_evacuacion_segura = "sí" Y acceso_emergencia = "dificil" Y sistema_alerta_local = "ausente"
ENTONCES capacidad_respuesta = "media".

R41 — Capacidad Media (Factores Comunitarios sin Ruta)
SI ruta_evacuacion_segura = "no" Y acceso_emergencia = "facil" Y sistema_alerta_local = "presente"
ENTONCES capacidad_respuesta = "media".

R42 — Capacidad Baja (Ausencia de Alerta y Ruta)
SI ruta_evacuacion_segura = "no" Y acceso_emergencia = "facil" Y sistema_alerta_local = "ausente"
ENTONCES capacidad_respuesta = "baja".

R43 — Capacidad Baja (Difícil Acceso sin Ruta)
SI ruta_evacuacion_segura = "no" Y acceso_emergencia = "dificil" Y sistema_alerta_local = "presente"
ENTONCES capacidad_respuesta = "baja".

R44 — Capacidad Baja Crítica
SI ruta_evacuacion_segura = "no" Y acceso_emergencia = "dificil" Y sistema_alerta_local = "ausente"
ENTONCES capacidad_respuesta = "baja".

MÓDULO DE VULNERABILIDAD INTEGRADA (CENEPRED COMPLETO) 
R45 — Vulnerabilidad Alta por Fragilidad en Zona Crítica 
SI exposicion_ajustada = "alta" Y fragilidad_fisica = "alta" 
ENTONCES nivel_vulnerabilidad = "alta". 

R46 — Vulnerabilidad Alta por Incomunicación en Zona Crítica
SI exposicion_ajustada = "alta" Y fragilidad_fisica = "baja" Y capacidad_respuesta = "baja"
ENTONCES nivel_vulnerabilidad = "alta".

R47 — Vulnerabilidad Media por Capacidad Moderada en Zona Crítica
SI exposicion_ajustada = "alta" Y fragilidad_fisica = "baja" Y capacidad_respuesta = "media"
ENTONCES nivel_vulnerabilidad = "media".

R48 — Vulnerabilidad Media por Alta Respuesta en Zona Crítica
SI exposicion_ajustada = "alta" Y fragilidad_fisica = "baja" Y capacidad_respuesta = "alta"
ENTONCES nivel_vulnerabilidad = "media".

R49 — Vulnerabilidad Alta por Fragilidad en Exposición Media
SI exposicion_ajustada = "media" Y fragilidad_fisica = "alta" Y capacidad_respuesta = "baja"
ENTONCES nivel_vulnerabilidad = "alta".

R50 — Vulnerabilidad Media por Compensación (Fragilidad Alta, Capacidad Alta)
SI exposicion_ajustada = "media" Y fragilidad_fisica = "alta" Y capacidad_respuesta = "alta"
ENTONCES nivel_vulnerabilidad = "media".

R51 — Vulnerabilidad Media por Compensación (Fragilidad Baja, Capacidad Baja)
SI exposicion_ajustada = "media" Y fragilidad_fisica = "baja" Y capacidad_respuesta = "baja"
ENTONCES nivel_vulnerabilidad = "media".

R52 — Vulnerabilidad Media en Entorno Controlado
SI exposicion_ajustada = "media" Y fragilidad_fisica = "baja" Y (capacidad_respuesta = "media" O capacidad_respuesta = "alta")
ENTONCES nivel_vulnerabilidad = "media".

R53 — Vulnerabilidad Media por Fragilidad Alta en Zona Segura
SI exposicion_ajustada = "baja" Y fragilidad_fisica = "alta"
ENTONCES nivel_vulnerabilidad = "media".

R54 — Vulnerabilidad Media por Capacidad Baja en Zona Segura
SI exposicion_ajustada = "baja" Y fragilidad_fisica = "baja" Y capacidad_respuesta = "baja"
ENTONCES nivel_vulnerabilidad = "media".

R55 — Vulnerabilidad Media por Capacidad Moderada en Zona Segura
SI exposicion_ajustada = "baja" Y fragilidad_fisica = "baja" Y capacidad_respuesta = "media"
ENTONCES nivel_vulnerabilidad = "media".

R56 — Vulnerabilidad Baja por Entorno Resiliente Integral
SI exposicion_ajustada = "baja" Y fragilidad_fisica = "baja" Y capacidad_respuesta = "alta"
ENTONCES nivel_vulnerabilidad = "baja".

MÓDULO DE CLASIFICACIÓN DE RIESGO (BASADO EN RELACIÓN PELIGRO-VULNERABILIDAD DE CENEPRED) 
R57 — Riesgo Alto Crítico SI nivel_peligro = "alto" Y nivel_vulnerabilidad = "alta" 
ENTONCES nivel_riesgo = "alto". 

R58 — Riesgo Alto por Predominio de Peligro
SI nivel_peligro = "alto" Y nivel_vulnerabilidad = "media"
ENTONCES nivel_riesgo = "alto".

R59 — Riesgo Alto por Predominio de Vulnerabilidad
SI nivel_peligro = "medio" Y nivel_vulnerabilidad = "alta"
ENTONCES nivel_riesgo = "alto".

R60 — Riesgo Medio Diagonal
SI nivel_peligro = "medio" Y nivel_vulnerabilidad = "media"
ENTONCES nivel_riesgo = "medio".

R61 — Riesgo Medio por Extremos Opuestos (Peligro)
SI nivel_peligro = "alto" Y nivel_vulnerabilidad = "baja"
ENTONCES nivel_riesgo = "medio".

R62 — Riesgo Medio por Extremos Opuestos (Vulnerabilidad)
SI nivel_peligro = "bajo" Y nivel_vulnerabilidad = "alta"
ENTONCES nivel_riesgo = "medio".

R63 — Riesgo Bajo por Factores Mitigados
SI nivel_peligro = "bajo" Y nivel_vulnerabilidad = "media"
ENTONCES nivel_riesgo = "bajo".

R64 — Riesgo Bajo por Peligro Mitigado
SI nivel_peligro = "medio" Y nivel_vulnerabilidad = "baja"
ENTONCES nivel_riesgo = "bajo".

R65 — Riesgo Bajo Mínimo
SI nivel_peligro = "bajo" Y nivel_vulnerabilidad = "baja"
ENTONCES nivel_riesgo = "bajo".

MÓDULO DE ALERTAS Y ACCIÓN TERMINAL (INDECI) 
R66 — Recomendación de Evacuación Preventiva SI aviso_senamhi = "rojo" Y dist_quebrada <= 50 Y ubic_cono_deyeccion = "sí" 
ENTONCES nivel_alerta = "recomendacion_evacuacion_preventiva". 
