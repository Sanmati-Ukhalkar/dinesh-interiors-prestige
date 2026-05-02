"""
Convert hero sequence PNGs to WebP format.
- Input:  src/assets/hero section frames/*.png
- Output: public/frames/*.webp  (served at /frames/)
- Resize: max 1920px wide (keeps aspect ratio)
- Quality: 82 (good balance of quality vs file size)
"""

import os
import sys
from pathlib import Path
from PIL import Image
import concurrent.futures

INPUT_DIR = Path("src/assets/hero section frames")
OUTPUT_DIR = Path("public/frames")
MAX_WIDTH = 1920
QUALITY = 82

def convert_one(src_path: Path, dst_path: Path) -> str:
    if dst_path.exists():
        return f"  SKIP  {dst_path.name} (already exists)"

    with Image.open(src_path) as img:
        # Resize if wider than MAX_WIDTH
        if img.width > MAX_WIDTH:
            ratio = MAX_WIDTH / img.width
            new_size = (MAX_WIDTH, int(img.height * ratio))
            img = img.resize(new_size, Image.LANCZOS)

        # Convert to RGB (WebP doesn't support palette mode well)
        if img.mode not in ("RGB", "RGBA"):
            img = img.convert("RGB")

        img.save(dst_path, "WEBP", quality=QUALITY, method=4)

    size_kb = dst_path.stat().st_size / 1024
    return f"  OK    {dst_path.name}  ({size_kb:.0f} KB)"


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    png_files = sorted(INPUT_DIR.glob("*.png"))
    if not png_files:
        print(f"No PNG files found in {INPUT_DIR}")
        sys.exit(1)

    print(f"Found {len(png_files)} frames to convert -> {OUTPUT_DIR}")
    print(f"Settings: max_width={MAX_WIDTH}, quality={QUALITY}")
    print("-" * 60)

    # Build (src, dst) pairs
    pairs = []
    for src in png_files:
        # Rename: keep original stem, change extension to .webp
        dst = OUTPUT_DIR / (src.stem + ".webp")
        pairs.append((src, dst))

    # Convert in parallel (CPU-bound, use threads = logical cores)
    results = []
    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = {executor.submit(convert_one, s, d): (s, d) for s, d in pairs}
        done = 0
        for future in concurrent.futures.as_completed(futures):
            done += 1
            try:
                msg = future.result()
            except Exception as e:
                src, dst = futures[future]
                msg = f"  ERR   {src.name}: {e}"
            print(f"[{done:03d}/{len(pairs)}] {msg}")

    print("-" * 60)
    print(f"Done! {len(pairs)} frames written to {OUTPUT_DIR}")

    # Summary: total size
    total_mb = sum(p[1].stat().st_size for p in pairs if p[1].exists()) / 1024 / 1024
    print(f"Total output size: {total_mb:.1f} MB")


if __name__ == "__main__":
    main()
