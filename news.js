// Edit this list to add news.
// The site automatically sorts by sortDate (latest first).
// You can optionally "pin" one item as the Latest News card
// by setting: isPinnedLatest: true

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
    category: "Award",
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
    sortDate: "2026-03-10",
    dateLabel: "Mar 2026",
    category: "Publication",
    title: "RoutePUF accepted at GOMACTech 2026",
    description:
      "RoutePUF — an interposer-resident delay PUF with multi-party computation for zero-trust chiplet SiPs, with Tasnuva Farheen, Navid Asadi, and Dr. Sazadur Rahman — accepted to GOMACTech 2026."
  },
  {
    sortDate: "2026-03-20",
    dateLabel: "Mar 2026",
    category: "Industry",
    title: "Joined Intel Corporation as XPU Security Research Intern",
    description:
      "Accepted an offer to join Intel Corporation as an XPU Security Research Intern in Folsom, CA. Starting May 2026."
  },
  {
    sortDate: "2026-04-05",
    dateLabel: "Apr 2026",
    category: "Publication",
    title: "ATLAS accepted at DAC 2026",
    description:
      "ATLAS: AI-Assisted Threat-to-Assertion Learning for SoC Security Verification accepted as a first-author paper at DAC 2026 (63rd Design Automation Conference), Long Beach, CA."
  },
  {
    sortDate: "2026-04-10",
    dateLabel: "Apr 2026",
    category: "Award",
    title: "Selected as DAC Young Fellow at DAC 2026",
    description:
      "Selected as a DAC Young Fellow at the 63rd Design Automation Conference (DAC 2026), Long Beach, CA."
  },
  {
    sortDate: "2026-05-07",
    dateLabel: "May 2026",
    category: "Award",
    title: "UCF ECE Outstanding Student Researcher Award",
    description:
      "Received the UCF ECE Outstanding Student Researcher Award on May 7, 2026, in recognition of outstanding contributions to research during FY 2025–26."
  },
  {
    sortDate: "2025-11-20",
    dateLabel: "2025",
    category: "Service",
    title: "External Reviewer — Design Automation Conference",
    description:
      "Served as an external reviewer for the Design Automation Conference (DAC 2026 and DAC 2025), and for IEEE Design & Test, an archival IEEE transactions-family journal."
  },
  {
    sortDate: "2026-05-18",
    dateLabel: "May 2026",
    category: "Industry",
    title: "Started as XPU Security Research Intern at Intel",
    description:
      "Began as an XPU Security Research Intern at Intel Corporation in Folsom, CA on May 18, 2026, working on security research for next-generation XPU/accelerator architectures."
  },
  {
    sortDate: "2026-10-22",
    dateLabel: "Oct 2026",
    category: "Patent",
    title: "U.S. provisional patent application on ATLAS authorized for filing",
    description:
      "UCF authorized filing of a U.S. provisional patent application, <em>“Systems and Methods for AI-Assisted Threat-to-Assertion Generation in Hardware Security Verification,”</em> covering the ATLAS framework (DAC 2026), with Dr. Sazadur Rahman and Kimia Tasnia as co-inventors."
  },
  {
    sortDate: "2026-07-15",
    dateLabel: "Jul 2026",
    category: "Talk",
    title: "Invited talk at the DAC 2026 Open-Source EDA Birds-of-a-Feather",
    description:
      "Gave an invited rapid-fire presentation, \"Security Challenges and Opportunities in the Open-Source EDA Ecosystem,\" at the Open-Source EDA, Data and Collaboration Summit at DAC 2026, Long Beach, CA — organized by UC San Diego, Google, and Precision Innovations."
  },
  {
    sortDate: "2026-09-01",
    dateLabel: "Sep 2026",
    category: "Service",
    title: "Joined the program committee of Trustworthy Agentic Systems (TAS 2026)",
    description:
      "Serving on the program committee of Trustworthy Agentic Systems (TAS 2026), part of the AAAI 2026 Fall Symposium Series, extending peer-review service beyond hardware security and EDA into the artificial intelligence community."
  },
  {
    sortDate: "2026-08-01",
    dateLabel: "Aug 2026",
    category: "Milestone",
    title: "Earned M.S. in Computer Engineering from UCF",
    description:
      "My M.S. in Computer Engineering was conferred on August 1, 2026, on the way to the Ph.D. (expected January 2028)."
  },
  {
    sortDate: "2026-09-02",
    dateLabel: "Sep 2026",
    category: "Research",
    title: "Started SecureOpenROAD research",
    description:
      "Began work on SecureOpenROAD, which studies security assurance across synthesis and physical implementation in open-source semiconductor design flows built on Yosys and OpenROAD. Identified security-critical metrics for design flows that helped shape the methodology in the submitted research proposal."
  },
  {
    sortDate: "2026-09-25",
    dateLabel: "Sep 2026",
    category: "Industry",
    title: "Completed XPU Security Research Internship at Intel",
    description:
      "Wrapped up my internship at Intel Corporation in Folsom, CA (May 18 – Sep 25, 2026), where I applied AI-assisted security analysis, hardware vulnerability reasoning, and rigorous verification to security problems in next-generation XPU/accelerator architectures."
  },
  {
    sortDate: "2026-10-16",
    dateLabel: "Oct 2026",
    category: "Publication",
    title: "Book chapter published by Springer",
    description:
      "Our chapter <em>“Introduction to Large Language Models (LLMs),”</em> with Kimia Tasnia and Dr. Sazadur Rahman, is now published online in the Springer book <em>LLM for SoC Design and Security</em> (pp. 31–59). <a href=\"https://doi.org/10.1007/978-3-032-34116-7_2\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1007/978-3-032-34116-7_2 ↗</a>"
  },
  {
    sortDate: "2026-10-29",
    dateLabel: "Oct 2026",
    category: "Talk",
    title: "Invited speaker at the IEEE UCF Student Branch General Body Meeting",
    description:
      "Spoke at the IEEE UCF Student Branch General Body Meeting on October 29, 2026, about my experience as an XPU Security Research Intern at Intel, formal verification and hardware security, and the transition from academic research to industry. It was a casual talk followed by an open Q&amp;A with students on early-career questions.",
    isPinnedLatest: true
  }
];
function sortNewsDescending(items) {
  return [...items].sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));
}

function getPinnedLatest(items) {
  return items.find((item) => item.isPinnedLatest === true) || null;
}

function getTagClass(category) {
  if (category === "Award") return "news-tag news-tag-award";
  if (category === "Industry") return "news-tag news-tag-industry";
  if (category === "Patent") return "news-tag news-tag-award";
  return "news-tag";
}

function renderLatestNews(item) {
  const container = document.getElementById("latest-news-card");
  if (!container || !item) return;

  container.innerHTML = `
    <div class="latest-news-inner">
      <span class="latest-badge">Latest News</span>
      <h3 class="latest-title">${item.title}</h3>
      <div class="latest-meta">
        <span class="${getTagClass(item.category)}">${item.category}</span>
        <span>${item.dateLabel}</span>
      </div>
      <p class="latest-desc">${item.description}</p>
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
          <span class="${getTagClass(item.category)}">${item.category}</span>
        </div>
        <div class="news-desc">${item.description}</div>
      </li>
    `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", function () {
  const pinned = getPinnedLatest(newsItems);

  // Build the list items: sort all items except the pinned one (avoid duplication)
  const listItems = sortNewsDescending(
    pinned ? newsItems.filter((item) => item !== pinned) : newsItems
  );

  // Latest card: pinned if present, otherwise the newest item from the sorted list
  const latestItem = pinned || listItems[0] || null;

  renderLatestNews(latestItem);
  renderNewsList(listItems);
});
