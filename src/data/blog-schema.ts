/**
 * Dane strukturalne dla wpisów blogowych (schema.org/BlogPosting).
 *
 * Wspólne dla PL i EN — wcześniej schemat był tylko w szablonie polskim
 * (i to jako ogólniejszy Article), a angielskie wpisy nie miały żadnego.
 */
import { SITE_URL } from './i18n.ts';
import { resolveAuthor, authorPagePath, type Author, type AuthorLang } from './authors.ts';
import { photoUrlFor } from './author-photo.ts';

const abs = (path: string) => new URL(path, SITE_URL).href;

const PUBLISHER = {
  '@type': 'Organization',
  name: 'InOro.ai',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: abs('/assets/logos/InOro_Logo.svg'),
  },
};

/**
 * Autor wpisu. Osoba dostaje `@id` równe adresowi swojej strony autorskiej —
 * dzięki temu Google skleja w jeden byt wystąpienia z wielu wpisów i z samej
 * strony autora. `url` wskazuje na tę stronę, a profile zewnętrzne zostają
 * w `sameAs` (tam Google szuka potwierdzenia tożsamości).
 */
export function authorNode(a: Author, lang: AuthorLang) {
  if (a.isOrganization) {
    return { '@type': 'Organization', name: a.name, url: SITE_URL };
  }
  const page = abs(authorPagePath(a.slug, lang));
  return {
    '@type': 'Person',
    '@id': page,
    name: a.name,
    url: page,
    ...(a.role?.[lang] ? { jobTitle: a.role[lang] } : {}),
    ...(photoUrlFor(a) ? { image: abs(photoUrlFor(a)!) } : {}),
    ...(a.linkedin ? { sameAs: [a.linkedin] } : {}),
  };
}

type BlogEntryData = {
  title: string;
  description: string;
  author: string;
  date: Date;
  updatedDate?: Date;
  cover?: string;
  category?: string;
  tags?: string[];
  slug: string;
};

export function blogPostingSchema(
  data: BlogEntryData,
  lang: 'pl' | 'en',
  blogIndexPath: string,
) {
  const canonical = abs(data.slug);
  const a = resolveAuthor(data.author);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    url: canonical,
    headline: data.title,
    description: data.description,
    inLanguage: lang === 'pl' ? 'pl-PL' : 'en-US',
    datePublished: data.date.toISOString(),
    // Bez daty aktualizacji Google przyjmuje datę publikacji — podajemy ją
    // jawnie, żeby nie zgadywał.
    dateModified: (data.updatedDate ?? data.date).toISOString(),
    author: authorNode(a, lang),
    publisher: PUBLISHER,
    isPartOf: {
      '@type': 'Blog',
      '@id': abs(blogIndexPath),
      name: lang === 'pl' ? 'Blog InOro' : 'InOro Blog',
    },
    ...(data.cover ? { image: [abs(data.cover)] } : {}),
    ...(data.category ? { articleSection: data.category } : {}),
    ...(data.tags && data.tags.length ? { keywords: data.tags.join(', ') } : {}),
  };
}

/**
 * Okruszki wpisu (schema.org/BreadcrumbList) — ta sama ścieżka, którą
 * widać nad tytułem: strona główna → indeks bloga → wpis.
 */
export function breadcrumbSchema(
  data: { title: string; slug: string },
  lang: 'pl' | 'en',
  blogIndexPath: string,
) {
  const home = lang === 'pl' ? '/pl/' : '/';
  const crumbs = [
    { name: lang === 'pl' ? 'Strona główna' : 'Home', path: home },
    { name: lang === 'pl' ? 'Wiedza' : 'Resources', path: blogIndexPath },
    { name: data.title, path: data.slug },
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

// Nagłówki H2, pod którymi wpisy trzymają FAQ (różne warianty w treściach).
const FAQ_HEADING = /^##\s+(FAQ|Najczęstsze pytania|Często zadawane pytania)\b.*$/im;

/** Markdown → zwykły tekst do `acceptedAnswer` (bez linków, pogrubień, list). */
const plainText = (md: string) =>
  md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/(\*\*|__|\*|_|`)/g, '')
    .replace(/^\s*(?:[-*+]|\d+\.)\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * FAQ wpisu (schema.org/FAQPage) wyciągnięte z treści Markdown: sekcja H2
 * „FAQ” / „Najczęstsze pytania”, w niej pytania jako H3 i odpowiedzi pod
 * nimi. Czytamy treść zamiast dublować FAQ we front matter — Google wymaga,
 * żeby markup zgadzał się z tym, co widać na stronie, a tak nie rozjedzie się
 * po edycji. Brak sekcji albo pytań → `null` (szablon nie wstawia skryptu).
 */
export function faqPageSchema(body: string | undefined) {
  if (!body) return null;
  const start = body.search(FAQ_HEADING);
  if (start < 0) return null;
  const afterHeading = body.slice(start).replace(FAQ_HEADING, '');
  const nextH2 = afterHeading.search(/^##\s/m);
  const section = nextH2 >= 0 ? afterHeading.slice(0, nextH2) : afterHeading;

  const items = section
    .split(/^###\s+/m)
    .slice(1)
    .map((chunk) => {
      const [q, ...rest] = chunk.split('\n');
      return { q: plainText(q), a: plainText(rest.join('\n').replace(/^---\s*$/gm, '')) };
    })
    .filter((it) => it.q && it.a);
  if (!items.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

type AuthorPost = { title: string; slug: string; date: Date };

/**
 * Dane strukturalne strony autorskiej (schema.org/ProfilePage).
 *
 * `mainEntity` to ta sama osoba co w `author` wpisów — z tym samym `@id`,
 * więc Google widzi jeden byt, a nie kilku różnych ludzi o tym samym imieniu.
 * `hasPart` wylicza dorobek, co domyka powiązanie w drugą stronę.
 */
export function profilePageSchema(
  a: Author,
  lang: AuthorLang,
  posts: AuthorPost[],
) {
  const page = abs(authorPagePath(a.slug, lang));
  const person = {
    ...authorNode(a, lang),
    ...(a.bio?.[lang] ? { description: a.bio[lang] } : {}),
    worksFor: PUBLISHER,
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: page,
    name: a.name,
    inLanguage: lang === 'pl' ? 'pl-PL' : 'en-US',
    mainEntity: person,
    ...(posts.length
      ? {
          hasPart: posts.map((p) => ({
            '@type': 'BlogPosting',
            '@id': abs(p.slug),
            url: abs(p.slug),
            headline: p.title,
            datePublished: p.date.toISOString(),
            author: { '@id': page },
          })),
        }
      : {}),
  };
}
