/**
 * Interactivity for static captured HTML (GitHub Pages):
 * - Language PL / EN (localStorage)
 * - Smooth scroll to sections from nav/buttons
 * - FAQ accordion
 * - Mobile menu toggle
 */
(function () {
  var STORAGE_KEY = 'inoro-lang';

  var TITLES = {
    pl: 'InOro.ai | Inteligencja rozmów AI dla contact center',
    en: 'InOro.ai | AI-Powered Conversation Intelligence for Contact Centers',
  };

  var DESC = {
    pl: 'InOro.ai analizuje AI-em 100% rozmów z klientami — sprzedaż, jakość obsługi i compliance. Dla BPO, finansów i retail.',
    en: 'InOro.ai analyzes 100% of customer calls with AI to boost sales, service quality, and compliance. Used by BPO, BFSI, and Retail leaders.',
  };

  function getActiveRoot() {
    var pl = document.getElementById('lang-pl');
    var en = document.getElementById('lang-en');
    if (pl && !pl.hasAttribute('hidden')) return pl;
    if (en && !en.hasAttribute('hidden')) return en;
    return pl || en || document.body;
  }
  window.getActiveRoot = getActiveRoot;

  function applyLang(lang) {
    var rootEn = document.getElementById('lang-en');
    var rootPl = document.getElementById('lang-pl');
    if (!rootEn || !rootPl) return;
    if (lang !== 'en' && lang !== 'pl') lang = 'en';
    if (lang === 'en') {
      rootEn.hidden = false;
      rootPl.hidden = true;
      document.documentElement.lang = 'en';
    } else {
      rootEn.hidden = true;
      rootPl.hidden = false;
      document.documentElement.lang = 'pl';
    }
    document.title = TITLES[lang] || TITLES.en;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', DESC[lang] || DESC.en);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    document.querySelectorAll('[data-inoro-lang]').forEach(function (btn) {
      var active = btn.getAttribute('data-inoro-lang') === lang;
      btn.setAttribute('aria-current', active ? 'true' : 'false');
    });

    if (typeof window.initSegmentTabs === 'function') {
      window.initSegmentTabs();
    }
  }

  function readStoredLang() {
    try {
      var s = localStorage.getItem(STORAGE_KEY);
      if (s === 'en' || s === 'pl') return s;
    } catch (e) {}
    /* No stored preference — auto-detect from browser language */
    try {
      var browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
      if (browserLang.indexOf('pl') === 0) return 'pl';
    } catch (e) {}
    return 'en';
  }

  /* Early sync: inline script in StaticBody may have set roots; align title/meta */
  if (document.getElementById('lang-en') && document.getElementById('lang-pl')) {
    applyLang(readStoredLang());
  }

  document.addEventListener('click', function (e) {
    var langBtn = e.target.closest('[data-inoro-lang]');
    if (langBtn && getActiveRoot().contains(langBtn)) {
      e.preventDefault();
      var next = langBtn.getAttribute('data-inoro-lang');
      if (next === 'en' || next === 'pl') applyLang(next);
      return;
    }
  });

  var scrollMap = [
    { keys: ['inoro', 'inoro.ai'], id: 'hero' },
    { keys: ['how it works', 'see how it works', 'jak to działa', 'zobacz, jak to działa'], id: 'how-it-works' },
    { keys: ['features', 'funkcje'], id: 'features' },
    { keys: ['pricing', 'cennik'], id: 'pricing' },
    { keys: ['clients', 'klienci'], id: 'clients' },
    {
      keys: ['demo', 'book a demo', 'book a free demo', 'get a quote', 'umów demo', 'umów bezpłatne demo', 'indywidualna wycena'],
      id: 'demo',
    },
    { keys: ['faq'], id: 'faq' },
  ];

  function scrollToId(hash) {
    var id = (hash || '').replace(/^#/, '');
    if (id === 'hero' || id === '' || id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    var root = getActiveRoot();
    var safe = id.replace(/[^a-zA-Z0-9_-]/g, '');
    var el = root.querySelector('#' + safe);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function getClickText(el) {
    var txt = (el.textContent || '').toLowerCase().trim();
    if (!txt && el.querySelector) {
      var img = el.querySelector('img[alt]');
      if (img) txt = (img.getAttribute('alt') || '').toLowerCase().trim();
    }
    return txt;
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('button, a');
    if (!t) return;
    var faqHost = t.closest('#faq');
    if (faqHost && getActiveRoot().contains(faqHost)) return;
    if (t.type === 'submit' && t.closest('form')) return;
    var href = t.getAttribute('href');
    if (href && href.charAt(0) === '#') {
      e.preventDefault();
      scrollToId(href === '#' ? 'top' : href);
      return;
    }
    var txt = getClickText(t);
    for (var i = 0; i < scrollMap.length; i++) {
      for (var j = 0; j < scrollMap[i].keys.length; j++) {
        if (txt.indexOf(scrollMap[i].keys[j]) !== -1) {
          e.preventDefault();
          scrollToId('#' + scrollMap[i].id);
          return;
        }
      }
    }
  });

  document.addEventListener('click', function (e) {
    var faq = e.target.closest('#faq');
    if (!faq) return;
    if (!getActiveRoot().contains(faq)) return;
    var btn = e.target.closest('button');
    if (!btn || !faq.contains(btn)) return;
    var content = btn.nextElementSibling;
    if (!content || !content.classList) return;
    var wasHidden = content.classList.contains('hidden');
    faq.querySelectorAll('button + div').forEach(function (d) {
      d.classList.add('hidden');
    });
    faq.querySelectorAll('button svg.lucide-chevron-down').forEach(function (s) {
      s.style.transform = '';
    });
    if (wasHidden) {
      content.classList.remove('hidden');
      var svg = btn.querySelector('svg.lucide-chevron-down');
      if (svg) svg.style.transform = 'rotate(180deg)';
    }
  });

  function initMobileMenus() {
    ['lang-pl', 'lang-en'].forEach(function (rid) {
      var root = document.getElementById(rid);
      if (!root) return;
      var nav = root.querySelector('nav');
      if (!nav) return;
      var menuSvg = nav.querySelector('svg.lucide-menu');
      var menuBtn = menuSvg && menuSvg.closest('button');
      var navLinks = nav.querySelector('[class*="gap-8"]');
      if (!menuBtn || !navLinks) return;
      function closeMenu() {
        navLinks.classList.add('hidden');
        navLinks.style.display = '';
      }
      menuBtn.addEventListener('click', function () {
        var isHidden = navLinks.classList.contains('hidden') || getComputedStyle(navLinks).display === 'none';
        navLinks.classList.toggle('hidden', !isHidden);
        navLinks.style.display = isHidden ? 'flex' : '';
      });
      navLinks.querySelectorAll('button, a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenus);
  } else {
    initMobileMenus();
  }
})();
