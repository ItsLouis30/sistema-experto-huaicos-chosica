import React, { useEffect, useState } from 'react'

export default function ReglasView() {
  const [reglas, setReglas] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('Todos')

  useEffect(() => {
    fetch('/api/reglas/')
      .then(r => r.json())
      .then(data => {
        // Ordenar numéricamente R1, R2...
        data.sort((a, b) => {
          const numA = parseInt(a.id.substring(1))
          const numB = parseInt(b.id.substring(1))
          return numA - numB
        })
        setReglas(data)
        setLoading(false)
      })
      .catch(e => {
        console.error(e)
        setLoading(false)
      })
  }, [])

  const modulos = ['Todos', ...new Set(reglas.map(r => r.modulo))]
  const reglasFiltradas = filtro === 'Todos' ? reglas : reglas.filter(r => r.modulo === filtro)

  return (
    <main className="content">
      <section className="card">
        <header className="card__head">
          <h3>Diccionario de Reglas (SBC)</h3>
          <p>Las 66 reglas operativas del motor de inferencia CLIPS, extraídas directamente de <code>rules.clp</code>.</p>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--ink-3)' }}>Cargando reglas desde el motor CLIPS...</div>
        ) : (
          <div className="card__body" style={{ padding: '0 12px 12px' }}>
            <div style={{ marginBottom: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
              <label style={{ fontWeight: '600', color: 'var(--ink)' }}>Filtrar por módulo:</label>
              <select 
                value={filtro} 
                onChange={e => setFiltro(e.target.value)} 
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)', backgroundColor: '#fff', color: 'var(--ink)' }}
              >
                {modulos.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              {reglasFiltradas.map(regla => (
                <div key={regla.id} style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '12px', border: '1px solid var(--line)', borderLeft: '4px solid var(--primary)' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--ink)', margin: 0 }}>
                        <span style={{ color: 'var(--primary)', marginRight: '8px' }}>{regla.id}</span>
                        {regla.nombre}
                      </h4>
                      <div style={{ color: 'var(--ink-3)', fontSize: '0.85rem', marginTop: '4px' }}>Módulo: {regla.modulo}</div>
                    </div>
                    <span style={{ backgroundColor: 'var(--primary-soft)', color: 'var(--primary-dark)', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '600' }}>
                      Fuente: {regla.fuente}
                    </span>
                  </div>

                  <div style={{ backgroundColor: 'var(--bg-soft)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--ink-2)', whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word', overflowX: 'hidden', width: '100%', boxSizing: 'border-box' }}>
                    <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>SI</div>
                    {regla.condiciones.map((c, i) => (
                      <div key={i} style={{ paddingLeft: '16px' }}>{c}</div>
                    ))}
                    <div style={{ color: 'var(--success)', fontWeight: 'bold', marginTop: '8px' }}>ENTONCES</div>
                    {regla.consecuencias.map((c, i) => (
                      <div key={i} style={{ paddingLeft: '16px' }}>{c}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
