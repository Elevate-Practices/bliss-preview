// Bliss Modern Dentistry: services menu + mobile menu
(function () {
  var btn = document.querySelector('.nav__btn'), mega = document.getElementById('mega');
  if (btn && mega) {
    var item = btn.parentElement, t;
    function set(o) { btn.setAttribute('aria-expanded', o); mega.classList.toggle('is-open', o); }
    btn.addEventListener('click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
    item.addEventListener('mouseenter', function () { clearTimeout(t); if (matchMedia('(hover:hover)').matches) set(true); });
    item.addEventListener('mouseleave', function () { t = setTimeout(function () { set(false); }, 180); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    document.addEventListener('click', function (e) { if (!item.contains(e.target)) set(false); });
  }
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
})();
