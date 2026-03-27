/**
 * SLICKWEAR — Custom Animations & Interactions
 * shopifai-animations.js
 */
(function () {
  'use strict';

  /* ── 1. LOADING SCREEN ──────────────────────────────────── */
  function initLoader() {
    var loader = document.getElementById('sf-loader');
    if (!loader) return;
    var minTime = 1800;
    var t0 = Date.now();
    function hide() {
      var delay = Math.max(0, minTime - (Date.now() - t0));
      setTimeout(function () {
        loader.classList.add('sf-loader--hidden');
        document.body.style.overflow = '';
      }, delay);
    }
    if (document.readyState === 'complete') { hide(); }
    else { window.addEventListener('load', hide, { once: true }); }
  }

  /* ── 2. CUSTOM CURSOR ───────────────────────────────────── */
  function initCursor() {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    var cur = document.createElement('div');
    cur.className = 'sf-cursor';
    document.body.appendChild(cur);
    var cx = -200, cy = -200, ax = cx, ay = cy;
    document.addEventListener('mousemove', function (e) { cx = e.clientX; cy = e.clientY; });
    (function loop() {
      ax += (cx - ax) * 0.13; ay += (cy - ay) * 0.13;
      cur.style.left = ax + 'px'; cur.style.top = ay + 'px';
      requestAnimationFrame(loop);
    })();
    var sel = 'a,button,.card,.card-wrapper,input,label,.banner__content';
    document.addEventListener('mouseover', function (e) { if (e.target.closest(sel)) cur.classList.add('sf-cursor--hover'); });
    document.addEventListener('mouseout',  function (e) { if (e.target.closest(sel)) cur.classList.remove('sf-cursor--hover'); });
    document.addEventListener('mouseleave', function () { cur.style.opacity = '0'; });
    document.addEventListener('mouseenter', function () { cur.style.opacity = '1'; });
  }

  /* ── 3. ANNOUNCEMENT BAR MARQUEE ────────────────────────── */
  function initMarquee() {
    var bar = document.querySelector('.announcement-bar');
    if (!bar) return;
    var orig = bar.querySelector('.announcement-bar__message, p');
    var text = (orig ? orig.textContent.trim() : '') ||
      'FREE SHIPPING ON ORDERS OVER $150 — NEW COLLECTION DROPPING SOON — SLICKWEAR';
    var wrap = document.createElement('div');
    wrap.style.cssText = 'overflow:hidden;width:100%;';
    var track = document.createElement('div');
    track.className = 'sf-marquee-track';
    for (var i = 0; i < 14; i++) {
      var item = document.createElement('span');
      item.className = 'sf-marquee-item';
      item.textContent = text;
      track.appendChild(item);
    }
    wrap.appendChild(track);
    bar.innerHTML = '';
    bar.appendChild(wrap);
  }

  /* ── 4. HERO WORD REVEAL ────────────────────────────────── */
  function initHeroText() {
    document.querySelectorAll('.banner__heading').forEach(function (h) {
      var words = h.textContent.trim().split(/\s+/);
      if (!words.length) return;
      h.innerHTML = words.map(function (w) {
        return '<span class="sf-word"><span>' + w + '&nbsp;</span></span>';
      }).join('');
      setTimeout(function () { h.classList.add('sf-in-view'); }, 300);
    });
  }

  /* ── 5. SCROLL REVEAL ───────────────────────────────────── */
  function initScrollReveal() {
    var sel = '.card,.card-wrapper,.image-with-text,.email-signup-banner,.collage-card,.sf-textband,.featured-collection__title,.section__heading';
    var els = Array.from(document.querySelectorAll(sel));
    if (!els.length || !('IntersectionObserver' in window)) return;
    els.forEach(function (el, i) {
      el.classList.add('sf-reveal', 'sf-reveal--d' + ((i % 4) + 1));
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('sf-in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ── 6. PARALLAX BANNER ─────────────────────────────────── */
  function initParallax() {
    var medias = document.querySelectorAll('.banner__media');
    if (!medias.length || window.matchMedia('(max-width: 768px)').matches) return;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      requestAnimationFrame(function () {
        var sy = window.pageYOffset;
        medias.forEach(function (m) {
          var p = m.closest('.banner');
          if (!p) return;
          var r = p.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) return;
          m.style.transform = 'translateY(' + (sy * 0.22) + 'px)';
        });
        ticking = false;
      });
      ticking = true;
    }, { passive: true });
  }

  /* ── 7. HEADER SCROLL BEHAVIOUR ─────────────────────────── */
  function initHeader() {
    var hdr = document.querySelector('.header-wrapper,.shopify-section-header');
    if (!hdr) return;
    var last = 0, ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      requestAnimationFrame(function () {
        var sy = window.pageYOffset;
        hdr.classList.toggle('sf-header--scrolled', sy > 80);
        hdr.classList.toggle('sf-header--hidden', sy > last && sy > 200);
        last = sy; ticking = false;
      });
      ticking = true;
    }, { passive: true });
  }

  /* ── 8. SCROLL INDICATOR ────────────────────────────────── */
  function initScrollIndicator() {
    var banner = document.querySelector('.banner');
    if (!banner) return;
    var ind = document.createElement('div');
    ind.className = 'sf-scroll-indicator';
    ind.innerHTML = '<div class="sf-scroll-indicator__line"></div><span class="sf-scroll-indicator__text">Scroll</span>';
    banner.appendChild(ind);
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 120) { ind.style.opacity = '0'; ind.style.transition = 'opacity 0.5s'; }
    }, { once: true, passive: true });
  }

  /* ── INIT ───────────────────────────────────────────────── */
  function init() {
    initLoader();
    initCursor();
    initMarquee();
    initHeroText();
    initScrollReveal();
    initParallax();
    initHeader();
    initScrollIndicator();
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); }
  else { init(); }

})();
