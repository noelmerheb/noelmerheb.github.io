/* =========================================================
   Admin panel logic
   NOTE ON SECURITY: this login is a client-side convenience
   gate only (username/password checked in the browser, session
   flag kept in sessionStorage). It is NOT secure — anyone who
   can read this file can see the credentials, and the content
   itself lives in the visitor's own localStorage. That's fine
   for a personal portfolio you fully control, but if you want
   real protection (e.g. multiple editors, a public server),
   move this logic to a PHP + MySQL backend with server-side
   sessions instead. Change ADMIN_USER / ADMIN_PASS below.
   ========================================================= */

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";
const STORAGE_KEY = "portfolioData";
const SESSION_KEY = "portfolioAdminSession";

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

let data = loadData();

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_DATA);
    return { ...structuredClone(DEFAULT_DATA), ...JSON.parse(raw) };
  } catch (e) {
    return structuredClone(DEFAULT_DATA);
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* ---------------- login ---------------- */
const loginScreen = document.getElementById("loginScreen");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

function showDashboard() {
  loginScreen.style.display = "none";
  dashboard.style.display = "flex";
  populateTextForm();
  renderSkillsList();
  renderProjectsList();
  renderExportPanel();
}

if (sessionStorage.getItem(SESSION_KEY) === "true") {
  showDashboard();
}

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value;
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    sessionStorage.setItem(SESSION_KEY, "true");
    loginError.textContent = "";
    showDashboard();
  } else {
    loginError.textContent = "// incorrect username or password";
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem(SESSION_KEY);
  dashboard.style.display = "none";
  loginScreen.style.display = "flex";
  loginForm.reset();
});

/* ---------------- side nav ---------------- */
document.querySelectorAll(".admin-nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".admin-nav-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".admin-panel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.panel).classList.add("active");
    if (btn.dataset.panel === "panel-export") renderExportPanel();
  });
});

/* ---------------- site text panel ---------------- */
function populateTextForm() {
  document.getElementById("f-name").value = data.name;
  document.getElementById("f-title").value = data.title;
  document.getElementById("f-location").value = data.location || "";
  document.getElementById("f-heroIntro").value = data.heroIntro;
  document.getElementById("f-aboutText").value = data.aboutText;
  document.getElementById("f-email").value = data.email;
  document.getElementById("f-github").value = data.github;
  document.getElementById("f-linkedin").value = data.linkedin;
}

document.getElementById("saveTextBtn").addEventListener("click", () => {
  data.name = document.getElementById("f-name").value.trim() || DEFAULT_DATA.name;
  data.title = document.getElementById("f-title").value.trim() || DEFAULT_DATA.title;
  data.location = document.getElementById("f-location").value.trim();
  data.heroIntro = document.getElementById("f-heroIntro").value.trim();
  data.aboutText = document.getElementById("f-aboutText").value.trim();
  data.email = document.getElementById("f-email").value.trim();
  data.github = document.getElementById("f-github").value.trim();
  data.linkedin = document.getElementById("f-linkedin").value.trim();
  saveData();
  flashSaved("saveTextMsg");
});

function flashSaved(id) {
  const el = document.getElementById(id);
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 1800);
}

/* ---------------- skills panel ---------------- */
const skillModal = document.getElementById("skillModal");
let editingSkillIndex = null;

function renderSkillsList() {
  const list = document.getElementById("skillsList");
  list.innerHTML = "";
  if (!data.skills.length) {
    list.innerHTML = `<div class="empty-state">No skills yet. Click "+ Add Skill" to add your first one.</div>`;
    return;
  }
  data.skills.forEach((skill, i) => {
    const row = document.createElement("div");
    row.className = "list-row";
    row.innerHTML = `
      <div class="row-main">
        <div class="row-title">${escapeHTML(skill.name)} — ${skill.level}%</div>
        <div class="row-sub">${escapeHTML(skill.tag || "")}</div>
      </div>
      <div class="row-actions">
        <button class="icon-btn edit-skill" data-i="${i}">Edit</button>
        <button class="icon-btn danger delete-skill" data-i="${i}">Delete</button>
      </div>
    `;
    list.appendChild(row);
  });

  list.querySelectorAll(".edit-skill").forEach(btn =>
    btn.addEventListener("click", () => openSkillModal(parseInt(btn.dataset.i)))
  );
  list.querySelectorAll(".delete-skill").forEach(btn =>
    btn.addEventListener("click", () => {
      const i = parseInt(btn.dataset.i);
      if (confirm(`Delete "${data.skills[i].name}"?`)) {
        data.skills.splice(i, 1);
        saveData();
        renderSkillsList();
      }
    })
  );
}

function openSkillModal(index) {
  editingSkillIndex = index;
  const heading = document.getElementById("skillModalHeading");
  if (index === null) {
    heading.textContent = "Add skill";
    document.getElementById("skillName").value = "";
    document.getElementById("skillTag").value = "";
    document.getElementById("skillLevel").value = 70;
  } else {
    const s = data.skills[index];
    heading.textContent = "Edit skill";
    document.getElementById("skillName").value = s.name;
    document.getElementById("skillTag").value = s.tag || "";
    document.getElementById("skillLevel").value = s.level;
  }
  document.getElementById("skillLevelVal").textContent = document.getElementById("skillLevel").value + "%";
  skillModal.classList.add("open");
}

document.getElementById("skillLevel").addEventListener("input", e => {
  document.getElementById("skillLevelVal").textContent = e.target.value + "%";
});
document.getElementById("addSkillBtn").addEventListener("click", () => openSkillModal(null));
document.getElementById("skillCancelBtn").addEventListener("click", () => skillModal.classList.remove("open"));

document.getElementById("skillSaveBtn").addEventListener("click", () => {
  const name = document.getElementById("skillName").value.trim();
  if (!name) { alert("Please enter a skill name."); return; }
  const skill = {
    name,
    tag: document.getElementById("skillTag").value.trim(),
    level: parseInt(document.getElementById("skillLevel").value)
  };
  if (editingSkillIndex === null) {
    data.skills.push(skill);
  } else {
    data.skills[editingSkillIndex] = skill;
  }
  saveData();
  renderSkillsList();
  skillModal.classList.remove("open");
});

/* ---------------- projects panel ---------------- */
const projectModal = document.getElementById("projectModal");
let editingProjectIndex = null;

function renderProjectsList() {
  const list = document.getElementById("projectsList");
  list.innerHTML = "";
  if (!data.projects.length) {
    list.innerHTML = `<div class="empty-state">No projects yet. Click "+ Add Project" to add your first one.</div>`;
    return;
  }
  data.projects.forEach((p, i) => {
    const row = document.createElement("div");
    row.className = "list-row";
    row.innerHTML = `
      <div class="row-main">
        <div class="row-title">${escapeHTML(p.title)}</div>
        <div class="row-sub">${(p.tech || []).join(" · ")}</div>
      </div>
      <div class="row-actions">
        <button class="icon-btn edit-project" data-i="${i}">Edit</button>
        <button class="icon-btn danger delete-project" data-i="${i}">Delete</button>
      </div>
    `;
    list.appendChild(row);
  });

  list.querySelectorAll(".edit-project").forEach(btn =>
    btn.addEventListener("click", () => openProjectModal(parseInt(btn.dataset.i)))
  );
  list.querySelectorAll(".delete-project").forEach(btn =>
    btn.addEventListener("click", () => {
      const i = parseInt(btn.dataset.i);
      if (confirm(`Delete "${data.projects[i].title}"?`)) {
        data.projects.splice(i, 1);
        saveData();
        renderProjectsList();
      }
    })
  );
}

function openProjectModal(index) {
  editingProjectIndex = index;
  const heading = document.getElementById("projectModalHeading");
  if (index === null) {
    heading.textContent = "Add project";
    document.getElementById("projectTitle").value = "";
    document.getElementById("projectDescription").value = "";
    document.getElementById("projectTech").value = "";
    document.getElementById("projectGithub").value = "";
    document.getElementById("projectDemo").value = "";
  } else {
    const p = data.projects[index];
    heading.textContent = "Edit project";
    document.getElementById("projectTitle").value = p.title;
    document.getElementById("projectDescription").value = p.description;
    document.getElementById("projectTech").value = (p.tech || []).join(", ");
    document.getElementById("projectGithub").value = p.github || "";
    document.getElementById("projectDemo").value = p.demo || "";
  }
  projectModal.classList.add("open");
}

document.getElementById("addProjectBtn").addEventListener("click", () => openProjectModal(null));
document.getElementById("projectCancelBtn").addEventListener("click", () => projectModal.classList.remove("open"));

document.getElementById("projectSaveBtn").addEventListener("click", () => {
  const title = document.getElementById("projectTitle").value.trim();
  if (!title) { alert("Please enter a project name."); return; }
  const project = {
    title,
    description: document.getElementById("projectDescription").value.trim(),
    tech: document.getElementById("projectTech").value
      .split(",")
      .map(t => t.trim())
      .filter(Boolean),
    github: document.getElementById("projectGithub").value.trim(),
    demo: document.getElementById("projectDemo").value.trim()
  };
  if (editingProjectIndex === null) {
    data.projects.push(project);
  } else {
    data.projects[editingProjectIndex] = project;
  }
  saveData();
  renderProjectsList();
  projectModal.classList.remove("open");
});

/* ---------------- export / publish panel ---------------- */
function renderExportPanel() {
  const output = document.getElementById("exportOutput");
  if (!output) return;
  const jsonPretty = JSON.stringify(data, null, 2);
  output.value = `const DEFAULT_DATA = ${jsonPretty};`;
}

document.getElementById("copyExportBtn")?.addEventListener("click", () => {
  const output = document.getElementById("exportOutput");
  output.select();
  navigator.clipboard.writeText(output.value).then(() => {
    flashSaved("exportCopyMsg");
  }).catch(() => {
    document.execCommand("copy");
    flashSaved("exportCopyMsg");
  });
});

document.getElementById("downloadExportBtn")?.addEventListener("click", () => {
  const blob = new Blob([document.getElementById("exportOutput").value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "portfolio-default-data.txt";
  a.click();
  URL.revokeObjectURL(url);
});

/* ---------------- reset ---------------- */
document.getElementById("resetBtn").addEventListener("click", () => {
  if (confirm("This will erase all your edits and restore the default content. Continue?")) {
    data = structuredClone(DEFAULT_DATA);
    saveData();
    populateTextForm();
    renderSkillsList();
    renderProjectsList();
    alert("Content reset to defaults.");
  }
});

/* ---------------- close modals on overlay click ---------------- */
[skillModal, projectModal].forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("open");
  });
});

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}
