// ── Photo data ────────────────────────────────────────────
//
// Add entries here as you accumulate photos.
// Place image files in: assets/travel/
//
// Fields:
//   src         — relative path to the image file
//   location    — shown in the caption (e.g. "Yosemite NP, CA")
//   category    — "National Park" | "State" | "Conference"
//   isLandscape — true if the image is wider than tall (used by computeLayout)
//   year        — optional; shown after location in caption
//
// Layout note: computeLayout() packs photos into rows of 3 grid columns.
// Landscape photos span 2 cols; the algorithm finds a companion for each one.
// Order photos with this in mind: [landscape, any, landscape, any, ...] keeps
// rows full. Three consecutive non-landscape photos also make a full row.

const photos = [
  {
    src: "assets/travel/yosemite-valley.jpg",
    location: "Yosemite NP, CA",
    category: "National Park",
    isLandscape: true,
  },
  {
    src: "assets/travel/san-francisco.jpg",
    location: "San Francisco, CA",
    category: "State",
    isLandscape: false,
  },
  {
    src: "assets/travel/rocky-mountain.jpg",
    location: "Rocky Mountain NP, CO",
    category: "National Park",
    isLandscape: true,
  },
  {
    src: "assets/travel/vail.jpg",
    location: "Vail, CO",
    category: "State",
    isLandscape: true,
  },
];

// ── Layout engine ─────────────────────────────────────────
//
// Greedy 3-column row packer.
//
// Rule A: landscape photo → span 2, pair with next photo as span 1 companion.
//         Together they fill exactly 3 cols.
// Rule B: three consecutive non-landscape photos → each span 1; fills 3 cols.
// Rule C: tail (1–2 remaining photos that don't fit A or B) → span 1 each,
//         let CSS grid flow them naturally.
//
// Returns a new array where each element has a `.span` property (1 or 2).
// Caller applies `.travel-photo--wide` when span === 2.

function computeLayout(visiblePhotos) {
  const out = visiblePhotos.map(p => ({ ...p, span: 1 }));
  let i = 0;

  while (i < visiblePhotos.length) {
    const p = visiblePhotos[i];
    const rem = visiblePhotos.length - i;

    if (p.isLandscape && rem >= 2) {
      // Rule A
      out[i].span     = 2;
      out[i + 1].span = 1;
      i += 2;
    } else if (
      !p.isLandscape &&
      rem >= 3 &&
      !visiblePhotos[i + 1].isLandscape &&
      !visiblePhotos[i + 2].isLandscape
    ) {
      // Rule B
      out[i].span     = 1;
      out[i + 1].span = 1;
      out[i + 2].span = 1;
      i += 3;
    } else {
      // Rule C: remainder — fall through, default span 1 already set
      i += 1;
    }
  }

  return out;
}

// ── Helpers ───────────────────────────────────────────────

function getCategories() {
  const seen = new Set();
  photos.forEach(p => seen.add(p.category));
  return ["All", ...Array.from(seen)];
}

function captionText(photo) {
  return photo.year
    ? `${photo.location}  ·  ${photo.year}`
    : photo.location;
}

// ── Lightbox ──────────────────────────────────────────────

function openLightbox(src, caption) {
  const lb    = document.getElementById("lightbox");
  const img   = document.getElementById("lightbox-img");
  const capEl = document.getElementById("lightbox-caption");

  img.src           = src;
  img.alt           = caption;
  capEl.textContent = caption;
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  lb.classList.remove("open");
  document.body.style.overflow = "";

  // Clear src after the CSS transition so no stale image flashes on next open
  setTimeout(() => {
    document.getElementById("lightbox-img").src = "";
  }, 150);
}

function initLightbox() {
  const lb    = document.getElementById("lightbox");
  const img   = document.getElementById("lightbox-img");
  const close = document.getElementById("lightbox-close");

  lb.addEventListener("click",    closeLightbox);
  img.addEventListener("click",   e => e.stopPropagation());
  close.addEventListener("click", e => { e.stopPropagation(); closeLightbox(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });
}

// ── Grid rendering ────────────────────────────────────────

function renderFilters(activeFilter, onSelect) {
  const bar = document.getElementById("travel-filters");
  if (!bar) return;

  bar.innerHTML = getCategories()
    .map(label => `
      <button
        class="proj-filter-btn${label === activeFilter ? " active" : ""}"
        data-filter="${label}"
        aria-pressed="${label === activeFilter}"
      >${label}</button>`)
    .join("");

  bar.querySelectorAll(".proj-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => onSelect(btn.dataset.filter));
  });
}

function renderGrid(filter) {
  const grid = document.getElementById("travel-grid");
  if (!grid) return;

  const visible = filter === "All"
    ? photos
    : photos.filter(p => p.category === filter);

  if (visible.length === 0) {
    grid.innerHTML = `<p class="travel-empty">Photos coming soon.</p>`;
    return;
  }

  const laid = computeLayout(visible);

  grid.innerHTML = laid
    .map(photo => {
      const caption   = captionText(photo);
      const wideClass = photo.span === 2 ? " travel-photo--wide" : "";
      return `
        <div
          class="travel-photo${wideClass}"
          role="button"
          tabindex="0"
          aria-label="View photo: ${caption}"
          data-src="${photo.src}"
          data-caption="${caption}"
        >
          <img src="${photo.src}" alt="${caption}" loading="lazy" />
          <div class="travel-caption">${caption}</div>
        </div>`;
    })
    .join("");

  grid.querySelectorAll(".travel-photo").forEach(el => {
    el.addEventListener("click", () => openLightbox(el.dataset.src, el.dataset.caption));
    el.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(el.dataset.src, el.dataset.caption);
      }
    });
  });
}

// ── Init ──────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", function () {
  initLightbox();

  let currentFilter = "All";

  function applyFilter(filter) {
    currentFilter = filter;
    renderFilters(currentFilter, applyFilter);
    renderGrid(currentFilter);
  }

  applyFilter("All");
});
