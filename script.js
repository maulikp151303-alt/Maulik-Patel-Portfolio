/* ─────────────────────────────────────
   ✨ Maulik Patel Portfolio Script.js
   Handles theme, animations, projects,
   certificates, contact form, and more.
────────────────────────────────────── */

// === 🌓 THEME TOGGLE (Dark / Light Mode) === //

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
// === 🍔 MOBILE MENU TOGGLE === //
const menuToggle = document.getElementById("menu-toggle");
menuToggle.addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
});


// Load saved theme from localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") body.classList.add("light-mode");
themeToggle.textContent = body.classList.contains("light-mode") ? "☀️" : "🌙";

// Toggle and save theme
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  const isLight = body.classList.contains("light-mode");
  themeToggle.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// === 🪄 PARTICLES BACKGROUND === //
tsParticles.load("tsparticles", {
  background: { color: "transparent" },
  fpsLimit: 60,
  particles: {
    number: { value: 60 },
    color: { value: ["#007aff", "#00e0ff"] },
    links: {
      enable: true,
      color: "#00e0ff",
      opacity: 0.2,
      distance: 130,
    },
    move: { enable: true, speed: 1.2 },
    opacity: { value: 0.4 },
    size: { value: { min: 1, max: 3 } },
  },
});

// === 💬 TYPEWRITER EFFECT === //
const typed = new Typed("#typewriter", {
  strings: [
    "Full-Stack Developer",
    "AI/ML Enthusiast",
    "React & Next.js Developer",
    "Java + Spring Boot Engineer",
  ],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true,
});

// === 🎞️ GSAP SCROLL ANIMATIONS === //
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray(".section").forEach((sec) => {
  gsap.from(sec, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    scrollTrigger: {
      trigger: sec,
      start: "top 85%",
    },
  });
});

// === 🧮 COUNTERS (Experience, Projects, Certificates) === //
const counters = document.querySelectorAll(".num");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;
        let c = 0;
        const step = target / 50;
        const interval = setInterval(() => {
          c += step;
          if (c >= target) {
            el.textContent = target;
            clearInterval(interval);
          } else el.textContent = Math.floor(c);
        }, 30);
        observer.unobserve(el);
      }
    });
  },
  { threshold: 0.4 }
);
counters.forEach((el) => observer.observe(el));

// === 💼 PROJECTS DATA & FILTER === //
const projects = [
  {
    title: "ManageMate ERP System",
    desc: "Enterprise management app for a tiles company — built with JavaFX, Spring Boot, and MySQL.",
    tech: "Java • Spring Boot • MySQL",
    category: "fullstack",
  },
  {
    title: "AI PromptLab",
    desc: "Playground for AI & LLM prompt experimentation and testing.",
    tech: "Python • Prompt Engineering",
    category: "ai",
  },
  {
    title: "React Portfolio",
    desc: "Modern personal portfolio with React and Tailwind CSS.",
    tech: "React • Tailwind CSS",
    category: "web",
  },
  {
    title: "Node API Dashboard",
    desc: "Analytics dashboard using Express & REST APIs.",
    tech: "Node.js • Express.js",
    category: "fullstack",
  },
  {
    title: "DataViz Insights",
    desc: "Interactive Power BI dashboard with Python data pipeline.",
    tech: "Python • Power BI",
    category: "ai",
  },
];

// Render projects dynamically
const projectGrid = document.getElementById("project-grid");
function renderProjects(list) {
  projectGrid.innerHTML = "";
  list.forEach((p) => {
    const div = document.createElement("div");
    div.className = "project";
    div.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <span style="color:#00e0ff;font-size:13px">${p.tech}</span>
    `;
    projectGrid.appendChild(div);
  });
}
renderProjects(projects);

// Project filters
document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.filter;
    if (cat === "all") renderProjects(projects);
    else renderProjects(projects.filter((p) => p.category === cat));
  });
});

// === 🏆 CERTIFICATES SECTION === //
const certs = [
  {
    title: "AWS — Intro to Generative AI",
    issuer: "AWS Training & Certification",
    img: "assets/aws-cert.png",
    file: "assets/AWS (Introduction to Generative AI -Art of the Possible)Certificate.pdf",
  },
  {
    title: "Deloitte — Data Analytics Job Simulation",
    issuer: "Forage / Deloitte",
    img: "assets/deloitte-analytics.png",
    file: "assets/Deloitte Data Analytics Job Simmulation Certificate.pdf",
  },
  {
    title: "Deloitte — Technology Job Simulation",
    issuer: "Forage / Deloitte",
    img: "assets/deloitte-tech.png",
    file: "assets/Deloitte Technology Job Simmulation Certificate.pdf",
  },
];

const certGrid = document.getElementById("cert-grid");
certs.forEach((c) => {
  const card = document.createElement("div");
  card.className = "cert-card";
  card.innerHTML = `
    <h3>${c.title}</h3>
    <p>${c.issuer}</p>
    <a href="#" class="view-cert" data-img="${c.img}" data-pdf="${c.file}">View on Site</a>
  `;
  certGrid.appendChild(card);
});

// Certificate modal logic
const certModal = document.getElementById("cert-modal");
const certImage = document.getElementById("cert-image");
const certDownload = document.getElementById("cert-download");
const closeCert = document.getElementById("close-cert");

document.querySelectorAll(".view-cert").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const imgSrc = btn.getAttribute("data-img");
    const pdfSrc = btn.getAttribute("data-pdf");
    certImage.src = imgSrc;
    certDownload.href = pdfSrc;
    certModal.classList.add("show");
  });
});

closeCert.addEventListener("click", () => certModal.classList.remove("show"));
certModal.addEventListener("click", (e) => {
  if (e.target === certModal) certModal.classList.remove("show");
});

// === 💌 CONTACT FORM (EmailJS) === //
emailjs.init("xsM_LaGACQHNt1zW0"); // Your EmailJS public key
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  status.textContent = "Sending...";
  emailjs
    .sendForm("service_ih16zo9", "template_9ifhvya", form)
    .then(() => {
      status.textContent = "✅ Message sent successfully!";
      form.reset();
    })
    .catch(() => (status.textContent = "❌ Failed to send message."));
});

// === 👤 PROFILE MODAL === //
const profileLogo = document.getElementById("profile-logo");
const profileModal = document.getElementById("profile-modal");
const closeProfile = document.getElementById("close-profile");

profileLogo.addEventListener("click", () => {
  profileModal.classList.add("show");
  gsap.from(".modal-content", {
    scale: 0.8,
    opacity: 0,
    duration: 0.4,
    ease: "power2.out",
  });
});

closeProfile.addEventListener("click", () => profileModal.classList.remove("show"));
profileModal.addEventListener("click", (e) => {
  if (e.target === profileModal) profileModal.classList.remove("show");
});

// === 🪩 HERO PHOTO ANIMATION === //
gsap.from(".photo-frame", {
  opacity: 0,
  y: 40,
  duration: 1.2,
  ease: "power3.out",
});
