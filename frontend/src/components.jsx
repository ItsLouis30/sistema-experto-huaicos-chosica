import { CAMPOS, PASOS, etiquetaValor, opcionesVisibles } from './fields.js'

// ---------- Iconos (trazos simples, heredan currentColor) ----------
const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
export const Icon = {
  logo: (p) => (
    <svg {...base} {...p} viewBox="0 0 32 32" strokeWidth="0">
      <path d="M4 24 L13 8 L18 16 L21 12 L28 24 Z" fill="currentColor" />
      <path d="M4 27 Q10 23 16 27 T28 27" stroke="#4ade80" strokeWidth="2.2" fill="none" />
    </svg>
  ),
  grid: (p) => (<svg {...base} {...p}><rect x="4" y="4" width="6" height="7" rx="1.5" /><rect x="14" y="4" width="6" height="4" rx="1.5" /><rect x="14" y="12" width="6" height="8" rx="1.5" /><rect x="4" y="15" width="6" height="5" rx="1.5" /></svg>),
  form: (p) => (<svg {...base} {...p}><path d="M4 6h10M4 11h7M4 16h5" /><circle cx="17" cy="13" r="3" /><path d="M13 20c.6-2 2.1-3 4-3s3.4 1 4 3" /></svg>),
  book: (p) => (<svg {...base} {...p}><path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4z" /><path d="M5 16a4 4 0 0 1 4-4h10" /></svg>),
  info: (p) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>),
  back: (p) => (<svg {...base} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>),
  next: (p) => (<svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>),
  check: (p) => (<svg {...base} {...p} strokeWidth="2.6"><path d="M5 12.5l4.2 4.2L19 7" /></svg>),
  minus: (p) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M8 12h8" /></svg>),
  plus: (p) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M8 12h8M12 8v8" /></svg>),
  alert: (p) => (<svg {...base} {...p}><path d="M12 4 2.5 20h19z" /><path d="M12 10v4M12 17h.01" /></svg>),
  refresh: (p) => (<svg {...base} {...p}><path d="M20 11a8 8 0 0 0-14.6-4.5M4 4v4h4" /><path d="M4 13a8 8 0 0 0 14.6 4.5M20 20v-4h-4" /></svg>),
  cpu: (p) => (<svg {...base} {...p}><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></svg>),
  map: (p) => (<svg {...base} {...p}><path d="M12 21s-6-5.3-6-11a6 6 0 1 1 12 0c0 5.7-6 11-6 11z" /><circle cx="12" cy="10" r="2.2" /></svg>),
}

// ---------- Barra lateral ----------
export function Sidebar({ vista, onVista }) {
  const items = [
    { id: 'evaluacion', icon: Icon.form, label: 'Evaluación' },
    { id: 'metodologia', icon: Icon.book, label: 'Metodología' },
  ]
  return (
    <aside className="sidebar">
      <div className="sidebar__logo" title="SBC Huaicos Chosica"><Icon.logo width={30} height={30} /></div>
      <nav className="sidebar__nav">
        {items.map(({ id, icon: I, label }) => (
          <button key={id} className={`sidebar__item ${vista === id ? 'is-active' : ''}`} onClick={() => onVista(id)} title={label} aria-label={label}>
            <I />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

// ---------- Stepper horizontal ----------
export function Stepper({ actual, completos, onIr }) {
  const pasos = [...PASOS.map((p) => p.titulo), 'Resultado']
  return (
    <ol className="stepper">
      {pasos.map((titulo, i) => {
        const estado = i < actual ? 'hecho' : i === actual ? 'actual' : 'pendiente'
        const puedeIr = i <= actual || completos.slice(0, i).every(Boolean)
        return (
          <li key={titulo} className={`stepper__item is-${estado}`}>
            <button className="stepper__dot" onClick={() => puedeIr && onIr(i)} disabled={!puedeIr} aria-current={i === actual ? 'step' : undefined}>
              {estado === 'hecho' ? <Icon.check width={16} height={16} /> : i + 1}
            </button>
            <span className="stepper__label">{titulo}</span>
            {i < pasos.length - 1 && <span className="stepper__line" />}
          </li>
        )
      })}
    </ol>
  )
}

// ---------- Grupo de chips (selección única) ----------
export function ChipGroup({ clave, valores, onChange, onOpenGuide }) {
  const campo = CAMPOS[clave]
  const opciones = opcionesVisibles(clave, valores)
  const valor = valores[clave]
  const bloqueado = clave === 'estado_obra_mitigacion' && !valores.obra_mitigacion_cercana
  return (
    <div className="field">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div className="field__label" id={`${clave}-label`} style={{ marginBottom: 0 }}>
          {campo.label}
          {campo.ayuda && <span className="field__help">{campo.ayuda}</span>}
        </div>
        {campo.guiaVisual && (
          <button type="button" onClick={() => onOpenGuide(campo.guiaVisual)} style={{
            fontSize: '0.75rem', fontWeight: '600', color: '#4F46E5', backgroundColor: '#EEF2FF',
            padding: '4px 10px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '6px',
            border: '1px solid #C7D2FE', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0
          }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#E0E7FF' }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#EEF2FF' }}>
            ¿Cómo medir esto? <span style={{ fontSize: '14px' }}>📐</span>
          </button>
        )}
      </div>
      {bloqueado ? (
        <p className="field__hint">Primero indica si existe una obra de mitigación.</p>
      ) : (
        <div className="chips" role="radiogroup" aria-labelledby={`${clave}-label`}>
          {opciones.map((o) => {
            const activo = valor === o.value
            return (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={activo}
                className={`chip ${activo ? 'is-selected' : ''} ${o.detalle ? 'chip--rich' : ''} ${o.tema ? `chip--tema-${o.tema}` : ''}`}
                onClick={() => onChange(clave, o.value)}
              >
                {activo && <span className="chip__check"><Icon.check width={12} height={12} /></span>}
                <span className="chip__text">
                  {o.grafico && <span className="chip__icon" style={{ display: 'block', marginBottom: '0.5rem', color: activo ? '#4F46E5' : '#94A3B8', transition: 'color 0.2s' }} dangerouslySetInnerHTML={{ __html: o.grafico }} />}
                  <strong>{o.label}</strong>
                  {o.detalle && <small>{o.detalle}</small>}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ---------- Campo numérico con +/- y slider ----------
export function NumberField({ clave, valores, onChange, onOpenGuide }) {
  const campo = CAMPOS[clave]
  const valor = valores[clave]
  const fijar = (v) => {
    const n = Number.isFinite(v) ? Math.max(campo.min, v) : campo.min
    onChange(clave, Math.round(n * 10) / 10)
  }
  const pct = Math.min(100, (valor / campo.max) * 100)
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
            ¿Cómo medir esto? <span style={{ fontSize: '14px' }}>📐</span>
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
        <div className="range">
          <input type="range" min={campo.min} max={campo.max} step={campo.paso} value={Math.min(valor, campo.max)} onChange={(e) => fijar(parseFloat(e.target.value))} style={{ '--pct': `${pct}%` }} aria-label={campo.label} />
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
                style={{
                  textAlign: 'left', padding: '10px 16px', borderRadius: '8px', border: '1px solid',
                  backgroundColor: valor === preset.valor ? '#EEF2FF' : '#F8FAFC',
                  borderColor: valor === preset.valor ? '#818CF8' : '#E2E8F0',
                  color: valor === preset.valor ? '#3730A3' : '#475569',
                  fontSize: '0.85rem', fontWeight: valor === preset.valor ? '600' : '400',
                  cursor: 'pointer', transition: 'all 0.2s', width: '100%'
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ---------- Panel de resumen (Base de Hechos inicial) ----------
export function Resumen({ valores, pasoActual, onIr }) {
  const total = Object.keys(CAMPOS).length
  const llenos = Object.values(valores).filter((v) => v !== null && v !== undefined).length
  return (
    <aside className="resumen">
      <div className="resumen__head">
        <span className="eyebrow">Base de hechos</span>
        <h3>Tus respuestas</h3>
        <div className="progress"><span style={{ width: `${(llenos / total) * 100}%` }} /></div>
        <small>{llenos} de {total} datos registrados</small>
      </div>
      <ol className="timeline">
        {PASOS.map((p, i) => {
          const hechos = p.campos.filter((c) => valores[c] !== null).length
          const completo = hechos === p.campos.length
          const estado = completo ? 'hecho' : i === pasoActual ? 'actual' : 'pendiente'
          return (
            <li key={p.id} className={`timeline__item is-${estado}`}>
              <span className="timeline__dot">{completo ? <Icon.check width={12} height={12} /> : i + 1}</span>
              <div className="timeline__body">
                <button className="timeline__title" onClick={() => onIr(i)}>
                  {p.titulo}
                  <span className={`badge badge--${estado}`}>{completo ? 'Completo' : i === pasoActual ? 'En curso' : 'Pendiente'}</span>
                </button>
                {hechos > 0 && (
                  <dl className="timeline__facts">
                    {p.campos.filter((c) => valores[c] !== null).map((c) => (
                      <div key={c}><dt>{CAMPOS[c].label}</dt><dd>{etiquetaValor(c, valores[c])}</dd></div>
                    ))}
                  </dl>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </aside>
  )
}
