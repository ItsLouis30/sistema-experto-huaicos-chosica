import codecs

# 1. Update fields.js
fields_path = 'src/fields.js'
with codecs.open(fields_path, 'r', 'utf-8') as f:
    fields = f.read()

old_pendiente_block = """  pendiente_terreno: {
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
  },"""

new_pendiente_block = """  pendiente_terreno: {
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
  },"""

fields = fields.replace(old_pendiente_block, new_pendiente_block)

with codecs.open(fields_path, 'w', 'utf-8') as f:
    f.write(fields)

print('Updated fields.js with enhanced topographic SVGs')


# 2. Update index.css
css_path = 'src/index.css'
with codecs.open(css_path, 'r', 'utf-8') as f:
    css = f.read()

css_animations = """
/* ---------- Micro-animaciones para diagramas topográficos ---------- */
@keyframes desprendimientoGravedad {
  0% { transform: translate(0, 0); opacity: 0; }
  25% { opacity: 1; }
  100% { transform: translate(12px, 12px); opacity: 0; }
}

@keyframes escorrentiaAgua {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -28; }
}

@keyframes pulsoEstabilidad {
  0%, 100% { stroke-opacity: 0.6; stroke-width: 3px; }
  50% { stroke-opacity: 1; stroke-width: 4px; }
}

.chip:hover .anim-gravedad,
.chip.is-selected .anim-gravedad {
  animation: desprendimientoGravedad 1.2s infinite ease-in;
}

.chip:hover .anim-gravedad.anim-delay,
.chip.is-selected .anim-gravedad.anim-delay {
  animation-delay: 0.4s;
}

.chip:hover .anim-escorrentia,
.chip.is-selected .anim-escorrentia {
  animation: escorrentiaAgua 1.2s infinite linear;
}

.chip:hover .anim-estabilidad,
.chip.is-selected .anim-estabilidad {
  animation: pulsoEstabilidad 1.5s infinite ease-in-out;
}
"""

if 'desprendimientoGravedad' not in css:
    css += css_animations

with codecs.open(css_path, 'w', 'utf-8') as f:
    f.write(css)

print('Updated index.css with topographic micro-animations')
