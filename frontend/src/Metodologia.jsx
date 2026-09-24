import { MODULOS } from './fields.js'

const REGLAS_POR_MODULO = ['R1–R11', 'R12–R17', 'R18–R24', 'R25–R34', 'R35–R44', 'R45–R56', 'R57–R65', 'R66']

const COMPONENTES = [
  { titulo: 'Base de conocimiento', texto: '66 reglas SI–ENTONCES en sintaxis nativa CLIPS (rules.clp), derivadas de las matrices de CENEPRED, INGEMMET, SENAMHI e INDECI.' },
  { titulo: 'Base de hechos', texto: 'Memoria de trabajo de CLIPS: recibe tus 13 respuestas como hechos iniciales y acumula cada conclusión intermedia.' },
  { titulo: 'Motor de inferencia', texto: 'CLIPS (vía clipspy) aplica encadenamiento hacia adelante hasta que ninguna regla nueva pueda dispararse.' },
  { titulo: 'Módulo de explicación', texto: 'Registra qué reglas se dispararon y por qué, para que puedas auditar el razonamiento.' },
]

export default function Metodologia() {
  return (
    <main className="content">
      <section className="card">
        <header className="card__head">
          <h3>Arquitectura del sistema experto</h3>
          <p>Herramienta de gestión prospectiva y correctiva del riesgo. No reemplaza las alertas oficiales.</p>
        </header>
        <div className="componentes">
          {COMPONENTES.map((c, i) => (
            <div key={c.titulo} className="componente">
              <span className="step-icon">{i + 1}</span>
              <strong>{c.titulo}</strong>
              <p>{c.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <header className="card__head">
          <h3>Flujo de razonamiento</h3>
          <p>Cada módulo produce hechos que alimentan al siguiente, hasta clasificar el riesgo.</p>
        </header>
        <ol className="flujo">
          {MODULOS.map((m, i) => (
            <li key={m.clave}>
              <span className="flujo__n">{i + 1}</span>
              <div>
                <strong>{m.titulo}</strong>
                <small>{m.fuente} · {REGLAS_POR_MODULO[i]}</small>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}
