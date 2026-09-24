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
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1E293B', marginBottom: '0.5rem' }}>Diccionario de Reglas (SBC)</h1>
      <p style={{ color: '#475569', marginBottom: '2rem' }}>
        Las 66 reglas operativas del motor de inferencia CLIPS, extraídas directamente de <code>rules.clp</code>.
      </p>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#64748B', padding: '2rem' }}>Cargando reglas desde el motor CLIPS...</div>
      ) : (
        <>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ fontWeight: '600', marginRight: '1rem', color: '#334155' }}>Filtrar por módulo:</label>
            <select value={filtro} onChange={e => setFiltro(e.target.value)} style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1', backgroundColor: '#fff', color: '#1E293B' }}>
              {modulos.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {reglasFiltradas.map(regla => (
              <div key={regla.id} style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #E2E8F0', borderLeft: '4px solid #4F46E5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1E293B', margin: 0 }}>
                      <span style={{ color: '#4F46E5', marginRight: '0.5rem' }}>{regla.id}</span>
                      {regla.nombre}
                    </h3>
                    <div style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '0.25rem' }}>Módulo: {regla.modulo}</div>
                  </div>
                  <span style={{ backgroundColor: '#EEF2FF', color: '#3730A3', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '600' }}>
                    Fuente: {regla.fuente}
                  </span>
                </div>

                <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '0.5rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#334155' }}>
                  <div style={{ color: '#4F46E5', fontWeight: 'bold' }}>SI</div>
                  {regla.condiciones.map((c, i) => (
                    <div key={i} style={{ paddingLeft: '1rem' }}>{c}</div>
                  ))}
                  <div style={{ color: '#10B981', fontWeight: 'bold', marginTop: '0.5rem' }}>ENTONCES</div>
                  {regla.consecuencias.map((c, i) => (
                    <div key={i} style={{ paddingLeft: '1rem' }}>{c}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
