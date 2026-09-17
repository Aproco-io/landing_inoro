/**
 * Pary językowe stron autorskich dla sitemapy.
 *
 * Strony autorskie są generowane z kolekcji treści, więc nie ma ich w
 * statycznej mapie URL_ALTERNATES — a bez tego sitemapa wypisywałaby ich
 * adresy bez hreflangów, podczas gdy <head> ma pełną parę. Reszta serwisu
 * trzyma hreflang w obu miejscach i ta ma trzymać tak samo.
 *
 * astro.config.mjs nie może sięgnąć po `astro:content` (kolekcja nie istnieje
 * w momencie czytania configu), więc front matter czytamy tutaj z dysku.
 * Slug i reguła "konto redakcyjne nie ma strony" pochodzą z tego samego
 * `resolveAuthor`, co strony — dzięki temu może rozjechać się co najwyżej
 * parsowanie front mattera, które pilnuje test w scripts/check-hreflang.mjs.
 */
import fs from 'node:fs';
import path from 'node:path';
import { resolveAuthor, authorPagePath, type AuthorLang } from './authors.ts';

const BLOG_DIR = 'src/content/blog';
const LANGS: AuthorLang[] = ['pl', 'en'];

function field(src: string, name: string): string | undefined {
  const m = src.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'));
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : undefined;
}

/** { '/pl/wiedza/autor/x/': '/resources/author/x/', ... } — tylko autorzy piszący w obu językach. */
export function authorPagePairs(): Record<string, string> {
  const seen = new Map<string, Set<AuthorLang>>();

  for (const lang of LANGS) {
    let files: string[] = [];
    try {
      files = fs.readdirSync(path.join(BLOG_DIR, lang)).filter((f) => f.endsWith('.md'));
    } catch {
      continue;
    }
    for (const file of files) {
      const src = fs.readFileSync(path.join(BLOG_DIR, lang, file), 'utf-8');
      if (field(src, 'draft') === 'true') continue;
      if (field(src, 'lang') !== lang) continue;
      const raw = field(src, 'author');
      if (!raw) continue;
      const author = resolveAuthor(raw);
      if (author.isOrganization || !author.slug) continue;
      const set = seen.get(author.slug) ?? new Set<AuthorLang>();
      set.add(lang);
      seen.set(author.slug, set);
    }
  }

  const pairs: Record<string, string> = {};
  for (const [slug, langs] of seen) {
    if (langs.size < LANGS.length) continue; // strona istnieje tylko po jednej stronie
    pairs[authorPagePath(slug, 'pl')] = authorPagePath(slug, 'en');
    pairs[authorPagePath(slug, 'en')] = authorPagePath(slug, 'pl');
  }
  return pairs;
}
