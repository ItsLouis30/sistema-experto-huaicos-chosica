import codecs

fields_path = 'src/fields.js'
with codecs.open(fields_path, 'r', 'utf-8') as f:
    content = f.read()

old_suelo_exact = "{ value: 'material_suelto', label: 'Material suelto', detalle: 'Arena, grava o rocas sueltas' }"
new_suelo_exact = """{ 
        value: 'material_suelto', 
        label: 'Material suelto', 
        detalle: 'Arena, grava o rocas sueltas',
        grafico: '<svg viewBox="0 0 48 40" width="48" height="40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="40" height="28" rx="6" stroke="currentColor" fill="currentColor" fill-opacity="0.05" /><circle cx="14" cy="16" r="3" fill="#d97706" stroke="none" class="anim-vibrar" /><circle cx="26" cy="14" r="2" fill="#d97706" stroke="none" class="anim-vibrar anim-delay-1" /><circle cx="36" cy="18" r="3.5" fill="#d97706" stroke="none" class="anim-vibrar anim-delay-2" /><polygon points="12,26 18,24 16,30" fill="currentColor" fill-opacity="0.3" stroke="currentColor" class="anim-vibrar anim-delay-1" /><polygon points="24,25 32,23 30,29" fill="currentColor" fill-opacity="0.3" stroke="currentColor" class="anim-vibrar" /><circle cx="36" cy="27" r="2" fill="#d97706" stroke="none" class="anim-vibrar anim-delay-2" /></svg>'
      }"""

old_roca_exact = "{ value: 'roca_consolidada', label: 'Roca consolidada', detalle: 'Roca firme y compacta' }"
new_roca_exact = """{ 
        value: 'roca_consolidada', 
        label: 'Roca consolidada', 
        detalle: 'Roca firme y compacta',
        grafico: '<svg viewBox="0 0 48 40" width="48" height="40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="40" height="28" rx="6" fill="currentColor" fill-opacity="0.08" stroke="currentColor" /><path d="M12,6 L20,20 L16,34" stroke="#4353ff" stroke-width="1.8" class="anim-destello-roca" /><path d="M28,6 L24,18 L34,34" stroke="#4353ff" stroke-width="1.8" class="anim-destello-roca" /><path d="M4,20 L44,20" stroke="currentColor" stroke-dasharray="3 3" opacity="0.5" /></svg>'
      }"""

old_si_exact = "{ value: 'sí', label: 'Sí, se ha activado', detalle: 'Se han registrado huaicos o desbordes en años anteriores' }"
new_si_exact = """{ 
        value: 'sí', 
        label: 'Sí, se ha activado', 
        detalle: 'Historial de flujo de detritos o desbordes',
        grafico: '<svg viewBox="0 0 48 40" width="48" height="40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4,10 L24,32 L44,10" stroke="currentColor" stroke-width="2" /><path d="M10,16 L24,30 L38,16" stroke="#e11d48" stroke-width="1.8" stroke-dasharray="4 3" class="anim-flujo-historico" /><path d="M14,10 L24,21 L34,10" stroke="#e11d48" stroke-width="1.8" stroke-dasharray="4 3" class="anim-flujo-historico anim-delay-1" /><path d="M24,12 L24,24 M20,20 L24,24 L28,20" stroke="#e11d48" stroke-width="1.6" class="anim-flujo-historico" /></svg>'
      }"""

old_no_exact = "{ value: 'no', label: 'No / Sin registro', detalle: 'Históricamente no ha bajado flujo por este sector' }"
new_no_exact = """{ 
        value: 'no', 
        label: 'No / Sin registro', 
        detalle: 'Sin registro histórico de activaciones',
        grafico: '<svg viewBox="0 0 48 40" width="48" height="40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6,14 C12,32 36,32 42,14" stroke="currentColor" stroke-width="2" /><line x1="14" y1="28" x2="34" y2="28" stroke="#16a34a" stroke-width="2.5" class="anim-reposo" /><path d="M18,28 L18,22 M16,24 L18,22 L20,24" stroke="#16a34a" stroke-width="1.4" /><path d="M30,28 L30,23 M28,25 L30,23 L32,25" stroke="#16a34a" stroke-width="1.4" /></svg>'
      }"""

content = content.replace(old_suelo_exact, new_suelo_exact)
content = content.replace(old_roca_exact, new_roca_exact)
content = content.replace(old_si_exact, new_si_exact)
content = content.replace(old_no_exact, new_no_exact)

with codecs.open(fields_path, 'w', 'utf-8') as f:
    f.write(content)

print('Replaced Suelo and Antecedente exact lines in fields.js')
