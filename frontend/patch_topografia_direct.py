import codecs

fields_path = 'src/fields.js'
with codecs.open(fields_path, 'r', 'utf-8') as f:
    content = f.read()

# Target replace exact SVG strings in fields.js
old_alta = '<svg viewBox="0 0 40 40" width="40" height="40" stroke="currentColor" fill="none" stroke-width="2"><path d="M5,35 L35,5 L35,35 Z" fill="currentColor" fill-opacity="0.1" stroke-linejoin="round" /></svg>'
new_alta = '<svg viewBox="0 0 48 40" width="48" height="40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4,36 L34,8 L44,8 L44,36 Z" fill="currentColor" fill-opacity="0.1" stroke="currentColor" /><path d="M22,17 L28,11 L34,17 L34,22 L22,22 Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5" /><line x1="22" y1="22" x2="22" y2="26" stroke="currentColor" stroke-dasharray="2 1.5" stroke-width="1.5" /><circle cx="12" cy="24" r="1.8" fill="#e11d48" stroke="none" class="anim-gravedad" /><circle cx="8" cy="28" r="1.4" fill="#e11d48" stroke="none" class="anim-gravedad anim-delay" /></svg>'

old_media = '<svg viewBox="0 0 40 40" width="40" height="40" stroke="currentColor" fill="none" stroke-width="2"><path d="M5,35 L35,20 L35,35 Z" fill="currentColor" fill-opacity="0.1" stroke-linejoin="round" /></svg>'
new_media = '<svg viewBox="0 0 48 40" width="48" height="40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4,36 L44,18 L44,36 Z" fill="currentColor" fill-opacity="0.1" stroke="currentColor" /><path d="M20,23 L26,18 L32,23 L32,28 L20,28 Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5" /><path d="M6,34 L42,19" stroke="#4353ff" stroke-width="2" stroke-dasharray="4 3" class="anim-escorrentia" /></svg>'

old_baja = '<svg viewBox="0 0 40 40" width="40" height="40" stroke="currentColor" fill="none" stroke-width="2"><path d="M5,35 L35,35" stroke-linecap="round" /><path d="M10,35 L10,30 M20,35 L20,30 M30,35 L30,30" /></svg>'
new_baja = '<svg viewBox="0 0 48 40" width="48" height="40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="34" x2="44" y2="34" stroke="currentColor" stroke-width="2" /><line x1="14" y1="34" x2="34" y2="34" stroke="#16a34a" stroke-width="3" class="anim-estabilidad" /><path d="M16,28 L24,20 L32,28 L32,34 L16,34 Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5" /></svg>'

content = content.replace(old_alta, new_alta)
content = content.replace(old_media, new_media)
content = content.replace(old_baja, new_baja)

content = content.replace("label: 'Alta',", "label: 'Alta (>35°)',")
content = content.replace("label: 'Media',", "label: 'Media (15°-20°)',")
content = content.replace("label: 'Baja',", "label: 'Baja (<15°)',")

content = content.replace("detalle: 'Ladera empinada'", "detalle: 'Ladera empinada inestable'")
content = content.replace("detalle: 'Terreno plano'", "detalle: 'Terreno plano / cimentación'")

with codecs.open(fields_path, 'w', 'utf-8') as f:
    f.write(content)

print('Directly replaced SVGs in fields.js')
