---
name: landing-inoro-ship-main
description: >-
  Commits and pushes this repo to GitHub branch main so GitHub Actions deploys
  the site to Pages. Use when publishing, shipping edits, or the user asks to go live.
---

# Ship InOro landing to production (main → GitHub Pages)

## What triggers deploy

- Workflow: `.github/workflows/deploy-pages.yml`
- **On:** push to **`main`** (and manual `workflow_dispatch`).
- **Result:** build (`npm ci`, `npm run build`), artifact upload, deploy to **GitHub Pages** (site configured for **inoro.ai** in that workflow).

## Preconditions

- Working tree changes are intentional; `npm run build` passes locally if the change is risky.
- Remote: typically `origin` → `https://github.com/Aproco-io/landing_inoro.git`.
- **Node:** `>=22.12` per `package.json`.

## Git workflow (recommended)

1. `git status` — review files.
2. If behind `origin/main`: either **stash**, `git pull --rebase origin main`, **pop**; or **commit first**, then `git pull --rebase origin main`, resolve conflicts, continue.
3. `git add -A` (or scoped add).
4. Commit with a clear message (what changed, why in one short body if needed).
5. `git push origin main`.

## After push

- Check **Actions** tab on GitHub for the **Deploy to GitHub Pages** run.
- Wait until deploy finishes; then verify **https://inoro.ai/** (or the environment URL shown in the workflow).

## Regenerating Polish HTML

- `npm run build:pl` runs `scripts/build-captured-body-pl.mjs` and **overwrites** `src/data/captured-body.pl.html` from English.
- Use only when the team wants PL regenerated; otherwise edit **`captured-body.pl.html`** directly.

## If push is rejected

- Pull with rebase: `git pull --rebase origin main`, fix conflicts, `git rebase --continue`, then `git push origin main`.
