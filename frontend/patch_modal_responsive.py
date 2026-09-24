import codecs

modal_path = 'src/VisualGuideModal.jsx'
with codecs.open(modal_path, 'r', 'utf-8') as f:
    code = f.read()

# Remove emoji 🌧️ from guide
code = code.replace("<div style={{ fontSize: '2rem' }}>🌧️</div>", "")

# Rewrite the modal container structure to have zIndex: 9999, maxHeight: 85vh, scrollable body, fixed footer
old_modal_return = """  return (
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
  );"""

new_modal_return = """  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(6px)', padding: '1rem'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: '#fff', borderRadius: '1.25rem', width: '100%', maxWidth: '500px',
        maxHeight: '85vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)', overflow: 'hidden'
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.75rem 1rem 0.25rem 1rem', flexShrink: 0 }}>
          <button onClick={onClose} aria-label="Cerrar modal" style={{
            width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#F1F5F9',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B',
            fontSize: '18px', fontWeight: 'bold', cursor: 'pointer'
          }}>
            &times;
          </button>
        </div>
        <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', overflowY: 'auto', flex: 1 }}>
          {content}
        </div>
        <div style={{ padding: '1rem 1.5rem', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', textAlign: 'center', flexShrink: 0 }}>
          <button onClick={onClose} style={{
            backgroundColor: '#4353FF', color: '#fff', padding: '0.75rem 2.5rem', borderRadius: '0.5rem',
            fontWeight: '600', fontSize: '0.95rem', boxShadow: '0 4px 10px rgba(67, 83, 255, 0.3)', width: '100%', maxWidth: '280px', cursor: 'pointer'
          }}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );"""

code = code.replace(old_modal_return, new_modal_return)

with codecs.open(modal_path, 'w', 'utf-8') as f:
    f.write(code)

print('Updated VisualGuideModal.jsx with responsive modal styling')
