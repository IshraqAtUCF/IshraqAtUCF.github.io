// Edit this array to add or update projects.
// category: "Research" | "Software" | "Tool"
// status:   "Active" | "Published" | "In Progress" | "Archived"
// venue:    optional — for Research projects only (e.g. "DAC 2026")
// links:    set any field to null to omit that button entirely
// featured: true → floats card to top and adds gold left-border

const projects = [
  {
    id: "atlas",
    title: "ATLAS",
    category: "Research",
    status: "Published",
    venue: "DAC 2026",
    description:
      "AI-assisted threat-to-assertion learning for SoC security verification. Automates the full pipeline from CWE/CVE/CAPEC threat modeling to formal security property generation, verified with JasperGold.",
    tags: ["Python", "LLM", "SystemVerilog", "JasperGold", "Formal Verification"],
    links: {
      paper: null,
      github: null,
      demo: null
    },
    featured: true
  },
  {
    id: "interpuf",
    title: "InterPUF",
    category: "Research",
    status: "Published",
    venue: "IEEE HOST 2026",
    description:
      "Open-source FPGA prototype for distributed chiplet authentication via PUF and MPC on Intel Stratix 10 SX. Zero raw-PUF exposure, replay-resistant session tokens, 0.23% area overhead, and ML attack accuracy of 46.7% — below random chance.",
    tags: ["SystemVerilog", "MPC", "PUF", "FPGA", "Chiplet Security", "AXI", "SHA-256"],
    links: {
      paper: "https://arxiv.org/abs/2601.11368",
      github: "https://github.com/IshraqAtUCF/InterPUF",
      demo: null
    },
    featured: true
  },
  {
    id: "beyondppa",
    title: "BeyondPPA",
    category: "Research",
    status: "Published",
    venue: "MLCAD 2025",
    description:
      "Human-inspired reinforcement learning for post-route, reliability-aware macro placement in heterogeneous SoCs. Named Best Paper Nominee at MLCAD 2025.",
    tags: ["Python", "Reinforcement Learning", "EDA", "Cadence Innovus", "Macro Placement"],
    links: {
      paper: null,
      github: null,
      demo: null
    },
    featured: true
  },
  {
    id: "routepuf",
    title: "RoutePUF",
    category: "Research",
    status: "Published",
    venue: "GOMACTech 2026",
    description:
      "Routing-based physically unclonable function for secure interposer authentication in advanced chiplet systems.",
    tags: ["SystemVerilog", "PUF", "Chiplet Authentication", "Interposer Security"],
    links: {
      paper: null,
      github: null,
      demo: null
    },
    featured: false
  },
  {
    id: "authentree",
    title: "AuthenTree",
    category: "Research",
    status: "Published",
    venue: "IEEE PAINE 2025",
    description:
      "Scalable MPC-based distributed trust architecture for chiplet-based heterogeneous integration systems.",
    tags: ["MPC", "Chiplet Security", "Distributed Trust", "Protocol Design"],
    links: {
      paper: null,
      github: null,
      demo: null
    },
    featured: false
  },
  {
    id: "ecologic",
    title: "ECOLogic",
    category: "Research",
    status: "Published",
    venue: "ICCD 2025",
    description:
      "Enabling circular, obfuscated, and adaptive logic in SoC designs via eFPGA augmentation, improving post-fabrication reconfigurability and security.",
    tags: ["SystemVerilog", "eFPGA", "Logic Obfuscation", "SoC Security"],
    links: {
      paper: null,
      github: null,
      demo: null
    },
    featured: false
  },
  {
    id: "safe-sip",
    title: "SAFE-SiP",
    category: "Research",
    status: "Published",
    venue: "GLSVLSI 2025",
    description:
      "Secure authentication framework for System-in-Package using multi-party computation, establishing trust across heterogeneous chiplet assemblies.",
    tags: ["MPC", "SiP Security", "Authentication", "Chiplet Integration"],
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
    ? `<span class="proj-venue">${proj.venue}</span>`
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
        ${venueHtml}
      </div>
      <h3 class="proj-title">${proj.title}</h3>
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
