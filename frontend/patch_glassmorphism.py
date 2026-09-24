import codecs

css_path = 'src/index.css'
with codecs.open(css_path, 'r', 'utf-8') as f:
    css = f.read()

# Replace desktop sidebar styles with enhanced glassmorphism, border, and glow shadow
old_sidebar_block = """.sidebar {
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
}"""

new_sidebar_block = """.sidebar {
  width: 88px;
  background: rgba(30, 41, 59, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.24);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45), 0 0 25px rgba(99, 102, 241, 0.22);
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
}"""

css = css.replace(old_sidebar_block, new_sidebar_block)

# Update sep and active item highlights
css = css.replace("background-color: rgba(255, 255, 255, 0.12);", "background-color: rgba(255, 255, 255, 0.2);")

old_active = """background: rgba(99, 102, 241, 0.25);
  color: #818cf8;
  border: 1px solid rgba(99, 102, 241, 0.35);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);"""

new_active = """background: rgba(99, 102, 241, 0.35);
  color: #ffffff;
  border: 1px solid rgba(165, 180, 252, 0.5);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);"""

css = css.replace(old_active, new_active)

with codecs.open(css_path, 'w', 'utf-8') as f:
    f.write(css)

print('Glassmorphism and border glow applied successfully.')
