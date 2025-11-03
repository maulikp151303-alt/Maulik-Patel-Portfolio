// Initialize particles background
tsParticles.load("tsparticles", {
  background: { color: "transparent" },
  particles: {
    number: { value: 70 },
    color: { value: ["#7c3aed", "#6ee7b7"] },
    links: { enable: true, color: "#7c3aed", opacity: 0.2, distance: 120 },
    move: { enable: true, speed: 1.2 },
    opacity: { value: 0.4 },
    size: { value: { min: 1, max: 3 } }
  },
});

// Typed.js
const typed = new Typed("#typewriter", {
  strings: ["Full-Stack Developer", "AI/ML Enthusiast", "React & Node Learner", "Java + Spring Boot Developer"],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true
});

// GSAP reveal
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray(".section").forEach((sec) => {
  gsap.from(sec, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    scrollTrigger: { trigger: sec, start: "top 85%" }
  });

// Floating glow photo animation (already added with CSS, but add entrance)
gsap.from(".photo-frame", {
  opacity: 0,
  y: 40,
  duration: 1.2,
  ease: "power3.out"
});

// Clickable top-left logo to open hero section
document.getElementById("profile-logo").addEventListener("click", () => {
  document.getElementById("home").scrollIntoView({ behavior: "smooth" });
});


});


// Counters
const counters = document.querySelectorAll('.num');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target;
      const target = +el.dataset.target;
      let c = 0;
      const step = target / 50;
      const interval = setInterval(() => {
        c += step;
        if (c >= target) { el.textContent = target; clearInterval(interval); }
        else el.textContent = Math.floor(c);
      }, 30);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.4 });
counters.forEach(el => observer.observe(el));

// Projects
const projects = [
  { title:"ManageMate ERP System", desc:"Enterprise management app built with JavaFX, Spring Boot, and MySQL.", tech:"Java • Spring Boot • MySQL", category:"fullstack" },
  { title:"AI PromptLab", desc:"A playground for AI and LLM prompt experiments.", tech:"Python • Prompt Engineering", category:"ai" },
  { title:"React Portfolio", desc:"Modern personal portfolio built with React & Tailwind.", tech:"React • CSS", category:"web" },
  { title:"Node API Dashboard", desc:"Backend analytics dashboard using Express & REST APIs.", tech:"Node.js • Express", category:"fullstack" },
  { title:"DataViz Dashboard", desc:"Interactive dashboard for insights using Power BI and Python.", tech:"Python • Power BI", category:"ai" }
];
const projectGrid = document.getElementById("project-grid");
function renderProjects(list) {
  projectGrid.innerHTML = "";
  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "project";
    div.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <span style="color:#6ee7b7;font-size:13px">${p.tech}</span>
    `;
    projectGrid.appendChild(div);
  });
}
renderProjects(projects);

// Filters
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.filter;
    if (cat === "all") renderProjects(projects);
    else renderProjects(projects.filter(p => p.category === cat));
  });
});

// Certifications
const certs = [
  { title:"AWS — Intro to Generative AI", issuer:"AWS Training & Certification", file:"assets/AWS (Introduction to Generative AI -Art of the Possible)Certificate.pdf" },
  { title:"Deloitte — Data Analytics Job Simulation", issuer:"Forage / Deloitte", file:"assets/Deloitte Data Analytics Job Simmulation Certificate.pdf" },
  { title:"Deloitte — Technology Job Simulation", issuer:"Forage / Deloitte", file:"assets/Deloitte Technology Job Simmulation Certificate.pdf" }
];
const certGrid = document.getElementById("cert-grid");
certs.forEach(c => {
  const card = document.createElement("div");
  card.className = "cert-card";
  card.innerHTML = `
    <h3>${c.title}</h3>
    <p>${c.issuer}</p>
    <a href="${c.file}" target="_blank">View Certificate</a>
  `;
  certGrid.appendChild(card);
});

// EmailJS
emailjs.init("xsM_LaGACQHNt1zW0");
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  status.textContent = "Sending...";
  emailjs.sendForm("service_ih16zo9", "template_9ifhvya", form)
    .then(() => {
      status.textContent = "✅ Message sent successfully!";
      form.reset();
    })
    .catch(() => status.textContent = "❌ Failed to send message.");
});
// Profile Modal functionality
const profileLogo = document.getElementById("profile-logo");
const profileModal = document.getElementById("profile-modal");
const closeProfile = document.getElementById("close-profile");

// Open modal on logo or photo click
profileLogo.addEventListener("click", () => {
  profileModal.classList.add("show");
  gsap.from(".modal-content", { scale: 0.8, opacity: 0, duration: 0.4, ease: "power2.out" });
});

// Close modal on X or outside click
closeProfile.addEventListener("click", () => profileModal.classList.remove("show"));
profileModal.addEventListener("click", (e) => {
  if (e.target === profileModal) profileModal.classList.remove("show");
});
