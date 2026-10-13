"""Generate transparent product cutouts for the hero.
Run on a machine that can reach gdotcollection.com:
    pip install "rembg[cpu]" pillow requests
    python scripts/make-cutouts.py
Output: public/cutouts/<slug>.png (alpha PNG). The hero uses these automatically; originals stay in the product galleries.
Always eyeball the results: if a cutout looks rough (lost lace/dupatta edges), delete that file and the hero falls back to the original photo.
"""
import io, re, pathlib, requests
from PIL import Image
from rembg import new_session, remove
root = pathlib.Path(__file__).resolve().parent.parent
src = (root / "data/products.ts").read_text()
items = re.findall(r'"slug": "([^"]+)".*?"image": "([^"]+)"', src, re.S)
try: sess = new_session("birefnet-general")   # best edge quality for hair/lace/dupatta
except Exception: sess = new_session("u2net")
out = root / "public/cutouts"; out.mkdir(parents=True, exist_ok=True)
for slug, url in items:
    full = re.sub(r"-\d+x\d+(\.\w+)$", r"\1", url)  # prefer the full-resolution upload
    r = requests.get(full, timeout=60)
    if r.status_code != 200: r = requests.get(url, timeout=60)
    r.raise_for_status()
    img = Image.open(io.BytesIO(r.content)).convert("RGBA")
    cut = remove(img, session=sess, alpha_matting=True, alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=10)
    cut = cut.crop(cut.getbbox()); cut.thumbnail((1100, 1650))
    cut.save(out / f"{slug}.png", optimize=True); print("ok", slug, cut.size)
