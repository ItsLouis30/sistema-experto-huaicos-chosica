import React from 'react';
import { Icon } from './components';

export default function VisualGuideModal({ guideId, onClose }) {
  if (!guideId) return null;

  let content = null;

  if (guideId === 'distancia') {
    content = (
      <>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1E293B' }}>Referencia de Distancia</h3>
        <p style={{ color: '#475569', marginBottom: '1.5rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
          La distancia al cauce principal determina el tiempo de reacción y el impacto directo del flujo.
        </p>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#FEF2F2', borderRadius: '0.5rem', border: '1px solid #FECACA' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#FCA5A5', color: '#991B1B', borderRadius: '0.25rem', fontWeight: 'bold', width: '60px', textAlign: 'center' }}>&le; 50m</div>
            <div style={{ fontSize: '0.9rem' }}><strong>Zona Crítica:</strong> Al borde del cauce o a menos de media cuadra. Impacto inminente.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#FFF7ED', borderRadius: '0.5rem', border: '1px solid #FED7AA' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#FDBA74', color: '#9A3412', borderRadius: '0.25rem', fontWeight: 'bold', width: '60px', textAlign: 'center' }}>100m</div>
            <div style={{ fontSize: '0.9rem' }}><strong>Exposición Alta:</strong> Alrededor de 1 cuadra de distancia. Vulnerable a desbordes.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#F0FDF4', borderRadius: '0.5rem', border: '1px solid #BBF7D0' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#86EFAC', color: '#166534', borderRadius: '0.25rem', fontWeight: 'bold', width: '60px', textAlign: 'center' }}>&gt; 100m</div>
            <div style={{ fontSize: '0.9rem' }}><strong>Menor Riesgo:</strong> Más de una cuadra. Menor probabilidad de impacto directo de la masa principal.</div>
          </div>
        </div>
      </>
    );
  } else if (guideId === 'cono') {
    content = (
      <>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1E293B' }}>Cono de Deyección</h3>
        <p style={{ color: '#475569', marginBottom: '1.5rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
          El cono de deyección o abanico aluvial es la zona donde la quebrada pierde inclinación y se abre, depositando todo el material (lodo, rocas, troncos) arrastrado desde la cima.
        </p>
        <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: '#F8FAFC', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}>
          <svg viewBox="0 0 200 150" style={{ width: '100%', maxWidth: '200px', margin: '0 auto', display: 'block' }}>
            <path d="M70,10 L90,80 L40,140 L160,140 L110,80 L130,10" fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M90,80 L40,140 L160,140 L110,80 Z" fill="#FCA5A5" fillOpacity="0.3" stroke="#EF4444" strokeWidth="2" />
            <text x="100" y="125" fontSize="12" fill="#991B1B" textAnchor="middle" fontWeight="bold">CONO DE DEYECCIÓN</text>
            <text x="100" y="40" fontSize="10" fill="#475569" textAnchor="middle">Cauce estrecho</text>
            <path d="M100,50 L100,70" stroke="#3B82F6" strokeWidth="3" markerEnd="url(#arrow)" />
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#3B82F6" />
              </marker>
            </defs>
          </svg>
          <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#64748B' }}>Si tu vivienda se ubica en el abanico rojo, está en la zona natural de descarga.</p>
        </div>
      </>
    );
  } else if (guideId === 'dique') {
    content = (
      <>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1E293B' }}>Estado de las Obras de Mitigación</h3>
        <p style={{ color: '#475569', marginBottom: '1.5rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
          Un dique colmatado pierde su capacidad de retención y puede empeorar el desastre al actuar como una rampa para los escombros.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#F0FDF4', borderRadius: '0.5rem', border: '1px solid #BBF7D0', textAlign: 'center' }}>
            <strong style={{ color: '#166534', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Operativo (Descolmatado)</strong>
            <svg viewBox="0 0 100 80" style={{ width: '100%', maxWidth: '100px', margin: '0 auto', display: 'block' }}>
              <rect x="20" y="20" width="10" height="60" fill="#94A3B8" />
              <rect x="70" y="20" width="10" height="60" fill="#94A3B8" />
              <rect x="30" y="60" width="40" height="20" fill="#FCA5A5" />
              <line x1="20" y1="40" x2="80" y2="40" stroke="#3B82F6" strokeWidth="2" strokeDasharray="2 2" />
              <text x="50" y="35" fontSize="8" fill="#3B82F6" textAnchor="middle">Capacidad libre</text>
            </svg>
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#FEF2F2', borderRadius: '0.5rem', border: '1px solid #FECACA', textAlign: 'center' }}>
            <strong style={{ color: '#991B1B', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Colmatado / Deteriorado</strong>
            <svg viewBox="0 0 100 80" style={{ width: '100%', maxWidth: '100px', margin: '0 auto', display: 'block' }}>
              <rect x="20" y="20" width="10" height="60" fill="#94A3B8" />
              <rect x="70" y="20" width="10" height="60" fill="#94A3B8" />
              <rect x="30" y="25" width="40" height="55" fill="#FCA5A5" />
              <polygon points="30,25 45,15 60,30 70,20" fill="#FCA5A5" />
              <text x="50" y="10" fontSize="8" fill="#EF4444" textAnchor="middle" fontWeight="bold">Riesgo de desborde</text>
            </svg>
          </div>
        </div>
      </>
    );
  } else if (guideId === 'precipitacion') {
    content = (
      <>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1E293B' }}>Precipitación Acumulada</h3>
        <div style={{ backgroundColor: '#EEF2FF', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #C7D2FE', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '2rem' }}>🌧️</div>
          <div>
            <p style={{ color: '#3730A3', margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>
              <strong>1 mm de lluvia</strong> equivale exactamente a <strong>1 litro de agua</strong> derramado sobre un área de 1 metro cuadrado.
            </p>
          </div>
        </div>
        <p style={{ color: '#475569', marginBottom: '1rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
          En la zona de Chosica, el suelo tiene poca capacidad de absorción.
        </p>
        <ul style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '1.2rem', margin: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Menos de 10 mm:</strong> Humedece la superficie pero no genera escorrentía peligrosa.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>20 a 40 mm:</strong> Lluvia moderada a fuerte. Empiezan a formarse riachuelos.</li>
          <li><strong style={{ color: '#DC2626' }}>60 mm o más (en 3 días):</strong> El suelo se satura por completo. Es el umbral crítico histórico donde las quebradas de Chosica se activan y descienden flujos de lodo y piedras.</li>
        </ul>
      </>
    );
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#fff', borderRadius: '1rem', width: '100%', maxWidth: '500px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
          <button onClick={onClose} style={{
            width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#F1F5F9',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B'
          }}>
            &times;
          </button>
        </div>
        <div style={{ padding: '0 2rem 2rem 2rem' }}>
          {content}
        </div>
        <div style={{ padding: '1rem 2rem', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
          <button onClick={onClose} style={{
            backgroundColor: '#4353FF', color: '#fff', padding: '0.75rem 2rem', borderRadius: '0.5rem',
            fontWeight: '600', fontSize: '0.9rem', boxShadow: '0 4px 6px -1px rgba(67, 83, 255, 0.3)'
          }}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
