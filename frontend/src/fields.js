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
        label: 'Alta (>35°)', 
        detalle: 'Ladera empinada inestable',
        grafico: '<svg viewBox="0 0 48 40" width="48" height="40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4,36 L34,8 L44,8 L44,36 Z" fill="currentColor" fill-opacity="0.1" stroke="currentColor" /><path d="M22,17 L28,11 L34,17 L34,22 L22,22 Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5" /><line x1="22" y1="22" x2="22" y2="26" stroke="currentColor" stroke-dasharray="2 1.5" stroke-width="1.5" /><circle cx="12" cy="24" r="1.8" fill="#e11d48" stroke="none" class="anim-gravedad" /><circle cx="8" cy="28" r="1.4" fill="#e11d48" stroke="none" class="anim-gravedad anim-delay" /></svg>'
      },
      { 
        value: 'media', 
        label: 'Media (15°-20°)', 
        detalle: 'Inclinación moderada',
        grafico: '<svg viewBox="0 0 48 40" width="48" height="40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4,36 L44,18 L44,36 Z" fill="currentColor" fill-opacity="0.1" stroke="currentColor" /><path d="M20,23 L26,18 L32,23 L32,28 L20,28 Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5" /><path d="M6,34 L42,19" stroke="#4353ff" stroke-width="2" stroke-dasharray="4 3" class="anim-escorrentia" /></svg>'
      },
      { 
        value: 'baja', 
        label: 'Baja (<15°)', 
        detalle: 'Terreno plano / cimentación',
        grafico: '<svg viewBox="0 0 48 40" width="48" height="40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="34" x2="44" y2="34" stroke="currentColor" stroke-width="2" /><line x1="14" y1="34" x2="34" y2="34" stroke="#16a34a" stroke-width="3" class="anim-estabilidad" /><path d="M16,28 L24,20 L32,28 L32,34 L16,34 Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5" /></svg>'
      },
    ],
  },
  tipo_suelo_superficial: {
    tipo: 'opciones',
    label: 'Tipo de suelo superficial',
    opciones: [
      { 
        value: 'material_suelto', 
        label: 'Material suelto', 
        detalle: 'Arena, grava o rocas sueltas',
        grafico: '<svg viewBox="0 0 48 40" width="48" height="40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="40" height="28" rx="6" stroke="currentColor" fill="currentColor" fill-opacity="0.05" /><circle cx="14" cy="16" r="3" fill="#d97706" stroke="none" class="anim-vibrar" /><circle cx="26" cy="14" r="2" fill="#d97706" stroke="none" class="anim-vibrar anim-delay-1" /><circle cx="36" cy="18" r="3.5" fill="#d97706" stroke="none" class="anim-vibrar anim-delay-2" /><polygon points="12,26 18,24 16,30" fill="currentColor" fill-opacity="0.3" stroke="currentColor" class="anim-vibrar anim-delay-1" /><polygon points="24,25 32,23 30,29" fill="currentColor" fill-opacity="0.3" stroke="currentColor" class="anim-vibrar" /><circle cx="36" cy="27" r="2" fill="#d97706" stroke="none" class="anim-vibrar anim-delay-2" /></svg>'
      },
      { 
        value: 'roca_consolidada', 
        label: 'Roca consolidada', 
        detalle: 'Roca firme y compacta',
        grafico: '<svg viewBox="0 0 48 40" width="48" height="40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="40" height="28" rx="6" fill="currentColor" fill-opacity="0.08" stroke="currentColor" /><path d="M12,6 L20,20 L16,34" stroke="#4353ff" stroke-width="1.8" class="anim-destello-roca" /><path d="M28,6 L24,18 L34,34" stroke="#4353ff" stroke-width="1.8" class="anim-destello-roca" /><path d="M4,20 L44,20" stroke="currentColor" stroke-dasharray="3 3" opacity="0.5" /></svg>'
      },
    ],
  },
  antecedente_activacion: {
    tipo: 'opciones',
    label: '¿La quebrada se activó antes?',
    ayuda: 'Registro histórico de huaicos en la quebrada cercana.',
    opciones: [
      { 
        value: 'sí', 
        label: 'Sí, se ha activado', 
        detalle: 'Historial de flujo de detritos o desbordes',
        grafico: '<svg viewBox="0 0 48 40" width="48" height="40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4,10 L24,32 L44,10" stroke="currentColor" stroke-width="2" /><path d="M10,16 L24,30 L38,16" stroke="#e11d48" stroke-width="1.8" stroke-dasharray="4 3" class="anim-flujo-historico" /><path d="M14,10 L24,21 L34,10" stroke="#e11d48" stroke-width="1.8" stroke-dasharray="4 3" class="anim-flujo-historico anim-delay-1" /><path d="M24,12 L24,24 M20,20 L24,24 L28,20" stroke="#e11d48" stroke-width="1.6" class="anim-flujo-historico" /></svg>'
      },
      { 
        value: 'no', 
        label: 'No / Sin registro', 
        detalle: 'Sin registro histórico de activaciones',
        grafico: '<svg viewBox="0 0 48 40" width="48" height="40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6,14 C12,32 36,32 42,14" stroke="currentColor" stroke-width="2" /><line x1="14" y1="28" x2="34" y2="28" stroke="#16a34a" stroke-width="2.5" class="anim-reposo" /><path d="M18,28 L18,22 M16,24 L18,22 L20,24" stroke="#16a34a" stroke-width="1.4" /><path d="M30,28 L30,23 M28,25 L30,23 L32,25" stroke="#16a34a" stroke-width="1.4" /></svg>'
      },
    ],
  },
  aviso_senamhi: {
    tipo: 'opciones',
    label: 'Aviso meteorológico SENAMHI',
    opciones: [
      { value: 'rojo', label: 'Rojo', detalle: 'Fenómeno de gran magnitud', tema: 'rojo' },
      { value: 'naranja', label: 'Naranja', detalle: 'Fenómeno peligroso', tema: 'naranja' },
      { value: 'amarillo', label: 'Amarillo', detalle: 'Pueden ocurrir fenómenos peligrosos', tema: 'amarillo' },
      { value: 'blanco', label: 'Blanco', detalle: 'Condiciones normales dentro del promedio histórico', tema: 'neutro' },
      { value: 'sin_aviso', label: 'Sin aviso', detalle: 'Sin aviso meteorológico emitido', tema: 'neutro' },
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
    guiaVisual: 'precipitacion',
    presets: [
      { valor: 5, label: 'Llovizna o seco (0 - 10 mm)' },
      { valor: 30, label: 'Lluvia moderada (20 - 40 mm)' },
      { valor: 65, label: 'Lluvia torrencial / saturación (≥ 60 mm)' },
    ],
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
      { valor: 50, texto: '≤ 50 m' },
      { valor: 100, texto: '≤ 100 m' },
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
      { 
        value: 'presente', 
        label: 'Presente',
        grafico: '<svg viewBox="0 0 40 40" width="40" height="40" stroke="currentColor" fill="none" stroke-width="2"><path d="M5,35 L35,35 M12,35 L16,15 L28,15 L32,35" fill="currentColor" fill-opacity="0.1" stroke-linejoin="round" /><line x1="14" y1="25" x2="30" y2="25" /><line x1="18" y1="15" x2="18" y2="25" /><line x1="24" y1="25" x2="24" y2="35" /></svg>'
      },
      { 
        value: 'ausente', 
        label: 'Ausente',
        grafico: '<svg viewBox="0 0 40 40" width="40" height="40" stroke="currentColor" fill="none" stroke-width="2"><path d="M5,35 L35,35" stroke-dasharray="4 4" /><path d="M12,12 L28,28 M28,12 L12,28" stroke="#EF4444" stroke-width="3" /></svg>'
      },
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
      { 
        value: 'precaria', 
        label: 'Precaria', 
        detalle: 'Esteras, madera, adobe',
        grafico: '<svg viewBox="0 0 40 40" width="40" height="40" stroke="currentColor" fill="none" stroke-width="2"><path d="M5,25 L20,10 L35,25 M10,25 L10,35 L30,35 L30,25 M10,15 L30,15 M10,20 L30,20" stroke-linejoin="round" fill="currentColor" fill-opacity="0.05" /></svg>'
      },
      { 
        value: 'noble', 
        label: 'Noble', 
        detalle: 'Ladrillo y concreto',
        grafico: '<svg viewBox="0 0 40 40" width="40" height="40" stroke="currentColor" fill="none" stroke-width="2"><rect x="8" y="15" width="24" height="20" fill="currentColor" fill-opacity="0.1" /><path d="M4,15 L36,15 M8,22 L32,22 M8,29 L32,29 M16,15 L16,22 M24,22 L24,29 M16,29 L16,35 M24,15 L24,22" stroke-linejoin="round" /></svg>'
      },
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
  for (const clave of Object.keys(CAMPOS)) {
    v[clave] = null
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
