import codecs

# 1. Update fields.js
fields_path = 'src/fields.js'
with codecs.open(fields_path, 'r', 'utf-8') as f:
    fields = f.read()

# Update tipo_suelo_superficial options with SVGs
old_suelo = """  tipo_suelo_superficial: {
    tipo: 'opciones',
    label: 'Tipo de suelo superficial',
    opciones: [
      { value: 'material_suelto', label: 'Material suelto', detalle: 'Arena, grava o rocas sueltas' },
      { value: 'roca_consolidada', label: 'Roca consolidada', detalle: 'Roca firme y compacta' },
    ],
  },"""

new_suelo = """  tipo_suelo_superficial: {
    tipo: 'opciones',
    label: 'Tipo de suelo superficial',
    ayuda: 'Características litológicas y cohesión de la capa superior del terreno.',
    opciones: [
      { 
        value: 'material_suelto', 
        label: 'Material suelto', 
        detalle: 'Arena, grava o rocas sueltas',
        grafico: '<svg viewBox="0 0 48 40" width="48" height="40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="40" height="28" rx="6" stroke="currentColor" fill="currentColor" fill-opacity="0.05" /><circle cx="14" cy="16" r="3" fill="#d97706" stroke="none" class="anim-vibrar" /><circle cx="26" cy="14" r="2" fill="#d97706" stroke="none" class="anim-vibrar anim-delay-1" /><circle cx="36" cy="18" r="3.5" fill="#d97706" stroke="none" class="anim-vibrar anim-delay-2" /><polygon points="12,26 18,24 16,30" fill="currentColor" fill-opacity="0.3" stroke="currentColor" class="anim-vibrar anim-delay-1" /><polygon points="24,25 32,23 30,29" fill="currentColor" fill-opacity="0.3" stroke="currentColor" class="anim-vibrar" /><circle cx="36" cy="27" r="2" fill="#d97706" stroke="none" class="anim-vibrar anim-delay-2" /></svg>'
      },
      { 
        value: 'roca_consolidada', 
        label: 'Roca consolidada', 
        detalle: 'Roca firme y compacta',
        grafico: '<svg viewBox="0 0 48 40" width="48" height="40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="40" height="28" rx="6" fill="currentColor" fill-opacity="0.08" stroke="currentColor" /><path d="M12,6 L20,20 L16,34" stroke="#4353ff" stroke-width="1.8" class="anim-destello-roca" /><path d="M28,6 L24,18 L34,34" stroke="#4353ff" stroke-width="1.8" class="anim-destello-roca" /><path d="M4,20 L44,20" stroke="currentColor" stroke-dasharray="3 3" opacity="0.5" /></svg>'
      },
    ],
  },"""

fields = fields.replace(old_suelo, new_suelo)

# Update antecedente_activacion options with SVGs
old_antecedente = """  antecedente_activacion: {
    tipo: 'opciones',
    label: '¿La quebrada se activó antes?',
    ayuda: 'Registro histórico de huaicos en la quebrada cercana.',
    opciones: [
      { value: 'sí', label: 'Sí, se ha activado', detalle: 'Se han registrado huaicos o desbordes en años anteriores' },
      { value: 'no', label: 'No / Sin registro', detalle: 'Históricamente no ha bajado flujo por este sector' },
    ],
  },"""

new_antecedente = """  antecedente_activacion: {
    tipo: 'opciones',
    label: '¿La quebrada se activó antes?',
    ayuda: 'Registro histórico de huaicos en la quebrada cercana.',
    opciones: [
      { 
        value: 'sí', 
        label: 'Sí, se ha activado', 
        detalle: 'Historial de flujo de detritos o desbordes',
        grafico: '<svg viewBox="0 0 48 40" width="48" height="40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4,10 L24,32 L44,10" stroke="currentColor" stroke-width="2" /><path d="M10,16 L24,30 L38,16" stroke="#e11d48" stroke-width="1.8" stroke-dasharray="4 3" class="anim-flujo-historico" /><path d="M14,10 L24,21 L34,10" stroke="#e11d48" stroke-width="1.8" stroke-dasharray="4 3" class="anim-flujo-historico anim-delay-1" /><path d="M24,12 L24,24 M20,20 L24,24 L28,20" stroke="#e11d48" stroke-width="1.6" class="anim-flujo-historico" /></svg>'
      },
      { 
        value: 'no', 
        label: 'No / Sin registro', 
        detalle: 'Sin registro histórico de activaciones',
        grafico: '<svg viewBox="0 0 48 40" width="48" height="40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6,14 C12,32 36,32 42,14" stroke="currentColor" stroke-width="2" /><line x1="14" y1="28" x2="34" y2="28" stroke="#16a34a" stroke-width="2.5" class="anim-reposo" /><path d="M18,28 L18,22 M16,24 L18,22 L20,24" stroke="#16a34a" stroke-width="1.4" /><path d="M30,28 L30,23 M28,25 L30,23 L32,25" stroke="#16a34a" stroke-width="1.4" /></svg>'
      },
    ],
  },"""

fields = fields.replace(old_antecedente, new_antecedente)

with codecs.open(fields_path, 'w', 'utf-8') as f:
    f.write(fields)

print('Updated fields.js for Suelo and Antecedente questions')


# 2. Update index.css
css_path = 'src/index.css'
with codecs.open(css_path, 'r', 'utf-8') as f:
    css = f.read()

more_animations = """
/* Vibración suave de partículas de suelo suelto */
@keyframes vibracionSuelo {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}

.chip:hover .anim-vibrar,
.chip.is-selected .anim-vibrar {
  animation: vibracionSuelo 0.8s infinite ease-in-out;
}
.chip:hover .anim-vibrar.anim-delay-1,
.chip.is-selected .anim-vibrar.anim-delay-1 {
  animation-delay: 0.25s;
}
.chip:hover .anim-vibrar.anim-delay-2,
.chip.is-selected .anim-vibrar.anim-delay-2 {
  animation-delay: 0.5s;
}

/* Destello de diaclasas en roca consolidada */
@keyframes destelloRoca {
  0%, 100% { stroke-opacity: 0.4; stroke: #4353ff; }
  50% { stroke-opacity: 1; stroke: #818cf8; stroke-width: 2.2px; }
}

.chip:hover .anim-destello-roca,
.chip.is-selected .anim-destello-roca {
  animation: destelloRoca 1.2s infinite ease-in-out;
}

/* Barrido de flujo histórico descendente */
@keyframes flujoHistorico {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -20; }
}

.chip:hover .anim-flujo-historico,
.chip.is-selected .anim-flujo-historico {
  animation: flujoHistorico 1s infinite linear;
}

/* Estado de reposo ecológico */
@keyframes reposoEcologico {
  0%, 100% { stroke-opacity: 0.7; }
  50% { stroke-opacity: 1; stroke-width: 3px; }
}

.chip:hover .anim-reposo,
.chip.is-selected .anim-reposo {
  animation: reposoEcologico 1.8s infinite ease-in-out;
}
"""

if 'vibracionSuelo' not in css:
    css += more_animations

with codecs.open(css_path, 'w', 'utf-8') as f:
    f.write(css)

print('Updated index.css with Suelo and Antecedente keyframe animations')
