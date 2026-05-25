/* ===========================
   Lizard Data Academy
   main.js
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAV SCROLL STATE ──────────────────────────────────────
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── MOBILE MENU ───────────────────────────────────────────
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  // ── SCROLL REVEAL (Intersection Observer) ─────────────────
  const fadeEls = document.querySelectorAll(
    '.stats__item, .sobre__feature, .curso-card, .sobre__text, .sobre__grid, .contacto__text'
  );
  fadeEls.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const siblings = [...entry.target.parentElement.children];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 0.08}s`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => observer.observe(el));

  // ── FORM VALIDATION & SUBMIT ──────────────────────────────
  const form       = document.getElementById('infoForm');
  const submitBtn  = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');

  const requiredFields = ['nombre', 'email', 'curso'];

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFieldError(id) {
    document.getElementById(id)?.classList.add('error');
  }

  function clearFieldError(id) {
    document.getElementById(id)?.classList.remove('error');
  }

  // Live clear on user input
  requiredFields.forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => clearFieldError(id));
    document.getElementById(id)?.addEventListener('change', () => clearFieldError(id));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    // Validate required fields
    requiredFields.forEach(id => {
      const el = document.getElementById(id);
      if (!el || !el.value.trim()) {
        showFieldError(id);
        valid = false;
      } else {
        clearFieldError(id);
      }
    });

    // Validate email format
    const emailEl = document.getElementById('email');
    if (emailEl && emailEl.value.trim() && !validateEmail(emailEl.value.trim())) {
      showFieldError('email');
      valid = false;
    }

    if (!valid) return;

    // Simulate async submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';

    setTimeout(() => {
      form.style.display = 'none';
      successMsg.classList.add('visible');
    }, 1000);
  });

  // ── SMOOTH ACTIVE NAV LINK ────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  const linkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--brand)'
            : '';
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(section => linkObserver.observe(section));

});
