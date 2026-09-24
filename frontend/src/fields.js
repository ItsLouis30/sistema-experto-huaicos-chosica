// Definición de la consulta al usuario.
// Cada campo corresponde a una variable de entrada de la Base de Conocimiento
// (ver backend/app/knowledge/variables.py y REGLAS.md). Los `value` deben coincidir
// exactamente con los valores legales que valida Pydantic.

export const PASOS = [
  {
    id: 'terreno',
    titulo: 'Terreno',
    fuente: 'INGEMMET',
    encabezado: 'Condiciones físicas del terreno',
    descripcion: 'Describe la ladera y el suelo donde se ubica la vivienda.',
    campos: ['pendiente_terreno', 'tipo_suelo_superficial', 'antecedente_activacion'],
  },
  {
    id: 'clima',
    titulo: 'Clima',
    fuente: 'SENAMHI',
    encabezado: 'Detonante meteorológico',
    descripcion: 'Aviso vigente y lluvia acumulada en las últimas 72 horas.',
    campos: ['aviso_senamhi', 'precipitacion_72h'],
  },
  {
    id: 'ubicacion',
    titulo: 'Ubicación',
    fuente: 'CENEPRED',
    encabezado: 'Exposición y mitigación',
    descripcion: 'Cercanía a la quebrada y obras de protección existentes.',
    campos: ['dist_quebrada', 'ubic_cono_deyeccion', 'obra_mitigacion_cercana', 'estado_obra_mitigacion'],
  },
  {
    id: 'vivienda',
    titulo: 'Vivienda',
    fuente: 'INDECI',
    encabezado: 'Fragilidad y capacidad de respuesta',
    descripcion: 'Material de la vivienda y preparación del entorno ante una emergencia.',
    campos: ['material_vivienda', 'ruta_evacuacion_segura', 'acceso_emergencia', 'sistema_alerta_local'],
  },
]

const SI_NO = [
  { value: 'sí', label: 'Sí' },
  { value: 'no', label: 'No' },
]

export const CAMPOS = {
  pendiente_terreno: {
    tipo: 'opciones',
    label: 'Pendiente del terreno',
    ayuda: 'Inclinación de la ladera sobre la que se asienta la vivienda.',
    opciones: [
      { 
        value: 'alta', 
        label: 'Alta', 
        detalle: 'Ladera empinada',
        grafico: '<svg viewBox="0 0 40 40" width="40" height="40" stroke="currentColor" fill="none" stroke-width="2"><path d="M5,35 L35,5 L35,35 Z" fill="currentColor" fill-opacity="0.1" stroke-linejoin="round" /></svg>'
      },
      { 
        value: 'media', 
        label: 'Media', 
        detalle: 'Inclinación moderada',
        grafico: '<svg viewBox="0 0 40 40" width="40" height="40" stroke="currentColor" fill="none" stroke-width="2"><path d="M5,35 L35,20 L35,35 Z" fill="currentColor" fill-opacity="0.1" stroke-linejoin="round" /></svg>'
      },
      { 
        value: 'baja', 
        label: 'Baja', 
        detalle: 'Terreno plano',
        grafico: '<svg viewBox="0 0 40 40" width="40" height="40" stroke="currentColor" fill="none" stroke-width="2"><path d="M5,35 L35,35" stroke-linecap="round" /><path d="M10,35 L10,30 M20,35 L20,30 M30,35 L30,30" /></svg>'
      },
    ],
  },
  tipo_suelo_superficial: {
    tipo: 'opciones',
    label: 'Tipo de suelo superficial',
    opciones: [
      { value: 'material_suelto', label: 'Material suelto', detalle: 'Arena, grava o rocas sueltas' },
      { value: 'roca_consolidada', label: 'Roca consolidada', detalle: 'Roca firme y compacta' },
    ],
  },
  antecedente_activacion: {
    tipo: 'opciones',
    label: '¿La quebrada se activó antes?',
    ayuda: 'Registro histórico de huaicos en la quebrada cercana.',
    opciones: [
      { value: 'sí', label: 'Sí, se ha activado', detalle: 'Se han registrado huaicos o desbordes en años anteriores' },
      { value: 'no', label: 'No / Sin registro', detalle: 'Históricamente no ha bajado flujo por este sector' },
    ],
  },
  aviso_senamhi: {
    tipo: 'opciones',
    label: 'Aviso meteorológico SENAMHI',
    opciones: [
      { value: 'rojo', label: 'Rojo', color: '#ef4444' },
      { value: 'naranja', label: 'Naranja', color: '#f97316' },
      { value: 'amarillo', label: 'Amarillo', color: '#eab308' },
      { value: 'blanco', label: 'Blanco', color: '#cbd5e1' },
      { value: 'sin_aviso', label: 'Sin aviso' },
    ],
  },
  precipitacion_72h: {
    tipo: 'numero',
    label: 'Precipitación acumulada (72 h)',
    unidad: 'mm',
    min: 0,
    max: 150,
    paso: 1,
    defecto: 20,
    alertaSiMayor: true,
    umbrales: [{ valor: 60, texto: 'Lluvia intensa ≥ 60 mm' }],
  },
  dist_quebrada: {
    tipo: 'numero',
    label: 'Distancia al cauce de la quebrada',
    unidad: 'm',
    min: 0,
    max: 300,
    paso: 5,
    defecto: 150,
    guiaVisual: 'distancia',
    umbrales: [
      { valor: 50, texto: 'Zona crítica ≤ 50 m' },
      { valor: 100, texto: 'Exposición alta ≤ 100 m' },
    ],
  },
  ubic_cono_deyeccion: {
    tipo: 'opciones',
    label: '¿Está sobre el cono de deyección?',
    ayuda: 'Abanico de sedimentos donde la quebrada desemboca y deposita el material.',
    guiaVisual: 'cono',
    opciones: SI_NO,
  },
  obra_mitigacion_cercana: {
    tipo: 'opciones',
    label: 'Obra de mitigación cercana',
    ayuda: 'Diques, muros de contención o barreras dinámicas.',
    opciones: [
      { value: 'presente', label: 'Presente' },
      { value: 'ausente', label: 'Ausente' },
    ],
  },
  estado_obra_mitigacion: {
    tipo: 'opciones',
    label: 'Estado de la obra',
    guiaVisual: 'dique',
    opciones: [
      { value: 'operativo', label: 'Operativa' },
      { value: 'colmatada_o_deteriorada', label: 'Colmatada o deteriorada' },
      { value: 'no_aplica', label: 'No aplica' },
    ],
  },
  material_vivienda: {
    tipo: 'opciones',
    label: 'Material de la vivienda',
    opciones: [
      { value: 'precaria', label: 'Precaria', detalle: 'Esteras, madera, adobe' },
      { value: 'noble', label: 'Noble', detalle: 'Ladrillo y concreto' },
    ],
  },
  ruta_evacuacion_segura: {
    tipo: 'opciones',
    label: '¿Existe ruta de evacuación segura?',
    opciones: SI_NO,
  },
  acceso_emergencia: {
    tipo: 'opciones',
    label: 'Acceso para servicios de emergencia',
    opciones: [
      { value: 'facil', label: 'Fácil' },
      { value: 'dificil', label: 'Difícil' },
    ],
  },
  sistema_alerta_local: {
    tipo: 'opciones',
    label: 'Sistema de alerta temprana local',
    ayuda: 'Sirenas, megáfonos o brigadas comunitarias de vigilancia.',
    opciones: [
      { value: 'presente', label: 'Presente' },
      { value: 'ausente', label: 'Ausente' },
    ],
  },
}

export function valoresIniciales() {
  const v = {}
  for (const [clave, campo] of Object.entries(CAMPOS)) {
    v[clave] = campo.tipo === 'numero' ? campo.defecto : null
  }
  return v
}

// Opciones válidas del estado de la obra según su presencia (coherente con R28).
export function opcionesVisibles(clave, valores) {
  const campo = CAMPOS[clave]
  if (clave !== 'estado_obra_mitigacion') return campo.opciones
  if (valores.obra_mitigacion_cercana === 'ausente') return campo.opciones.filter((o) => o.value === 'no_aplica')
  if (valores.obra_mitigacion_cercana === 'presente') return campo.opciones.filter((o) => o.value !== 'no_aplica')
  return []
}

export function etiquetaValor(clave, valor) {
  const campo = CAMPOS[clave]
  if (valor === null || valor === undefined) return '—'
  if (campo.tipo === 'numero') return `${valor} ${campo.unidad}`
  return campo.opciones.find((o) => o.value === valor)?.label ?? valor
}

// Nombres legibles para las variables deducidas por el motor.
export const DEDUCIDAS = {
  susceptibilidad_base: 'Susceptibilidad base',
  recurrencia: 'Recurrencia histórica',
  susceptibilidad_terreno: 'Susceptibilidad del terreno',
  detonante_meteorologico: 'Detonante meteorológico',
  nivel_peligro: 'Nivel de peligro',
  exposicion_bruta: 'Exposición bruta',
  exposicion_ajustada: 'Exposición ajustada',
  fragilidad_fisica: 'Fragilidad física',
  capacidad_respuesta: 'Capacidad de respuesta',
  nivel_vulnerabilidad: 'Nivel de vulnerabilidad',
  nivel_riesgo: 'Nivel de riesgo',
}

// Orden lógico de los módulos de la Base de Conocimiento para agrupar la traza.
export const MODULOS = [
  { clave: 'CONDICIONES FÍSICAS', titulo: 'Susceptibilidad física', fuente: 'INGEMMET' },
  { clave: 'DETONANTE', titulo: 'Detonante meteorológico', fuente: 'SENAMHI' },
  { clave: 'PELIGRO', titulo: 'Nivel de peligro', fuente: 'CENEPRED' },
  { clave: 'EXPOSICIÓN', titulo: 'Exposición y mitigación', fuente: 'CENEPRED' },
  { clave: 'FRAGILIDAD', titulo: 'Fragilidad y capacidad de respuesta', fuente: 'INDECI' },
  { clave: 'VULNERABILIDAD', titulo: 'Vulnerabilidad integrada', fuente: 'CENEPRED' },
  { clave: 'CLASIFICACIÓN', titulo: 'Clasificación del riesgo', fuente: 'CENEPRED' },
  { clave: 'ALERTAS', titulo: 'Alertas y acción', fuente: 'INDECI' },
]

export const RECOMENDACIONES = {
  alto: [
    'Identifica y recorre con tu familia la ruta de evacuación hacia una zona alta y segura.',
    'Prepara una mochila de emergencia (agua, linterna, botiquín, documentos en bolsa hermética).',
    'Coordina con tu junta vecinal y la Municipalidad de Lurigancho-Chosica la limpieza del cauce y las obras de protección.',
    'Mantente atento a los avisos de SENAMHI e INDECI durante la temporada de lluvias (diciembre–abril).',
  ],
  medio: [
    'Verifica el estado de las obras de mitigación cercanas y reporta si están colmatadas.',
    'Define un punto de reunión familiar y ten a mano una mochila de emergencia.',
    'Participa en los simulacros comunitarios organizados por INDECI.',
  ],
  bajo: [
    'Mantén la vigilancia durante lluvias intensas y revisa los avisos de SENAMHI.',
    'Apoya a los vecinos en zonas más expuestas y conoce las rutas de evacuación del sector.',
  ],
}
