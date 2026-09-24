import codecs

fields_path = 'src/fields.js'
with codecs.open(fields_path, 'r', 'utf-8') as f:
    content = f.read()

old_val_fn = """export function valoresIniciales() {
  const v = {}
  for (const [clave, campo] of Object.entries(CAMPOS)) {
    v[clave] = campo.tipo === 'numero' ? campo.defecto : null
  }
  return v
}"""

new_val_fn = """export function valoresIniciales() {
  const v = {}
  for (const clave of Object.keys(CAMPOS)) {
    v[clave] = null
  }
  return v
}"""

content = content.replace(old_val_fn, new_val_fn)

with codecs.open(fields_path, 'w', 'utf-8') as f:
    f.write(content)

print('Directly replaced valoresIniciales in fields.js')
