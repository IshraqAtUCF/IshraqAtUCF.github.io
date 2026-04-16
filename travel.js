// ── Photo data ────────────────────────────────────────────
//
// Add entries here as you accumulate photos.
// Place image files in: assets/travel/
//
// Fields:
//   src      — relative path to the image file
//   location — shown in the caption (e.g. "Yosemite NP, CA")
//   category — "National Park" | "State" | "Conference"
//   year     — optional; shown after location in caption
//
// Layout note: CSS handles the grid pattern automatically via nth-child.
// Photos are displayed in the order listed below.

const photos = [
  {
    src: "assets/travel/yosemite-valley.jpg",
    location: "Yosemite NP, CA",
    category: "National Park",
  },
  {
    src: "assets/travel/san-francisco.jpg",
    location: "San Francisco, CA",
    category: "State",
  },
  {
    src: "assets/travel/rocky-mountain.jpg",
    location: "Rocky Mountain NP, CO",
    category: "National Park",
  },
  {
    src: "assets/travel/vail.jpg",
    location: "Vail, CO",
    category: "State",
  },
];

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

  grid.innerHTML = visible
    .map(photo => {
      const caption = captionText(photo);
      return `
        <div
          class="travel-photo"
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
