/**
 * Zdjęcie autora — wykrywane z dysku przy budowaniu.
 *
 * Nie wpisujemy ścieżek na sztywno w rejestrze, bo wtedy deklaracja i plik
 * mogą się rozjechać: ktoś dopisuje `photo`, pliku nie ma i na produkcji
 * zostaje ikona zepsutego obrazka. Tutaj jest odwrotnie — wystarczy wrzucić
 * `public/authors/<slug>.jpg` i zdjęcie pojawia się samo, a gdy pliku nie ma,
 * komponenty spokojnie renderują inicjały.
 *
 * Pole `photo` w rejestrze zostaje jako ręczne nadpisanie (inna nazwa pliku,
 * zdjęcie z CDN-u itp.). Instrukcja dla redakcji: docs/zdjecia-autorow.md
 * (poza `public/`, bo wszystko z tego katalogu trafia na serwer).
 */
import fs from 'node:fs';
import path from 'node:path';
import type { Author } from './authors.ts';

const DIR = 'public/authors';
const EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

let index: Map<string, string> | null = null;

function photoIndex(): Map<string, string> {
  if (index) return index;
  index = new Map();
  try {
    for (const file of fs.readdirSync(DIR)) {
      const ext = path.extname(file).toLowerCase();
      if (!EXTS.includes(ext)) continue;
      index.set(path.basename(file, ext).toLowerCase(), `/${DIR.replace('public/', '')}/${file}`);
    }
  } catch {
    // Katalogu jeszcze nie ma — same inicjały.
  }
  return index;
}

export function photoFor(author: Author): string | undefined {
  return author.photo ?? photoIndex().get(author.slug);
}
