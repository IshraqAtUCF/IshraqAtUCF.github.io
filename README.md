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

The CV is kept as LaTeX source in the repo, so updates are a source edit plus a
recompile rather than a binary re-upload:

| File | Role |
| --- | --- |
| `assets/cv/Ishraq_Tashdid_CV.tex` | the source of truth — edit this |
| `assets/Ishraq_Tashdid_CV.pdf` | the compiled download the site links to |

```bash
cd assets/cv
pdflatex -interaction=nonstopmode Ishraq_Tashdid_CV.tex   # run twice
pdflatex -interaction=nonstopmode Ishraq_Tashdid_CV.tex
cp Ishraq_Tashdid_CV.pdf ../Ishraq_Tashdid_CV.pdf
```

Requires `texlive-latex-base`, `texlive-latex-recommended`, `texlive-latex-extra`,
and `texlive-fonts-recommended`.

The download filename is deliberately **stable** (`Ishraq_Tashdid_CV.pdf`) so the
`/hello` visiting card, the QR flow, and any previously shared links keep working
across revisions. The revision date lives *inside* the PDF instead — update the
`Last updated:` line at the bottom of the `.tex` when you make changes.

When you change the CV, also update `cv.html`, which mirrors the same content as
a browsable page.

## Add news
Edit `news.js` and append a new object to `newsItems`.
The site auto-sorts by `sortDate`.

## Visiting card (`/hello`) and show page (`/qr`)

A digital visiting card for meeting people in person. The flow has two sides:

- **`ishraqtashdid.com/qr`** — the page *you* open on your own phone and hold
  out. It shows only a large QR code. It is intentionally unlinked from the
  rest of the site and `noindex`ed.
- **`ishraqtashdid.com/hello`** — where the scan lands: the visiting card
  itself (no QR on it), with CV / Save contact / LinkedIn / GitHub / Scholar /
  Email tiles and a minimal link back to the main site in the footer.
- `ishraqtashdid.com/connect` — spoken-aloud alias, redirects to `/hello`.

GitHub Pages serves `hello.html` at the extensionless `/hello` automatically,
so no configuration is needed. `connect.html` is a client-side redirect stub
(meta refresh + JS + visible fallback), because GitHub Pages has no
server-side redirects.

Both pages are fully self-contained: the Newsreader and Spline Sans Mono
fonts are **self-hosted** in `assets/fonts/`, so the pages make zero
third-party requests — they must paint fast on conference wifi.

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
