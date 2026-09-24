import React from 'react';
import { Icon } from './components';

export default function HeroHeader({ enLinea }) {
  return (
    <div style={{
      position: 'relative',
      backgroundColor: '#0F172A',
      color: '#F8FAFC',
      padding: '4rem 2rem 14rem 2rem',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      {/* Contenido Textual - Posicionado encima para no chocar con el sol */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', width: '100%', marginBottom: '40px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '6px 16px',
          borderRadius: '999px',
          fontSize: '12px',
          fontWeight: '600',
          letterSpacing: '0.05em',
          marginBottom: '24px',
          color: '#E2E8F0'
        }}>
          <span style={{ display: 'flex', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: enLinea ? '#22C55E' : '#EF4444', position: 'relative' }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: enLinea ? '#22C55E' : '#EF4444', opacity: 0.5, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
          </span>
          {enLinea === null ? 'Conectando...' : enLinea ? 'MOTOR CLIPS EN LÍNEA' : 'SISTEMA SIN CONEXIÓN'}
          <span style={{ opacity: 0.5 }}>•</span>
          ODS 13 ACCIÓN POR EL CLIMA
        </div>
        
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '16px', letterSpacing: '-0.02em', textWrap: 'balance' }}>
          ¿Tu vivienda está preparada ante la activación de una quebrada?
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#E2E8F0', lineHeight: 1.6, maxWidth: '42rem', margin: '0 auto' }}>
          Un sistema inteligente diseñado para democratizar la prevención y fortalecer la resiliencia de la comunidad en Lurigancho-Chosica. Evalúa tu nivel de riesgo ahora.
        </p>
      </div>

      {/* Sol / Luna Resplandeciente - Posicionado abajo y a la derecha */}
      <div style={{
        position: 'absolute',
        bottom: '120px',
        right: '25%',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: '#FBBF24',
        boxShadow: '0 0 60px 30px rgba(251, 191, 36, 0.2)',
        zIndex: 1
      }} />

      {/* Capas Vectoriales SVG simulando Topografía (Low Poly Angular) */}
      <svg viewBox="0 0 1440 320" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 'auto', minHeight: '220px', zIndex: 2, pointerEvents: 'none' }} preserveAspectRatio="none">
        
        {/* Capa 1: Fondo Lejano (Cerros puntiagudos) */}
        <path fill="#1C2541" fillOpacity="0.8" d="M0,200 L120,120 L280,180 L450,90 L600,160 L750,70 L950,190 L1100,100 L1300,160 L1440,110 L1440,320 L0,320 Z" />
        
        {/* Capa 2: Medio Plano (Laderas intermedias) */}
        <path fill="#273452" d="M0,250 L180,170 L350,230 L550,130 L700,210 L880,120 L1050,200 L1250,140 L1440,210 L1440,320 L0,320 Z" />
        
        {/* Capa 3: Laderas frontales */}
        <path fill="#3A506B" d="M0,290 L250,210 L480,270 L720,190 L920,260 L1180,180 L1440,260 L1440,320 L0,320 Z" />
        
        {/* Capa 4: Base que se fusiona con el fondo #eef1fb de la app */}
        <path fill="#eef1fb" d="M0,320 L300,280 L600,310 L900,260 L1200,300 L1440,280 L1440,320 L0,320 Z" />
      </svg>
    </div>
  );
}
