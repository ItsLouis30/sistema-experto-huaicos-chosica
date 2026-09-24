import React, { useEffect, useState } from 'react'
import { evaluarRiesgo, verificarEstado } from './api.js'
import { CAMPOS, PASOS, valoresIniciales } from './fields.js'
import { ChipGroup, Icon, NumberField, Resumen, Sidebar, Stepper } from './components.jsx'
import Resultado from './Result.jsx'
import Metodologia from './Metodologia.jsx'
import HeroHeader from './HeroHeader.jsx'
import VisualGuideModal from './VisualGuideModal.jsx'
import AdquisicionView from './AdquisicionView.jsx'
import ReglasView from './ReglasView.jsx'

const PASO_RESULTADO = PASOS.length

export default function App() {
  const [vista, setVista] = useState('evaluacion')
  const [guiaActiva, setGuiaActiva] = useState(null)
  const [paso, setPaso] = useState(0)
  const [valores, setValores] = useState(valoresIniciales)
  const [resultado, setResultado] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)
  const [enLinea, setEnLinea] = useState(null)

  useEffect(() => {
    verificarEstado().then(setEnLinea)
  }, [])

  const cambiar = (clave, valor) => {
    setValores((prev) => {
      const nuevo = { ...prev, [clave]: valor }
      // R28: si no hay obra, su estado es "no_aplica"; si la hay, obligamos a elegir su estado.
      if (clave === 'obra_mitigacion_cercana') {
        nuevo.estado_obra_mitigacion = valor === 'ausente' ? 'no_aplica' : prev.estado_obra_mitigacion === 'no_aplica' ? null : prev.estado_obra_mitigacion
      }
      return nuevo
    })
    setResultado(null)
  }

  const completos = PASOS.map((p) => p.campos.every((c) => valores[c] !== null && valores[c] !== undefined))
  const pasoInfo = PASOS[paso]

  const ir = (i) => {
    setError(null)
    if (i === PASO_RESULTADO && !resultado) return enviar()
    setPaso(i)
  }

  const enviar = async () => {
    setCargando(true)
    setError(null)
    try {
      const r = await evaluarRiesgo(valores)
      setResultado(r)
      setPaso(PASO_RESULTADO)
      setEnLinea(true)
    } catch (e) {
      setError(e.message === 'Failed to fetch' ? 'No se pudo conectar con el backend. ¿Está corriendo en el puerto 8000?' : e.message)
    } finally {
      setCargando(false)
    }
  }

  const reiniciar = () => {
    setValores(valoresIniciales())
    setResultado(null)
    setPaso(0)
  }

  return (
    <div className="app">
      <Sidebar vista={vista} onVista={setVista} />
      <div className="main">
        {vista === 'evaluacion' && (
          <>
            <HeroHeader enLinea={enLinea} />
            <main className="content">
              <div className="content__stepper card">
                <Stepper actual={paso} completos={completos} onIr={ir} />
              </div>

              {paso === PASO_RESULTADO && resultado ? (
                <Resultado resultado={resultado} onEditar={() => setPaso(PASOS.length - 1)} onReiniciar={reiniciar} />
              ) : (
                <div className="content__grid">
                  <section className="card form-card">
                    <header className="form-card__head">
                      <span className="step-icon">{paso + 1}</span>
                      <div>
                        <span className="eyebrow">Paso {paso + 1} de {PASOS.length} · {pasoInfo.fuente}</span>
                        <h2>{pasoInfo.encabezado}</h2>
                        <p>{pasoInfo.descripcion}</p>
                      </div>
                    </header>
                    <div className="form-card__progress"><span style={{ width: `${((paso + 1) / PASOS.length) * 100}%` }} /></div>

                    <div className="form-card__body">
                      {pasoInfo.campos.map((c) =>
                        CAMPOS[c].tipo === 'numero' ? (
                          <NumberField key={c} clave={c} valores={valores} onChange={cambiar} onOpenGuide={setGuiaActiva} />
                        ) : (
                          <ChipGroup key={c} clave={c} valores={valores} onChange={cambiar} onOpenGuide={setGuiaActiva} />
                        ),
                      )}
                    </div>

                    {error && <div className="error"><Icon.alert width={18} height={18} />{error}</div>}

                    <footer className="form-card__foot">
                      <button className="btn btn--outline" onClick={() => ir(paso - 1)} disabled={paso === 0}>
                        <Icon.back width={16} height={16} />Anterior
                      </button>
                      {paso < PASOS.length - 1 ? (
                        <button className="btn btn--primary" onClick={() => ir(paso + 1)} disabled={!completos[paso]}>
                          Siguiente<Icon.next width={16} height={16} />
                        </button>
                      ) : (
                        <button className="btn btn--success" onClick={enviar} disabled={!completos.every(Boolean) || cargando}>
                          {cargando ? <span className="spinner" /> : <Icon.cpu width={16} height={16} />}
                          {cargando ? 'Infiriendo…' : 'Evaluar riesgo'}
                        </button>
                      )}
                    </footer>
                  </section>

                  <Resumen valores={valores} pasoActual={paso} onIr={ir} />
                </div>
              )}
            </main>
          </>
        )}

        {vista === 'metodologia' && (
          <>
            <header className="topbar" style={{ background: '#0F172A', color: '#F8FAFC' }}>
              <div className="topbar__title">
                <h1>Metodología y reglas</h1>
              </div>
            </header>
            <Metodologia />
          </>
        )}

        {vista === 'reglas' && (
          <>
            <header className="topbar" style={{ background: '#0F172A', color: '#F8FAFC' }}>
              <div className="topbar__title">
                <h1>Base de Conocimiento</h1>
              </div>
            </header>
            <ReglasView />
          </>
        )}

        {vista === 'adquisicion' && (
          <>
            <header className="topbar" style={{ background: '#0F172A', color: '#F8FAFC' }}>
              <div className="topbar__title">
                <h1>Portal de Expertos</h1>
              </div>
            </header>
            <AdquisicionView />
          </>
        )}
      </div>
      <VisualGuideModal guideId={guiaActiva} onClose={() => setGuiaActiva(null)} />
    </div>
  )
}
