import { DEDUCIDAS, MODULOS, RECOMENDACIONES } from './fields.js'
import { Icon } from './components.jsx'

// Normaliza "alta"/"alto" → nivel común para colorear.
function tono(valor, invertido = false) {
  const v = String(valor ?? '').replace(/a$/, 'o')
  const mapa = invertido ? { alto: 'bajo', bajo: 'alto', medio: 'medio' } : null
  const t = mapa ? mapa[v] : v
  return ['alto', 'medio', 'bajo'].includes(t) ? t : 'neutro'
}

function Nivel({ valor, invertido }) {
  return <span className={`nivel nivel--${tono(valor, invertido)}`}>{valor ?? '—'}</span>
}

function Factor({ titulo, valor, detalle, hechos }) {
  return (
    <div className={`factor factor--${tono(valor)}`}>
      <span className="eyebrow">{titulo}</span>
      <strong>{valor ?? 'sin deducir'}</strong>
      <ul>
        {detalle.map(([clave, invertido]) => (
          <li key={clave}>
            <span>{DEDUCIDAS[clave]}</span>
            <Nivel valor={hechos[clave]} invertido={invertido} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function Medidor({ nivel }) {
  const niveles = ['bajo', 'medio', 'alto']
  const idx = niveles.indexOf(nivel)
  return (
    <div className="medidor" aria-hidden="true">
      {niveles.map((n, i) => (
        <span key={n} className={`medidor__seg medidor__seg--${n} ${i <= idx ? 'is-on' : ''}`} />
      ))}
    </div>
  )
}

export default function Resultado({ resultado, onEditar, onReiniciar }) {
  const { nivel_riesgo, nivel_alerta, hechos_finales: h, justificacion } = resultado
  const riesgo = tono(nivel_riesgo)

  const grupos = MODULOS.map((m) => ({
    ...m,
    pasos: justificacion.filter((p) => p.modulo.toUpperCase().startsWith(m.clave)),
  })).filter((g) => g.pasos.length)

  return (
    <div className="resultado">
      <section className={`hero hero--${riesgo}`}>
        <div className="hero__main">
          <span className="eyebrow">Conclusión del motor de inferencia</span>
          <h2>
            Riesgo <em>{nivel_riesgo ?? 'no determinado'}</em>
          </h2>
          <p>
            {nivel_riesgo
              ? 'Resultado de cruzar el nivel de peligro con la vulnerabilidad de la vivienda según la matriz de CENEPRED.'
              : 'Con los datos ingresados ninguna regla de clasificación llegó a dispararse. Revisa tus respuestas.'}
          </p>
          <Medidor nivel={riesgo} />
        </div>
        <div className="hero__stats">
          <div><strong>{justificacion.length}</strong><span>reglas disparadas</span></div>
          <div><strong>{Object.keys(DEDUCIDAS).filter((k) => h[k] !== undefined).length}</strong><span>hechos deducidos</span></div>
        </div>
      </section>

      {nivel_alerta && (
        <section className="alerta" role="alert">
          <Icon.alert width={26} height={26} />
          <div>
            <strong>Recomendación de evacuación preventiva</strong>
            <p>Aviso rojo de SENAMHI, vivienda a 50 m o menos del cauce y sobre el cono de deyección. Sigue las indicaciones de INDECI y dirígete a una zona segura.</p>
          </div>
        </section>
      )}

      <section className="card">
        <header className="card__head">
          <h3>Riesgo = Peligro × Vulnerabilidad</h3>
          <p>Hechos intermedios deducidos a partir de tus respuestas.</p>
        </header>
        <div className="ecuacion">
          <Factor
            titulo="Peligro"
            valor={h.nivel_peligro}
            hechos={h}
            detalle={[['susceptibilidad_base'], ['recurrencia'], ['susceptibilidad_terreno'], ['detonante_meteorologico']]}
          />
          <span className="ecuacion__op">×</span>
          <Factor
            titulo="Vulnerabilidad"
            valor={h.nivel_vulnerabilidad}
            hechos={h}
            detalle={[['exposicion_bruta'], ['exposicion_ajustada'], ['fragilidad_fisica'], ['capacidad_respuesta', true]]}
          />
          <span className="ecuacion__op">=</span>
          <div className={`factor factor--total factor--${riesgo}`}>
            <span className="eyebrow">Riesgo</span>
            <strong>{nivel_riesgo ?? '—'}</strong>
          </div>
        </div>
      </section>

      <div className="resultado__grid">
        <section className="card">
          <header className="card__head">
            <h3>Módulo de explicación</h3>
            <p>¿Cómo llegó el sistema a esta conclusión? Reglas disparadas por el motor CLIPS, agrupadas por módulo.</p>
          </header>
          <div className="traza">
            {grupos.map((g) => (
              <div key={g.clave} className="traza__grupo">
                <div className="traza__modulo">
                  <span>{g.titulo}</span>
                  <small>{g.fuente}</small>
                </div>
                <ol>
                  {g.pasos.map((p) => (
                    <li key={p.regla_id} className="traza__paso">
                      <span className="traza__id">{p.regla_id}</span>
                      <div>
                        <strong>{p.descripcion}</strong>
                        <code>{p.por_que.replace('Porque se cumplió: ', '')}</code>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        <aside className="card card--dark">
          <span className="eyebrow">Qué hacer ahora</span>
          <h3>Recomendaciones preventivas</h3>
          <ul className="recomendaciones">
            {(RECOMENDACIONES[riesgo] ?? RECOMENDACIONES.medio).map((r) => (
              <li key={r}><Icon.check width={14} height={14} />{r}</li>
            ))}
          </ul>
          <div className="acciones">
            <button className="btn btn--ghost-dark" onClick={onEditar}><Icon.back width={16} height={16} />Editar respuestas</button>
            <button className="btn btn--light" onClick={onReiniciar}><Icon.refresh width={16} height={16} />Nueva evaluación</button>
          </div>
        </aside>
      </div>
    </div>
  )
}
