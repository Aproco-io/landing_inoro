/**
 * Zdjęcie autora — wykrywane z dysku przy budowaniu.
 *
 * Nie wpisujemy ścieżek na sztywno w rejestrze, bo wtedy deklaracja i plik
 * mogą się rozjechać: ktoś dopisuje `photo`, pliku nie ma i na produkcji
 * zostaje ikona zepsutego obrazka. Tutaj jest odwrotnie — wystarczy wrzucić
 * `src/assets/authors/<slug>.jpg` i zdjęcie pojawia się samo, a gdy pliku
 * nie ma, komponenty spokojnie renderują inicjały.
 *
 * Pliki leżą w `src/assets/`, nie w `public/`, bo tylko stamtąd Astro
 * optymalizuje obrazy (WebP, warianty 2x/3x dla ekranów retina).
 *
 * Pole `photo` w rejestrze zostaje jako ręczne nadpisanie (inna nazwa pliku,
 * zdjęcie z CDN-u itp.) — wtedy komponenty renderują zwykłe `<img>`.
 * Instrukcja dla redakcji: docs/zdjecia-autorow.md
 */
import type { ImageMetadata } from 'astro';
import type { Author } from './authors.ts';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/authors/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const bySlug = new Map<string, ImageMetadata>();
for (const [file, mod] of Object.entries(files)) {
  const name = file.slice(file.lastIndexOf('/') + 1);
  bySlug.set(name.replace(/\.[^.]+$/, '').toLowerCase(), mod.default);
}

/** Zdjęcie do renderu: metadane (plik z `src/assets`) albo string (nadpisanie `photo`). */
export function photoFor(author: Author): ImageMetadata | string | undefined {
  return author.photo ?? bySlug.get(author.slug.toLowerCase());
}

/** Adres zdjęcia do og:image i schema.org — oryginalny plik, nie wariant WebP. */
export function photoUrlFor(author: Author): string | undefined {
  const p = photoFor(author);
  return typeof p === 'string' ? p : p?.src;
}
