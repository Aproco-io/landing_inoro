#!/usr/bin/env node
/**
 * Process captured React HTML for GitHub Pages.
 * - Replace src="/assets/ with src="assets/
 * - Replace href="/assets/ with href="assets/
 * - Add action and method to form with class="space-y-6"
 *
 * Usage: node scripts/process-captured-html.js < input.html
 *    or: cat captured.html | node scripts/process-captured-html.js
 */
const fs = require('fs');
const path = require('path');

let html = '';
if (process.stdin.isTTY) {
  console.error('Pipe HTML to stdin: cat your-captured.html | node process-captured-html.js');
  process.exit(1);
}
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { html += chunk; });
process.stdin.on('end', () => {
  html = html.replace(/src="\/assets\//g, 'src="assets/');
  html = html.replace(/href="\/assets\//g, 'href="assets/');
  html = html.replace(/<form([^>]*class="[^"]*space-y-6[^"]*"[^>]*)>/gi, (m) => {
    if (/action=/.test(m) && /method=/i.test(m)) return m;
    let extra = '';
    if (!/action=/.test(m)) extra += ' action="https://formspree.io/f/xpwnqjvz"';
    if (!/method=/i.test(m)) extra += ' method="POST"';
    return m.slice(0, -1) + extra + '>';
  });
  const out = path.join(__dirname, '../src/data/captured-body.html');
  fs.writeFileSync(out, html);
  console.log('Written to', out);
});
