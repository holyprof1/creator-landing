/* ─── CreatorHiveAI — script.js ─── */
(function () {
  'use strict';

  /* 1. NAV — add shadow on scroll */
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* 2. MOBILE MENU toggle */
  window.toggleNav = function () {
    var menu = document.getElementById('mobileMenu');
    menu.classList.toggle('open');
  };

  /* 3. SMOOTH SCROLL for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var offset = 80;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* 4. SCROLL REVEAL — Intersection Observer */
  var revealEls = document.querySelectorAll(
    '.stats__card, .why__card, .how__step, .mobile__content, .mobile__visual, .cta-final__inner'
  );

  // Add reveal class to targeted elements
  revealEls.forEach(function (el) {
    el.classList.add('reveal');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        // Stagger delay for sibling groups
        var siblings = entry.target.parentElement.querySelectorAll('.reveal');
        var idx = Array.prototype.indexOf.call(siblings, entry.target);
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, idx * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(function (el) {
    observer.observe(el);
  });

})();
