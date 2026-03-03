/* ===================================
   PARIKH GRAPHICS — script.js v2
   =================================== */

// ── Theme Toggle ───────────────────────────────────────
const body = document.body;
const toggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Load saved preference
const savedTheme = localStorage.getItem('pg-theme') || 'dark';
if (savedTheme === 'light') {
  body.classList.add('light');
  if (themeIcon) themeIcon.textContent = '☀️';
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    if (themeIcon) themeIcon.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('pg-theme', isLight ? 'light' : 'dark');
  });
}

// ── Custom Cursor ──────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

if (cursor && ring) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = (mx - 4) + 'px';
    cursor.style.top  = (my - 4) + 'px';
  });

  function animRing() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = (rx - 16) + 'px';
    ring.style.top  = (ry - 16) + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('a, button, .service-card, .work-item, .skill-pill, .stat-card, .contact-link').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2.5)';
      ring.style.opacity = '0.8';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      ring.style.opacity = '0.5';
    });
  });
}

// ── Scroll Reveal ──────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Smooth Scroll ──────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Nav Scroll Effect ──────────────────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });
