// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { hreflangFor, URL_ALTERNATES } from './src/data/i18n.ts';

// https://astro.build/config
// Domena produkcyjna jako domyślna, nie 'example.com'. Buildy bez tej
// zmiennej (Vercel, lokalne) generowały sitemapę z adresami example.com.
// Workflow GitHuba i tak ustawia PUBLIC_SITE_URL jawnie.
const site = process.env.PUBLIC_SITE_URL || 'https://inoro.ai';
const base = process.env.PUBLIC_BASE_PATH || '/';

/** Ścieżka (z końcowym ukośnikiem) z pełnego adresu wygenerowanego przez sitemap. */
function pathOf(url) {
  try {
    const p = new URL(url).pathname;
    return p.endsWith('/') ? p : p + '/';
  } catch {
    return '/';
  }
}

export default defineConfig({
  site,
  base,
  integrations: [
    sitemap({
      // Nie podajemy lastmod: build nie zna dat edycji treści, a wpisanie
      // daty builda oznaczałoby "wszystkie 54 strony zmienione dziś" przy
      // każdym deployu. Pusty lastmod jest uczciwszy niż zmyślony.
      // priority/changefreq też pomijamy — Google je ignoruje, a wartości
      // brane z sufitu to tylko szum.
      serialize(item) {
        const path = pathOf(item.url);

        // Mapa par językowych jest już jedynym źródłem prawdy dla hreflang
        // w <head>. Reużywamy jej tutaj, żeby sitemapa nie rozjechała się
        // ze stronami przy kolejnej zmianie struktury URL-i.
        const lang = path === '/pl/' || path.startsWith('/pl/') ? 'pl' : 'en';
        if (URL_ALTERNATES[path]) {
          item.links = hreflangFor(path, lang).map((h) => ({
            lang: h.hreflang,
            url: new URL(h.href, site).href,
          }));
        }
        return item;
      },
    }),
  ],
  vite: {
    server: {
      allowedHosts: ['.trycloudflare.com'],
    },
  },
});
