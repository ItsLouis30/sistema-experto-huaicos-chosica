import codecs

# 1. Update components.jsx
comp_path = 'src/components.jsx'
with codecs.open(comp_path, 'r', 'utf-8') as f:
    comp = f.read()

# Add Icon.github if missing
if 'github:' not in comp:
    github_def = '  github: (p) => (<svg {...base} {...p}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>),\n'
    comp = comp.replace('  list: (p)', github_def + '  list: (p)')

# Update Sidebar implementation to include GitHub link
sidebar_new = '''export function Sidebar({ vista, onVista }) {
  const items = [
    { id: 'evaluacion', icon: Icon.form, label: 'Evaluación' },
    { id: 'adquisicion', icon: Icon.brain, label: 'Portal Expertos' },
    { id: 'reglas', icon: Icon.list, label: 'Base de Reglas' },
    { id: 'metodologia', icon: Icon.book, label: 'Metodología' },
  ]
  return (
    <aside className="sidebar">
      <div className="sidebar__logo" title="SBC Huaicos Chosica"><Icon.logo width={30} height={30} /></div>
      <nav className="sidebar__nav">
        {items.map(({ id, icon: I, label }) => (
          <button key={id} className={`sidebar__item ${vista === id ? 'is-active' : ''}`} onClick={() => onVista(id)} title={label} aria-label={label}>
            <I />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar__sep"></div>
      <a href="https://github.com/ItsLouis30/sistema-experto-huaicos-chosica" target="_blank" rel="noreferrer" className="sidebar__item sidebar__item--github" title="Ver código en GitHub" aria-label="GitHub">
        <Icon.github />
        <span>GitHub</span>
      </a>
    </aside>
  )
}'''

# Replace Sidebar function in components.jsx
import re
comp = re.sub(r'export function Sidebar\(\{ vista, onVista \}\) \{[\s\S]*?\n\}', sidebar_new, comp)

with codecs.open(comp_path, 'w', 'utf-8') as f:
    f.write(comp)
print('Updated components.jsx')


# 2. Update index.css
css_path = 'src/index.css'
with codecs.open(css_path, 'r', 'utf-8') as f:
    css = f.read()

# Fix layout padding-left on .main (REMOVE 120px padding from .main so header spans 100% edge-to-edge)
css = re.sub(r'\.main \{ flex: 1; min-width: 0; display: flex; flex-direction: column; padding-left: 120px; \}', '.main { flex: 1; min-width: 0; display: flex; flex-direction: column; padding-left: 0; }', css)

# Adjust .content and .topbar padding for desktop so content clears the floating capsule
css = css.replace('.content { padding: 28px 32px 48px; }', '.content { padding: 28px 32px 48px 140px; }')
css = css.replace('.content { padding: 28px 32px 48px 150px; }', '.content { padding: 28px 32px 48px 140px; }')
css = css.replace('.topbar {\n  background: var(--card);\n  padding: 18px 32px;', '.topbar {\n  background: var(--card);\n  padding: 18px 32px 18px 140px;')
css = css.replace('.topbar {\n  background: var(--card);\n  padding: 18px 32px 18px 150px;', '.topbar {\n  background: var(--card);\n  padding: 18px 32px 18px 140px;')

# Capsule styles in Desktop
sidebar_css_desktop = """.sidebar {
  width: 88px;
  background: rgba(15, 23, 42, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  color: #c9cdf2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 0 28px 0;
  position: fixed;
  top: 50%;
  left: 24px;
  transform: translateY(-50%);
  height: auto;
  max-height: calc(100vh - 60px);
  border-radius: 44px;
  z-index: 1000;
  overflow-y: auto;
  flex-shrink: 0;
  scrollbar-width: none;
}
.sidebar::-webkit-scrollbar { display: none; }
.sidebar__logo { color: #fff; margin-bottom: 24px; }
.sidebar__nav { display: flex; flex-direction: column; gap: 18px; align-items: center; width: 100%; }
.sidebar__sep { width: 36px; height: 1px; background-color: rgba(255, 255, 255, 0.12); margin: 18px 0; flex-shrink: 0; }
.sidebar__item {
  width: 68px;
  padding: 10px 0;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 600;
  color: inherit;
  position: relative;
  text-decoration: none;
  transition: all 0.2s ease;
}
.sidebar__item:hover { background: rgba(255, 255, 255, 0.1); color: #fff; transform: translateY(-1px); }
.sidebar__item.is-active {
  background: rgba(99, 102, 241, 0.25);
  color: #818cf8;
  border: 1px solid rgba(99, 102, 241, 0.35);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}
.sidebar__item.is-active::before { display: none; }"""

# Replace desktop sidebar block in index.css
css = re.sub(r'\.sidebar \{[\s\S]*?\.sidebar__item\.is-active::before \{[^}]*\}', sidebar_css_desktop, css)

# Mobile media query fix
mobile_css = """@media (max-width: 720px) {
  .app { flex-direction: column; }
  .main { padding-left: 0; }
  .sidebar {
    width: 100%;
    height: auto;
    max-height: none;
    flex-direction: row;
    padding: 8px 12px;
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    border-radius: 20px 20px 0 0;
    transform: none;
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.4);
    justify-content: space-around;
    overflow-y: visible;
  }
  .sidebar__logo, .sidebar__sep { display: none; }
  .sidebar__nav { flex-direction: row; width: auto; gap: 4px; justify-content: space-around; flex: 1; }
  .sidebar__item span { display: none; }
  .sidebar__item { width: auto; padding: 10px 14px; flex-direction: column; justify-content: center; }
  .sidebar__item svg { width: 22px; height: 22px; }
  .topbar, .contextbar { padding-left: 16px; padding-right: 16px; }
  .topbar h1 { font-size: 17px; }
  .estado { font-size: 0; padding: 8px; gap: 0; }
  .contextbar__hide-sm, .contextbar__sep { display: none; }
  .content { padding: 16px 16px 100px; }
  .card { padding: 20px; }
  .content__stepper { padding: 16px 8px 12px; }
  .stepper__label { display: none; }
  .stepper__line { left: calc(50% + 20px); right: calc(-50% + 20px); top: 17px; }
  .form-card__head, .form-card__body, .form-card__foot { padding-left: 18px; padding-right: 18px; }
  .chip--rich { min-width: 0; flex: 1 1 140px; }
  .hero { flex-direction: column; padding: 22px; }
  .app h1 { font-size: 1.8rem !important; margin-bottom: 0.5rem !important; text-wrap: balance; line-height: 1.2 !important; }
  .app p { font-size: 0.9rem !important; margin-bottom: 1rem !important; }
}"""

css = re.sub(r'@media \(max-width: 720px\) \{[\s\S]*', mobile_css, css)

with codecs.open(css_path, 'w', 'utf-8') as f:
    f.write(css)

print('Updated index.css')
