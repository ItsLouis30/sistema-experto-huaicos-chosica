import codecs

# 1. Update index.css for 100px height container, clean header, and slim slider track
css_path = 'src/index.css'
with codecs.open(css_path, 'r', 'utf-8') as f:
    css = f.read()

dist_css_new = """
/* ---------- Microdiagrama de Corte Transversal Reactivo (Distancia Quebrada) ---------- */
.dist-monitor {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 14px;
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

.dist-monitor__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.dist-monitor__title {
  font-size: 0.8rem;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.dist-svg-container {
  width: 100%;
  height: 100px;
  position: relative;
  background: rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 10px;
  overflow: hidden;
}

.dist-badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 999px;
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

/* Color dinámico y grosor fino de precisión para el track del slider */
.range.is-critica input[type="range"]::-webkit-slider-runnable-track {
  height: 6px !important;
  border-radius: 999px !important;
  background: linear-gradient(to right, #dc2626 var(--pct), #cbd5e1 var(--pct)) !important;
}
.range.is-alta input[type="range"]::-webkit-slider-runnable-track {
  height: 6px !important;
  border-radius: 999px !important;
  background: linear-gradient(to right, #d97706 var(--pct), #cbd5e1 var(--pct)) !important;
}
.range.is-segura input[type="range"]::-webkit-slider-runnable-track {
  height: 6px !important;
  border-radius: 999px !important;
  background: linear-gradient(to right, #16a34a var(--pct), #cbd5e1 var(--pct)) !important;
}
"""

import re
css = re.sub(r'/\* ---------- Microdiagrama de Corte Transversal Reactivo \(Distancia Quebrada\) ---------- \*/[\s\S]*', dist_css_new, css)

with codecs.open(css_path, 'w', 'utf-8') as f:
    f.write(css)

print('Updated index.css with refined dist-monitor CSS')


# 2. Update components.jsx with 100px SVG, header badge, and proportioned house icon
comp_path = 'src/components.jsx'
with codecs.open(comp_path, 'r', 'utf-8') as f:
    comp = f.read()

old_number_calc = """  const pctPos = Math.min(1, Math.max(0, valor / 300))
  const casaX = 35 + pctPos * (270 - 35)
  const casaY = 52 - pctPos * (52 - 14)"""

new_number_calc = """  const pctPos = Math.min(1, Math.max(0, valor / 300))
  const casaX = 48 + pctPos * (285 - 48)
  const casaY = 85 - pctPos * (85 - 20)"""

comp = comp.replace(old_number_calc, new_number_calc)

old_dist_jsx = """        {clave === 'dist_quebrada' && (
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
        )}"""

new_dist_jsx = """        {clave === 'dist_quebrada' && (
          <div className={`dist-monitor ${distClase}`}>
            <div className="dist-monitor__header">
              <span className="dist-monitor__title">Perfil de Ladera & Distancia al Cauce</span>
              <span className="dist-badge">{distTexto}</span>
            </div>

            <div className="dist-svg-container">
              <svg viewBox="0 0 320 100" width="100%" height="100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                {/* Cauce torrentoso en V (0m - 35m) */}
                <path d="M0,30 L22,82 L48,86 L62,65" stroke="#3b82f6" strokeWidth="3" fill="none" />
                <path d="M0,50 L22,82 L48,86 L56,72 L0,50 Z" fill="#3b82f6" fillOpacity="0.25" stroke="none" />
                <path d="M6,62 Q22,78 38,78" stroke="#60a5fa" strokeWidth="1.6" strokeDasharray="4 3" className="anim-escorrentia" />

                {/* Talud de ladera ascendente (35m - 300m) */}
                <path d="M48,86 L300,20" stroke="#64748b" strokeWidth="3" />

                {/* Franjas de zonificación sobre la ladera */}
                <line x1="48" y1="86" x2="90" y2="75" stroke="#dc2626" strokeWidth="5" strokeOpacity="0.75" />
                <line x1="90" y1="75" x2="132" y2="64" stroke="#d97706" strokeWidth="5" strokeOpacity="0.75" />
                <line x1="132" y1="64" x2="300" y2="20" stroke="#16a34a" strokeWidth="4" strokeOpacity="0.6" />

                {/* Silueta vectorial bien proporcionada de la vivienda */}
                <g transform={`translate(${casaX}, ${casaY})`} style={{ transition: 'transform 0.15s ease-out' }}>
                  <ellipse cx="0" cy="1" rx="12" ry="3" fill="rgba(15, 23, 42, 0.2)" />
                  <rect x="-10" y="-13" width="20" height="14" fill={distColor} stroke="#ffffff" strokeWidth="1.8" rx="1" />
                  <path d="M-12,-12 L0,-21 L12,-11 Z" fill={distColor} stroke="#ffffff" strokeWidth="1.8" strokeLinejoin="round" />
                  <rect x="-3" y="-7" width="6" height="8" fill="#ffffff" opacity="0.95" rx="0.5" />
                </g>
              </svg>
            </div>
          </div>
        )}"""

comp = comp.replace(old_dist_jsx, new_dist_jsx)

with codecs.open(comp_path, 'w', 'utf-8') as f:
    f.write(comp)

print('Updated components.jsx with 100px refined dist-monitor diagram')
