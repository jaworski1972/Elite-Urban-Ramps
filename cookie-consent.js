(function () {
  var GA_MEASUREMENT_ID = 'G-0WJ75KE0BW';
  var STORAGE_KEY = 'gramps_cookie_consent'; // 'accepted' | 'rejected'

  function updateConsent(granted) {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': granted ? 'granted' : 'denied'
      });
    }
  }

  function buildBanner() {
    var el = document.createElement('div');
    el.id = 'cc-banner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Zgoda na pliki cookie');
    el.innerHTML =
      '<div id="cc-text">Korzystamy z Google Analytics, aby lepiej rozumieć, jak odwiedzający korzystają ze strony. Włączymy go tylko za Twoją zgodą. Szczegóły w <a href="polityka-prywatnosci.html">polityce prywatności</a>.</div>' +
      '<div id="cc-actions">' +
        '<button id="cc-reject" type="button">Odrzuć</button>' +
        '<button id="cc-accept" type="button">Akceptuję</button>' +
      '</div>';
    document.body.appendChild(el);

    var style = document.createElement('style');
    style.textContent =
      '#cc-banner { position: fixed; left: 0; right: 0; bottom: 0; z-index: 998; background: oklch(22% 0.01 260); color: oklch(98% 0.005 80); padding: 20px 56px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; font-family: "Instrument Sans", sans-serif; }' +
      '#cc-text { font-size: 14px; color: oklch(98% 0.005 80 / 0.85); max-width: 640px; line-height: 1.5; }' +
      '#cc-text a { color: oklch(98% 0.005 80); text-decoration: underline; }' +
      '#cc-actions { display: flex; gap: 12px; flex-shrink: 0; }' +
      '#cc-actions button { font-family: inherit; font-size: 14px; padding: 11px 22px; cursor: pointer; border: 1px solid oklch(98% 0.005 80 / 0.4); background: transparent; color: oklch(98% 0.005 80); }' +
      '#cc-accept { background: oklch(98% 0.005 80); color: oklch(22% 0.01 260); border-color: oklch(98% 0.005 80); }' +
      '@media (max-width: 760px) { #cc-banner { padding: 18px 20px; } }';
    document.head.appendChild(style);

    el.querySelector('#cc-accept').addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      updateConsent(true);
      el.remove();
    });
    el.querySelector('#cc-reject').addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'rejected');
      updateConsent(false);
      el.remove();
    });

    return el;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var choice = localStorage.getItem(STORAGE_KEY);
    if (choice === 'accepted') {
      updateConsent(true);
    } else if (choice !== 'rejected') {
      buildBanner();
    }
  });

  // Exposed so the privacy policy page can offer a "change cookie settings" button.
  window.reopenCookieConsent = function () {
    var existing = document.getElementById('cc-banner');
    if (existing) existing.remove();
    buildBanner();
  };
})();
