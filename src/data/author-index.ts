/**
 * Kto faktycznie ma stronę autorską — liczone z kolekcji wpisów, nie z rejestru.
 *
 * Zasada: strona powstaje dla osoby, która ma co najmniej jeden opublikowany
 * artykuł w danym języku. Dwa powody:
 *  - pusta strona autora to klasyczna "thin page" — Google traktuje ją jak
 *    śmieć, a nam nie daje nic w zamian,
 *  - dzięki temu w szablonie wpisu nie musimy nic sprawdzać: skoro wpis
 *    istnieje, to jego autor z definicji ma stronę (patrz `authorHref`).
 *
 * Konta redakcyjne (`isOrganization`) są pomijane — to wydawca, nie osoba.
 * Szkice nie liczą się do dorobku.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { resolveAuthor, type Author, type AuthorLang } from './authors.ts';

export type AuthorWithPosts = {
  author: Author;
  posts: CollectionEntry<'blog'>[];
};

export async function authorsWithPosts(lang: AuthorLang): Promise<AuthorWithPosts[]> {
  const posts = await getCollection('blog', (p) => p.data.lang === lang && !p.data.draft);

  const bySlug = new Map<string, AuthorWithPosts>();
  for (const post of posts) {
    const author = resolveAuthor(post.data.author);
    if (author.isOrganization) continue;
    const bucket = bySlug.get(author.slug) ?? { author, posts: [] };
    bucket.posts.push(post);
    bySlug.set(author.slug, bucket);
  }

  for (const bucket of bySlug.values()) {
    bucket.posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  }
  return [...bySlug.values()].sort((a, b) => a.author.name.localeCompare(b.author.name, 'pl'));
}

/** Czy ten sam autor pisze też w drugim języku — do sparowania hreflangów. */
export async function hasPostsIn(slug: string, lang: AuthorLang): Promise<boolean> {
  const all = await authorsWithPosts(lang);
  return all.some((a) => a.author.slug === slug);
}
