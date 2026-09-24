import codecs

# 1. Update valoresIniciales in fields.js to start ALL fields as null
fields_path = 'src/fields.js'
with codecs.open(fields_path, 'r', 'utf-8') as f:
    fields = f.read()

old_valores_iniciales = """export function valoresIniciales() {
  const v = {}
  for (const [clave, campo] of Object.entries(CAMPOS)) {
    v[clave] = campo.tipo === 'numero' ? campo.defecto : null
  }
  return v
}"""

new_valores_iniciales = """export function valoresIniciales() {
  const v = {}
  for (const clave of Object.keys(CAMPOS)) {
    v[clave] = null
  }
  return v
}"""

fields = fields.replace(old_valores_iniciales, new_valores_iniciales)

with codecs.open(fields_path, 'w', 'utf-8') as f:
    f.write(fields)

print('Updated fields.js so initial values start as null (0 de 13 datos)')


# 2. Update index.css to center WebKit slider thumb with margin-top: -12px !important
css_path = 'src/index.css'
with codecs.open(css_path, 'r', 'utf-8') as f:
    css = f.read()

old_thumb_css = """.range input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #fff;
  border: 6px solid var(--primary-soft);
  box-shadow: 0 0 0 2px var(--primary), 0 4px 12px rgba(67, 83, 255, 0.35);
  cursor: grab;
}"""

new_thumb_css = """.range input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 30px;
  height: 30px;
  margin-top: -12px !important;
  border-radius: 50%;
  background: #fff;
  border: 6px solid var(--primary-soft);
  box-shadow: 0 0 0 2px var(--primary), 0 4px 12px rgba(67, 83, 255, 0.35);
  cursor: grab;
}"""

css = css.replace(old_thumb_css, new_thumb_css)

with codecs.open(css_path, 'w', 'utf-8') as f:
    f.write(css)

print('Updated index.css with margin-top: -12px !important for webkit slider thumb')


# 3. Update NumberField in components.jsx to handle null initial values gracefully
comp_path = 'src/components.jsx'
with codecs.open(comp_path, 'r', 'utf-8') as f:
    comp = f.read()

old_number_field = """export function NumberField({ clave, valores, onChange, onOpenGuide }) {
  const campo = CAMPOS[clave]
  const valor = valores[clave]
  const fijar = (v) => {
    const n = Number.isFinite(v) ? Math.max(campo.min, v) : campo.min
    onChange(clave, Math.round(n * 10) / 10)
  }
  const pct = Math.min(100, (valor / campo.max) * 100)

  // Precipitación acumulada
  const esCritico = valor >= 60
  const esModerado = valor >= 16
  const numGotas = esCritico ? 14 : esModerado ? 9 : 4
  const estadoTexto = esCritico ? 'Umbral Crítico SENAMHI (≥ 60 mm)' : esModerado ? 'Lluvia Moderada (16 - 59 mm)' : 'Nivel Leve / Seco (0 - 15 mm)'

  // Distancia a la quebrada (Corte transversal reactivo)
  const distCritica = valor <= 50
  const distAlta = valor > 50 && valor <= 100
  const distColor = distCritica ? '#dc2626' : distAlta ? '#d97706' : '#16a34a'
  const distClase = distCritica ? 'is-critica' : distAlta ? 'is-alta' : 'is-segura'
  const distTexto = distCritica 
    ? 'Zona crítica de impacto directo (≤ 50 m)' 
    : distAlta 
      ? 'Franja de exposición alta (51 - 100 m)' 
      : 'Margen de amortiguamiento (> 100 m)'

  const pctPos = Math.min(1, Math.max(0, valor / 300))
  const casaX = 48 + pctPos * (285 - 48)
  const casaY = 85 - pctPos * (85 - 20)"""

new_number_field = """export function NumberField({ clave, valores, onChange, onOpenGuide }) {
  const campo = CAMPOS[clave]
  const valor = valores[clave]
  const fijar = (v) => {
    const n = Number.isFinite(v) ? Math.max(campo.min, v) : campo.min
    onChange(clave, Math.round(n * 10) / 10)
  }

  const valorEstablecido = valor !== null && valor !== undefined
  const valVisual = valorEstablecido ? valor : campo.defecto
  const pct = Math.min(100, (valVisual / campo.max) * 100)

  // Precipitación acumulada
  const esCritico = valVisual >= 60
  const esModerado = valVisual >= 16
  const numGotas = esCritico ? 14 : esModerado ? 9 : 4
  const estadoTexto = esCritico ? 'Umbral Crítico SENAMHI (≥ 60 mm)' : esModerado ? 'Lluvia Moderada (16 - 59 mm)' : 'Nivel Leve / Seco (0 - 15 mm)'

  // Distancia a la quebrada (Corte transversal reactivo)
  const distCritica = valVisual <= 50
  const distAlta = valVisual > 50 && valVisual <= 100
  const distColor = distCritica ? '#dc2626' : distAlta ? '#d97706' : '#16a34a'
  const distClase = distCritica ? 'is-critica' : distAlta ? 'is-alta' : 'is-segura'
  const distTexto = distCritica 
    ? 'Zona crítica de impacto directo (≤ 50 m)' 
    : distAlta 
      ? 'Franja de exposición alta (51 - 100 m)' 
      : 'Margen de amortiguamiento (> 100 m)'

  const pctPos = Math.min(1, Math.max(0, valVisual / 300))
  const casaX = 48 + pctPos * (285 - 48)
  const casaY = 85 - pctPos * (85 - 20)"""

comp = comp.replace(old_number_field, new_number_field)

# Replace number stepper input value
old_stepper_input = '<input id={clave} type="number" min={campo.min} step={campo.paso} value={valor} onChange={(e) => fijar(parseFloat(e.target.value))} />'
new_stepper_input = '<input id={clave} type="number" min={campo.min} step={campo.paso} value={valorEstablecido ? valor : ""} placeholder={`${campo.defecto}`} onChange={(e) => fijar(parseFloat(e.target.value))} />'

comp = comp.replace(old_stepper_input, new_stepper_input)

# Replace stepper minus/plus click to use valVisual
old_stepper_minus = '<button type="button" onClick={() => fijar(valor - campo.paso)} aria-label="Disminuir"><Icon.minus /></button>'
new_stepper_minus = '<button type="button" onClick={() => fijar(valVisual - campo.paso)} aria-label="Disminuir"><Icon.minus /></button>'
comp = comp.replace(old_stepper_minus, new_stepper_minus)

old_stepper_plus = '<button type="button" onClick={() => fijar(valor + campo.paso)} aria-label="Aumentar"><Icon.plus /></button>'
new_stepper_plus = '<button type="button" onClick={() => fijar(valVisual + campo.paso)} aria-label="Aumentar"><Icon.plus /></button>'
comp = comp.replace(old_stepper_plus, new_stepper_plus)

# Replace range slider value
old_range_input_val = 'value={Math.min(valor, campo.max)}'
new_range_input_val = 'value={Math.min(valVisual, campo.max)}'
comp = comp.replace(old_range_input_val, new_range_input_val)

# Replace range mark hit check
old_range_hit = '(campo.alertaSiMayor ? valor >= u.valor : valor <= u.valor)'
new_range_hit = 'valorEstablecido && (campo.alertaSiMayor ? valor >= u.valor : valor <= u.valor)'
comp = comp.replace(old_range_hit, new_range_hit)

with codecs.open(comp_path, 'w', 'utf-8') as f:
    f.write(comp)

print('Updated components.jsx for null initial number values')
