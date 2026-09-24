import codecs

# 1. Update fields.js to remove emojis from presets
fields_path = 'src/fields.js'
with codecs.open(fields_path, 'r', 'utf-8') as f:
    fields = f.read()

fields = fields.replace("💧 Llovizna o seco (0 - 10 mm)", "Llovizna o seco (0 - 10 mm)")
fields = fields.replace("🌧️ Lluvia moderada (20 - 40 mm)", "Lluvia moderada (20 - 40 mm)")
fields = fields.replace("⛈️ Lluvia torrencial / saturación (≥ 60 mm)", "Lluvia torrencial / saturación (≥ 60 mm)")

with codecs.open(fields_path, 'w', 'utf-8') as f:
    f.write(fields)

print('Stripped emojis from fields.js')


# 2. Update index.css with Pluviometric Monitor CSS
css_path = 'src/index.css'
with codecs.open(css_path, 'r', 'utf-8') as f:
    css = f.read()

# Replace previous rain box CSS with clean pluvio-monitor CSS
css = css.replace("""
/* ---------- Lluvia interactiva para el slider de Precipitación ---------- */
.rain-box {
  position: absolute;
  top: -42px;
  left: 0;
  right: 0;
  height: 48px;
  overflow: hidden;
  pointer-events: none;
  z-index: 20;
  border-radius: 8px;
}

.rain-drop {
  position: absolute;
  top: -10px;
  width: 2px;
  height: 14px;
  background: linear-gradient(to bottom, rgba(67, 83, 255, 0), rgba(67, 83, 255, 0.95));
  border-radius: 999px;
  animation: caidaGota 0.6s infinite linear;
}

@keyframes caidaGota {
  0% { transform: translateY(0); opacity: 0; }
  25% { opacity: 1; }
  100% { transform: translateY(55px); opacity: 0; }
}
""", "")

pluvio_css = """
/* ---------- Recuadro de Monitoreo Pluviométrico Reactivo (SIN EMOJIS) ---------- */
.pluvio-monitor {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 8px 14px;
  margin: 12px 0 6px 0;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.pluvio-monitor.is-light {
  border-color: #cbd5e1;
  background: #f8fafc;
}

.pluvio-monitor.is-moderate {
  border-color: #93c5fd;
  background: #eff6ff;
}

.pluvio-monitor.is-critical {
  border-color: #fca5a5;
  background: #fff1f2;
  box-shadow: 0 0 12px rgba(225, 29, 72, 0.15);
  animation: pulsoCritico 1.8s infinite ease-in-out;
}

@keyframes pulsoCritico {
  0%, 100% { border-color: #fca5a5; box-shadow: 0 0 8px rgba(225, 29, 72, 0.15); }
  50% { border-color: #f87171; box-shadow: 0 0 16px rgba(225, 29, 72, 0.3); }
}

.pluvio-monitor__rain {
  position: relative;
  width: 48px;
  height: 28px;
  background: rgba(15, 23, 42, 0.05);
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
}

.pluvio-monitor.is-critical .pluvio-monitor__rain {
  background: rgba(225, 29, 72, 0.08);
}

.pluvio-drop {
  position: absolute;
  top: -8px;
  width: 1.8px;
  height: 10px;
  background: #3b82f6;
  border-radius: 999px;
  animation: caidaGotaPluvio 0.8s infinite linear;
}

.pluvio-monitor.is-light .pluvio-drop {
  background: #94a3b8;
  opacity: 0.6;
}

.pluvio-monitor.is-moderate .pluvio-drop {
  background: #2563eb;
  opacity: 0.85;
}

.pluvio-monitor.is-critical .pluvio-drop {
  background: #e11d48;
  opacity: 1;
  transform: rotate(-12deg);
}

@keyframes caidaGotaPluvio {
  0% { transform: translateY(0); opacity: 0; }
  30% { opacity: 1; }
  100% { transform: translateY(34px); opacity: 0; }
}

.pluvio-monitor__status {
  font-size: 0.78rem;
  font-weight: 700;
  color: #334155;
}

.pluvio-monitor.is-moderate .pluvio-monitor__status {
  color: #1d4ed8;
}

.pluvio-monitor.is-critical .pluvio-monitor__status {
  color: #be123c;
}
"""

if '.pluvio-monitor' not in css:
    css += pluvio_css

with codecs.open(css_path, 'w', 'utf-8') as f:
    f.write(css)

print('Updated index.css with pluvio-monitor CSS')


# 3. Update components.jsx to use Pluviometric Monitor Box without emojis
comp_path = 'src/components.jsx'
with codecs.open(comp_path, 'r', 'utf-8') as f:
    comp = f.read()

# Remove measuring emoji from button
comp = comp.replace('¿Cómo medir esto? <span style={{ fontSize: \'14px\' }}>📐</span>', '¿Cómo medir esto?')

number_field_clean = """export function NumberField({ clave, valores, onChange, onOpenGuide }) {
  const campo = CAMPOS[clave]
  const valor = valores[clave]
  const fijar = (v) => {
    const n = Number.isFinite(v) ? Math.max(campo.min, v) : campo.min
    onChange(clave, Math.round(n * 10) / 10)
  }
  const pct = Math.min(100, (valor / campo.max) * 100)

  const esCritico = valor >= 60
  const esModerado = valor >= 16
  const numGotas = esCritico ? 14 : esModerado ? 9 : 4
  const estadoTexto = esCritico ? 'Umbral Crítico SENAMHI (≥ 60 mm)' : esModerado ? 'Lluvia Moderada (16 - 59 mm)' : 'Nivel Leve / Seco (0 - 15 mm)'

  return (
    <div className="field">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <label className="field__label" htmlFor={clave} style={{ marginBottom: 0 }}>{campo.label}</label>
        {campo.guiaVisual && (
          <button type="button" onClick={() => onOpenGuide(campo.guiaVisual)} style={{
            fontSize: '0.75rem', fontWeight: '600', color: '#4F46E5', backgroundColor: '#EEF2FF',
            padding: '4px 10px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '6px',
            border: '1px solid #C7D2FE', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0
          }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#E0E7FF' }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#EEF2FF' }}>
            ¿Cómo medir esto?
          </button>
        )}
      </div>
      <div className="number">
        <div className="number__stepper">
          <button type="button" onClick={() => fijar(valor - campo.paso)} aria-label="Disminuir"><Icon.minus /></button>
          <input id={clave} type="number" min={campo.min} step={campo.paso} value={valor} onChange={(e) => fijar(parseFloat(e.target.value))} />
          <span className="number__unit">{campo.unidad}</span>
          <button type="button" onClick={() => fijar(valor + campo.paso)} aria-label="Aumentar"><Icon.plus /></button>
        </div>

        {clave === 'precipitacion_72h' && (
          <div className={`pluvio-monitor ${esCritico ? 'is-critical' : esModerado ? 'is-moderate' : 'is-light'}`}>
            <div className="pluvio-monitor__rain">
              {Array.from({ length: numGotas }).map((_, i) => (
                <span
                  key={i}
                  className="pluvio-drop"
                  style={{
                    left: `${(i * 19 + 5) % 84 + 8}%`,
                    animationDuration: `${esCritico ? 0.35 : esModerado ? 0.7 : 1.4}s`,
                    animationDelay: `${(i * 0.1) % 0.6}s`
                  }}
                />
              ))}
            </div>
            <span className="pluvio-monitor__status">{estadoTexto}</span>
          </div>
        )}

        <div className="range">
          <input 
            type="range" 
            min={campo.min} 
            max={campo.max} 
            step={campo.paso} 
            value={Math.min(valor, campo.max)} 
            onChange={(e) => fijar(parseFloat(e.target.value))} 
            style={{ '--pct': `${pct}%` }} 
            aria-label={campo.label} 
          />
          <div className="range__marks">
            {campo.umbrales.map((u) => (
              <span key={u.valor} className={`range__mark ${(campo.alertaSiMayor ? valor >= u.valor : valor <= u.valor) ? 'is-hit' : ''}`} style={{ left: `${(u.valor / campo.max) * 100}%` }}>
                <i />
                <em>{u.texto}</em>
              </span>
            ))}
          </div>
          <div className="range__ends"><span>{campo.min} {campo.unidad}</span><span>{campo.max}+ {campo.unidad}</span></div>
        </div>

        {campo.presets && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
            {campo.presets.map((preset) => (
              <button
                key={preset.valor}
                type="button"
                onClick={() => fijar(preset.valor)}
                className={`preset-btn ${valor === preset.valor ? 'is-active' : ''}`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}"""

import re
comp = re.sub(r'export function NumberField\(\{ clave, valores, onChange, onOpenGuide \}\) \{[\s\S]*?\n\}', number_field_clean, comp)

with codecs.open(comp_path, 'w', 'utf-8') as f:
    f.write(comp)

print('Updated components.jsx with clean Pluviometric Monitor without emojis')
