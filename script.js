/* ============================================================
   Maulik Patel — Portfolio JS (Final)
   - Theme toggle (header + mobile)
   - Right drawer menu (outside click close)
   - Particles only on large screens
   - Typed.js, GSAP reveals, counters
   - Projects + filters
   - Certificates modal preview
   - EmailJS contact
============================================================ */

/* ---------- Safe DOM refs ---------- */
const body = document.body;
const backdrop = document.getElementById("backdrop");

const themeToggle = document.getElementById("theme-toggle");
const mobileThemeSwitch = document.getElementById("mobile-theme-switch");

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

const profileLogo = document.getElementById("profile-logo");
const profileOpen = document.getElementById("profile-open");
const profileModal = document.getElementById("profile-modal");
const closeProfile = document.getElementById("close-profile");

/* ---------- THEME ---------- */
function applyTheme(mode){
  if(mode === "light") body.classList.add("light-mode");
  else body.classList.remove("light-mode");

  if(themeToggle) themeToggle.textContent = (mode === "light") ? "☀️" : "🌙";
  if(mobileThemeSwitch) mobileThemeSwitch.textContent = (mode === "light") ? "🌗 Switch to Dark" : "🌗 Switch to Light";
  localStorage.setItem("theme", mode);
}
applyTheme(localStorage.getItem("theme") || "dark");

function toggleTheme(){
  const next = body.classList.contains("light-mode") ? "dark" : "light";
  applyTheme(next);
}
if(themeToggle) themeToggle.addEventListener("click", toggleTheme);
if(mobileThemeSwitch) mobileThemeSwitch.addEventListener("click", () => { toggleTheme(); body.classList.remove("menu-open"); });

/* ---------- MENU (drawer) ---------- */
function openMenu(){ body.classList.add("menu-open"); }
function closeMenu(){ body.classList.remove("menu-open"); }
if(menuToggle) menuToggle.addEventListener("click", (e)=>{ e.stopPropagation(); openMenu(); });
if(backdrop)   backdrop.addEventListener("click", closeMenu);
document.addEventListener("click", (e)=>{
  if(!body.classList.contains("menu-open")) return;
  const isInsideMenu = mobileMenu.contains(e.target) || menuToggle.contains(e.target);
  if(!isInsideMenu) closeMenu();
});
document.querySelectorAll("#mobile-menu a").forEach(a => a.addEventListener("click", closeMenu));

/* ---------- PARTICLES (perf) ---------- */
function initParticles(){
  if(typeof tsParticles === "undefined") return;
  if(window.innerWidth < 900) return; // skip on mobile
  tsParticles.load("tsparticles",{
    background:{ color:"transparent" },
    fpsLimit:60,
    particles:{
      number:{ value:50 },
      color:{ value:["#007aff","#00e0ff"] },
      links:{ enable:true, color:"#00e0ff", opacity:0.15, distance:130 },
      move:{ enable:true, speed:1.1 },
      opacity:{ value:0.32 },
      size:{ value:{ min:1, max:3 } }
    }
  });
}
initParticles();

/* ---------- Typed.js ---------- */
if(typeof Typed !== "undefined" && document.getElementById("typewriter")){
  new Typed("#typewriter",{
    strings:["Full-Stack Developer","AI/ML Enthusiast","React & Next.js Developer","Java + Spring Boot Engineer"],
    typeSpeed:50, backSpeed:28, loop:true
  });
}

/* ---------- GSAP scroll reveals ---------- */
if(typeof gsap !== "undefined"){
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray(".section").forEach(sec=>{
    gsap.from(sec,{ opacity:0, y:36, duration:.8, ease:"power2.out", scrollTrigger:{ trigger:sec, start:"top 85%" } });
  });
  gsap.from(".photo-frame",{ opacity:0, y:40, duration:1.0, ease:"power3.out" });
}

/* ---------- Counters ---------- */
(function(){
  const counters = document.querySelectorAll(".num");
  if(!counters.length) return;
  const io = new IntersectionObserver((entries,obs)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target || 0;
      let cur = 0;
      const step = Math.max(1, Math.floor(target/50));
      const iv = setInterval(()=>{
        cur += step;
        if(cur >= target){ el.textContent = target; clearInterval(iv); }
        else el.textContent = cur;
      }, 24);
      obs.unobserve(el);
    });
  }, { threshold:.4 });
  counters.forEach(c => io.observe(c));
})();

/* ---------- Projects data + filters ---------- */
(function(){
  const projects = [
    {title:"ManageMate ERP System",desc:"Enterprise resource management for tiles company.",tech:"Java • Spring Boot • MySQL",category:"fullstack"},
    {title:"AI PromptLab",desc:"LLM prompt experimentation and tooling.",tech:"Python • Prompt Engineering",category:"ai"},
    {title:"React Portfolio",desc:"Modern personal site with components.",tech:"React • Tailwind",category:"web"},
    {title:"Node API Dashboard",desc:"Backend analytics dashboard.",tech:"Node.js • Express",category:"fullstack"},
    {title:"DataViz Insights",desc:"Power BI dashboard with Python ETL.",tech:"Python • Power BI",category:"ai"},
  ];
  const grid = document.getElementById("project-grid");
  if(!grid) return;

  function render(list){
    grid.innerHTML = "";
    list.forEach(p=>{
      const card = document.createElement("div");
      card.className = "project";
      card.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <span style="color:var(--accent2);font-size:13px">${p.tech}</span>
      `;
      grid.appendChild(card);
    });
  }
  render(projects);

  document.querySelectorAll(".filter").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;
      if(cat === "all") render(projects);
      else render(projects.filter(p => p.category === cat));
    });
  });
})();

/* ---------- Certificates (preview on site) ---------- */
(function(){
  const certs = [
    {title:"AWS — Intro to Generative AI",issuer:"AWS Training & Certification",img:"assets/aws-cert.webp",file:"assets/AWS (Introduction to Generative AI -Art of the Possible)Certificate.pdf"},
    {title:"Deloitte — Data Analytics Job Simulation",issuer:"Forage / Deloitte",img:"assets/deloitte-analytics.webp",file:"assets/Deloitte Data Analytics Job Simmulation Certificate.pdf"},
    {title:"Deloitte — Technology Job Simulation",issuer:"Forage / Deloitte",img:"assets/deloitte-tech.webp",file:"assets/Deloitte Technology Job Simmulation Certificate.pdf"}
  ];
  const grid = document.getElementById("cert-grid");
  if(!grid) return;

  grid.innerHTML = "";
  certs.forEach(c=>{
    const el = document.createElement("div");
    el.className = "cert-card";
    el.innerHTML = `
      <h3>${c.title}</h3>
      <p>${c.issuer}</p>
      <a href="#" class="view-cert" data-img="${c.img}" data-pdf="${c.file}">🔍 View on Site</a>
    `;
    grid.appendChild(el);
  });

  const modal = document.getElementById("cert-modal");
  const closeBtn = document.getElementById("close-cert");
  const img = document.getElementById("cert-image");
  const dl = document.getElementById("cert-download");

  grid.addEventListener("click", (e)=>{
    const a = e.target.closest(".view-cert");
    if(!a) return;
    e.preventDefault();
    img.src = a.dataset.img;
    dl.href = a.dataset.pdf;
    modal.classList.add("show");
  });
  if(closeBtn) closeBtn.addEventListener("click", ()=> modal.classList.remove("show"));
  modal.addEventListener("click", (e)=>{ if(e.target === modal) modal.classList.remove("show"); });
})();

/* ---------- EmailJS contact ---------- */
(function(){
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if(!form || typeof emailjs === "undefined") return;
  emailjs.init("xsM_LaGACQHNt1zW0");
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(status) status.textContent = "Sending...";
    emailjs.sendForm("service_ih16zo9","template_9ifhvya",form)
      .then(()=>{ if(status) status.textContent = "✅ Message sent successfully!"; form.reset(); })
      .catch(()=>{ if(status) status.textContent = "❌ Failed to send message."; });
  });
})();

/* ---------- Profile modal (logo + hero photo) ---------- */
function openProfile(){
  if(!profileModal) return;
  profileModal.classList.add("show");
  if(typeof gsap !== "undefined"){
    gsap.from(".modal-content",{ scale:0.92, opacity:0, duration:.35, ease:"power2.out" });
  }
}
if(profileLogo)  profileLogo.addEventListener("click", openProfile);
if(profileOpen)  profileOpen.addEventListener("click", openProfile);
if(closeProfile) closeProfile.addEventListener("click", ()=> profileModal.classList.remove("show"));
if(profileModal) profileModal.addEventListener("click", (e)=>{ if(e.target === profileModal) profileModal.classList.remove("show"); });

/* ---------- ESC to close menu/modals ---------- */
document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape"){
    body.classList.remove("menu-open");
    const certModal = document.getElementById("cert-modal");
    if(certModal) certModal.classList.remove("show");
    if(profileModal) profileModal.classList.remove("show");
  }
});
