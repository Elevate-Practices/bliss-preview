// Bliss Modern Dentistry: mobile menu (the Services mega-menu is CSS-only: hover / focus-within)
(function () {
  document.documentElement.classList.add('js');
  var burger = document.querySelector('.burger'), mnav = document.getElementById('mnav');
  if (burger && mnav) {
    var open = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>';
    var close = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    function setM(o) {
      if (o) mnav.style.top = Math.max(0, burger.closest('.hdr').getBoundingClientRect().bottom) + 'px';
      burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
      mnav.classList.toggle('is-open', o); document.body.classList.toggle('nav-open', o); burger.innerHTML = o ? close : open;
    }
    burger.addEventListener('click', function () { setM(burger.getAttribute('aria-expanded') !== 'true'); });
    mnav.addEventListener('click', function (e) { if (e.target.closest('a')) setM(false); });
    matchMedia('(min-width:1061px)').addEventListener('change', function (m) { if (m.matches) setM(false); });
  }
  // Zoom-out reveal: each photo starts slightly enlarged and settles as it comes into view (top photos on page load).
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var imgs = document.querySelectorAll('.hero__media img, .hero__media video, .head__img, .feat__img, .round, .person__img');
  var boxes = [];
  Array.prototype.forEach.call(imgs, function (el) {
    var box = el.parentElement;
    if (!box.classList.contains('hero__media')) {
      box = document.createElement('span'); box.className = 'zoom';
      var cs = getComputedStyle(el); box.style.borderRadius = cs.borderRadius;
      el.parentNode.insertBefore(box, el); box.appendChild(el);
    } else box.classList.add('zoom');
    boxes.push(box);
  });
  function show(b) { b.classList.add('is-in'); }
  if (reduce || !('IntersectionObserver' in window)) { boxes.forEach(show); }
  else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    requestAnimationFrame(function () { requestAnimationFrame(function () { boxes.forEach(function (b) { io.observe(b); }); }); });
  }
  // Header video: pause for people who ask for less motion.
  var v = document.querySelector('.hero__vid'), pb = document.querySelector('.hero__pause');
  if (v) {
    v.removeAttribute('autoplay');
    [['mp4', 'video/mp4'], ['webm', 'video/webm']].forEach(function (x) {
      if (v.dataset[x[0]]) { var s = document.createElement('source'); s.src = v.dataset[x[0]]; s.type = x[1]; v.appendChild(s); }
    });
    function setP(p) { if (pb) { pb.classList.toggle('is-paused', p); var es = document.documentElement.lang === 'es'; pb.setAttribute('aria-label', p ? (es ? 'Reproducir el video de fondo' : 'Play background video') : (es ? 'Pausar el video de fondo' : 'Pause background video')); } }
    if (reduce) { setP(true); } else { v.load(); var pr = v.play(); if (pr && pr.catch) pr.catch(function () { setP(true); }); }
    if (pb) pb.addEventListener('click', function () { if (v.paused) { v.play(); setP(false); } else { v.pause(); setP(true); } });
  }
})();
