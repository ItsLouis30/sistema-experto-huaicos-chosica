import codecs

# 1. Simplify umbrales text in fields.js for dist_quebrada to prevent text smudging
fields_path = 'src/fields.js'
with codecs.open(fields_path, 'r', 'utf-8') as f:
    fields = f.read()

fields = fields.replace("{ valor: 50, texto: 'Zona crítica ≤ 50 m' }", "{ valor: 50, texto: '≤ 50 m' }")
fields = fields.replace("{ valor: 100, texto: 'Exposición alta ≤ 100 m' }", "{ valor: 100, texto: '≤ 100 m' }")

with codecs.open(fields_path, 'w', 'utf-8') as f:
    f.write(fields)

print('Updated fields.js with compact mark text for dist_quebrada')


# 2. Update index.css for touch-action: pan-x, pointer-events: none on SVG container, and larger thumb
css_path = 'src/index.css'
with codecs.open(css_path, 'r', 'utf-8') as f:
    css = f.read()

# Add pointer-events: none to .dist-svg-container so it never intercepts touch gestures
css = css.replace(
    ".dist-svg-container {",
    ".dist-svg-container {\n  pointer-events: none;"
)

# Add touch-action: pan-x and touch-friendly padding to range input
css = css.replace(
    ".range input[type='range'] {",
    ".range input[type='range'] {\n  touch-action: pan-x;\n  -webkit-tap-highlight-color: transparent;"
)

# Enlarge thumb for mobile touch precision
old_thumb = """.range input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fff;
  border: 6px solid var(--primary-soft);
  box-shadow: 0 0 0 2px var(--primary), 0 4px 10px rgba(67, 83, 255, 0.3);
  cursor: grab;
}"""

new_thumb = """.range input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #fff;
  border: 6px solid var(--primary-soft);
  box-shadow: 0 0 0 2px var(--primary), 0 4px 12px rgba(67, 83, 255, 0.35);
  cursor: grab;
}"""

css = css.replace(old_thumb, new_thumb)

mobile_range_fix = """
  /* Prevenir solapamiento de textos en marcas de rango */
  .range__mark em { font-size: 10px; max-width: 60px; text-align: center; }
  .dist-svg-container { height: 80px; }
"""

if 'mobile_range_fix' not in css:
    css = css.replace(
        ".hero { flex-direction: column; padding: 22px; }",
        ".hero { flex-direction: column; padding: 22px; }\n  .range__mark em { font-size: 10px; max-width: 60px; text-align: center; }\n  .dist-svg-container { height: 80px; }"
    )

with codecs.open(css_path, 'w', 'utf-8') as f:
    f.write(css)

print('Updated index.css with mobile touch-action and range mark fixes')
