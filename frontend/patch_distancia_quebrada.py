import codecs

# 1. Update index.css with dist-monitor CSS & dynamic slider track colors
css_path = 'src/index.css'
with codecs.open(css_path, 'r', 'utf-8') as f:
    css = f.read()

dist_css = """
/* ---------- Microdiagrama de Corte Transversal Reactivo (Distancia Quebrada) ---------- */
.dist-monitor {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 10px 14px;
  margin: 12px 0 6px 0;
  transition: all 0.3s ease;
}

.dist-monitor.is-critica {
  border-color: #fca5a5;
  background: #fff1f2;
}

.dist-monitor.is-alta {
  border-color: #fde68a;
  background: #fffbeb;
}

.dist-monitor.is-segura {
  border-color: #bbf7d0;
  background: #f0fdf4;
}

.dist-svg-container {
  width: 100%;
  height: 48px;
  position: relative;
  background: rgba(15, 23, 42, 0.04);
  border-radius: 8px;
  overflow: hidden;
}

.dist-badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 999px;
  align-self: flex-start;
}

.dist-monitor.is-critica .dist-badge {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #f87171;
}

.dist-monitor.is-alta .dist-badge {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fbbf24;
}

.dist-monitor.is-segura .dist-badge {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #86efac;
}

/* Color dinámico para la barra del slider de Distancia al Cauce */
.range.is-critica input[type="range"]::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #dc2626 var(--pct), #cbd5e1 var(--pct)) !important;
}
.range.is-alta input[type="range"]::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #d97706 var(--pct), #cbd5e1 var(--pct)) !important;
}
.range.is-segura input[type="range"]::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #16a34a var(--pct), #cbd5e1 var(--pct)) !important;
}
"""

if '.dist-monitor' not in css:
    css += dist_css

with codecs.open(css_path, 'w', 'utf-8') as f:
    f.write(css)

print('Updated index.css with dist-monitor CSS')


# 2. Update components.jsx with dist_quebrada cross-section diagram and dynamic range classes
comp_path = 'src/components.jsx'
with codecs.open(comp_path, 'r', 'utf-8') as f:
    comp = f.read()

old_number_field_code = """export function NumberField({ clave, valores, onChange, onOpenGuide }) {
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
  const estadoTexto = esCritico ? 'Umbral Crítico SENAMHI (≥ 60 mm)' : esModerado ? 'Lluvia Moderada (16 - 59 mm)' : 'Nivel Leve / Seco (0 - 15 mm)'"""

new_number_field_code = """export function NumberField({ clave, valores, onChange, onOpenGuide }) {
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
  const casaX = 35 + pctPos * (270 - 35)
  const casaY = 52 - pctPos * (52 - 14)"""

comp = comp.replace(old_number_field_code, new_number_field_code)


old_range_block = """        <div className="range">"""
new_range_block = """        {clave === 'dist_quebrada' && (
          <div className={`dist-monitor ${distClase}`}>
            <div className="dist-svg-container">
              <svg viewBox="0 0 300 60" width="100%" height="48" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                {/* Cauce torrentoso */}
                <path d="M0,20 L15,48 L35,52 L45,40" stroke="#3b82f6" strokeWidth="2.5" fill="none" />
                <path d="M0,32 L20,50 L32,50 L40,36" fill="#3b82f6" fillOpacity="0.3" stroke="none" />
                
                {/* Talud de terreno */}
                <path d="M35,52 L280,14" stroke="#64748b" strokeWidth="2.5" />
                
                {/* Franjas de zonificación */}
                <line x1="35" y1="52" x2="75" y2="46" stroke="#dc2626" strokeWidth="4" strokeOpacity="0.7" />
                <line x1="75" y1="46" x2="116" y2="39" stroke="#d97706" strokeWidth="4" strokeOpacity="0.7" />
                <line x1="116" y1="39" x2="280" y2="14" stroke="#16a34a" strokeWidth="3" strokeOpacity="0.6" />

                {/* Silueta reactiva de la vivienda que se desplaza */}
                <g transform={`translate(${casaX}, ${casaY})`} style={{ transition: 'transform 0.15s ease-out' }}>
                  <path d="M-9,-12 L0,-19 L9,-12 L9,0 L-9,0 Z" fill={distColor} stroke="#ffffff" strokeWidth="1.8" />
                  <rect x="-3" y="-7" width="6" height="7" fill="#ffffff" opacity="0.9" />
                </g>
              </svg>
            </div>
            <span className="dist-badge">{distTexto}</span>
          </div>
        )}

        <div className={`range ${clave === 'dist_quebrada' ? distClase : ''}`}>"""

comp = comp.replace(old_range_block, new_range_block)

with codecs.open(comp_path, 'w', 'utf-8') as f:
    f.write(comp)

print('Updated components.jsx with dist_quebrada diagram')
