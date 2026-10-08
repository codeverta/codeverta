"""Create small 3:2 WebP copies of images used in the navigation menus.

Requires Pillow. Original product and industry images are left untouched.
"""

import json
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
MANIFEST = ROOT / "lib/navigation-thumbnails.json"
MAX_BYTES = 50_000


def menu_crop(image):
    width, height = image.size
    if width / height > 1.5:
        crop_width = round(height * 1.5)
        left = (width - crop_width) // 2
        return image.crop((left, 0, left + crop_width, height))
    crop_height = round(width / 1.5)
    top = (height - crop_height) // 2
    return image.crop((0, top, width, top + crop_height))


def main():
    sources = json.loads(MANIFEST.read_text())
    results = []
    for source, output in sources.items():
        source_path = PUBLIC / source.lstrip("/")
        output_path = PUBLIC / output.lstrip("/")
        output_path.parent.mkdir(parents=True, exist_ok=True)

        image = menu_crop(Image.open(source_path).convert("RGBA"))
        image.thumbnail((288, 192), Image.Resampling.LANCZOS)
        quality = 82
        while quality >= 38:
            image.save(output_path, format="WEBP", quality=quality, method=5)
            if output_path.stat().st_size <= MAX_BYTES:
                break
            quality -= 4
        if output_path.stat().st_size > MAX_BYTES:
            image.thumbnail((240, 160), Image.Resampling.LANCZOS)
            image.save(output_path, format="WEBP", quality=34, method=5)
        if output_path.stat().st_size > MAX_BYTES:
            raise RuntimeError(f"Thumbnail exceeds 50 KB: {output_path}")
        results.append(output_path.stat().st_size)

    print(f"Compressed {len(results)} thumbnails; largest is {max(results):,} bytes.")


if __name__ == "__main__":
    main()
