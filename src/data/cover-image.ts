/**
 * Okładki wpisów blogowych — z `src/assets/blog/`, optymalizowane przez Astro.
 *
 * Front matter wpisu nie zmienia się: `cover: "/blog/nazwa.jpg"` jak dotąd.
 * Plik leży jednak w `src/assets/blog/nazwa.jpg`, nie w `public/blog/`, bo
 * tylko obrazy importowane z `src/` przechodzą przez `astro:assets`
 * (WebP/AVIF, kilka szerokości, `width`/`height` w HTML). Pliki z `public/`
 * Astro kopiuje jak leci.
 *
 * Gdy wartości `cover` nie da się dopasować do pliku (adres zewnętrzny,
 * literówka), zwracamy `undefined`, a komponent renderuje zwykłe `<img>`
 * z tą ścieżką — build się nie wywala, a problem widać w przeglądarce.
 */
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/blog/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const byPublicPath = new Map<string, ImageMetadata>();
for (const [file, mod] of Object.entries(files)) {
  const name = file.slice(file.lastIndexOf('/') + 1);
  byPublicPath.set(`/blog/${name}`.toLowerCase(), mod.default);
}

/** `"/blog/nazwa.jpg"` → metadane obrazu do `<Picture>` / `getImage`. */
export function coverImage(cover?: string): ImageMetadata | undefined {
  if (!cover) return undefined;
  return byPublicPath.get(cover.trim().toLowerCase());
}

/**
 * Adres okładki do og:image i schema.org — oryginalny plik (JPG),
 * bo Facebook/LinkedIn nie czytają WebP/AVIF. Dla nieznanej okładki
 * zwraca wartość z front mattera bez zmian.
 */
export function coverUrl(cover?: string): string | undefined {
  if (!cover) return undefined;
  return coverImage(cover)?.src ?? cover;
}
