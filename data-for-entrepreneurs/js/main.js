/* ===========================
   LIZ Data Academy — Curso SQL
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

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  // ── ACORDEÓN: solo un módulo abierto a la vez (opcional) ──
  const modulos = document.querySelectorAll('.modulo');
  modulos.forEach(modulo => {
    modulo.addEventListener('toggle', () => {
      if (modulo.open) {
        modulos.forEach(m => { if (m !== modulo) m.open = false; });
      }
    });
  });

});