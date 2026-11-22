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
import hashlib
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
    # --- generated masters (scripts/generate-media.mjs) ---------------------
    # Optional: absent until someone runs the generator with an API key. When
    # missing, the slots that depend on them are skipped and the site keeps
    # using the brand panel, which is the honest fallback.
    "senior": "public/source/generated/senior.png",
    "sport": "public/source/generated/sport.png",
    "massage": "public/source/generated/massage.png",
    "vestibular": "public/source/generated/vestibular.png",
    "pelvic": "public/source/generated/pelvic.png",
    "facility": "public/source/generated/facility.png",
    "reception": "public/source/generated/reception.png",
    "treatment-room": "public/source/generated/treatment-room.png",
    "team": "public/source/generated/team.png",
    "streetscape": "public/source/generated/streetscape.png",
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
    # --- generated subjects (only produced when the generator has run) ----
    "senior-hero": Slot("senior", 4 / 5, (0.50, 0.45), 960),
    "senior-wide": Slot("senior", 16 / 9, (0.50, 0.45), 1400),
    "senior-card": Slot("senior", 4 / 3, (0.50, 0.45), 960),
    "sport-hero": Slot("sport", 4 / 5, (0.50, 0.42), 960),
    "sport-wide": Slot("sport", 16 / 9, (0.50, 0.45), 1400),
    "sport-card": Slot("sport", 4 / 3, (0.50, 0.45), 960),
    "massage-hero": Slot("massage", 4 / 5, (0.48, 0.42), 960),
    "massage-wide": Slot("massage", 16 / 9, (0.50, 0.50), 1400),
    "massage-card": Slot("massage", 4 / 3, (0.50, 0.50), 960),
    "vestibular-hero": Slot("vestibular", 4 / 5, (0.62, 0.42), 960),
    "vestibular-wide": Slot("vestibular", 16 / 9, (0.50, 0.48), 1400),
    "pelvic-hero": Slot("pelvic", 4 / 5, (0.42, 0.45), 960),
    "pelvic-wide": Slot("pelvic", 16 / 9, (0.50, 0.50), 1400),
    "reception-wide": Slot("reception", 16 / 9, (0.50, 0.50), 1400),
    "reception-card": Slot("reception", 4 / 3, (0.50, 0.50), 960),
    "treatment-wide": Slot("treatment-room", 16 / 9, (0.50, 0.50), 1400),
    "treatment-card": Slot("treatment-room", 4 / 3, (0.50, 0.50), 960),
    "team-wide": Slot("team", 16 / 9, (0.50, 0.45), 1400),
    "streetscape-wide": Slot("streetscape", 16 / 9, (0.50, 0.50), 1400),
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
    """Encode to a content-addressed filename.

    Next's image optimizer caches by URL. If a replacement photo keeps the same
    filename the cached (old) bytes can keep being served, which is exactly what
    happened when a generated frame replaced a test image. Hashing the filename
    makes every change a new URL.
    """
    w, h = im.size
    buf = io.BytesIO()
    im.save(buf, "WEBP", quality=QUALITY, method=6)
    payload = buf.getvalue()
    digest = hashlib.sha256(payload).hexdigest()[:8]
    filename = f"{name}-{digest}.webp"
    path = os.path.join(OUT_DIR, filename)
    with open(path, "wb") as fh:
        fh.write(payload)

    im = im  # noqa: PLW0127  (kept for readability below)
    blur = im.copy()
    blur.thumbnail((BLUR_WIDTH, BLUR_WIDTH), Image.LANCZOS)
    buf = io.BytesIO()
    blur.save(buf, "WEBP", quality=45, method=6)
    data = base64.b64encode(buf.getvalue()).decode("ascii")

    return {
        "src": f"/media/{filename}",
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

    # Preserve slots built earlier whose master is not on this machine.
    if os.path.exists(MANIFEST):
        with open(MANIFEST, encoding="utf-8") as fh:
            for name, entry in json.load(fh).items():
                if os.path.exists(os.path.join(ROOT, "public", entry["src"].lstrip("/"))):
                    manifest[name] = entry

    skipped = []
    for name, slot in SLOTS.items():
        source_path = SOURCES.get(slot.source)
        if not source_path or not os.path.exists(os.path.join(ROOT, source_path)):
            skipped.append(f"{name} ({slot.source})")
            continue
        if slot.source not in cache:
            cache[slot.source] = load_source(source_path)
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

    referenced = {os.path.basename(e["src"]) for e in manifest.values()}
    removed = 0
    for existing in os.listdir(OUT_DIR):
        if existing.endswith(".webp") and existing not in referenced:
            os.remove(os.path.join(OUT_DIR, existing))
            removed += 1

    with open(MANIFEST, "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, indent=2, sort_keys=True)
        fh.write("\n")

    if skipped:
        print(f"\nskipped {len(skipped)} slot(s) with no source master:")
        for item in skipped:
            print(f"  - {item}")
        print("  (run `node scripts/generate-media.mjs` with an API key to fill these)")

    print(f"\n{len(manifest)} slots, {total / 1024:.0f} KB total -> public/media/")
    print(f"manifest -> {os.path.relpath(MANIFEST, ROOT)}")


if __name__ == "__main__":
    main()
