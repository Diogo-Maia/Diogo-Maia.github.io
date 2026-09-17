/* Diogo Maia — CV behaviour. Vanilla JS, no dependencies. */
(function () {
  'use strict';

  var root = document.documentElement;
  var STORAGE_KEY = 'dm-theme';

  /* ---- Theme: stored preference, falling back to the OS setting ---- */
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#070a11' : '#f1f4f9');
  }

  var stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(stored || (prefersDark ? 'dark' : 'light'));

  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
    });
  }

  /* ---- Print / save as PDF ---- */
  var printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', function () { window.print(); });
  }

  /* ---- Toolbar separator once the sheet scrolls under it ---- */
  var toolbar = document.querySelector('.toolbar');
  function onScroll() {
    if (toolbar) toolbar.classList.toggle('scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Reveal blocks as they enter the viewport ---- */
  var blocks = document.querySelectorAll('.page > *, .layout .block');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

    blocks.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }
})();
