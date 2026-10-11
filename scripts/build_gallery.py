"""Generate gallery JSON automatically from photographs in assets/gallery/."""
import json
import re
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parent.parent
GALLERY = ROOT / 'assets' / 'gallery'
SUPPORTED = {'.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'}

def natural_key(path):
    return [int(s) if s.isdigit() else s.lower() for s in re.split(r'(\d+)', path.name)]

photos = []
for image in sorted(GALLERY.iterdir(), key=natural_key):
    if not image.is_file() or image.name.startswith('.') or image.suffix.lower() not in SUPPORTED:
        continue
    title = image.stem.replace('_', ' ').replace('-', ' ').strip()
    photos.append({'src': 'assets/gallery/' + quote(image.name), 'caption': title or 'Cherished memory'})
(ROOT / 'assets' / 'gallery.json').write_text(json.dumps(photos, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
print(f'Prepared {len(photos)} gallery photographs.')
