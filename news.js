// Edit this list to add news.
// The site automatically sorts by sortDate (latest first).
const newsItems = [
  {
    sortDate: "2024-01-15",
    dateLabel: "Jan 2024",
    category: "Award",
    title: "Received UCF Trustee's Doctoral Fellowship",
    description:
      "Awarded the UCF Trustee's Doctoral Fellowship (4-year funding, 2024–2028), supporting my Ph.D. research in hardware security and verification."
  },
  {
    sortDate: "2025-05-01",
    dateLabel: "May 2025",
    category: "Award",
    title: "NSF Travel Grant — IEEE HOST 2025",
    description:
      "Received an NSF Travel Grant to attend the IEEE International Symposium on Hardware Oriented Security and Trust (HOST) 2025."
  },
  {
    sortDate: "2025-07-01",
    dateLabel: "Jul 2025",
    category: "Publication",
    title: "SAFE-SiP published at GLSVLSI 2025",
    description:
      "Our paper on a secure authentication framework for System-in-Package using multi-party computation was presented at GLSVLSI 2025, New Orleans, LA (Jun 30 – Jul 2, 2025)."
  },
  {
    sortDate: "2025-09-09",
    dateLabel: "Sep 2025",
    category: "Publication",
    title: "BeyondPPA named MLCAD 2025 Best Paper Nominee",
    description:
      "Our work on human-inspired reinforcement learning for reliability-aware macro placement was selected as a Best Paper Nominee at MLCAD 2025, Santa Cruz, CA (Sep 8–10, 2025)."
  },
  {
    sortDate: "2025-10-15",
    dateLabel: "Oct 2025",
    category: "Publication",
    title: "AuthenTree published at PAINE 2025",
    description:
      "Our paper on a scalable MPC-based distributed trust architecture for chiplet-based heterogeneous systems was presented at IEEE PAINE 2025, Denver, CO (Oct 14–16, 2025)."
  },
  {
    sortDate: "2025-11-11",
    dateLabel: "Nov 2025",
    category: "Publication",
    title: "ECOLogic published at ICCD 2025",
    description:
      "Our paper on enabling circular, obfuscated, and adaptive logic via eFPGA-augmented SoCs was presented at IEEE ICCD 2025, Dallas, TX (Nov 10–12, 2025)."
  },
  {
    sortDate: "2025-11-12",
    dateLabel: "Nov 2025",
    category: "Service",
    title: "External Reviewer — IEEE ICCD 2025",
    description:
      "Served as an external reviewer for the IEEE International Conference on Computer Design (ICCD) 2025."
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
      "Presented at the 4th Annual Florida Semiconductor Summit, Orlando, FL. Theme: Semiconductor Manufacturing in Florida: Power. Progress. Possibilities."
  },
  {
    sortDate: "2026-02-20",
    dateLabel: "Feb 2026",
    category: "Publication",
    title: "InterPUF accepted at IEEE HOST 2026",
    description:
      "InterPUF — distributed chiplet/interposer authentication using physically unclonable functions and multi-party computation — accepted to IEEE HOST 2026, Washington, D.C."
  },
  {
    sortDate: "2026-02-23",
    dateLabel: "Feb 2026",
    category: "Publication",
    title: "ATLAS accepted at DAC 2026",
    description:
      "ATLAS: AI-Assisted Threat-to-Assertion Learning for SoC Security Verification accepted to DAC 2026 (63rd Design Automation Conference), Long Beach, CA."
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

document.addEventListener("DOMContentLoaded", function () {
  const sorted = sortNewsDescending(newsItems);
  renderLatestNews(sorted);
  renderNewsList(sorted);
});
