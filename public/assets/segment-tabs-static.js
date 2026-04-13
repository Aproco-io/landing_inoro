/**
 * Segment tabs (Retail / BPO / Fintech) — scoped to active language root.
 * Requires window.getActiveRoot() from static-page-interactivity.js (load that script first).
 */
(function () {
  var CONTENT = {
    en: {
      retail: {
        title: 'Retail & E-commerce',
        desc: 'Turn every customer call into sales and service insights. Improve NPS, reduce churn, and grow revenue.',
        bullets: [
          'Sales signal detection at scale',
          'Customer sentiment across channels',
          'Compliance for consumer lending',
          'Store & agent benchmarking',
        ],
        result: 'Real result',
        resultSub: 'Proven in retail contact centers.',
      },
      bpo: {
        title: 'BPO / Contact Centers',
        desc: 'Scale quality across hundreds of agents without proportional headcount growth.',
        bullets: [
          'White-label analytics for your clients',
          'Per-minute pricing scales with volume',
          'Automated QA reduces manual review by 80%',
          'Standardized coaching across all teams',
        ],
        result: 'Real result',
        resultSub: 'Proven in high-volume contact center environments.',
      },
      bfsi: {
        title: 'Fintech & Banking',
        desc: 'Meet compliance requirements while improving sales and service quality. Full audit trail for every call.',
        bullets: [
          'Regulatory compliance (MiFID, GDPR)',
          'Sales & onboarding quality',
          'Customer intent & sentiment',
          'Secure EU data residency',
        ],
        result: 'Real result',
        resultSub: 'Trusted by financial services.',
      },
    },
    pl: {
      retail: {
        title: 'Retail i e-commerce',
        desc: 'Zamieniaj każdą rozmowę z klientem w insighty sprzedaży i obsługi. Podnoś NPS, ograniczaj churn, zwiększaj przychody.',
        bullets: [
          'Wykrywanie sygnałów sprzedaży w skali',
          'Sentyment klienta w kanałach',
          'Compliance w kredytach konsumenckich',
          'Benchmarking sklepów i agentów',
        ],
        result: 'Rzeczywisty efekt',
        resultSub: 'Sprawdzone w retailowych contact center.',
      },
      bpo: {
        title: 'BPO / Contact center',
        desc: 'Skaluj jakość na setkach agentów bez proporcjonalnego wzrostu etatów.',
        bullets: [
          'Analityka white-label dla Twoich klientów',
          'Cennik za minutę rośnie razem z wolumenem',
          'Automatyczna QA ogranicza ręczny przegląd o ok. 80%',
          'Standaryzowany coaching we wszystkich zespołach',
        ],
        result: 'Rzeczywisty efekt',
        resultSub: 'Sprawdzone w środowiskach contact center o dużym wolumenie.',
      },
      bfsi: {
        title: 'Fintech i bankowość',
        desc: 'Spełniaj wymogi compliance, podnosząc sprzedaż i jakość obsługi. Pełna ścieżka audytu dla każdej rozmowy.',
        bullets: [
          'Zgodność regulacyjna (MiFID, RODO)',
          'Jakość sprzedaży i onboardingu',
          'Intencja i sentyment klienta',
          'Bezpieczna rezydencja danych w UE',
        ],
        result: 'Rzeczywisty efekt',
        resultSub: 'Zaufane w sektorze finansowym.',
      },
    },
  };

  var IMG = { bpo: 'assets/segment-retail.png', bfsi: 'assets/hero-dashboard-custom.png', retail: 'assets/segment-bpo.png' };

  function getLang() {
    var pl = document.getElementById('lang-pl');
    if (pl && !pl.hasAttribute('hidden')) return 'pl';
    return 'en';
  }

  function initSegmentTabs() {
    var getRoot = typeof window.getActiveRoot === 'function' ? window.getActiveRoot : function () { return document.body; };
    var root = getRoot();
    if (!root) return;
    var s = root.querySelector('#segments');
    if (!s) return;
    var v = s.querySelector(".hidden.md\\:block,[class*='md:block']");
    if (!v) return;
    var img = v.querySelector('img');
    if (!img) return;

    function setImg(k) {
      img.src = IMG[k] || IMG.bpo;
      img.alt = 'Segment ' + k;
    }

    function setContent(k) {
      try {
        var lang = getLang();
        var pack = CONTENT[lang] || CONTENT.en;
        var d = pack[k] || pack.bpo;
        var h3 = s.querySelector("[class*='grid-cols'] h3");
        var dp = s.querySelector("[class*='grid-cols'] p.mb-8");
        var bl = s.querySelectorAll('#segments [class*="space-y-3"] p');
        if (!bl.length) bl = s.querySelectorAll('[class*="space-y-3"] p');
        var rb = s.querySelector('#segments [class*="border-primary"]');
        if (h3) h3.textContent = d.title;
        if (dp) dp.textContent = d.desc;
        if (bl && bl.length >= 4) d.bullets.forEach(function (b, ix) { if (bl[ix]) bl[ix].textContent = b; });
        if (rb) {
          var ps = rb.querySelectorAll('p');
          if (ps[0]) ps[0].textContent = d.result;
          if (ps[1]) ps[1].textContent = d.resultSub;
        }
      } catch (e) {}
    }

    function applyFromTab(txt) {
      var k = 'bpo';
      if (txt.indexOf('retail') !== -1) k = 'retail';
      else if (txt.indexOf('bfsi') !== -1 || txt.indexOf('fintech') !== -1) k = 'bfsi';
      setImg(k);
      setContent(k);
    }

    s.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        s.querySelectorAll('button').forEach(function (x) {
          x.className =
            'flex-1 md:flex-none px-6 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-primary/30 dark:hover:border-primary/80';
        });
        b.className =
          'flex-1 md:flex-none px-6 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-primary text-white shadow-lg';
        applyFromTab((b.textContent || '').toLowerCase());
      });
    });

    var ab = s.querySelector('button.bg-primary') || s.querySelector('button');
    if (ab) applyFromTab((ab.textContent || '').toLowerCase());
  }

  window.initSegmentTabs = initSegmentTabs;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSegmentTabs);
  } else {
    initSegmentTabs();
  }
})();
