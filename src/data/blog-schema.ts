/**
 * Dane strukturalne dla wpisów blogowych (schema.org/BlogPosting).
 *
 * Wspólne dla PL i EN — wcześniej schemat był tylko w szablonie polskim
 * (i to jako ogólniejszy Article), a angielskie wpisy nie miały żadnego.
 */
import { SITE_URL } from './i18n.ts';
import { resolveAuthor, authorPagePath, type Author, type AuthorLang } from './authors.ts';
import { photoFor } from './author-photo.ts';

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
    ...(photoFor(a) ? { image: abs(photoFor(a)!) } : {}),
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
