---
name: landing-inoro
description: Work on InOro landing page (Astro). Explains static vs React modes, GitHub Pages vs domain deploy, captured HTML, and where to make changes. Use when editing the landing, fixing nav/styling, updating content, or deploying.
---

# InOro Landing Page – Developer Skill

## Architecture

Projekt ma **dwa tryby działania** zależne od `base`:

| Tryb | base | Gdzie | Co się wyświetla |
|------|------|-------|------------------|
| **GitHub Pages** | `/landing_inoro/` | github.io/landing_inoro/ | Statyczny HTML (`captured-body.html`) + skrypty |
| **Domain** | `/` | inoro.ai | React SPA |

`.github/pages-mode.txt` steruje deployem:
- `github` → build dla GitHub Pages (statyczna wersja)
- `domain` → build dla inoro.ai (React)

## Kluczowe pliki

| Plik | Kiedy edytować |
|------|-----------------|
| `src/pages/index.astro` | Layout, meta, style globalne, logika React/StaticBody |
| `src/components/StaticBody.astro` | Warunek użycia captured HTML, fallback, skrypty |
| `src/data/captured-body.html` | Treść statycznej strony (GitHub Pages) |
| `public/assets/static-page-interactivity.js` | Scroll do sekcji, FAQ, menu mobilne, style nav |
| `scripts/capture-react-html.mjs` | Skrypt do przechwycenia HTML z Reacta |
| `scripts/process-captured-html.js` | Przetwarzanie przechwyconego HTML |

## Gdzie wprowadzać zmiany

### Treść widoczna na GitHub Pages (statyczna wersja)
→ `src/data/captured-body.html` – bezpośrednia edycja HTML  
albo → `npm run capture` (jeśli masz dostęp do Reacta i chcesz zaktualizować z jego wyglądu)

### Style nawigacji / paska na górze
→ `src/pages/index.astro` – sekcja `<style is:global>` z `nav.fixed`  
→ `public/assets/static-page-interactivity.js` – logika (np. ukrywanie przy scrollu – obecnie wyłączona)

### Cennik, pricing
→ `src/pages/index.astro` – klasy `.pricing-custom` w stylach  
→ `src/data/captured-body.html` – jeśli sekcja pricing jest w captured HTML

### Logi, obrazy
→ `public/assets/logos/` – pliki PNG/SVG  
Uwaga: w nazwach plików unikaj spacji (np. `telbridge-logo.png` zamiast `telbridge logo.png`).

## Workflow: przechwycenie HTML z Reacta

Gdy zmieniasz layout/treść w React SPA i chcesz to odzwierciedlić na GitHub Pages:

```bash
npm run capture
```

Skrypt buduje stronę, uruchamia preview, używa Playwright do przechwycenia HTML z `#root`, zapisuje do `src/data/captured-body.html`. Zastosuj `scripts/process-captured-html.js` jeśli trzeba poprawić ścieżki assetów.

## Build i deploy

- **Lokalnie**: `npm run dev` – domyślnie React (base `/`)
- **Lokalny build dla GitHub**: `PUBLIC_BASE_PATH=/landing_inoro/ npm run build`
- **Deploy**: GitHub Actions (push na main) – workflow czyta `pages-mode.txt` i buduje odpowiednią wersję

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
