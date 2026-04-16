// Add your photos here.
// Place image files in: assets/travel/
//
// category: "National Park" | "State" | "Conference"
// year:     optional — shown in the caption alongside location
//
// Photos render in the order listed below.
// Every 5th+1 photo (1st, 6th, 11th…) is displayed wide — plan accordingly.

const photos = [
  // Example entries — replace with your own:
  //
  // {
  //   src: "assets/travel/grand-canyon-sunrise.jpg",
  //   location: "Grand Canyon, AZ",
  //   category: "National Park",
  //   year: 2024
  // },
  // {
  //   src: "assets/travel/dac-long-beach.jpg",
  //   location: "Long Beach, CA",
  //   category: "Conference",
  //   year: 2026
  // },
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
  const lb     = document.getElementById("lightbox");
  const img    = document.getElementById("lightbox-img");
  const capEl  = document.getElementById("lightbox-caption");

  img.src       = src;
  img.alt       = caption;
  capEl.textContent = caption;
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  lb.classList.remove("open");
  document.body.style.overflow = "";

  // Clear src after transition so no stale image flashes on next open
  setTimeout(() => {
    document.getElementById("lightbox-img").src = "";
  }, 150);
}

function initLightbox() {
  const lb    = document.getElementById("lightbox");
  const img   = document.getElementById("lightbox-img");
  const close = document.getElementById("lightbox-close");

  // Click backdrop → close
  lb.addEventListener("click", closeLightbox);

  // Click image itself → don't close
  img.addEventListener("click", e => e.stopPropagation());

  // Close button
  close.addEventListener("click", e => {
    e.stopPropagation();
    closeLightbox();
  });

  // Escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
  });
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
      >${label}</button>
    `)
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
        </div>
      `;
    })
    .join("");

  // Attach click handlers to newly rendered photos
  grid.querySelectorAll(".travel-photo").forEach(el => {
    el.addEventListener("click", () => {
      openLightbox(el.dataset.src, el.dataset.caption);
    });
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
