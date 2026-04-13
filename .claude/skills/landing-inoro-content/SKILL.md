---
name: landing-inoro-content
description: >-
  Edits the InOro landing (Astro): static captured HTML EN/PL, nav/interactivity,
  layout. Use when changing copy, sections, pricing, FAQ, images, or language-specific text.
---

# InOro landing — content and structure

## Stack

- **Astro** builds to `dist/`; production deploy is **GitHub Pages** (workflow on push to `main`).
- **No React at runtime** for the main page: body comes from captured static HTML injected in `StaticBody.astro`.

## Where to edit

| Goal | File(s) |
|------|---------|
| English page copy | `src/data/captured-body.html` |
| Polish page copy | `src/data/captured-body.pl.html` |
| Both roots, Formsprée, lang blocks | `src/components/StaticBody.astro` |
| Global layout, meta, extra CSS | `src/pages/index.astro` |
| Nav scroll, FAQ accordion, mobile menu, lang toggle | `public/assets/static-page-interactivity.js` |
| Segment-style tabs (static page) | `public/assets/segment-tabs-static.js` |
| Logos and static assets | `public/assets/` (paths in HTML often `assets/...`) |

## English vs Polish

- Two parallel HTML blobs: `lang-en` and `lang-pl` in `StaticBody.astro`.
- Language is stored in `localStorage` key **`inoro-lang`** (`en` | `pl`). Buttons use **`data-inoro-lang`** (handled in `static-page-interactivity.js`).
- After changing **English** structure, if you regenerate Polish via script, see warning in **landing-inoro-ship-main** skill about `npm run build:pl`.

## Validate locally

```bash
npm install # if needed
npm run dev # http://localhost:4321 — switch PL in the nav or set localStorage `inoro-lang` to `pl` and reload
npm run build # must succeed before shipping
```

## Do not

- Break asset paths: prefer `assets/...` as in captured HTML so `BASE_URL` on GitHub Pages stays correct.
- Run `npm run build:pl` unless the user wants to **overwrite** `captured-body.pl.html` from English; hand-edited Polish will be lost.

## More detail

- `docs/DEVELOPER-GUIDE.md`
- `src/data/CAPTURE-INSTRUCTIONS.md` (capture pipeline)
