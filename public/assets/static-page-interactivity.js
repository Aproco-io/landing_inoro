/**
 * Interactivity for static captured HTML (GitHub Pages):
 * - Smooth scroll to sections from nav/buttons
 * - FAQ accordion
 * - Mobile menu toggle
 * (Nav bar stays fixed at top – no hide-on-scroll)
 */
(function () {
  var scrollMap = [
    { keys: ['inoro', 'inoro.ai'], id: 'hero' },
    { keys: ['how it works', 'see how it works'], id: 'how-it-works' },
    { keys: ['features'], id: 'features' },
    { keys: ['pricing'], id: 'pricing' },
    { keys: ['clients'], id: 'clients' },
    { keys: ['demo', 'book a demo', 'book a free demo', 'get a quote'], id: 'demo' },
    { keys: ['faq'], id: 'faq' },
  ];

  function scrollToId(id) {
    if (id === '#hero' || id === '' || id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    var el = document.querySelector(id);
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
    if (t.closest('#faq')) return;
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

  /* Nav bar stays visible (fixed at top) – no hide-on-scroll on static GitHub Pages */

  /* FAQ accordion – event delegation so it works when DOM is ready */
  function initFaq() {
    var faq = document.getElementById('faq');
    if (!faq) return;
    faq.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn || !faq.contains(btn)) return;
      var content = btn.nextElementSibling;
      if (!content || !content.classList) return;
      var wasHidden = content.classList.contains('hidden');
      document.querySelectorAll('#faq button + div').forEach(function (d) {
        d.classList.add('hidden');
      });
      document.querySelectorAll('#faq button svg.lucide-chevron-down').forEach(function (s) {
        s.style.transform = '';
      });
      if (wasHidden) {
        content.classList.remove('hidden');
        var svg = btn.querySelector('svg.lucide-chevron-down');
        if (svg) svg.style.transform = 'rotate(180deg)';
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFaq);
  } else {
    initFaq();
  }

  var menuBtn = document.querySelector('nav button[aria-label="Toggle menu"]');
  if (menuBtn) {
    var nav = menuBtn.closest('nav');
    var navLinks = nav && nav.querySelector('[class*="gap-8"]');
    if (navLinks) {
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
    }
  }
})();
