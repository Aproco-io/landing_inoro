# How to Process Captured HTML for GitHub Pages

The full React-rendered HTML was sent in a previous message in the parent conversation. Since it is not available in this context, follow these steps when you have the HTML:

## HTML Content
- Starts with: <div id="root"><section aria-label="Notifications alt+T" ...><div data-loc="client/src/pages/Home.tsx:37" class="min-h-screen flex flex-col bg-white dark:bg-slate-950...">
- Contains: nav, main with sections (hero, problem, how-it-works, features, segments, pricing, traction, faq, demo), and footer

## Steps

1. **Get the full HTML** - Copy the complete HTML from the parent conversation message.

2. **Pipe to process script** - The script at scripts/process-captured-html.js reads from stdin and writes to src/data/captured-body.html. It will:
   - Replace src="/assets/ with src="assets/
   - Replace href="/assets/ with href="assets/
   - Add action and method to the form (uses FORMSPREE_ID from formspree.config.js) if missing

3. **Run** (paste your HTML into a file first, e.g. captured-raw.html):
   cat captured-raw.html | node scripts/process-captured-html.js

   Or paste directly:
   Or: run "node scripts/process-captured-html.js", paste the HTML, then press Ctrl+D
