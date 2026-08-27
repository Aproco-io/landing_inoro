/**
 * InOro cookie consent banner — GDPR-compliant.
 * Stores decision in localStorage key 'inoro-cookie-consent' ('accepted' | 'declined').
 * Banner text switches language automatically based on 'inoro-lang' setting.
 */
(function () {
  var CONSENT_KEY = 'inoro-cookie-consent';
  var LANG_KEY = 'inoro-lang';

  var TEXT = {
    en: {
      message: 'We use cookies to improve your experience. By clicking "Accept" you consent to the use of cookies.',
      privacy: 'Privacy Policy',
      accept: 'Accept',
      decline: 'Decline',
      ariaLabel: 'Cookie consent',
    },
    pl: {
      message: 'Używamy plików cookie, aby poprawić komfort korzystania ze strony. Klikając „Akceptuj" wyrażasz zgodę na ich stosowanie.',
      privacy: 'Polityka prywatności',
      accept: 'Akceptuj',
      decline: 'Odrzuć',
      ariaLabel: 'Zgoda na pliki cookie',
    },
  };

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }

  function setConsent(val) {
    try { localStorage.setItem(CONSENT_KEY, val); } catch (e) {}
    if (val === 'accepted') grantAnalytics();
  }

  /* Consent Mode v2: the page declares everything 'denied' by default before
     gtag/js loads. We only ever flip analytics_storage to 'granted' — a
     decline simply leaves the default in place. */
  function grantAnalytics() {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(['consent', 'update', { analytics_storage: 'granted' }]);
    }
  }

  function getCurrentLang() {
    /* 1. Explicit user choice in localStorage wins. */
    try {
      var s = localStorage.getItem(LANG_KEY);
      if (s === 'pl' || s === 'en') return s;
    } catch (e) {}
    /* 2. Fall back to the page's declared language (Astro sets <html lang>). */
    var docLang = (document.documentElement.lang || '').toLowerCase();
    if (docLang.indexOf('pl') === 0) return 'pl';
    if (docLang.indexOf('en') === 0) return 'en';
    /* 3. Last resort: browser preference. */
    try {
      var browserLang = (navigator.language || '').toLowerCase();
      if (browserLang.indexOf('pl') === 0) return 'pl';
    } catch (e) {}
    return 'en';
  }

  function removeBanner(banner) {
    banner.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    banner.style.transform = 'translateY(100%)';
    banner.style.opacity = '0';
    setTimeout(function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, 350);
  }

  function buildBannerContent(banner, lang) {
    var t = TEXT[lang] || TEXT.en;
    banner.innerHTML = '';
    banner.setAttribute('aria-label', t.ariaLabel);

    var textEl = document.createElement('p');
    textEl.style.cssText =
      'margin:0;color:#94a3b8;font-size:0.875rem;flex:1;min-width:180px;line-height:1.5;';
    textEl.textContent = t.message + ' ';

    var link = document.createElement('a');
    link.href = '/Polityka-Prywatnosci.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.cssText = 'color:#259bf7;text-decoration:underline;white-space:nowrap;';
    link.textContent = t.privacy;
    textEl.appendChild(link);

    var btns = document.createElement('div');
    btns.style.cssText = 'display:flex;gap:0.625rem;flex-shrink:0;align-items:center;';

    var btnDecline = document.createElement('button');
    btnDecline.type = 'button';
    btnDecline.textContent = t.decline;
    btnDecline.setAttribute('data-cookie-btn', 'decline');
    btnDecline.style.cssText =
      'padding:0.45rem 1.1rem;border-radius:0.4rem;background:transparent;' +
      'border:1px solid #475569;color:#94a3b8;font-size:0.875rem;font-weight:600;cursor:pointer;';

    var btnAccept = document.createElement('button');
    btnAccept.type = 'button';
    btnAccept.textContent = t.accept;
    btnAccept.setAttribute('data-cookie-btn', 'accept');
    btnAccept.style.cssText =
      'padding:0.45rem 1.1rem;border-radius:0.4rem;background:#259bf7;' +
      'border:none;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;';

    btns.appendChild(btnDecline);
    btns.appendChild(btnAccept);
    banner.appendChild(textEl);
    banner.appendChild(btns);
  }

  function createBanner() {
    /* Returning visitor who already accepted: re-grant on every load,
       because Consent Mode defaults back to 'denied' on each page view. */
    if (getConsent() === 'accepted') { grantAnalytics(); return; }
    if (getConsent() !== null) return;

    var lang = getCurrentLang();
    var banner = document.createElement('div');
    banner.id = 'inoro-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.style.cssText =
      'position:fixed;bottom:0;left:0;right:0;z-index:9999;' +
      'background:#0f172a;border-top:1px solid #334155;' +
      'padding:1rem 1.5rem;display:flex;align-items:center;' +
      'justify-content:space-between;gap:1rem;flex-wrap:wrap;' +
      'box-shadow:0 -4px 24px rgba(0,0,0,0.5);' +
      'font-family:Inter,Sora,system-ui,sans-serif;';

    buildBannerContent(banner, lang);

    banner.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-cookie-btn]');
      if (!btn) return;
      setConsent(btn.getAttribute('data-cookie-btn') === 'accept' ? 'accepted' : 'declined');
      removeBanner(banner);
    });

    document.body.appendChild(banner);
  }

  /* Update banner text when user switches language */
  document.addEventListener('click', function (e) {
    var langBtn = e.target.closest('[data-inoro-lang]');
    if (!langBtn) return;
    var banner = document.getElementById('inoro-cookie-banner');
    if (!banner) return;
    var newLang = langBtn.getAttribute('data-inoro-lang');
    buildBannerContent(banner, newLang === 'pl' ? 'pl' : 'en');
    /* Re-attach click handler after innerHTML rebuild */
    banner.removeEventListener('click', banner._cookieHandler);
    banner._cookieHandler = function (e) {
      var btn = e.target.closest('[data-cookie-btn]');
      if (!btn) return;
      setConsent(btn.getAttribute('data-cookie-btn') === 'accept' ? 'accepted' : 'declined');
      removeBanner(banner);
    };
    banner.addEventListener('click', banner._cookieHandler);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBanner);
  } else {
    createBanner();
  }
})();
