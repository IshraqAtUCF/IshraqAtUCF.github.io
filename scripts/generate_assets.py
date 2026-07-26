#!/usr/bin/env python3
"""Regenerate the static assets that back the /hello share card.

Everything here is a build-time step: the site itself never loads a
third-party script to draw its own QR code or preview image.

    pip install segno pillow
    python3 scripts/generate_assets.py

Outputs:
    assets/qr-hello.svg          vector QR, for print at any size
    assets/qr-hello.png          raster QR, for slide decks and documents
    assets/og-card.png           1200x630 link-preview image
    assets/Ishraq_Tashdid.vcf    one-tap contact card
    favicon.png                  32x32 browser tab mark
    apple-touch-icon.png         180x180 iOS "Add to Home Screen" mark

Change SHARE_URL here if the canonical share path ever moves; every
artifact that embeds the URL is regenerated from this one constant.
"""

from pathlib import Path

import segno
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"

SHARE_URL = "https://ishraqtashdid.com/hello"

# Design tokens, kept in sync with the :root block in styles.css.
NAVY = "#1e2d5a"
GOLD = "#c9a84c"
WHITE = "#ffffff"
MUTED = "#aab3c7"

FONT_DIR = Path("/usr/share/fonts/truetype/liberation")
FONT_BOLD = FONT_DIR / "LiberationSans-Bold.ttf"
FONT_REGULAR = FONT_DIR / "LiberationSans-Regular.ttf"
FONT_SERIF_BOLD = FONT_DIR / "LiberationSerif-Bold.ttf"


def _font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    if not path.exists():
        raise SystemExit(
            f"Missing font: {path}\n"
            "Install the Liberation fonts (Debian/Ubuntu: "
            "apt-get install fonts-liberation)."
        )
    return ImageFont.truetype(str(path), size)


def build_qr() -> None:
    """Encode SHARE_URL at the highest error correction level.

    error='h' (~30% recovery) is deliberate: this code gets printed small,
    shown on a phone screen, and partly covered by a thumb. border=4 keeps
    the mandatory quiet zone -- cropping it is the most common way people
    break a QR code. Pure black on white for maximum scan contrast; no
    gradients or logo overlays, which hurt reliability.
    """
    qr = segno.make(SHARE_URL, error="h")

    qr.save(ASSETS / "qr-hello.svg", scale=10, border=4,
            dark="#000000", light="#ffffff")
    qr.save(ASSETS / "qr-hello.png", scale=24, border=4,
            dark="#000000", light="#ffffff")

    png = Image.open(ASSETS / "qr-hello.png")
    print(f"  qr-hello.svg / .png  {png.width}x{png.height}px  "
          f"version {qr.version}, error H")


def build_og_card() -> None:
    """1200x630 preview image, typographic only (no photo, by design)."""
    width, height = 1200, 630
    img = Image.new("RGB", (width, height), NAVY)
    draw = ImageDraw.Draw(img)

    name_font = _font(FONT_BOLD, 84)
    title_font = _font(FONT_REGULAR, 36)
    detail_font = _font(FONT_REGULAR, 30)
    url_font = _font(FONT_BOLD, 28)

    left = 88
    draw.text((left, 150), "Ishraq Tashdid", font=name_font, fill=WHITE)

    # Gold rule, echoing the award-badge accent used across the site.
    draw.rectangle([left, 268, left + 120, 274], fill=GOLD)

    title_y = 312
    draw.text((left, title_y),
              "Ph.D. Student, UCF ECE  ·  Security Research Intern, Intel",
              font=title_font, fill=MUTED)
    draw.text((left, title_y + 54),
              "Hardware security · Formal verification · LLM-assisted threat modeling",
              font=detail_font, fill=MUTED)

    draw.text((left, 500), "ishraqtashdid.com", font=url_font, fill=GOLD)

    img.save(ASSETS / "og-card.png", optimize=True)
    print(f"  og-card.png          {width}x{height}px")


def _icon(size: int) -> Image.Image:
    """Navy rounded square with a gold 'IT' monogram.

    Rendered with Pillow rather than hand-written SVG <text> so the glyphs
    rasterize identically everywhere instead of depending on whatever serif
    the viewer's OS happens to resolve.
    """
    scale = 4  # supersample, then downscale for clean edges
    box = size * scale
    img = Image.new("RGBA", (box, box), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    radius = int(box * 0.22)
    draw.rounded_rectangle([0, 0, box - 1, box - 1], radius=radius, fill=NAVY)

    font = _font(FONT_SERIF_BOLD, int(box * 0.52))
    text = "IT"
    l, t, r, b = draw.textbbox((0, 0), text, font=font)
    draw.text(((box - (r - l)) / 2 - l, (box - (b - t)) / 2 - t),
              text, font=font, fill=GOLD)

    return img.resize((size, size), Image.LANCZOS)


def build_icons() -> None:
    _icon(32).save(ROOT / "favicon.png", optimize=True)
    # iOS home-screen icons must not be transparent.
    touch = Image.new("RGB", (180, 180), NAVY)
    touch.paste(_icon(180), (0, 0), _icon(180))
    touch.save(ROOT / "apple-touch-icon.png", optimize=True)
    print("  favicon.png          32x32px")
    print("  apple-touch-icon.png 180x180px")


def build_vcard() -> None:
    """vCard 3.0, not 4.0 -- 3.0 imports far more reliably on iOS/Android.

    Written with explicit CRLF line endings because RFC 2426 requires them;
    some stricter Android importers reject bare LF.
    """
    lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "N:Tashdid;Ishraq;;;",
        "FN:Ishraq Tashdid",
        "TITLE:Ph.D. Student, Computer Engineering",
        "ORG:University of Central Florida",
        "EMAIL;type=INTERNET;type=WORK;type=pref:ishraq.tashdid@ucf.edu",
        "EMAIL;type=INTERNET;type=HOME:tashdid.ishraq@gmail.com",
        "TEL;type=CELL:+16892867719",
        "ADR;type=WORK:;;;Orlando;FL;32817;USA",
        "URL:https://ishraqtashdid.com",
        "X-SOCIALPROFILE;type=linkedin:https://www.linkedin.com/in/ishraqtashdid",
        "X-SOCIALPROFILE;type=github:https://github.com/IshraqAtUCF",
        "NOTE:SoC security\\, formal verification\\, and LLM-assisted threat "
        "modeling. UCF Trustees Doctoral Fellow. ATLAS @ DAC 2026\\; "
        "DAC Young Fellow.",
        "END:VCARD",
    ]
    path = ASSETS / "Ishraq_Tashdid.vcf"
    path.write_bytes(("\r\n".join(lines) + "\r\n").encode("utf-8"))
    print(f"  Ishraq_Tashdid.vcf   {path.stat().st_size} bytes")


def main() -> None:
    ASSETS.mkdir(exist_ok=True)
    print(f"Encoding {SHARE_URL}")
    build_qr()
    build_og_card()
    build_icons()
    build_vcard()
    print("Done.")


if __name__ == "__main__":
    main()
