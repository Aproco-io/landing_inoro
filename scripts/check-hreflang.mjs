/**
 * Kontrola spójności zbudowanego serwisu. Uruchom po `astro build`:
 *
 *     node scripts/check-hreflang.mjs
 *
 * Pilnuje czterech rzeczy, na których łatwo się przejechać przy dodawaniu
 * tras generowanych dynamicznie:
 *   1. zbiór stron w dist == zbiór adresów w sitemapie,
 *   2. hreflangi w <head> == hreflangi w sitemapie (dokładnie, także gdy
 *      jedna strona ma parę, a druga jej nie widzi — to był realny błąd przy
 *      stronach autorskich),
 *   3. każda strona odwołuje się w hreflangach do samej siebie,
 *   4. brak martwych linków wewnętrznych.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const fail = [];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const htmlFiles = walk(DIST);

// --- sitemapa ---
const sitemapXml = fs.readFileSync(path.join(DIST, 'sitemap-0.xml'), 'utf-8');
const sitemap = new Map();
for (const block of sitemapXml.split('<url>').slice(1)) {
  const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
  if (!loc) continue;
  const links = {};
  for (const m of block.matchAll(/hreflang="([^"]+)"\s+href="([^"]+)"/g)) links[m[1]] = m[2];
  sitemap.set(loc, links);
}

// --- strony ---
const pages = new Map();
for (const file of htmlFiles) {
  const t = fs.readFileSync(file, 'utf-8');
  const canonical = t.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical) continue;
  const links = {};
  for (const m of t.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)) links[m[1]] = m[2];
  pages.set(canonical, { file, links });
}

// 1. te same zbiory adresów
for (const url of pages.keys()) if (!sitemap.has(url)) fail.push(`w dist, brak w sitemapie: ${url}`);
for (const url of sitemap.keys()) if (!pages.has(url)) fail.push(`w sitemapie, brak w dist: ${url}`);

for (const [url, { links }] of pages) {
  // 2. zgodność z sitemapą. Strona bez tłumaczenia ma w <head> jeden tag
  //    samoodwołujący, a w sitemapie nic — pojedynczy hreflang i tak jest
  //    no-opem, więc to nie jest rozjazd. Liczy się sytuacja, w której
  //    któraś ze stron deklaruje PARĘ, a druga jej nie widzi.
  const sm = sitemap.get(url);
  const paired = Object.keys(links).length > 1 || Object.keys(sm ?? {}).length > 1;
  if (sm && paired && JSON.stringify(sm) !== JSON.stringify(links)) {
    fail.push(`rozjazd hreflang <head> vs sitemapa: ${url}\n     head=${JSON.stringify(links)}\n     smap=${JSON.stringify(sm)}`);
  }
  // 3. samoodwołanie
  if (!Object.values(links).includes(url)) fail.push(`brak samoodwołania w hreflang: ${url}`);
}

// 4. martwe linki wewnętrzne
const ASSET = /\.(css|js|png|jpe?g|svg|webp|avif|xml|ico|txt|xsl|pdf|woff2?)$/;
const dead = new Set();
for (const file of htmlFiles) {
  const t = fs.readFileSync(file, 'utf-8');
  for (const m of t.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1];
    if (ASSET.test(href)) continue;
    const asDir = path.join(DIST, href, 'index.html');
    if (!fs.existsSync(asDir) && !fs.existsSync(path.join(DIST, href))) {
      dead.add(`${href}  <- ${path.relative(DIST, file)}`);
    }
  }
}
for (const d of dead) fail.push(`martwy link wewnętrzny: ${d}`);

console.log(`stron: ${pages.size}   adresów w sitemapie: ${sitemap.size}`);
if (fail.length) {
  console.error(`\n${fail.length} problem(ów):`);
  for (const f of fail) console.error('  - ' + f);
  process.exit(1);
}
console.log('OK — zbiory zgodne, hreflangi spójne, brak martwych linków.');
