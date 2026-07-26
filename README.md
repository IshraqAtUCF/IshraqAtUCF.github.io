# Ishraq Tashdid — Academic GitHub Pages Website

Minimal academic website with:
- Home page
- CV page (embedded PDF)
- News section (auto-sorted latest-first)
- Share card at `/hello` for QR-code networking
- Clean, minimal styling

## Quick Start (GitHub Pages)

### Option A: Personal site (recommended)
Create a repository named:

`IshraqAtUCF.github.io`

Upload all files from this folder to the repo root.

Your site will be available at:
`https://IshraqAtUCF.github.io`

### Option B: Project site
Use any repo name, then enable **Settings → Pages** and deploy from **main / root**.

## Update your CV
Replace:
`assets/Ishraq_Tashdid_CV.pdf`

with your latest compiled CV PDF.

## Add news
Edit `news.js` and append a new object to `newsItems`.
The site auto-sorts by `sortDate`.

## Share card (`/hello`)

A single-screen contact card built for handing out a QR code in person.
Reachable at both:

- `ishraqtashdid.com/hello` — canonical page (`hello.html`)
- `ishraqtashdid.com/connect` — spoken-aloud alias, redirects to `/hello`

GitHub Pages serves `hello.html` at the extensionless `/hello` automatically,
so no configuration is needed. `connect.html` is a client-side redirect stub
(meta refresh + JS + visible fallback), because GitHub Pages has no
server-side redirects.

The page deliberately loads **no web fonts and no third-party scripts** — it
gets opened on conference wifi, so it must paint from same-origin assets only.

### Before each conference

Edit the one block in `hello.html` marked:

```html
<!-- CONFERENCE HOOK: swap this one block per event ... -->
```

That is the "why we're talking" line (currently DAC 2026). Nothing else on the
page is event-specific.

### Regenerate the QR code and other assets

```bash
pip install segno pillow
python3 scripts/generate_assets.py
```

This regenerates, all from the single `SHARE_URL` constant at the top of the
script:

| File | Purpose |
| --- | --- |
| `assets/qr-hello.svg` | vector QR, for print at any size |
| `assets/qr-hello.png` | raster QR, for slide decks and documents |
| `assets/og-card.png` | 1200×630 link-preview image |
| `assets/Ishraq_Tashdid.vcf` | one-tap "Save my contact" card |
| `favicon.png`, `apple-touch-icon.png` | browser tab and iOS home-screen marks |

Run it after changing `SHARE_URL`, your contact details, or your title.

Notes on the QR itself: it is encoded at error-correction level **H** (~30%
recovery) and keeps the mandatory 4-module quiet zone, so it survives being
printed small or partly covered. Verified to still decode when scaled down to
120×120px. Don't crop the white border, and don't recolor it — both hurt scan
reliability.

### Update contact details

Contact details live in `scripts/generate_assets.py` (`build_vcard`) and in the
masthead of `cv.html`. Update both, then re-run the script.

The vCard is intentionally linked **without** a `download` attribute: iOS
Safari hands a plain `.vcf` link to the Contacts importer, but with `download`
it just saves the file instead. The CV PDF link does keep `download`.


> Tip: GitHub Pages URLs are usually accessed in lowercase too, but the repository name for a personal site should match your username: `IshraqAtUCF.github.io`.
