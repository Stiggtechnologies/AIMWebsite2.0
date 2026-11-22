#!/usr/bin/env python3
"""
Build Open Graph / social share cards (1200x630).

Why this exists: the site had no og:image at all, so every link shared to
LinkedIn, Facebook, WhatsApp, iMessage or a referral email rendered as a blank
grey card. For a clinic that runs Meta ads and gets B2B referrals, the share
card is often the first impression before the page is opened.

Design is fixed so cards are recognisable at thumbnail size: navy field, photo
bleeding off the right edge, logo on a white chip, one teal eyebrow line, one
headline, URL + phone along the bottom.

Requires: Pillow
Run:      python3 scripts/build-og.py
"""

from __future__ import annotations

import os

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "public", "og")
LEGACY_DIR = os.path.join(ROOT, "public", "images")

W, H = 1200, 630
NAVY = (15, 42, 68)
TEAL = (47, 164, 169)
WHITE = (255, 255, 255)

FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_BLACK = "/System/Library/Fonts/Supplemental/Arial Black.ttf"
FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"

LOGO = os.path.join(ROOT, "public", "aim-logo-28oct18-resized.jpg")

CARDS = [
    dict(
        out="default.jpg",
        eyebrow="PHYSIOTHERAPY · EDMONTON & ALBERTA",
        headline="Get back to what matters most",
        photo="media/assess-wide.webp",
        focus=0.52,
    ),
    dict(
        out="wcb.jpg",
        eyebrow="WCB REHABILITATION",
        headline="Return-to-work rehab built around the job",
        photo="media/work-wide.webp",
        focus=0.55,
    ),
    dict(
        out="mva.jpg",
        eyebrow="MOTOR VEHICLE ACCIDENT",
        headline="MVA recovery with direct insurance billing",
        photo="media/assess-hero.webp",
        focus=0.5,
    ),
    dict(
        out="athletic.jpg",
        eyebrow="ATHLETIC PERFORMANCE",
        headline="Sport rehabilitation and return to sport",
        photo="media/assess-portrait.webp",
        focus=0.5,
    ),
    dict(
        out="employers.jpg",
        eyebrow="FOR EMPLOYERS",
        headline="Early intervention that keeps people at work",
        photo="media/work-wide.webp",
        focus=0.42,
    ),
    dict(
        out="senior.jpg",
        eyebrow="SENIOR MOBILITY",
        headline="Balance, strength and fall prevention",
        photo=None,
        focus=None,
    ),
    dict(
        out="south-common.jpg",
        eyebrow="AIM PERFORMANCE · SOUTH COMMON",
        headline="Physiotherapy and performance in South Common",
        photo="media/assess-card.webp",
        focus=0.5,
    ),
]


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def draw_tracked(draw: ImageDraw.ImageDraw, xy, text: str, f, fill, tracking: int) -> None:
    """Letter-spaced small caps — Pillow has no letter-spacing setting."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=f, fill=fill)
        x += draw.textlength(ch, font=f) + tracking


def wrap(draw: ImageDraw.ImageDraw, text: str, f, max_width: int) -> list[str]:
    words, lines, line = text.split(), [], ""
    for word in words:
        candidate = f"{line} {word}".strip()
        if draw.textlength(candidate, font=f) <= max_width:
            line = candidate
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def photo_panel(rel_path: str, focus: float) -> Image.Image:
    """Right-hand photo, cropped to a portrait slice and faded into the navy field."""
    src = Image.open(os.path.join(ROOT, "public", rel_path)).convert("RGB")

    target_w, target_h = 620, H
    src_ratio = src.width / src.height
    target_ratio = target_w / target_h

    if src_ratio > target_ratio:
        crop_h = src.height
        crop_w = round(crop_h * target_ratio)
        left = round(focus * src.width - crop_w / 2)
        left = max(0, min(left, src.width - crop_w))
        src = src.crop((left, 0, left + crop_w, crop_h))
    else:
        crop_w = src.width
        crop_h = round(crop_w / target_ratio)
        top = max(0, (src.height - crop_h) // 2)
        src = src.crop((0, top, crop_w, top + crop_h))

    panel = src.resize((target_w, target_h), Image.LANCZOS)

    # Feather the left edge so the photo emerges from the navy field.
    mask = Image.new("L", (target_w, 1), 255)
    fade = 190
    for x in range(fade):
        mask.putpixel((x, 0), int(255 * (x / fade) ** 1.4))
    mask = mask.resize((target_w, target_h))
    return panel, mask


def build(card: dict) -> Image.Image:
    img = Image.new("RGB", (W, H), NAVY)
    draw = ImageDraw.Draw(img)

    # soft teal glow, top-left
    glow = Image.new("RGB", (W, H), NAVY)
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([-260, -320, 620, 420], fill=(22, 74, 96))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    img = Image.blend(img, glow, 0.55)
    draw = ImageDraw.Draw(img)

    if card["photo"]:
        panel, mask = photo_panel(card["photo"], card["focus"] or 0.5)
        img.paste(panel, (W - panel.width, 0), mask)
        draw = ImageDraw.Draw(img)

    # logo on a white chip (the supplied logo is navy/green on white)
    logo = Image.open(LOGO).convert("RGB")
    logo_w = 260
    logo = logo.resize((logo_w, round(logo.height * logo_w / logo.width)), Image.LANCZOS)
    chip_w, chip_h = logo_w + 36, logo.height + 28
    draw.rounded_rectangle([64, 52, 64 + chip_w, 52 + chip_h], radius=14, fill=WHITE)
    img.paste(logo, (64 + 18, 52 + 14))
    draw = ImageDraw.Draw(img)

    # eyebrow
    draw_tracked(draw, (66, 190), card["eyebrow"], font(FONT_BOLD, 19), TEAL, 3)

    # headline
    head_font = font(FONT_BLACK, 62)
    lines = wrap(draw, card["headline"], head_font, 640)
    y = 236
    for line in lines[:3]:
        draw.text((64, y), line, font=head_font, fill=WHITE)
        y += 72

    # rule + footer
    draw.rectangle([66, H - 128, 150, H - 123], fill=TEAL)
    draw.text((66, H - 104), "aimphysiotherapy.ca", font=font(FONT_BOLD, 26), fill=WHITE)
    draw.text((66, H - 68), "(780) 250-8188  ·  Edmonton, Alberta", font=font(FONT_REG, 23), fill=(186, 204, 218))

    return img


def build_icons() -> None:
    """Favicon + apple touch icon.

    The supplied asset is a wide logo lockup on a 1024 white square, which is
    illegible at 32px. Extract the green arrow mark instead and centre it on a
    white tile, which stays legible in both light and dark tab bars.
    """
    src = Image.open(os.path.join(ROOT, "public", "aim-meta-app-icon.png")).convert("RGB")
    px = src.load()
    minx, miny, maxx, maxy = src.width, src.height, 0, 0
    for y in range(src.height):
        for x in range(src.width):
            r, g, b = px[x, y]
            if g > 90 and g > r * 1.5 and g > b * 1.5:
                minx, miny = min(minx, x), min(miny, y)
                maxx, maxy = max(maxx, x), max(maxy, y)

    pad = 6
    mark = src.crop((minx - pad, miny - pad, maxx + pad, maxy + pad))

    for name, size in [("icon.png", 512), ("apple-icon.png", 180)]:
        canvas = Image.new("RGB", (size, size), WHITE)
        inner = int(size * 0.72)
        scaled = mark.resize((inner, round(mark.height * inner / mark.width)), Image.LANCZOS)
        canvas.paste(scaled, ((size - scaled.width) // 2, (size - scaled.height) // 2))
        out = os.path.join(ROOT, "app", name)
        canvas.save(out, "PNG", optimize=True)
        print(f"  app/{name:<16} {size}x{size}  {os.path.getsize(out) / 1024:5.1f} KB")


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    os.makedirs(LEGACY_DIR, exist_ok=True)

    for card in CARDS:
        img = build(card)
        path = os.path.join(OUT_DIR, card["out"])
        img.save(path, "JPEG", quality=88, optimize=True, progressive=True)
        print(f"  {card['out']:<18} {os.path.getsize(path) / 1024:6.1f} KB")

    print(f"\n{len(CARDS)} social cards -> public/og/")
    build_icons()


if __name__ == "__main__":
    main()
