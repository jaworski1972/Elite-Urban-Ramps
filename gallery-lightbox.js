(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // Gallery images across every landing page consistently carry loading="lazy",
    // while header/footer logos and hero images do not — safe, non-invasive selector.
    var imgs = Array.prototype.slice.call(document.querySelectorAll('img[loading="lazy"]'));
    if (!imgs.length) return;

    var overlay = document.createElement('div');
    overlay.id = 'lb-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '<button id="lb-close" aria-label="Zamknij">&times;</button>' +
      '<button id="lb-prev" aria-label="Poprzednie zdjęcie">&#10094;</button>' +
      '<img id="lb-img" alt="" />' +
      '<button id="lb-next" aria-label="Następne zdjęcie">&#10095;</button>' +
      '<div id="lb-counter"></div>';
    document.body.appendChild(overlay);

    var style = document.createElement('style');
    style.textContent =
      '#lb-overlay { position: fixed; inset: 0; background: oklch(10% 0 0 / 0.94); z-index: 999; display: none; align-items: center; justify-content: center; }' +
      '#lb-overlay.lb-open { display: flex; }' +
      '#lb-overlay img#lb-img { max-width: 90vw; max-height: 86vh; object-fit: contain; display: block; }' +
      '#lb-overlay button { position: absolute; background: transparent; border: 0; color: oklch(98% 0.005 80); cursor: pointer; line-height: 1; }' +
      '#lb-close { top: 20px; right: 28px; font-size: 40px; font-weight: 300; }' +
      '#lb-prev, #lb-next { top: 50%; transform: translateY(-50%); font-size: 28px; padding: 16px; }' +
      '#lb-prev { left: 8px; }' +
      '#lb-next { right: 8px; }' +
      '#lb-counter { position: absolute; bottom: 22px; left: 50%; transform: translateX(-50%); color: oklch(98% 0.005 80 / 0.75); font-family: "IBM Plex Mono", monospace; font-size: 13px; }' +
      'img[loading="lazy"] { cursor: zoom-in; }' +
      '@media (max-width: 640px) { #lb-prev, #lb-next { font-size: 20px; padding: 10px; } #lb-close { font-size: 32px; top: 10px; right: 14px; } }';
    document.head.appendChild(style);

    var lbImg = overlay.querySelector('#lb-img');
    var counter = overlay.querySelector('#lb-counter');
    var idx = 0;

    function show(i) {
      idx = (i + imgs.length) % imgs.length;
      lbImg.src = imgs[idx].src;
      lbImg.alt = imgs[idx].alt || '';
      counter.textContent = (idx + 1) + ' / ' + imgs.length;
    }

    function open(i) {
      show(i);
      overlay.classList.add('lb-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      overlay.classList.remove('lb-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    imgs.forEach(function (img, i) {
      img.addEventListener('click', function () { open(i); });
    });

    overlay.querySelector('#lb-close').addEventListener('click', close);
    overlay.querySelector('#lb-prev').addEventListener('click', function () { show(idx - 1); });
    overlay.querySelector('#lb-next').addEventListener('click', function () { show(idx + 1); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });

    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('lb-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(idx - 1);
      else if (e.key === 'ArrowRight') show(idx + 1);
    });
  });
})();
