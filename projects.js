// Edit this array to add or update projects.
// category: "Research" | "Software" | "Tool"
// status:   "Active" | "Published" | "In Progress" | "Archived"
// venue:    optional — for Research projects (use " · " to separate multiple venues)
// links:    set any field to null to omit that button entirely
// featured: true → floats card to top and adds gold left-border

const projects = [
  {
    id: "llm-security-verification",
    title: "LLM-Assisted SoC Security Verification",
    category: "Research",
    status: "Published",
    venue: "DAC 2026",
    description:
      "Automates the full pipeline from hardware threat modeling to formal security property generation using large language models. Ingests CWE/CVE/CAPEC databases to produce SystemVerilog assertions verified end-to-end by JasperGold — the ATLAS framework.",
    tags: ["Python", "LLM", "SystemVerilog", "JasperGold", "Formal Verification", "Threat Modeling"],
    links: {
      paper: null,
      github: null,
      demo: null
    },
    featured: true
  },
  {
    id: "heterogeneous-integration-security",
    title: "Heterogeneous Integration Security",
    category: "Research",
    status: "Published",
    venue: "HOST 2026 · GOMACTech 2026 · PAINE 2025 · GLSVLSI 2025",
    description:
      "A family of hardware security protocols for authenticating chiplets, interposers, and System-in-Package assemblies. Combines PUF-based physical authentication (InterPUF, RoutePUF) with MPC-based distributed trust (AuthenTree, SAFE-SiP) — zero raw-PUF exposure, &lt;0.23% area overhead, ML attack accuracy at 46.7%.",
    tags: ["SystemVerilog", "PUF", "MPC", "FPGA", "Chiplet Security", "AXI", "SHA-256"],
    links: {
      paper: "https://arxiv.org/abs/2601.11368",
      github: "https://github.com/IshraqAtUCF/InterPUF",
      demo: null
    },
    featured: true
  },
  {
    id: "ml-macro-placement",
    title: "ML-Driven Reliability-Aware Macro Placement",
    category: "Research",
    status: "Published",
    venue: "MLCAD 2025",
    description:
      "Human-inspired reinforcement learning for post-route, reliability-aware macro placement in heterogeneous SoCs. Jointly optimizes timing, power, and wirelength while minimizing stress-induced reliability risks — the BeyondPPA framework. Best Paper Nominee at MLCAD 2025.",
    tags: ["Python", "Reinforcement Learning", "EDA", "Cadence Innovus", "Macro Placement"],
    links: {
      paper: null,
      github: null,
      demo: null
    },
    featured: true
  },
  {
    id: "efpga-adaptive-logic",
    title: "Post-Fabrication Adaptive Logic via eFPGA",
    category: "Research",
    status: "Published",
    venue: "ICCD 2025",
    description:
      "Enables circular, obfuscated, and adaptive logic in SoC designs through embedded FPGA augmentation, providing post-fabrication reconfigurability and hardware security hardening — the ECOLogic framework.",
    tags: ["SystemVerilog", "eFPGA", "Logic Obfuscation", "SoC Security", "Post-Fabrication"],
    links: {
      paper: null,
      github: null,
      demo: null
    },
    featured: false
  }
];

// ── Helpers ───────────────────────────────────────────────

function getCatClass(cat) {
  if (cat === "Software") return "proj-cat proj-cat-software";
  if (cat === "Tool")     return "proj-cat proj-cat-tool";
  return "proj-cat";
}

function getStatusClass(status) {
  const map = {
    "Published":   "proj-status proj-status-published",
    "Active":      "proj-status proj-status-active",
    "In Progress": "proj-status proj-status-inprogress",
    "Archived":    "proj-status proj-status-archived"
  };
  return map[status] || "proj-status proj-status-inprogress";
}

function buildLinkButtons(links) {
  const btns = [];
  if (links.paper)  btns.push(`<a class="proj-link proj-link-paper" href="${links.paper}" target="_blank" rel="noopener noreferrer">Paper ↗</a>`);
  if (links.github) btns.push(`<a class="proj-link" href="${links.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`);
  if (links.demo)   btns.push(`<a class="proj-link" href="${links.demo}" target="_blank" rel="noopener noreferrer">Demo ↗</a>`);
  return btns.join("");
}

function buildTagPills(tags) {
  return tags.map(t => `<span class="tag">${t}</span>`).join("");
}

function renderCard(proj) {
  const venueHtml = proj.venue
    ? `<p class="proj-venue">${proj.venue}</p>`
    : "";

  const linkButtons = buildLinkButtons(proj.links);
  const linkRow = linkButtons
    ? `<div class="proj-links">${linkButtons}</div>`
    : "";

  const featuredClass = proj.featured ? " proj-featured" : "";

  return `
    <article class="proj-card${featuredClass}" id="${proj.id}">
      <div class="proj-card-meta">
        <div class="proj-meta-left">
          <span class="${getCatClass(proj.category)}">${proj.category}</span>
          <span class="${getStatusClass(proj.status)}">${proj.status}</span>
        </div>
      </div>
      <h3 class="proj-title">${proj.title}</h3>
      ${venueHtml}
      <p class="proj-desc">${proj.description}</p>
      <hr class="proj-card-divider" />
      <div class="proj-tags">${buildTagPills(proj.tags)}</div>
      ${linkRow}
    </article>
  `;
}

// ── Filter logic ──────────────────────────────────────────

function getCategories() {
  const seen = new Set();
  projects.forEach(p => seen.add(p.category));
  return ["All", ...Array.from(seen)];
}

function renderFilters(activeFilter, onSelect) {
  const bar = document.getElementById("proj-filters");
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
  const grid = document.getElementById("proj-grid");
  if (!grid) return;

  const visible = filter === "All"
    ? projects
    : projects.filter(p => p.category === filter);

  if (visible.length === 0) {
    grid.innerHTML = `<p class="proj-empty">No projects in this category yet.</p>`;
    return;
  }

  // Featured cards first, then remaining in data order
  const sorted = [
    ...visible.filter(p => p.featured),
    ...visible.filter(p => !p.featured)
  ];

  grid.innerHTML = sorted.map(renderCard).join("");
}

// ── Init ──────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", function () {
  let currentFilter = "All";

  function applyFilter(filter) {
    currentFilter = filter;
    renderFilters(currentFilter, applyFilter);
    renderGrid(currentFilter);
  }

  applyFilter("All");
});
