import codecs

# 1. Update index.css
css_path = 'src/index.css'
with codecs.open(css_path, 'r', 'utf-8') as f:
    css = f.read()

if 'overflow-x: hidden' not in css:
    css = css.replace('body { margin: 0; background: var(--bg); }', 'html, body { margin: 0; padding: 0; background: var(--bg); overflow-x: hidden; width: 100vw; max-width: 100%; }')

# Fix responsive classes for card__body
css += "\n.card__body-responsive { padding: 0 16px 16px; }\n@media (min-width: 768px) { .card__body-responsive { padding: 0 24px 24px; } }\n"

with codecs.open(css_path, 'w', 'utf-8') as f:
    f.write(css)


# 2. Update ReglasView.jsx
reg_path = 'src/ReglasView.jsx'
with codecs.open(reg_path, 'r', 'utf-8') as f:
    reg = f.read()

old_pre = "backgroundColor: 'var(--bg-soft)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--ink-2)'"
new_pre = "backgroundColor: 'var(--bg-soft)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--ink-2)', whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word', overflowX: 'hidden', width: '100%', boxSizing: 'border-box'"
reg = reg.replace(old_pre, new_pre)

old_flex = "display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px'"
new_flex = "display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px'"
reg = reg.replace(old_flex, new_flex)

# Fix filter container width
old_filt = "style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}"
new_filt = "style={{ marginBottom: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}"
reg = reg.replace(old_filt, new_filt)

# Remove hardcoded padding
reg = reg.replace("style={{ padding: '0 24px 24px' }}", "className=\"card__body-responsive\"")

with codecs.open(reg_path, 'w', 'utf-8') as f:
    f.write(reg)

# 3. Update AdquisicionView.jsx
adv_path = 'src/AdquisicionView.jsx'
with codecs.open(adv_path, 'r', 'utf-8') as f:
    adv = f.read()

# Fix form grid overflow
adv = adv.replace("gridTemplateColumns: '1fr 1fr'", "gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))'")
adv = adv.replace("style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}", "style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center', width: '100%' }}")
adv = adv.replace("style={{ display: 'flex', gap: '1rem' }}", "style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}")

# Fix Nota Técnica
old_nota = "style={{ padding: '1rem', backgroundColor: '#FEF3C7', borderLeft: '4px solid #F59E0B', color: '#92400E', marginBottom: '2rem', fontSize: '0.9rem' }}"
new_nota = "style={{ padding: '1rem', backgroundColor: '#FEF3C7', borderLeft: '4px solid #F59E0B', color: '#92400E', marginBottom: '1rem', fontSize: '0.9rem', width: '100%', boxSizing: 'border-box' }}"
adv = adv.replace(old_nota, new_nota)

# Remove hardcoded padding
adv = adv.replace("style={{ padding: '0 24px 24px' }}", "className=\"card__body-responsive\"")

# Fix form width
adv = adv.replace("style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}", "style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', width: '100%', boxSizing: 'border-box' }}")

with codecs.open(adv_path, 'w', 'utf-8') as f:
    f.write(adv)

print('Patch completed.')
