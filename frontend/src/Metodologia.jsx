import React from 'react'
import { Icon } from './components.jsx'

const MODULOS_DETALLADOS = [
  {
    clave: 'susceptibilidad',
    titulo: '1. Susceptibilidad Física del Terreno',
    entidad: 'INGEMMET',
    entidadColor: '#1E293B',
    entidadBg: '#F1F5F9',
    acento: '#3B82F6',
    reglas: 'R1–R11 (11 Reglas)',
    sintesis: 'Evaluación de las condiciones intrínsecas del terreno: pendiente del talud, tipo de suelo superficial y grado de consolidación de la ladera.',
    variables: ['Pendiente Terreno', 'Tipo de Suelo', 'Consolidación Litológica']
  },
  {
    clave: 'detonante',
    titulo: '2. Detonante Meteorológico',
    entidad: 'SENAMHI',
    entidadColor: '#0369A1',
    entidadBg: '#E0F2FE',
    acento: '#0284C7',
    reglas: 'R12–R17 (6 Reglas)',
    sintesis: 'Monitoreo de umbrales pluviométricos críticos: volumen de precipitación acumulada en 24h / 72h e intensidad del evento de lluvia.',
    variables: ['Lluvia Acumulada 24h', 'Umbral Pluviométrico', 'Intensidad Precipitación']
  },
  {
    clave: 'peligro',
    titulo: '3. Peligro Físico Integrado',
    entidad: 'CENEPRED / INGEMMET',
    entidadColor: '#4338CA',
    entidadBg: '#EEF2FF',
    acento: '#4F46E5',
    reglas: 'R18–R24 (7 Reglas)',
    sintesis: 'Cruce matricial multicriterio entre la susceptibilidad del suelo y la severidad del detonante para estimar la probabilidad física del flujo de detritos.',
    variables: ['Matriz Susceptibilidad-Detonante', 'Frecuencia Histórica', 'Nivel de Peligro']
  },
  {
    clave: 'exposicion',
    titulo: '4. Exposición y Mitigación Existente',
    entidad: 'INDECI / CENEPRED',
    entidadColor: '#B45309',
    entidadBg: '#FEF3C7',
    acento: '#D97706',
    reglas: 'R25–R34 (10 Reglas)',
    sintesis: 'Análisis de la distancia relativa hacia la franja del cauce activo o quebrada, ponderado por la presencia y estado de obras de ingeniería estructural.',
    variables: ['Distancia a Quebrada', 'Obras de Mitigación', 'Estado de Muros/Pircas']
  },
  {
    clave: 'vulnerabilidad',
    titulo: '5. Vulnerabilidad Social y Estructural',
    entidad: 'INDECI',
    entidadColor: '#6B21A8',
    entidadBg: '#F3E8FF',
    acento: '#7C3AED',
    reglas: 'R35–R44 (10 Reglas)',
    sintesis: 'Evaluación del nivel de fragilidad física de la edificación: materiales predominantes en paredes y techos, antigüedad y calidad constructiva.',
    variables: ['Material de Paredes', 'Material de Techos', 'Antigüedad Edificación']
  },
  {
    clave: 'evaluacion_riesgo',
    titulo: '6. Evaluación de Riesgo Integrado',
    entidad: 'CENEPRED',
    entidadColor: '#B91C1C',
    entidadBg: '#FEE2E2',
    acento: '#DC2626',
    reglas: 'R45–R56 (12 Reglas)',
    sintesis: 'Matriz tripartita de inferencia final que integra Peligro, Exposición y Vulnerabilidad para determinar el nivel de riesgo cualitativo y cuantitativo.',
    variables: ['Riesgo Muy Alto', 'Riesgo Alto', 'Riesgo Medio', 'Riesgo Bajo']
  },
  {
    clave: 'recomendaciones',
    titulo: '7. Recomendaciones de Mitigación',
    entidad: 'INDECI',
    entidadColor: '#15803D',
    entidadBg: '#DCFCE7',
    acento: '#16A34A',
    reglas: 'R57–R65 (9 Reglas)',
    sintesis: 'Generación declarativa de medidas prospectivas (planes de evacuación, refuerzo) y medidas correctivas adaptadas al diagnóstico de la vivienda.',
    variables: ['Medidas Prospectivas', 'Acción Correctiva', 'Plan Evacuación']
  },
  {
    clave: 'trazabilidad',
    titulo: '8. Trazabilidad y Módulo de Explicación',
    entidad: 'SBC ENGINE',
    entidadColor: '#0F172A',
    entidadBg: '#E2E8F0',
    acento: '#334155',
    reglas: 'R66 (1 Regla)',
    sintesis: 'Extracción del registro de activación (agenda de disparos CLIPS) para construir el reporte auditable de razonamiento para el usuario.',
    variables: ['Agenda CLIPS', 'Disparo de Hechos', 'Justificación Lógica']
  }
]

const TECH_FRONTEND = [
  { nombre: 'React 19', tag: 'UI Library', desc: 'SPA Reactiva' },
  { nombre: 'Vite', tag: 'Bundler', desc: 'Build ultra rápido' },
  { nombre: 'CSS BEM', tag: 'Architecture', desc: 'Estilos modulados' },
  { nombre: 'SVG Vector', tag: 'Assets', desc: 'Micro-animaciones nativas' }
]

const TECH_BACKEND = [
  { nombre: 'FastAPI', tag: 'Framework', desc: 'API REST asíncrona' },
  { nombre: 'CLIPS v6.4', tag: 'AI Engine', desc: 'Motor C declarativo' },
  { nombre: 'clipspy', tag: 'Python Wrapper', desc: 'Puente C <-> Python' },
  { nombre: 'Pydantic v2', tag: 'Validation', desc: 'Esquemas estrictos JSON' },
  { nombre: 'JSON Staging', tag: 'Persistence', desc: 'Modulo Adquisición' }
]

export default function Metodologia() {
  return (
    <main className="content" style={{ paddingBottom: '100px' }}>
      
      {/* HEADER PRINCIPAL */}
      <section className="card" style={{ marginBottom: '24px', backgroundColor: '#fff', borderLeft: '6px solid #4F46E5', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
        <div className="card__body" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '28px' }}>
          <div style={{ backgroundColor: '#EEF2FF', color: '#4F46E5', padding: '16px', borderRadius: '14px', flexShrink: 0 }}>
            <Icon.cpu width={38} height={38} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 6px 0', color: '#0F172A', letterSpacing: '-0.02em' }}>
              Arquitectura del Sistema Experto
            </h2>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Documentación técnica y metodológica del Sistema Basado en el Conocimiento (SBC) para la evaluación prospectiva del riesgo por Flujo de Detritos (Huaicos) en Chosica.
            </p>
          </div>
        </div>
      </section>

      {/* 6 COMPONENTES CLÁSICOS DE LA IA */}
      <section className="card" style={{ marginBottom: '32px', borderRadius: '16px', overflow: 'hidden' }}>
        <header className="card__head" style={{ backgroundColor: '#F8FAFC', padding: '20px 28px', borderBottom: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#4F46E5' }}></span>
            Componentes Estructurales del SBC (IA Clásica)
          </h3>
        </header>
        <div className="card__body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', padding: '24px' }}>
          
          <div className="met-card-hover" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)', cursor: 'default' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#2563EB', backgroundColor: '#DBEAFE', padding: '3px 10px', borderRadius: '999px' }}>Modulo 1</span>
              <code style={{ fontSize: '0.75rem', color: '#64748B', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>rules.clp</code>
            </div>
            <h4 style={{ margin: '0 0 8px', fontSize: '1.05rem', fontWeight: '700', color: '#0F172A' }}>Base de Conocimiento</h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#475569', lineHeight: '1.5' }}>
              Almacena el conocimiento experto mediante <strong>66 reglas declarativas LISP</strong> estructuradas según las matrices oficiales de CENEPRED e INGEMMET.
            </p>
          </div>

          <div className="met-card-hover" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)', cursor: 'default' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#16A34A', backgroundColor: '#DCFCE7', padding: '3px 10px', borderRadius: '999px' }}>Modulo 2</span>
              <code style={{ fontSize: '0.75rem', color: '#64748B', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>assert (hechos)</code>
            </div>
            <h4 style={{ margin: '0 0 8px', fontSize: '1.05rem', fontWeight: '700', color: '#0F172A' }}>Base de Hechos</h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#475569', lineHeight: '1.5' }}>
              Memoria de trabajo dinámica. Recibe las respuestas del formulario y las traduce a hechos simbólicos CLIPS para alimentar la inferencia.
            </p>
          </div>

          <div className="met-card-hover" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)', cursor: 'default' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#9333EA', backgroundColor: '#F3E8FF', padding: '3px 10px', borderRadius: '999px' }}>Modulo 3</span>
              <code style={{ fontSize: '0.75rem', color: '#64748B', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>Algoritmo Rete</code>
            </div>
            <h4 style={{ margin: '0 0 8px', fontSize: '1.05rem', fontWeight: '700', color: '#0F172A' }}>Motor de Inferencia</h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#475569', lineHeight: '1.5' }}>
              Núcleo C integrado mediante <code>clipspy</code>. Aplica <i>Encadenamiento hacia Adelante (Forward Chaining)</i> deduciendo hechos intermedios.
            </p>
          </div>

          <div className="met-card-hover" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)', cursor: 'default' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#EA580C', backgroundColor: '#FFEDD5', padding: '3px 10px', borderRadius: '999px' }}>Modulo 4</span>
              <code style={{ fontSize: '0.75rem', color: '#64748B', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>Agenda CLIPS</code>
            </div>
            <h4 style={{ margin: '0 0 8px', fontSize: '1.05rem', fontWeight: '700', color: '#0F172A' }}>Módulo de Explicación</h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#475569', lineHeight: '1.5' }}>
              Garantiza la trazabilidad algorítmica extrayendo la secuencia exacta de disparos para justificar la evaluación ante el ciudadano.
            </p>
          </div>

          <div className="met-card-hover" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)', cursor: 'default' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#DC2626', backgroundColor: '#FEE2E2', padding: '3px 10px', borderRadius: '999px' }}>Modulo 5</span>
              <code style={{ fontSize: '0.75rem', color: '#64748B', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>JSON Staging</code>
            </div>
            <h4 style={{ margin: '0 0 8px', fontSize: '1.05rem', fontWeight: '700', color: '#0F172A' }}>Módulo de Adquisición</h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#475569', lineHeight: '1.5' }}>
              Portal de Expertos que permite la proposición de nuevas reglas de conocimiento para su revisión técnica antes de su integración a la base.
            </p>
          </div>

          <div className="met-card-hover" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)', cursor: 'default' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0D9488', backgroundColor: '#CCFBF1', padding: '3px 10px', borderRadius: '999px' }}>Modulo 6</span>
              <code style={{ fontSize: '0.75rem', color: '#64748B', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>React SPA</code>
            </div>
            <h4 style={{ margin: '0 0 8px', fontSize: '1.05rem', fontWeight: '700', color: '#0F172A' }}>Interfaz de Usuario</h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#475569', lineHeight: '1.5' }}>
              Capa de interacción humana diseñada con principios responsivos y micro-guiada para facilitar la entrada de datos topográficos y sociales.
            </p>
          </div>

        </div>
      </section>

      {/* STACK TECNOLÓGICO MODULAR SOBRIO */}
      <section className="card" style={{ marginBottom: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
        <header className="card__head" style={{ backgroundColor: '#F8FAFC', padding: '20px 28px', borderBottom: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3B82F6' }}></span>
            Stack Tecnológico e Ingeniería del Proyecto
          </h3>
        </header>
        <div className="card__body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', padding: '24px' }}>
          
          {/* Frontend Module */}
          <div style={{ backgroundColor: '#F8FAFC', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ backgroundColor: '#EFF6FF', color: '#2563EB', padding: '8px', borderRadius: '8px' }}>
                <Icon.form width={20} height={20} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: '#0F172A' }}>Capa de Presentación (Frontend)</h4>
                <small style={{ color: '#64748B' }}>Cliente Web Interactivo</small>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {TECH_FRONTEND.map((t) => (
                <div key={t.nombre} className="met-card-hover" style={{ backgroundColor: '#fff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', cursor: 'default' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1E293B' }}>{t.nombre}</div>
                  <span style={{ fontSize: '0.7rem', color: '#2563EB', backgroundColor: '#EFF6FF', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '4px' }}>{t.tag}</span>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Module */}
          <div style={{ backgroundColor: '#F8FAFC', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ backgroundColor: '#F0FDF4', color: '#16A34A', padding: '8px', borderRadius: '8px' }}>
                <Icon.cpu width={20} height={20} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: '#0F172A' }}>Servidor Experto (Backend & Core)</h4>
                <small style={{ color: '#64748B' }}>Inferencia & Reglas</small>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {TECH_BACKEND.map((t) => (
                <div key={t.nombre} className="met-card-hover" style={{ backgroundColor: '#fff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', cursor: 'default' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1E293B' }}>{t.nombre}</div>
                  <span style={{ fontSize: '0.7rem', color: '#16A34A', backgroundColor: '#F0FDF4', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '4px' }}>{t.tag}</span>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* METODOLOGÍA CIENTÍFICA E INSTITUCIONAL ENRIQUECIDA */}
      <section className="card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <header className="card__head" style={{ backgroundColor: '#F8FAFC', padding: '24px 28px', borderBottom: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
            Metodología Científica e Inferencia Institucional
          </h3>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569' }}>
            Modelo formal estandarizado basado en las matrices de evaluación de riesgo de los organismos oficiales del Perú.
          </p>
        </header>
        
        <div className="card__body" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {MODULOS_DETALLADOS.map((m) => (
              <div 
                key={m.clave} 
                className="met-card-hover" style={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderLeft: `6px solid ${m.acento}`, borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: '#0F172A' }}>
                    {m.titulo}
                  </h4>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* Badge Entidad Sobrio */}
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '700', 
                      color: m.entidadColor, 
                      backgroundColor: m.entidadBg, 
                      padding: '4px 12px', 
                      borderRadius: '999px',
                      border: `1px solid ${m.entidadColor}30`
                    }}>
                      {m.entidad}
                    </span>

                    {/* Badge Reglas */}
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '600', 
                      color: '#475569', 
                      backgroundColor: '#F1F5F9', 
                      padding: '4px 10px', 
                      borderRadius: '6px',
                      fontFamily: 'monospace'
                    }}>
                      {m.reglas}
                    </span>
                  </div>
                </div>

                <p style={{ margin: '0 0 14px 0', fontSize: '0.9rem', color: '#334155', lineHeight: '1.6' }}>
                  {m.sintesis}
                </p>

                {/* Chips de variables consideradas */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Variables:
                  </span>
                  {m.variables.map((v) => (
                    <span key={v} style={{ fontSize: '0.75rem', color: '#475569', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '3px 10px', borderRadius: '6px' }}>
                      • {v}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
