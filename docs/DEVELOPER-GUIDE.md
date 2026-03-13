# InOro Landing Page – Przewodnik dla developera

Dokumentacja dla osoby pracującej nad stroną z pomocą Claude/Cursor. Projekt: landing InOro.ai.

---

## 1. Co to za projekt?

- Strona landingowa InOro.ai (AI do analizy rozmów w call center).
- Astro + React SPA + statyczny HTML.
- Dwa hosty: **GitHub Pages** (`*.github.io/landing_inoro/`) i **domena inoro.ai** (React).

---

## 2. Jak działa architektura?

| Środowisko | URL | Zawartość |
|------------|-----|-----------|
| **GitHub Pages** | aproco-io.github.io/landing_inoro/ | Statyczny HTML (captured z Reacta) |
| **inoro.ai** | https://inoro.ai | React SPA |

Tryb deployu ustawiasz w `.github/pages-mode.txt`:
- `github` → build dla GitHub Pages
- `domain` → build dla inoro.ai

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
│   └── pages-mode.txt             # github | domain
└── docs/
    ├── DEVELOPER-GUIDE.md         # Ten plik
    └── cursorrules.md
```

---

## 4. Gdzie wprowadzać zmiany?

### Zmiany treści na stronie (GitHub Pages)
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

## 5. Jak zaktualizować HTML z Reacta (re-capture)?

Jeśli zmieniasz layout lub treść w React SPA i chcesz to przenieść na GitHub Pages:

```bash
npm run capture
```

Skrypt:
1. Buduje stronę z `base=/`
2. Uruchamia preview
3. Używa Playwright do przechwycenia HTML z `#root`
4. Zapisuje wynik do `src/data/captured-body.html`

**Uwaga:** Wymaga `playwright` i skonfigurowanego źródła Reacta (np. manus). Szczegóły: `src/data/CAPTURE-INSTRUCTIONS.md`.

---

## 6. Lokalne uruchomienie

```bash
npm install
npm run dev
```

Domyślnie: React SPA na http://localhost:4323/ (port może się różnić).

Test statycznej wersji:
```bash
PUBLIC_BASE_PATH=/landing_inoro/ npm run build
npm run preview
```

---

## 7. Deploy (publikacja)

1. Wypchnij zmiany na main: `git push origin main`
2. GitHub Actions zbuduje stronę według `pages-mode.txt`
3. Wynik trafi na GitHub Pages (lub inoro.ai, zależnie od trybu)

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
