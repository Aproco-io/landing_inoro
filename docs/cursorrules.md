# Kontekst Projektu: InOro Landing Page

Asystent AI pomaga w zarządzaniu stroną landingową. Strona używa statycznego HTML wszędzie (GitHub Pages i inoro.ai). Treść: `captured-body.html` (EN) oraz `captured-body.pl.html` (PL), wstrzykiwane w `StaticBody.astro`.

---

## Skill projektu

**Używaj skill `landing-inoro`** przy pracy nad tym projektem. Skill zawiera: architekturę, miejsca edycji, workflow build i deploy

---

## Główne zasady

### Gdzie wprowadzać zmiany?

| Co zmieniasz | Gdzie |
|--------------|-------|
| Treść strony | `src/data/captured-body.html` (EN), `captured-body.pl.html` (PL) |
| Style globalne, pasek nav, pricing | `src/pages/index.astro` |
| Scroll, FAQ, menu mobilne | `public/assets/static-page-interactivity.js` |
| Obrazy, loga | `public/assets/logos/` |

### Komendy

- **Uruchom lokalnie:** `npm run dev`
- **Build (lokalny):** `npm run build`
- **Deploy:** `git push origin main` (GitHub Actions buduje automatycznie)

### Publikacja

1. `git add .`
2. `git commit -m "Opis zmian"`
3. `git push origin main`

Strona zaktualizuje się w ciągu 1–2 minut.

---

## Pełna dokumentacja

- **Dla developera:** `docs/DEVELOPER-GUIDE.md`
- **Skill AI:** `.cursor/skills/landing-inoro/SKILL.md`
