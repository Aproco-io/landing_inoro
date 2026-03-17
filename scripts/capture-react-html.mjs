#!/usr/bin/env node
/**
 * Capture rendered React HTML from the landing page.
 * Builds with base /, runs preview, extracts #root content, processes and saves.
 *
 * Usage: npm run capture
 */
import { spawn } from 'child_process';
import { FORMSPREE_ID } from '../formspree.config.js';
import { createInterface } from 'readline';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createWriteStream } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

async function waitForPort(port, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(`http://localhost:${port}`);
      if (r.ok) return true;
    } catch (_) {}
    await new Promise((r) => setTimeout(r, 300));
  }
  return false;
}

function processHtml(html) {
  return html
    .replace(/src="\/assets\//g, 'src="assets/')
    .replace(/href="\/assets\//g, 'href="assets/')
    .replace(/telbridge logo\.png/g, 'telbridge-logo.png')
    .replace(/srcset="[^"]*"/g, 'srcset=""')
    .replace(/<form([^>]*class="[^"]*space-y-6[^"]*"[^>]*)>/gi, (m) => {
      if (/action=/.test(m) && /method=/i.test(m)) return m;
      let extra = '';
      if (!/action=/.test(m)) extra += ` action="https://formspree.io/f/${FORMSPREE_ID}"`;
      if (!/method=/i.test(m)) extra += ' method="POST"';
      return m.slice(0, -1) + extra + '>';
    });
}

async function main() {
  // 1. Build with base /
  console.log('Building site (base /)...');
  const build = spawn('npm', ['run', 'build'], {
    cwd: root,
    env: { ...process.env, PUBLIC_BASE_PATH: '/', PUBLIC_SITE_URL: 'https://inoro.ai' },
    stdio: 'pipe',
  });
  let buildErr = '';
  build.stderr.on('data', (d) => { buildErr += d; });
  const buildOk = await new Promise((resolve) => {
    build.on('exit', (c) => resolve(c === 0));
  });
  if (!buildOk) {
    console.error('Build failed:', buildErr);
    process.exit(1);
  }

  // 2. Start preview
  const preview = spawn('npm', ['run', 'preview'], { cwd: root, stdio: 'pipe' });
  const port = 4321;
  const ready = await waitForPort(port);
  if (!ready) {
    preview.kill();
    console.error('Preview server did not start in time');
    process.exit(1);
  }

  // 3. Fetch page and extract content via simple HTTP + regex (no JS execution)
  // React renders client-side - we need a real browser. Use dynamic import of playwright.
  let playwright;
  try {
    playwright = await import('playwright');
  } catch (e) {
    console.error('Playwright not found. Run: npm install -D playwright');
    preview.kill();
    process.exit(1);
  }

  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
  // Wait for React to render (nav or min-h-screen or any substantial content in #root)
  await page.waitForSelector('#root nav, #root .min-h-screen, #root [data-loc]', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2000); // extra buffer for hydration
  const html = await page.evaluate(() => {
    const root = document.getElementById('root');
    if (!root) return '';
    // Get full inner content (React may have section as first child, not div)
    return root.innerHTML;
  });
  await browser.close();
  preview.kill();

  if (!html || html.length < 500) {
    console.error('Captured HTML too short. React may not have rendered.');
    process.exit(1);
  }

  const processed = processHtml(html);
  const outPath = join(root, 'src/data/captured-body.html');
  writeFileSync(outPath, processed);
  console.log('Saved to', outPath);
  console.log('Run: npm run build (with PUBLIC_BASE_PATH for github) and deploy.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
