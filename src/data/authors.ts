/**
 * Rejestr autorów — jedno źródło prawdy dla bylinów, stron autorskich
 * i danych strukturalnych schema.org.
 *
 * We wpisach blogowych pole `author:` zostaje zwykłym imieniem i nazwiskiem
 * ("Adam Sipowicz") — Daniel nie musi pamiętać żadnych identyfikatorów.
 * Dopasowanie idzie po nazwie LUB po slugu, więc oba zapisy zadziałają.
 * Nieznany autor nie wywala builda: renderuje się samo nazwisko, bez zdjęcia.
 */

export type AuthorLang = 'pl' | 'en';

export type Author = {
  /** Segment przyszłego adresu strony autora: /pl/wiedza/autor/<slug>/ */
  slug: string;
  name: string;
  /** Stanowisko / rola, osobno per język. */
  role?: Partial<Record<AuthorLang, string>>;
  /** Krótkie bio pod wpisem, osobno per język. */
  bio?: Partial<Record<AuthorLang, string>>;
  /**
   * Ścieżka do zdjęcia w public/, np. '/authors/adam-sipowicz.jpg'.
   * Brak wartości = byline pokazuje awatar z inicjałami. Wrzucenie pliku
   * i wpisanie ścieżki tutaj to jedyne, czego trzeba — zero zmian w kodzie.
   */
  /**
   * Ręczne nadpisanie ścieżki do zdjęcia. Zwykle niepotrzebne — wystarczy
   * wrzucić `public/authors/<slug>.jpg`, resztę robi `author-photo.ts`.
   */
  photo?: string;
  linkedin?: string;
  /** Konto zbiorcze redakcji — w schema.org leci jako Organization, nie Person. */
  isOrganization?: boolean;
};

export const AUTHORS: Author[] = [
  {
    slug: 'adam-sipowicz',
    name: 'Adam Sipowicz',
    role: {
      pl: 'Współzałożyciel Aproco',
      en: 'Co-founder at Aproco',
    },
    bio: {
      pl: 'Strategia AI i sprzedaż enterprise w Aproco (właściciel produktu InOro). 15+ lat w call center, telco i sprzedaży B2B.',
      // Tłumaczenie wersji polskiej — nie nowa treść.
      en: 'AI strategy and enterprise sales at Aproco, the company behind InOro. 15+ years in call centers, telco and B2B sales.',
    },
    linkedin: 'https://www.linkedin.com/in/adam-sipowicz-6395322/',
  },
  {
    slug: 'tomasz-kretek',
    name: 'Tomasz Kretek',
    // TODO: rola i bio do uzupełnienia — nie zmyślam ich.
    linkedin: 'https://www.linkedin.com/in/tkretek/',
  },
  {
    slug: 'zespol-inoro',
    name: 'Zespół InOro',
    bio: {
      pl: 'Redakcja InOro (Aproco). Materiał przygotowany na podstawie danych z wdrożeń produkcyjnych oraz publicznych źródeł branżowych.',
    },
    isOrganization: true,
  },
  {
    slug: 'inoro-team',
    name: 'InOro Team',
    bio: {
      en: 'The InOro editorial team at Aproco. Written from production deployment data and public industry sources.',
    },
    isOrganization: true,
  },
];

const norm = (s: string) => s.trim().toLowerCase();

/**
 * Znajduje autora po nazwie lub slugu. Dla nieznanej wartości zwraca
 * minimalny rekord, żeby byline i tak się wyrenderował — brak autora
 * w rejestrze nie może wywalić builda ani zostawić pustego miejsca.
 */
export function resolveAuthor(value: string): Author {
  const v = norm(value);
  const hit = AUTHORS.find((a) => norm(a.name) === v || norm(a.slug) === v);
  if (hit) return hit;
  return { slug: slugify(value), name: value.trim() };
}

/** Inicjały do awatara zastępczego: "Adam Sipowicz" → "AS". */
export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ł/gi, 'l')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Adres strony autora w danym języku. */
export function authorPagePath(slug: string, lang: AuthorLang): string {
  return lang === 'pl' ? `/pl/wiedza/autor/${slug}/` : `/resources/author/${slug}/`;
}

/**
 * Cel linku pod imieniem i nazwiskiem w bylinie.
 *
 * Konta redakcyjne nie dostają stron autorskich — to wydawca, nie osoba.
 * Dla osoby zwracamy jej stronę: w kontekście wpisu blogowego autor
 * z definicji ma co najmniej jeden opublikowany artykuł w tym języku,
 * więc strona na pewno istnieje. Profile zewnętrzne żyją na stronie
 * autora, nie w bylinie.
 */
export function authorHref(author: Author, lang: AuthorLang): string | undefined {
  if (author.isOrganization) return undefined;
  return authorPagePath(author.slug, lang);
}

/** Profile zewnętrzne autora — na stronę autorską i do schema.org `sameAs`. */
export function socialLinks(author: Author): { label: string; url: string }[] {
  const out: { label: string; url: string }[] = [];
  if (author.linkedin) out.push({ label: 'LinkedIn', url: author.linkedin });
  return out;
}
