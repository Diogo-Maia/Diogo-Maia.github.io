/* Diogo Maia — site behaviour. Vanilla JS, no dependencies. */
(function () {
  'use strict';

  var root = document.documentElement;
  var KEY = 'dm-theme';

  /* ---- Theme: stored choice, otherwise follow the OS ---- */
  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#ffffff' : '#080b12');
  }

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  apply(stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));

  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
  }

  /* ---- Nav background once the page scrolls ---- */
  var nav = document.getElementById('nav');
  function onScroll() { if (nav) nav.classList.toggle('stuck', window.scrollY > 12); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  var menuBtn = document.getElementById('menuBtn');
  var links = document.getElementById('navLinks');

  function closeMenu() {
    if (!links || !menuBtn) return;
    links.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
  }

  if (menuBtn && links) {
    menuBtn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    links.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* ---- Reveal on scroll ---- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('seen');
        revealer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    items.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 3, 2) * 80 + 'ms';
      revealer.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('seen'); });
  }

  /* ---- Highlight the section in view ---- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('on', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---- Footer year ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
