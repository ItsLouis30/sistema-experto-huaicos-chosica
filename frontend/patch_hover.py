import codecs

# 1. Update index.css with .met-card-hover rule
css_path = 'src/index.css'
with codecs.open(css_path, 'r', 'utf-8') as f:
    css = f.read()

hover_css = """
/* ---------- Hover sutil para tarjetas en Metodología ---------- */
.met-card-hover {
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
}
.met-card-hover:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08) !important;
  border-color: #cbd5e1 !important;
}
"""

if '.met-card-hover' not in css:
    css += hover_css

with codecs.open(css_path, 'w', 'utf-8') as f:
    f.write(css)

print('Updated index.css with .met-card-hover')


# 2. Update Metodologia.jsx to add className="met-card-hover" to cards
met_path = 'src/Metodologia.jsx'
with codecs.open(met_path, 'r', 'utf-8') as f:
    met = f.read()

# Add className="met-card-hover" to 6 IA component cards
met = met.replace(
    "style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}",
    "className=\"met-card-hover\" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)', cursor: 'default' }}"
)

# Add className="met-card-hover" to Tech Stack cards
met = met.replace(
    "style={{ backgroundColor: '#fff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}",
    "className=\"met-card-hover\" style={{ backgroundColor: '#fff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', cursor: 'default' }}"
)

# Add className="met-card-hover" to 8 Methodology cards
met = met.replace(
    "style={{ \n                  backgroundColor: '#fff', \n                  border: '1px solid #E2E8F0', \n                  borderLeft: `6px solid ${m.acento}`, \n                  borderRadius: '12px', \n                  padding: '20px', \n                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',\n                  transition: 'transform 0.15s ease'\n                }}",
    "className=\"met-card-hover\" style={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderLeft: `6px solid ${m.acento}`, borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}"
)

with codecs.open(met_path, 'w', 'utf-8') as f:
    f.write(met)

print('Updated Metodologia.jsx with met-card-hover class')
