---
name: landing-inoro
description: Work on InOro landing page (Astro). Single static HTML source (captured-body.html). Use when editing content, fixing nav/styling, or deploying.
---

# InOro Landing Page – Developer Skill

## Architecture

**Jedno źródło treści** – wszędzie statyczny HTML z `captured-body.html` (bez Reacta).

Deploy na inoro.ai (base `/`). Zawartość: `StaticBody` + `captured-body.html`. Brak pages-mode – jeden tryb.

## Kluczowe pliki

| Plik | Kiedy edytować |
|------|-----------------|
| `src/pages/index.astro` | Layout, meta, style globalne |
| `src/components/StaticBody.astro` | Wyświetlanie captured HTML, skrypty |
| `src/data/captured-body.html` | Treść strony – jedno źródło |
| `public/assets/static-page-interactivity.js` | Scroll do sekcji, FAQ, menu mobilne, style nav |
| `scripts/capture-react-html.mjs` | Skrypt do przechwycenia HTML z Reacta |
| `scripts/process-captured-html.js` | Przetwarzanie przechwyconego HTML |

## Gdzie wprowadzać zmiany

### Treść strony
→ `src/data/captured-body.html` – edytuj bezpośrednio

### Style nawigacji
→ `src/pages/index.astro` – `<style is:global>` z `nav.fixed`  
→ `public/assets/static-page-interactivity.js` – logika scroll/FAQ/menu

### Cennik
→ `src/pages/index.astro` – `.pricing-custom`; treść w `captured-body.html`

### Logi, obrazy
→ `public/assets/logos/` – pliki PNG/SVG  
Uwaga: w nazwach plików unikaj spacji (np. `telbridge-logo.png` zamiast `telbridge logo.png`).

## Build i deploy

- **Lokalnie**: `npm run dev` – statyczna wersja (base `/`)
- **Deploy**: GitHub Actions (push na main) – wdrożenie na inoro.ai

## Typowe zadania

**Zmiana tekstu na stronie (GitHub)**  
→ Edytuj `src/data/captured-body.html`.

**Pasek nawigacji – biały, z cieniem**  
→ Już w `index.astro` w stylach `nav.fixed`. Nie usuwać.

**Przyciski nie scrollują do sekcji**  
→ `public/assets/static-page-interactivity.js` – `scrollMap` i `scrollToId`.

**FAQ accordion nie działa**  
→ Ten sam plik – selektor `#faq button`.

**404 na obrazki**  
→ Sprawdź ścieżki w captured HTML (np. `assets/...` zamiast `/assets/...`). Pliki w `public/assets/`.

## Dodatkowe zasoby

- Pełna dokumentacja: `docs/DEVELOPER-GUIDE.md`
- Instrukcje capture: `src/data/CAPTURE-INSTRUCTIONS.md`
- Reguły AI: `docs/cursorrules.md`
