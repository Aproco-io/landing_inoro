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
      pl: 'Współzałożyciel, Aproco',
      en: 'Co-founder, Aproco',
    },
    bio: {
      pl: 'Strategia AI i sprzedaż enterprise w Aproco (właściciel produktu InOro). 15+ lat w call center, telco i sprzedaży B2B.',
    },
    // TODO: wrzucić plik do public/authors/ i odkomentować
    // photo: '/authors/adam-sipowicz.jpg',
    linkedin: 'https://www.linkedin.com/in/adam-sipowicz-6395322/',
  },
  {
    slug: 'tomasz-kretek',
    name: 'Tomasz Kretek',
    // TODO: rola i bio do uzupełnienia — nie zmyślam ich.
    // TODO: photo: '/authors/tomasz-kretek.jpg',
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

/**
 * Docelowy adres pod imieniem i nazwiskiem w bylinie.
 * Dziś: profil LinkedIn (jedyny istniejący cel). Gdy powstaną strony
 * autorskie, wystarczy tutaj zwrócić `/pl/wiedza/autor/${author.slug}/`
 * — byline i schema.org podchwycą zmianę bez ruszania szablonów.
 */
export function authorHref(author: Author): string | undefined {
  return author.linkedin;
}
