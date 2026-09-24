import { MODULOS } from './fields.js'
import { Icon } from './components.jsx'

const REGLAS_POR_MODULO = ['R1–R11', 'R12–R17', 'R18–R24', 'R25–R34', 'R35–R44', 'R45–R56', 'R57–R65', 'R66']

export default function Metodologia() {
  return (
    <main className="content" style={{ paddingBottom: '100px' }}>
      
      {/* HEADER PRINCIPAL */}
      <section className="card" style={{ marginBottom: '24px', backgroundColor: '#fff', borderLeft: '6px solid var(--primary)' }}>
        <div className="card__body" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
          <div style={{ backgroundColor: 'var(--primary-soft)', color: 'var(--primary)', padding: '16px', borderRadius: '12px' }}>
            <Icon.cpu width={36} height={36} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.8rem', margin: '0 0 8px 0', color: 'var(--ink)' }}>Arquitectura del Sistema Experto</h2>
            <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: '1rem', lineHeight: '1.5' }}>
              Diseño estructural del Sistema Basado en el Conocimiento (SBC) para la mitigación del riesgo por Flujo de Detritos (Huaicos) en Lurigancho-Chosica.
            </p>
          </div>
        </div>
      </section>

      {/* 6 COMPONENTES CLÁSICOS */}
      <section className="card" style={{ marginBottom: '24px' }}>
        <header className="card__head" style={{ borderBottom: '1px solid var(--line)', paddingBottom: '16px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--ink)', margin: 0 }}>Estructura de la IA Clásica (Componentes del SBC)</h3>
        </header>
        <div className="card__body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', padding: '0 24px 24px' }}>
          
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid var(--line)' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#DBEAFE', color: '#2563EB', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '12px' }}>1</div>
            <h4 style={{ margin: '0 0 8px', fontSize: '1.1rem', color: 'var(--ink)' }}>Base de Conocimiento</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: '1.5' }}>
              Almacena el <i>know-how</i> humano. Modelada en sintaxis declarativa LISP, comprende <strong>66 reglas de producción (SI-ENTONCES)</strong> alojadas físicamente en el archivo <code>rules.clp</code>.
            </p>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid var(--line)' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#DCFCE7', color: '#16A34A', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '12px' }}>2</div>
            <h4 style={{ margin: '0 0 8px', fontSize: '1.1rem', color: 'var(--ink)' }}>Base de Hechos</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: '1.5' }}>
              Memoria de trabajo temporal. Se alimenta dinámicamente con las respuestas del usuario (vivienda, clima, etc.) y se inyectan en el entorno CLIPS mediante la instrucción <code>assert</code>.
            </p>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid var(--line)' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#F3E8FF', color: '#9333EA', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '12px' }}>3</div>
            <h4 style={{ margin: '0 0 8px', fontSize: '1.1rem', color: 'var(--ink)' }}>Motor de Inferencia</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: '1.5' }}>
              Núcleo del sistema impulsado por <strong>CLIPS</strong> y conectado vía <code>clipspy</code>. Utiliza <i>Encadenamiento hacia Adelante (Forward Chaining)</i> basado en el algoritmo Rete para deducir agresivamente.
            </p>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid var(--line)' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#FFEDD5', color: '#EA580C', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '12px' }}>4</div>
            <h4 style={{ margin: '0 0 8px', fontSize: '1.1rem', color: 'var(--ink)' }}>Módulo de Explicación</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: '1.5' }}>
              Desarrollado para brindar trazabilidad algorítmica. Intercepta el registro de activaciones (<i>agenda</i>) del motor CLIPS y explica al usuario por qué se determinó su nivel de riesgo.
            </p>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid var(--line)' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '12px' }}>5</div>
            <h4 style={{ margin: '0 0 8px', fontSize: '1.1rem', color: 'var(--ink)' }}>Módulo de Adquisición</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: '1.5' }}>
              Implementado en el <strong>Portal de Expertos</strong>. Actúa como barrera de homologación técnica donde especialistas en geología pueden proponer nuevas reglas hacia un archivo JSON.
            </p>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid var(--line)' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#CCFBF1', color: '#0D9488', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '12px' }}>6</div>
            <h4 style={{ margin: '0 0 8px', fontSize: '1.1rem', color: 'var(--ink)' }}>Interfaz de Usuario (UI)</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: '1.5' }}>
              Capa de presentación construida como una SPA interactiva en React, encargada de traducir el crudo lenguaje simbólico del SBC a una experiencia intuitiva para el ciudadano.
            </p>
          </div>
        </div>
      </section>

      {/* STACK TECNOLÓGICO */}
      <section className="card" style={{ marginBottom: '24px', backgroundColor: '#1E293B', color: '#F8FAFC' }}>
        <header className="card__head" style={{ borderBottom: '1px solid #334155', paddingBottom: '16px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.3rem', margin: 0, color: '#fff' }}>Stack Tecnológico</h3>
        </header>
        <div className="card__body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', padding: '0 24px 24px' }}>
          
          <div style={{ backgroundColor: '#0F172A', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Icon.form width={24} height={24} color="#38BDF8" />
              <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#F8FAFC' }}>Frontend (Cliente)</h4>
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: '#CBD5E1', lineHeight: '1.6' }}>
              <li><strong style={{ color: '#7DD3FC' }}>Framework:</strong> React 19 (Vite)</li>
              <li><strong style={{ color: '#7DD3FC' }}>Estilos:</strong> CSS puro con Metodología BEM y Variables CSS.</li>
              <li><strong style={{ color: '#7DD3FC' }}>Arquitectura UI:</strong> SPA Reactiva, Mobile-First.</li>
              <li><strong style={{ color: '#7DD3FC' }}>Iconografía:</strong> Componentes SVG puros inyectados geométricamente.</li>
            </ul>
          </div>

          <div style={{ backgroundColor: '#0F172A', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Icon.cpu width={24} height={24} color="#34D399" />
              <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#F8FAFC' }}>Backend (Servidor Experto)</h4>
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: '#CBD5E1', lineHeight: '1.6' }}>
              <li><strong style={{ color: '#6EE7B7' }}>Core API:</strong> FastAPI (Python 3) asíncrono.</li>
              <li><strong style={{ color: '#6EE7B7' }}>Motor Experto:</strong> CLIPS emparejado con <code>clipspy</code>.</li>
              <li><strong style={{ color: '#6EE7B7' }}>Validación de Datos:</strong> Pydantic (Esquemas estrictos JSON-&gt;CLIPS).</li>
              <li><strong style={{ color: '#6EE7B7' }}>Almacenamiento:</strong> Archivos planos I/O (<code>rules.clp</code>, JSON) sin bases de datos pesadas.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* METODOLOGÍA OFICIAL */}
      <section className="card">
        <header className="card__head" style={{ borderBottom: '1px solid var(--line)', paddingBottom: '16px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--ink)', margin: 0 }}>Metodología Científica e Institucional</h3>
          <p style={{ margin: '8px 0 0', fontSize: '0.9rem', color: 'var(--ink-2)' }}>El modelo lógico se extrajo mediante heurística de las matrices de 4 instituciones oficiales en Perú.</p>
        </header>
        <div className="card__body" style={{ padding: '0 24px 24px' }}>
          <ol className="flujo" style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {MODULOS.map((m, i) => (
              <li key={m.clave} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--bg-soft)', border: '2px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ink)' }}>
                  {i + 1}
                </span>
                <div style={{ backgroundColor: 'var(--bg-soft)', border: '1px solid var(--line)', padding: '16px', borderRadius: '12px', flexGrow: 1 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--ink)' }}>{m.titulo}</strong>
                    <span style={{ backgroundColor: 'var(--primary-soft)', color: 'var(--primary-dark)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
                      Entidad: {m.fuente}
                    </span>
                  </div>
                  <small style={{ display: 'block', color: 'var(--ink-2)', fontFamily: 'monospace', backgroundColor: '#fff', padding: '8px', border: '1px solid var(--line)', borderRadius: '4px' }}>
                    Bloque de Inferencia: {REGLAS_POR_MODULO[i]}
                  </small>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

    </main>
  )
}
