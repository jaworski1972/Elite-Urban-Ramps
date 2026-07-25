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