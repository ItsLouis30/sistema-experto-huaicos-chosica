import codecs

# 1. Update index.css with rain animation styles
css_path = 'src/index.css'
with codecs.open(css_path, 'r', 'utf-8') as f:
    css = f.read()

rain_css = """
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
"""

if '.rain-box' not in css:
    css += rain_css

with codecs.open(css_path, 'w', 'utf-8') as f:
    f.write(css)

print('Updated index.css with rain animation CSS')


# 2. Update components.jsx with arrastrando state and rain overlay
comp_path = 'src/components.jsx'
with codecs.open(comp_path, 'r', 'utf-8') as f:
    comp = f.read()

# Add useState import check or state inside NumberField
old_number_field = """export function NumberField({ clave, valores, onChange, onOpenGuide }) {
  const campo = CAMPOS[clave]
  const valor = valores[clave]
  const fijar = (v) => {
    const n = Number.isFinite(v) ? Math.max(campo.min, v) : campo.min
    onChange(clave, Math.round(n * 10) / 10)
  }
  const pct = Math.min(100, (valor / campo.max) * 100)"""

new_number_field = """export function NumberField({ clave, valores, onChange, onOpenGuide }) {
  const [arrastrando, setArrastrando] = React.useState(false)
  const campo = CAMPOS[clave]
  const valor = valores[clave]
  const fijar = (v) => {
    const n = Number.isFinite(v) ? Math.max(campo.min, v) : campo.min
    onChange(clave, Math.round(n * 10) / 10)
  }
  const pct = Math.min(100, (valor / campo.max) * 100)
  const numGotas = Math.min(32, Math.max(5, Math.floor(valor / 3.5)))"""

comp = comp.replace(old_number_field, new_number_field)

old_range_input = """        <div className="range">
          <input type="range" min={campo.min} max={campo.max} step={campo.paso} value={Math.min(valor, campo.max)} onChange={(e) => fijar(parseFloat(e.target.value))} style={{ '--pct': `${pct}%` }} aria-label={campo.label} />"""

new_range_input = """        <div className="range" style={{ position: 'relative' }}>
          {clave === 'precipitacion_72h' && arrastrando && (
            <div className="rain-box">
              {Array.from({ length: numGotas }).map((_, i) => (
                <span
                  key={i}
                  className="rain-drop"
                  style={{
                    left: `${(i * 19 + (Math.round(valor) % 9)) % 94 + 3}%`,
                    animationDuration: `${Math.max(0.22, 1.1 - (valor / 150) * 0.8)}s`,
                    animationDelay: `${(i * 0.07) % 0.5}s`,
                    opacity: Math.min(0.95, 0.4 + (valor / 150) * 0.5)
                  }}
                />
              ))}
            </div>
          )}
          <input 
            type="range" 
            min={campo.min} 
            max={campo.max} 
            step={campo.paso} 
            value={Math.min(valor, campo.max)} 
            onChange={(e) => fijar(parseFloat(e.target.value))} 
            onMouseDown={() => setArrastrando(true)}
            onTouchStart={() => setArrastrando(true)}
            onMouseUp={() => setArrastrando(false)}
            onTouchEnd={() => setArrastrando(false)}
            onMouseLeave={() => setArrastrando(false)}
            onFocus={() => setArrastrando(true)}
            onBlur={() => setArrastrando(false)}
            style={{ '--pct': `${pct}%` }} 
            aria-label={campo.label} 
          />"""

comp = comp.replace(old_range_input, new_range_input)

# Also trigger arrastrando when clicking presets
old_preset = """onClick={() => fijar(preset.valor)}"""
new_preset = """onClick={() => { fijar(preset.valor); setArrastrando(true); setTimeout(() => setArrastrando(false), 1200); }}"""
comp = comp.replace(old_preset, new_preset)

with codecs.open(comp_path, 'w', 'utf-8') as f:
    f.write(comp)

print('Updated components.jsx with interactive rain animation')
