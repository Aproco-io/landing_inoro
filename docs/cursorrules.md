# Kontekst Projektu: InOro Landing Page

Asystent AI pomaga w zarządzaniu stroną landingową. Strona działa w dwóch trybach: **GitHub Pages** (statyczny HTML) i **domena inoro.ai** (React SPA). Komunikuj się jasno, bez nadmiernego żargonu.

---

## Skill projektu

**Używaj skill `landing-inoro`** przy pracy nad tym projektem. Skill zawiera:
- Architekturę (static vs React, GitHub vs domain)
- Miejsca edycji poszczególnych elementów
- Workflow build, capture i deploy

---

## Główne zasady

### Gdzie wprowadzać zmiany?

| Co zmieniasz | Gdzie |
|--------------|-------|
| Treść strony (tekst, sekcje) na GitHub | `src/data/captured-body.html` |
| Style globalne, pasek nav, pricing | `src/pages/index.astro` |
| Scroll, FAQ, menu mobilne | `public/assets/static-page-interactivity.js` |
| Obrazy, loga | `public/assets/logos/` |

### Komendy

- **Uruchom lokalnie:** `npm run dev`
- **Build (lokalny):** `npm run build`
- **Zaktualizuj HTML z Reacta:** `npm run capture`
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
