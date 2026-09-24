import codecs

css_path = 'src/index.css'
with codecs.open(css_path, 'r', 'utf-8') as f:
    css = f.read()

old_bg = 'background: rgba(30, 41, 59, 0.75);'
new_bg = 'background: rgba(15, 23, 42, 0.94);'

old_border = 'border: 1px solid rgba(255, 255, 255, 0.24);'
new_border = 'border: 1px solid rgba(255, 255, 255, 0.18);'

old_shadow = 'box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45), 0 0 25px rgba(99, 102, 241, 0.22);'
new_shadow = 'box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 10px 30px rgba(15, 23, 42, 0.35);'

css = css.replace(old_bg, new_bg)
css = css.replace(old_border, new_border)
css = css.replace(old_shadow, new_shadow)

with codecs.open(css_path, 'w', 'utf-8') as f:
    f.write(css)

print('Updated sidebar opacity and dark tone')
