import React from 'react';

export default function HeroHeader({ enLinea }) {
  return (
    <div style={{
      position: 'relative',
      backgroundColor: '#0F172A',
      color: '#F8FAFC',
      padding: '4rem 2rem 8rem 2rem',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }}>

      {/* Contenido Textual - Ahora contiene los metadatos integrados */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Kicker institucional */}
        <span style={{
          display: 'inline-block',
          fontSize: '0.75rem',
          fontWeight: '600',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: '#A5B4FC',
          backgroundColor: 'rgba(30, 27, 75, 0.6)',
          border: '1px solid rgba(55, 48, 163, 0.6)',
          padding: '0.25rem 0.75rem',
          borderRadius: '999px',
          marginBottom: '1.5rem'
        }}>
          Sistema Experto • Prevención de Riesgos
        </span>
        
        {/* Título Principal */}
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '1rem', letterSpacing: '-0.02em', textWrap: 'balance' }}>
          Evaluación Preventiva ante Flujo de Detritos (Huaicos)
        </h1>
        
        {/* Subtítulo Técnico */}
        <p style={{ fontSize: '1rem', color: '#E2E8F0', lineHeight: 1.6, maxWidth: '42rem', margin: '0 auto 2rem' }}>
          Diagnóstico preliminar para viviendas en zonas de influencia de Lurigancho-Chosica, basado en metodologías oficiales de CENEPRED, INGEMMET e INDECI.
        </p>

        {/* Metadatos Técnicos Base (Integrados bajo el subtítulo) */}
        <div style={{
          display: 'inline-flex',
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '8px 24px',
          borderRadius: '999px',
          fontSize: '0.75rem',
          color: '#CBD5E1',
          fontWeight: '500'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px' }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: enLinea ? '#22C55E' : '#EF4444', opacity: 0.5, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              <span style={{ position: 'relative', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: enLinea ? '#22C55E' : '#EF4444' }} />
            </span>
            {enLinea === null ? 'Conectando...' : enLinea ? 'En línea' : 'Sin conexión'}
          </div>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <span>Chosica, Lima</span>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <span>ODS 13: Acción por el Clima</span>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <span>Base de 66 Reglas</span>
        </div>

      </div>

      {/* Capas Vectoriales SVG simulando Topografía (Low Poly Angular) */}
      <svg viewBox="0 0 1440 200" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100px', zIndex: 2, pointerEvents: 'none' }} preserveAspectRatio="none">
        
        {/* Capa 1: Fondo Lejano (Cerros puntiagudos) */}
        <path fill="#1C2541" fillOpacity="0.8" d="M0,100 L120,40 L280,80 L450,20 L600,70 L750,10 L950,90 L1100,30 L1300,70 L1440,40 L1440,200 L0,200 Z" />
        
        {/* Capa 2: Medio Plano (Laderas intermedias) */}
        <path fill="#273452" d="M0,130 L180,70 L350,110 L550,50 L700,100 L880,40 L1050,90 L1250,60 L1440,100 L1440,200 L0,200 Z" />
        
        {/* Capa 3: Laderas frontales */}
        <path fill="#3A506B" d="M0,160 L250,100 L480,140 L720,80 L920,130 L1180,70 L1440,120 L1440,200 L0,200 Z" />
        
        {/* Capa 4: Base que se fusiona con el fondo #eef1fb de la app. Cierra horizontalmente casi plano. */}
        <path fill="#eef1fb" d="M0,180 L300,160 L600,175 L900,165 L1200,170 L1440,165 L1440,200 L0,200 Z" />
      </svg>
    </div>
  );
}
