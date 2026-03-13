/**
 * Interactivity for static captured HTML (GitHub Pages):
 * - Smooth scroll to sections from nav/buttons
 * - Nav bar hide on scroll down, show on scroll up
 * - FAQ accordion
 * - Mobile menu toggle
 */
(function () {
  var NAV = document.querySelector('nav.fixed, nav[class*="fixed"]');
  var scrollMap = [
    { keys: ['how it works', 'see how it works'], id: 'how-it-works' },
    { keys: ['features'], id: 'features' },
    { keys: ['pricing'], id: 'pricing' },
    { keys: ['clients'], id: 'traction' },
    { keys: ['demo', 'book a demo', 'book a free demo', 'get a quote'], id: 'demo' },
    { keys: ['faq'], id: 'faq' },
  ];

  function scrollToId(id) {
    var el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('button, a');
    if (!t) return;
    var href = t.getAttribute('href');
    if (href && href.charAt(0) === '#') {
      e.preventDefault();
      scrollToId(href);
      return;
    }
    var txt = (t.textContent || '').toLowerCase().trim();
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

  document.querySelectorAll('#faq button').forEach(function (btn) {
    var content = btn.nextElementSibling;
    if (!content || !content.classList) return;
    btn.addEventListener('click', function () {
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
  });

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
