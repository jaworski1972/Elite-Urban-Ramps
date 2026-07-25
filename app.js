function toggleHeroVideo() {
  var container = document.getElementById('hero-video-container');
  var btn = document.getElementById('hero-video-btn');
  var iframe = document.getElementById('hero-video-iframe');
  if (!container || !btn) return;
  var isOn = container.style.display !== 'none';
  if (isOn) {
    container.style.display = 'none';
    btn.innerHTML = '&#9658;';
    btn.setAttribute('aria-label', 'Odtwórz wideo w tle');
  } else {
    container.style.display = '';
    btn.innerHTML = '&#10074;&#10074;';
    btn.setAttribute('aria-label', 'Zatrzymaj wideo w tle');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    toggleHeroVideo();
  }
});

function toggleMobileMenu() {
  var nav = document.getElementById('site-nav');
  var btn = document.getElementById('mobile-menu-btn');
  if (!nav) return;
  var isOpen = nav.classList.toggle('nav-open');
  if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

// Close the mobile menu after tapping a link, and on outside click
document.addEventListener('DOMContentLoaded', function () {
  var nav = document.getElementById('site-nav');
  if (!nav) return;
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') nav.classList.remove('nav-open');
  });
  document.addEventListener('click', function (e) {
    var btn = document.getElementById('mobile-menu-btn');
    if (nav.classList.contains('nav-open') && !nav.contains(e.target) && e.target !== btn) {
      nav.classList.remove('nav-open');
    }
  });
});
