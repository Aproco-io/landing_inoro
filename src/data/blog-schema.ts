/**
 * Dane strukturalne dla wpisów blogowych (schema.org/BlogPosting).
 *
 * Wspólne dla PL i EN — wcześniej schemat był tylko w szablonie polskim
 * (i to jako ogólniejszy Article), a angielskie wpisy nie miały żadnego.
 */
import { SITE_URL } from './i18n.ts';
import { resolveAuthor, authorHref, type Author } from './authors.ts';

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

function authorNode(a: Author) {
  if (a.isOrganization) {
    return { '@type': 'Organization', name: a.name, url: SITE_URL };
  }
  const href = authorHref(a);
  const onOwnDomain = !!href && href.includes('inoro.ai');
  return {
    '@type': 'Person',
    name: a.name,
    // `url` rezerwujemy dla własnej strony autora (gdy powstanie).
    // Profile zewnętrzne należą do `sameAs` — tak Google łączy tożsamości.
    ...(onOwnDomain && href ? { url: href } : {}),
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
    author: authorNode(a),
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
