/* =========================================================
   Noel Merheb — Portfolio front-end logic
   Reads content from localStorage (key: "portfolioData").
   If nothing is saved yet, falls back to DEFAULT_DATA below.
   The admin panel (admin.html) writes to the same key, so
   edits made there appear here automatically.
   ========================================================= */

const STORAGE_KEY = "portfolioData";

const DEFAULT_DATA = {
  "name": "Noel Merheb",
  "title": "Web Developer",
  "location": "Lebanon",
  "heroIntro": "Junior developer building with HTML, CSS, JavaScript, PHP and MySQL. I like turning ideas into working, well-structured apps — and I'm actively looking for an internship or entry-level role where I can keep learning.",
  "aboutText": "I'm a motivated junior developer based in Lebanon, interested in both frontend and backend development. I build small full-stack projects with PHP and MySQL, run them locally with XAMPP, and host the finished versions on InfinityFree. I use Git and GitHub for version control on everything I build, and I'm continuously learning — right now that means going deeper into clean code structure, APIs, and better UI design.",
  "email": "noelmerheb2@gmail.com",
  "github": "https://github.com/noelmerheb",
  "linkedin": "https://www.linkedin.com/in/noel-merheb-516982223?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  "skills": [
    {
      "name": "HTML",
      "level": 90,
      "tag": "markup"
    },
    {
      "name": "CSS",
      "level": 85,
      "tag": "styling"
    },
    {
      "name": "JavaScript",
      "level": 75,
      "tag": "frontend logic"
    },
    {
      "name": "PHP",
      "level": 70,
      "tag": "backend"
    },
    {
      "name": "MySQL",
      "level": 68,
      "tag": "database"
    },
    {
      "name": "Git & GitHub",
      "level": 80,
      "tag": "version control"
    },
    {
      "name": "XAMPP / Local Dev",
      "level": 75,
      "tag": "environment"
    }
  ],
  "projects": [
    {
      "title": "Electricity Billing Management System",
      "description": "A CRUD application for electricity billing that allows creating, reading, updating, and deleting customer records, bills, and payment data.",
      "tech": [
        "PHP",
        "MySQL",
        "HTML",
        "CSS",
        "JavaScript"
      ],
      "github": "https://github.com/noelmerheb/Electricity-Billing-Management-System",
      "demo": ""
    },
    {
      "title": "MovieBuzz",
      "description": "A web application for managing a movie database with full CRUD functionality (create, read, update, delete).",
      "tech": [
        "PHP",
        "MySQL",
        "Sessions",
        "HTML",
        "CSS"
      ],
      "github": "https://github.com/noelmerheb/MovieBuzz",
      "demo": ""
    },
    {
      "title": "Developer Portfolio (this site)",
      "description": "This portfolio itself — a responsive, single-page site built with vanilla HTML, CSS and JavaScript, with a custom admin panel for editing content without touching code.",
      "tech": [
        "HTML",
        "CSS",
        "JavaScript"
      ],
      "github": "",
      "demo": ""
    },
    {
      "title": "TechShop",
      "description": "A web application for managing a tech shop database with full CRUD functionality for products, stock, and orders.",
      "tech": [
        "PHP",
        "MySQL",
        "CSS",
        "JavaScript"
      ],
      "github": "https://github.com/noelmerheb/TechShop",
      "demo": ""
    },
    {
      "title": "Lunea Lenses",
      "description": "A web-based e-commerce platform for Lunea Lenses that allows users to browse, view, and purchase contact lenses.",
      "tech": [
        "PHP",
        "MySQL",
        "CSS",
        "JS"
      ],
      "github": "https://github.com/noelmerheb/Lunea-Lenses",
      "demo": "https://lunea-lenses.com"
    },
    {
      "title": "Satellite Merheb",
      "description": "A platform for Satellite Merheb that manages customer subscriptions, tracks outstanding dues, and generates printable payment receipts.",
      "tech": [
        "PHP",
        "MySQL",
        "CSS",
        "JS"
      ],
      "github": "https://github.com/noelmerheb/Satellite-Merheb",
      "demo": "https://satellitemerheb.infinityfreeapp.com"
    }
  ]
};

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_DATA);
    const parsed = JSON.parse(raw);
    return { ...structuredClone(DEFAULT_DATA), ...parsed };
  } catch (e) {
    console.warn("Could not read saved portfolio data, using defaults.", e);
    return structuredClone(DEFAULT_DATA);
  }
}

const data = loadData();

/* ---------------- render: text content ---------------- */
function renderText() {
  document.querySelectorAll("[data-field='name']").forEach(el => (el.textContent = data.name));
  document.querySelectorAll("[data-field='title']").forEach(el => (el.textContent = data.title));
  document.querySelectorAll("[data-field='heroIntro']").forEach(el => (el.textContent = data.heroIntro));
  document.querySelectorAll("[data-field='aboutText']").forEach(el => (el.textContent = data.aboutText));
  document.querySelectorAll("[data-field='email']").forEach(el => {
    el.textContent = data.email;
    el.href = "mailto:" + data.email;
  });
  document.querySelectorAll("[data-field='github']").forEach(el => (el.href = data.github));
  document.querySelectorAll("[data-field='linkedin']").forEach(el => (el.href = data.linkedin));
  document.title = `${data.name} — ${data.title}`;
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------------- render: skills ---------------- */
function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;
  grid.innerHTML = "";
  data.skills.forEach((skill, i) => {
    const card = document.createElement("div");
    card.className = "skill-card reveal";
    card.style.transitionDelay = `${i * 60}ms`;
    card.innerHTML = `
      <div class="skill-head">
        <span class="name">${escapeHTML(skill.name)}</span>
        <span class="pct">${skill.level}%</span>
      </div>
      <div class="skill-bar-track">
        <div class="skill-bar-fill" data-level="${skill.level}"></div>
      </div>
      <span class="skill-tag">${escapeHTML(skill.tag || "")}</span>
    `;
    grid.appendChild(card);
  });
  observeReveal();
}

/* ---------------- render: projects ---------------- */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  if (!data.projects.length) {
    grid.innerHTML = `<p style="color:var(--text-muted); font-family:var(--font-mono); font-size:0.9rem;">// No projects added yet. Add one from the admin panel.</p>`;
    return;
  }

  data.projects.forEach((project, i) => {
    const card = document.createElement("div");
    card.className = "project-card reveal";
    card.style.transitionDelay = `${i * 80}ms`;

    const techTags = (project.tech || [])
      .map(t => `<span class="tech-tag">${escapeHTML(t)}</span>`)
      .join("");

    const hasDemo = project.demo && project.demo.trim().length > 0;
    const hasCode = project.github && project.github.trim().length > 0;

    card.innerHTML = `
      <div class="project-file-head">
        <span class="dot"></span>
        <span>${slugify(project.title)}.project</span>
      </div>
      <div class="project-body">
        <h3>${escapeHTML(project.title)}</h3>
        <p>${escapeHTML(project.description)}</p>
        <div class="tech-tags">${techTags}</div>
        <div class="project-actions">
          <a class="btn btn-ghost btn-small" ${hasCode ? `href="${escapeAttr(project.github)}" target="_blank" rel="noopener"` : "aria-disabled='true' tabindex='-1' style='opacity:.4; pointer-events:none;'"}>View Code</a>
          <a class="btn btn-primary btn-small" ${hasDemo ? `href="${escapeAttr(project.demo)}" target="_blank" rel="noopener"` : "aria-disabled='true' tabindex='-1' style='opacity:.4; pointer-events:none;'"}>Live Demo</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  observeReveal();
}

function slugify(str) {
  return (str || "project").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}
function escapeAttr(str) {
  return (str || "").replace(/"/g, "&quot;");
}

/* ---------------- terminal typing effect ---------------- */
function typeTerminal() {
  const body = document.getElementById("terminalBody");
  if (!body) return;

  const lines = [
    { type: "cmd", text: "whoami" },
    { type: "out", text: `<strong>${escapeHTML(data.name)}</strong> — ${escapeHTML(data.title)}, based in ${escapeHTML(data.location || "Lebanon")}` },
    { type: "cmd", text: "stack --list" },
    { type: "out", text: "HTML · CSS · JavaScript · PHP · MySQL · Git" },
    { type: "cmd", text: "status" },
    { type: "out", text: "Open to internships &amp; entry-level roles" }
  ];

  body.innerHTML = "";
  let li = 0;

  function typeLine() {
    if (li >= lines.length) return;
    const item = lines[li];
    const lineEl = document.createElement("div");
    lineEl.className = "line";
    body.appendChild(lineEl);

    if (item.type === "cmd") {
      let chars = 0;
      const prefix = `<span class="prompt">$</span> <span class="path">~/portfolio</span> `;
      lineEl.innerHTML = prefix + `<span class="cmd-text"></span><span class="typed-cursor"></span>`;
      const cmdSpan = lineEl.querySelector(".cmd-text");
      const cursor = lineEl.querySelector(".typed-cursor");
      const interval = setInterval(() => {
        cmdSpan.textContent = item.text.slice(0, ++chars);
        if (chars >= item.text.length) {
          clearInterval(interval);
          cursor.remove();
          li++;
          setTimeout(typeLine, 180);
        }
      }, 38);
    } else {
      lineEl.innerHTML = `<span class="out">${item.text}</span>`;
      li++;
      setTimeout(typeLine, 260);
    }
  }
  typeLine();
}

/* ---------------- scroll reveal ---------------- */
let revealObserver;
function observeReveal() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            if (entry.target.classList.contains("skill-card")) {
              const fill = entry.target.querySelector(".skill-bar-fill");
              if (fill) fill.style.width = fill.dataset.level + "%";
            }
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
  }
  document.querySelectorAll(".reveal:not(.in)").forEach(el => revealObserver.observe(el));
}

/* ---------------- active tab highlight on scroll ---------------- */
function setupTabHighlight() {
  const tabs = document.querySelectorAll(".tab[data-target]");
  const sections = Array.from(tabs)
    .map(t => document.getElementById(t.dataset.target))
    .filter(Boolean);

  function onScroll() {
    let currentId = sections[0] && sections[0].id;
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) currentId = sec.id;
    });
    tabs.forEach(tab => tab.classList.toggle("active", tab.dataset.target === currentId));
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------------- contact form ---------------- */
function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = "// please fill in every field before sending.";
      status.className = "form-status err";
      return;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    const mailto = `mailto:${data.email}?subject=${subject}&body=${body}`;

    status.textContent = "// opening your email client...";
    status.className = "form-status ok";
    window.location.href = mailto;
    form.reset();
  });
}

/* ---------------- mobile nav toggle ---------------- */
function setupMobileNav() {
  const toggle = document.getElementById("navToggle");
  const tabbar = document.getElementById("tabbar");
  if (!toggle || !tabbar) return;
  toggle.addEventListener("click", () => tabbar.classList.toggle("open"));
  tabbar.querySelectorAll(".tab").forEach(tab =>
    tab.addEventListener("click", () => tabbar.classList.remove("open"))
  );
}

document.addEventListener("DOMContentLoaded", () => {
  renderText();
  renderSkills();
  renderProjects();
  typeTerminal();
  setupTabHighlight();
  setupContactForm();
  setupMobileNav();
  observeReveal();
});
