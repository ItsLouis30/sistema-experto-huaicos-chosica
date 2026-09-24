import codecs
import re

fields_path = 'src/fields.js'
with codecs.open(fields_path, 'r', 'utf-8') as f:
    content = f.read()

# Replace using regex pattern
content = re.sub(
    r'export function valoresIniciales\(\) \{[\s\S]*?\n\}',
    'export function valoresIniciales() {\n  const v = {}\n  for (const clave of Object.keys(CAMPOS)) {\n    v[clave] = null\n  }\n  return v\n}',
    content
)

with codecs.open(fields_path, 'w', 'utf-8') as f:
    f.write(content)

print('Replaced valoresIniciales with regex')
