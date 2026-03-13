# InOro Landing Page – Przewodnik dla developera

Dokumentacja dla osoby pracującej nad stroną z pomocą Claude/Cursor. Projekt: landing InOro.ai.

---

## 1. Co to za projekt?

- Strona landingowa InOro.ai (AI do analizy rozmów w call center).
- Statyczny HTML (`captured-body.html`) – jedno źródło treści, bez Reacta.

---

## 2. Jak działa architektura?

Strona na **inoro.ai** (base `/`). Statyczny HTML z `captured-body.html`. Brak przełączania trybów.

---

## 3. Struktura plików
    
```
landing-inoro/
├── src/
│   ├── pages/index.astro          # Główny layout, meta, style globalne
│   ├── components/StaticBody.astro # Komponent statyczny dla GitHub
│   └── data/
│       ├── captured-body.html     # HTML strony (GitHub Pages)
│       └── CAPTURE-INSTRUCTIONS.md
├── public/
│   └── assets/
│       ├── static-page-interactivity.js  # Logika: scroll, FAQ, menu
│       ├── segment-tabs-static.js
│       └── logos/                  # Loga firm (png, svg)
├── scripts/
│   ├── capture-react-html.mjs     # Przechwycenie HTML z Reacta
│   └── process-captured-html.js   # Poprawki ścieżek w HTML
├── .github/
│   ├── workflows/deploy-pages.yml
└── docs/
    ├── DEVELOPER-GUIDE.md         # Ten plik
    └── cursorrules.md
```

---

## 4. Gdzie wprowadzać zmiany?

### Zmiany treści na stronie (GitHub + inoro.ai)
→ **`src/data/captured-body.html`**

Bezpośrednia edycja HTML. Szukaj sekcji po `id` (np. `#hero`, `#pricing`, `#demo`).

### Style globalne, pasek nawigacji, pricing
→ **`src/pages/index.astro`**

W sekcji `<style is:global>` są m.in.:
- Style `nav.fixed` (biały pasek z cieniem)
- Style `.pricing-custom`

### Interaktywność (scroll, FAQ, menu mobilne)
→ **`public/assets/static-page-interactivity.js`**

- Mapowanie przycisków na sekcje: `scrollMap`
- FAQ accordion: selektor `#faq button`
- Menu mobilne: `nav button[aria-label="Toggle menu"]`

### Obrazy i loga
→ **`public/assets/logos/`**

Używaj nazw bez spacji (np. `telbridge-logo.png`).

---

## 5. Lokalne uruchomienie

```bash
npm install
npm run dev
```

Strona na http://localhost:4323/ (port może się różnić).

---

## 6. Re-capture HTML (opcjonalnie)

Edytuj bezpośrednio `src/data/captured-body.html` – to normalny workflow.

Jeśli masz projekt React (np. Manus) i chcesz zsynchronizować wygląd: `npm run capture`. Wymaga Playwright.

---

## 7. Deploy

1. Wypchnij zmiany na main: `git push origin main`
2. GitHub Actions zbuduje stronę i wdroży na GitHub Pages (inoro.ai)

Deploy zwykle trwa 1–2 minuty po zakończeniu workflowu.

---

## 8. Typowe problemy i rozwiązania

| Problem | Rozwiązanie |
|---------|-------------|
| Pasek nav przezroczysty na GitHub | Style `nav.fixed` w `index.astro` – biały background + cień |
| Przyciski nie scrollują | Sprawdź `scrollMap` w `static-page-interactivity.js` |
| 404 na obrazki | Ścieżki typu `assets/...`, nie `/assets/...`. Pliki w `public/assets/` |
| Logo Telbridge nie działa | Użyj `telbridge-logo.png` (bez spacji) |
| FAQ się nie rozwijają | Sprawdź strukturę `#faq` w `captured-body.html` |
| Zmiany nie widać na GitHub | Hard refresh (Ctrl+Shift+R) lub tryb incognito |

---

## 9. Praca z Claude/Cursor

- **Skill projektu:** `.cursor/skills/landing-inoro/SKILL.md` – opisuje strukturę i workflow dla AI.
- **Reguły:** `docs/cursorrules.md` – dodatkowe wskazówki kontekstowe.

Możesz polecić Claude: „użyj skill landing-inoro” lub opisać zadanie (np. „zmień tekst w hero”, „napraw pasek nawigacji”), a agent odwoła się do odpowiednich plików.
