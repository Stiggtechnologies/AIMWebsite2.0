#!/usr/bin/env python3
"""
Build the AIM site photo library from the approved source renders.

Why a script: the interim photography is a small set of source renders that get
reused across many page types. Cropping and grading by hand drifts; this keeps
every slot on the same ratio set, the same colour treatment and the same encode
settings, so the site reads as one shoot.

Replacing these with commissioned clinic photography is a file drop:
put the new master in public/source/ and update SOURCES / SLOTS below, or simply
overwrite the generated files at the same paths and dimensions.

Requires: Pillow (python3 -m pip install pillow)
Run:      python3 scripts/build-media.py
"""

from __future__ import annotations

import base64
import io
import json
import os
from dataclasses import dataclass

import numpy as np
from PIL import Image, ImageFilter, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "public", "media")
MANIFEST = os.path.join(ROOT, "lib", "media.generated.json")

# --------------------------------------------------------------------------
# Sources. Each is the largest clean photographic frame we hold today.
# --------------------------------------------------------------------------
SOURCES = {
    # therapist assessing a patient's shoulder in a treatment room
    "assess": "public/marketing/chiropractic-assessment-human-square-v2.png",
    # clinician reviewing a return-to-work plan with two workers on site
    "work": "public/partners/employer-return-to-work-hero.webp",
    # clinician and physician reviewing a case in a bright clinic
    "refer": "public/partners/healthcare-referrers-hero.webp",
    # clinical team meeting with legal counsel
    "legal": "public/partners/legal-referrals-hero.webp",
}


@dataclass(frozen=True)
class Slot:
    """One image slot.

    source: key in SOURCES
    ratio:  target width / height
    focus:  (x, y) in 0..1 — the point that must survive the crop
    width:  output width in px (height follows the ratio)
    """

    source: str
    ratio: float
    focus: tuple[float, float]
    width: int


SLOTS: dict[str, Slot] = {
    # --- assessment / treatment -------------------------------------------
    "assess-hero": Slot("assess", 4 / 5, (0.52, 0.42), 960),
    "assess-wide": Slot("assess", 16 / 9, (0.50, 0.45), 1400),
    "assess-card": Slot("assess", 4 / 3, (0.50, 0.45), 960),
    "assess-portrait": Slot("assess", 3 / 4, (0.45, 0.40), 900),
    "assess-detail": Slot("assess", 1 / 1, (0.62, 0.30), 800),
    # --- work injury / return to work -------------------------------------
    "work-hero": Slot("work", 4 / 5, (0.55, 0.45), 960),
    "work-wide": Slot("work", 16 / 9, (0.55, 0.50), 1600),
    "work-card": Slot("work", 4 / 3, (0.55, 0.50), 960),
    "work-detail": Slot("work", 1 / 1, (0.62, 0.55), 800),
    # --- referrers / insurers ---------------------------------------------
    "refer-hero": Slot("refer", 4 / 5, (0.55, 0.45), 960),
    "refer-wide": Slot("refer", 16 / 9, (0.55, 0.50), 1600),
    "refer-card": Slot("refer", 4 / 3, (0.55, 0.50), 960),
    "refer-portrait": Slot("refer", 3 / 4, (0.55, 0.45), 900),
    # --- legal referrals ---------------------------------------------------
    "legal-wide": Slot("legal", 16 / 9, (0.50, 0.50), 1600),
    "legal-card": Slot("legal", 4 / 3, (0.50, 0.50), 960),
    "legal-portrait": Slot("legal", 3 / 4, (0.50, 0.45), 900),
}

QUALITY = 84
BLUR_WIDTH = 24


def load_source(path: str) -> Image.Image:
    im = Image.open(os.path.join(ROOT, path))
    return ImageOps.exif_transpose(im).convert("RGB")


def grade(im: Image.Image) -> Image.Image:
    """One shared look: slightly cooler shadows, lifted highlights, restrained
    saturation. Keeps skin tones intact — the point is that twenty crops read as
    one library, not that the grade is visible."""
    arr = np.asarray(im).astype(np.float32) / 255.0

    # gentle contrast
    arr = (arr - 0.5) * 1.04 + 0.5

    # saturation -6%
    lum = arr @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    arr = lum[..., None] + (arr - lum[..., None]) * 0.94

    # cool the shadows toward AIM navy, lift the highlights toward steel
    navy = np.array([0.059, 0.165, 0.267], dtype=np.float32)
    steel = np.array([0.902, 0.941, 0.957], dtype=np.float32)
    l = np.clip(lum, 0.0, 1.0)
    w_shadow = ((1.0 - l) ** 2)[..., None] * 0.16
    w_high = (np.clip(l, 0.0, 1.0) ** 3)[..., None] * 0.05
    arr = arr * (1.0 - w_shadow) + navy * w_shadow
    arr = arr * (1.0 - w_high) + steel * w_high

    return Image.fromarray((np.clip(arr, 0.0, 1.0) * 255).astype(np.uint8))


def crop_to_ratio(im: Image.Image, ratio: float, focus: tuple[float, float]) -> Image.Image:
    """Largest crop of the requested ratio, positioned around the focus point and
    clamped so it never leaves the frame."""
    w, h = im.size
    if w / h > ratio:  # too wide -> trim sides
        cw, ch = round(h * ratio), h
    else:  # too tall -> trim top/bottom
        cw, ch = w, round(w / ratio)

    fx, fy = focus
    left = round(fx * w - cw / 2)
    top = round(fy * h - ch / 2)
    left = max(0, min(left, w - cw))
    top = max(0, min(top, h - ch))
    return im.crop((left, top, left + cw, top + ch))


def encode(im: Image.Image, name: str) -> dict:
    w, h = im.size
    path = os.path.join(OUT_DIR, f"{name}.webp")
    im.save(path, "WEBP", quality=QUALITY, method=6)

    blur = im.copy()
    blur.thumbnail((BLUR_WIDTH, BLUR_WIDTH), Image.LANCZOS)
    buf = io.BytesIO()
    blur.save(buf, "WEBP", quality=45, method=6)
    data = base64.b64encode(buf.getvalue()).decode("ascii")

    return {
        "src": f"/media/{name}.webp",
        "width": w,
        "height": h,
        "bytes": os.path.getsize(path),
        "blurDataURL": f"data:image/webp;base64,{data}",
    }


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    cache: dict[str, Image.Image] = {}
    manifest: dict[str, dict] = {}
    total = 0

    for name, slot in SLOTS.items():
        if slot.source not in cache:
            cache[slot.source] = load_source(SOURCES[slot.source])
        src = cache[slot.source]

        cropped = crop_to_ratio(src, slot.ratio, slot.focus)
        width = min(slot.width, cropped.width)
        height = round(width / slot.ratio)
        resized = cropped.resize((width, height), Image.LANCZOS)
        resized = resized.filter(ImageFilter.UnsharpMask(radius=1.0, percent=55, threshold=3))
        resized = grade(resized)

        entry = encode(resized, name)
        manifest[name] = entry
        total += entry["bytes"]
        print(f"  {name:<16} {entry['width']:>4}x{entry['height']:<4} {entry['bytes'] / 1024:6.1f} KB")

    with open(MANIFEST, "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, indent=2, sort_keys=True)
        fh.write("\n")

    print(f"\n{len(manifest)} slots, {total / 1024:.0f} KB total -> public/media/")
    print(f"manifest -> {os.path.relpath(MANIFEST, ROOT)}")


if __name__ == "__main__":
    main()
