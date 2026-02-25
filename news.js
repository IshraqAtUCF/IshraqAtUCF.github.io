// Edit this list to add news.
// The site automatically sorts by sortDate (latest first).
// "start with trustees" is included below as an early milestone.
const newsItems = [
  {
    sortDate: "2024-01-15",
    dateLabel: "2024",
    category: "Award",
    title: "Received UCF Trustee's Doctoral Fellowship",
    description:
      "Awarded the UCF Trustee's Doctoral Fellowship (4-year funding), supporting my Ph.D. research in hardware security and verification."
  },
  {
    sortDate: "2025-09-01",
    dateLabel: "2025",
    category: "Publication",
    title: "BeyondPPA named MLCAD 2025 Best Paper Nominee",
    description:
      "Our work on human-inspired reinforcement learning for reliability-aware macro placement was selected as a Best Paper Nominee at MLCAD 2025."
  },
  {
    sortDate: "2026-02-10",
    dateLabel: "Feb 2026",
    category: "Talk",
    title: "Invited talk at Intel AI Forum",
    description:
      "Presented ATLAS and discussed LLM-driven threat modeling and formal security verification for SoC security to Intel's AI research community."
  },
  {
    sortDate: "2026-02-15",
    dateLabel: "Feb 2026",
    category: "Talk",
    title: "Invited presentation at Florida Semiconductor Summit (FSI)",
    description:
      "Presented work at the 4th Annual Florida Semiconductor Summit in Orlando, with focus on AI-assisted security verification for semiconductor systems."
  },
  {
    sortDate: "2026-02-20",
    dateLabel: "2026",
    category: "Publication",
    title: "InterPUF accepted at IEEE HOST 2026",
    description:
      "InterPUF (distributed chiplet/interposer authentication using PUFs and MPC) was accepted to IEEE HOST 2026."
  },
  {
    sortDate: "2026-02-23",
    dateLabel: "2026",
    category: "Publication",
    title: "ATLAS accepted at DAC 2026",
    description:
      "ATLAS: AI-Assisted Threat-to-Assertion Learning for SoC Security Verification was accepted to DAC 2026."
  }
];

function sortNewsDescending(items) {
  return [...items].sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));
}

function renderLatestNews(items) {
  const container = document.getElementById("latest-news-card");
  if (!container || items.length === 0) return;

  const latest = items[0];
  container.innerHTML = `
    <div class="latest-news-inner">
      <span class="latest-badge">Latest News</span>
      <h3 class="latest-title">${latest.title}</h3>
      <div class="latest-meta">
        <span class="news-tag">${latest.category}</span>
        <span>${latest.dateLabel}</span>
      </div>
      <p class="latest-desc">${latest.description}</p>
    </div>
  `;
}

function renderNewsList(items) {
  const list = document.getElementById("news-list");
  if (!list) return;

  list.innerHTML = items
    .map(
      (item) => `
      <li class="news-item">
        <div class="news-row">
          <p class="news-title">${item.title}</p>
          <span class="news-date">${item.dateLabel}</span>
        </div>
        <div class="news-meta-line">
          <span class="news-tag">${item.category}</span>
        </div>
        <div class="news-desc">${item.description}</div>
      </li>
    `
    )
    .join("");
}

(function initNews() {
  const sorted = sortNewsDescending(newsItems);
  renderLatestNews(sorted);
  renderNewsList(sorted);
})();
