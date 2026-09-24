import React, { useState, useEffect } from 'react'

export default function AdquisicionView() {
  const [tab, setTab] = useState('proponer')
  const [propuestas, setPropuestas] = useState([])
  const [loading, setLoading] = useState(false)

  // Form state
  const [modulo, setModulo] = useState('Susceptibilidad Física')
  const [nombreRegla, setNombreRegla] = useState('')
  const [antecedentes, setAntecedentes] = useState([{ variable: 'pendiente_terreno', operador: '==', valor: 'alta' }])
  const [consecuenteVar, setConsecuenteVar] = useState('nivel_riesgo')
  const [consecuenteVal, setConsecuenteVal] = useState('alto')
  const [fuente, setFuente] = useState('CENEPRED')
  const [justificacion, setJustificacion] = useState('')
  const [autor, setAutor] = useState('')

  const fetchPropuestas = async () => {
    try {
      const res = await fetch('/api/conocimiento/propuestas')
      if (res.ok) {
        const data = await res.json()
        setPropuestas(data)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (tab === 'bandeja') {
      fetchPropuestas()
    }
  }, [tab])

  const addAntecedente = () => setAntecedentes([...antecedentes, { variable: '', operador: '==', valor: '' }])
  const updateAntecedente = (index, field, value) => {
    const newAnt = [...antecedentes]
    newAnt[index][field] = value
    setAntecedentes(newAnt)
  }
  const removeAntecedente = (index) => {
    setAntecedentes(antecedentes.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const payload = {
      modulo, nombre_regla: nombreRegla, antecedentes,
      consecuente_variable: consecuenteVar, consecuente_valor: consecuenteVal,
      fuente_conocimiento: fuente, justificacion_tecnica: justificacion, autor_especialista: autor
    }
    
    try {
      const res = await fetch('/api/conocimiento/proponer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        alert('Propuesta registrada exitosamente y enviada a revisión.')
        // reset form
        setNombreRegla('')
        setJustificacion('')
        setTab('bandeja')
      }
    } catch(err) {
      alert('Error al registrar la propuesta.')
    } finally {
      setLoading(false)
    }
  }

  const handleEstado = async (id, estado) => {
    try {
      const res = await fetch(`/api/conocimiento/propuestas/${id}/estado`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado })
      })
      if (res.ok) {
        fetchPropuestas()
      }
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <main className="content">
      <section className="card">
        <header className="card__head">
          <h3>Adquisición de Conocimiento</h3>
          <p>Módulo de integración y validación de reglas propuestas por expertos.</p>
        </header>

        <div className="card__body" style={{ padding: '0 24px 24px' }}>
          <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--line)', marginBottom: '24px' }}>
            <button 
              onClick={() => setTab('proponer')} 
              style={{ padding: '12px 24px', fontWeight: '600', borderBottom: tab === 'proponer' ? '2px solid var(--primary)' : '2px solid transparent', color: tab === 'proponer' ? 'var(--primary)' : 'var(--ink-3)', background: 'transparent', cursor: 'pointer' }}>
              Proponer Nueva Regla
            </button>
            <button 
              onClick={() => setTab('bandeja')} 
              style={{ padding: '12px 24px', fontWeight: '600', borderBottom: tab === 'bandeja' ? '2px solid var(--primary)' : '2px solid transparent', color: tab === 'bandeja' ? 'var(--primary)' : 'var(--ink-3)', background: 'transparent', cursor: 'pointer' }}>
              Bandeja de Validación
            </button>
          </div>

      {tab === 'proponer' && (
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ padding: '1rem', backgroundColor: '#FEF3C7', borderLeft: '4px solid #F59E0B', color: '#92400E', marginBottom: '2rem', fontSize: '0.9rem' }}>
            <strong>Nota técnica:</strong> Las reglas propuestas entrarán a una etapa de revisión técnica y validación antes de su homologación e incorporación en la base de conocimiento CLIPS de 66 reglas.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>Módulo</label>
              <select value={modulo} onChange={e=>setModulo(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }}>
                <option>Susceptibilidad Física</option>
                <option>Detonante Meteorológico</option>
                <option>Exposición y Mitigación</option>
                <option>Vulnerabilidad</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>Nombre corto</label>
              <input required value={nombreRegla} onChange={e=>setNombreRegla(e.target.value)} placeholder="Ej. Lluvia crítica en ladera" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }} />
            </div>
          </div>

          <fieldset style={{ border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
            <legend style={{ fontWeight: 'bold', color: '#4F46E5', padding: '0 0.5rem' }}>SI (Antecedentes)</legend>
            {antecedentes.map((ant, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
                <input value={ant.variable} onChange={e=>updateAntecedente(idx, 'variable', e.target.value)} placeholder="Variable" style={{ flex: 1, padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #CBD5E1' }} />
                <select value={ant.operador} onChange={e=>updateAntecedente(idx, 'operador', e.target.value)} style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #CBD5E1' }}>
                  <option>==</option><option>&gt;=</option><option>&lt;=</option><option>!=</option>
                </select>
                <input value={ant.valor} onChange={e=>updateAntecedente(idx, 'valor', e.target.value)} placeholder="Valor esperado" style={{ flex: 1, padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #CBD5E1' }} />
                <button type="button" onClick={() => removeAntecedente(idx)} style={{ color: '#EF4444', fontWeight: 'bold' }}>&times;</button>
              </div>
            ))}
            <button type="button" onClick={addAntecedente} style={{ color: '#4F46E5', fontSize: '0.9rem', fontWeight: '600' }}>+ Añadir condición</button>
          </fieldset>

          <fieldset style={{ border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
            <legend style={{ fontWeight: 'bold', color: '#10B981', padding: '0 0.5rem' }}>ENTONCES (Consecuente)</legend>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input value={consecuenteVar} onChange={e=>setConsecuenteVar(e.target.value)} placeholder="Variable de salida" style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }} />
              <input value={consecuenteVal} onChange={e=>setConsecuenteVal(e.target.value)} placeholder="Valor asignado" style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }} />
            </div>
          </fieldset>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>Fuente Oficial</label>
              <input required value={fuente} onChange={e=>setFuente(e.target.value)} placeholder="Ej. INGEMMET" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>Autor / Especialista</label>
              <input required value={autor} onChange={e=>setAutor(e.target.value)} placeholder="Tu nombre" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }} />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>Justificación Técnica</label>
            <textarea required value={justificacion} onChange={e=>setJustificacion(e.target.value)} rows="3" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }}></textarea>
          </div>

          <button disabled={loading} type="submit" style={{ backgroundColor: '#4F46E5', color: 'white', padding: '1rem 2rem', borderRadius: '0.5rem', fontWeight: 'bold', width: '100%' }}>
            {loading ? 'Registrando...' : 'Registrar Propuesta para Revisión'}
          </button>
        </form>
      )}

      {tab === 'bandeja' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {propuestas.length === 0 ? <p>No hay propuestas registradas.</p> : propuestas.map(p => (
            <div key={p.id} style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: `4px solid ${p.estado === 'aprobada' ? '#10B981' : p.estado === 'rechazada' ? '#EF4444' : '#F59E0B'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <strong style={{ fontSize: '1.1rem', color: '#1E293B' }}>{p.nombre_regla}</strong>
                  <span style={{ fontSize: '0.85rem', color: '#64748B', marginLeft: '1rem' }}>{p.id} • {new Date(p.fecha_registro).toLocaleDateString()}</span>
                </div>
                <div>
                  <select value={p.estado} onChange={e => handleEstado(p.id, e.target.value)} style={{ padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.85rem', border: '1px solid #CBD5E1' }}>
                    <option value="pendiente_revision">🟡 Pendiente de revisión</option>
                    <option value="aprobada">🟢 Homologada</option>
                    <option value="rechazada">🔴 Observada / Rechazada</option>
                  </select>
                </div>
              </div>
              <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '0.5rem', fontFamily: 'monospace', fontSize: '0.9rem', color: '#334155', marginBottom: '1rem' }}>
                <div style={{ color: '#4F46E5', fontWeight: 'bold' }}>SI</div>
                {p.antecedentes.map((a, i) => (
                  <div key={i} style={{ paddingLeft: '1rem' }}>{a.variable} {a.operador} {a.valor} {i < p.antecedentes.length - 1 ? 'Y' : ''}</div>
                ))}
                <div style={{ color: '#10B981', fontWeight: 'bold', marginTop: '0.5rem' }}>ENTONCES</div>
                <div style={{ paddingLeft: '1rem' }}>{p.consecuente_variable} = {p.consecuente_valor}</div>
              </div>
              <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', color: '#64748B' }}>
                <div><strong>Fuente:</strong> {p.fuente_conocimiento}</div>
                <div><strong>Autor:</strong> {p.autor_especialista}</div>
                <div><strong>Justificación:</strong> {p.justificacion_tecnica}</div>
              </div>
            </div>
          ))}
        </div>
      )}
        </div>
      </section>
    </main>
  )
}
