# Edycja treści serwisu InOro — instrukcja

**Dla:** Daniel Borowski (SEO Specialist, W2B)
**Autor:** Dominik Malik (dev)
**Utrzymanie:** ten plik żyje w repo — zawsze aktualna wersja jest na GitHubie

---

## Co jest gdzie — ekosystem

- **`inoro.ai`** — strona produkcyjna klienta. Zawartość = branch `main` tego repo. Aktualizowana przez GitHub Actions ~60 sekund po każdym merge do main.
- **`inoro-khaki.vercel.app`** — Twoja przymierzalnia. Zawartość = branch `preview/redesign` (i inne branche, jeśli je stworzysz). Aktualizowana przez Vercel ~60 sekund po każdym commit.
- **Repo:** `https://github.com/Aproco-io/landing_inoro` — tu edytujesz pliki.

**Zasada:** cała treść siedzi w plikach `.md` w folderze `src/content/`. Ty nie tykasz kodu (`.astro`, `.ts`, `.js`) — od tego jest Dominik. Ty modyfikujesz treść w `.md`.

---

## Krok po kroku: zwykła edycja tekstu

### 1. Otwórz plik na GitHubie

Wejdź na repo, przełącz się na branch **`preview/redesign`** (w lewym górnym rogu, klik "main" → wybierz z listy).

Wejdź do folderu z treścią, np. `src/content/product/pl/analiza-rozmow.md`.

### 2. Klik ołówek "Edit"

Prawy górny róg strony pliku — ikona ołówka, hover pokazuje "Edit this file".

### 3. Zmień treść

Otwiera się edytor. Zobacz sekcję **Anatomia pliku `.md`** poniżej, żeby wiedzieć co możesz bezpiecznie zmieniać.

### 4. Commit

Zjedź na sam dół. Zobaczysz "Commit changes" — panel z opcjami:

- **Wpisz krótki opis zmiany** (np. "poprawka literówki w hero", "aktualizacja FAQ"). To pole "Commit message".
- Zaznacz **"Commit directly to the `preview/redesign` branch"** (domyślne).
- Klik **"Commit changes"**.

### 5. Zobacz efekt na Vercelu

Otwórz [inoro-khaki.vercel.app](https://inoro-khaki.vercel.app), przejdź do zmienionej podstrony (np. `/analiza-rozmow/`). Za ~60 sekund od commita powinnaś widzieć zmiany.

Jeśli nie widać — hard-refresh (Ctrl+Shift+R lub Cmd+Shift+R).

### 6. Publikacja na inoro.ai — kiedy wszystko gotowe

Otwarty PR: **https://github.com/Aproco-io/landing_inoro/pull/4** (jeśli link nie działa, poszukaj PR-a z brancha `preview/redesign → main`)

- Wejdź na PR
- Zjedź na dół, klik **"Merge pull request"** → **"Confirm merge"**
- GitHub Actions zbuduje `main` i inoro.ai idzie live w ~60 sek

**Uwaga:** po merge branch `preview/redesign` zostaje. Kolejne edycje możesz robić:
- **Bezpośrednio na `main`** (drobne rzeczy — commit direct → od razu na inoro.ai)
- **Przez nowy branch + PR** (większe rzeczy — chcesz najpierw zobaczyć na Vercelu)

Zobacz sekcję **Dwa tryby publikacji** niżej.

---

## Mapa URL → plik

Kolumna "URL" = adres na inoro.ai. Kolumna "Plik" = ścieżka do edycji w repo.

### Money pages (produkt)

| URL | Plik |
|---|---|
| `/analiza-rozmow/` | `src/content/product/pl/analiza-rozmow.md` |
| `/analiza-mowy/` | `src/content/product/pl/analiza-mowy.md` |
| `/analityka-call-center/` | `src/content/product/pl/analityka-call-center.md` |
| `/kontrola-jakosci-obslugi/` | `src/content/product/pl/kontrola-jakosci-obslugi.md` |
| `/transkrypcja-rozmow/` | `src/content/product/pl/transkrypcja-rozmow.md` |
| `/czat-ai/` | `src/content/product/pl/czat-ai.md` |
| `/integracje/` | `src/content/product/pl/integracje.md` |
| `/conversation-intelligence/` | `src/content/product/en/conversation-intelligence.md` |
| `/speech-analytics/` | `src/content/product/en/speech-analytics.md` |
| `/contact-center-analytics/` | `src/content/product/en/contact-center-analytics.md` |
| `/call-center-quality-assurance/` | `src/content/product/en/call-center-quality-assurance.md` |
| `/call-transcription/` | `src/content/product/en/call-transcription.md` |
| `/ai-chat/` | `src/content/product/en/ai-chat.md` |
| `/integrations/` | `src/content/product/en/integrations.md` |

### Solutions (rozwiązania)

| URL | Plik |
|---|---|
| `/rozwiazania/bpo/` | `src/content/solutions/pl/bpo.md` |
| `/rozwiazania/compliance/` | `src/content/solutions/pl/compliance.md` |
| `/rozwiazania/e-commerce/` | `src/content/solutions/pl/e-commerce.md` |
| `/rozwiazania/sprzedaz/` | `src/content/solutions/pl/sprzedaz.md` |
| `/solutions/bpo/` | `src/content/solutions/en/bpo.md` |
| `/solutions/compliance/` | `src/content/solutions/en/compliance.md` |
| `/solutions/retail/` | `src/content/solutions/en/retail.md` |
| `/solutions/sales/` | `src/content/solutions/en/sales.md` |

### Pricing

| URL | Plik |
|---|---|
| `/cennik/` | `src/content/pricing/pl.md` |
| `/pricing/` | `src/content/pricing/en.md` |

### Compare & Alternatives

| URL | Plik |
|---|---|
| `/compare/inoro-vs-nice/` | `src/content/compare/inoro-vs-nice.md` |
| `/compare/inoro-vs-verint/` | `src/content/compare/inoro-vs-verint.md` |
| `/compare/inoro-vs-callminer/` | `src/content/compare/inoro-vs-callminer.md` |
| `/compare/inoro-vs-observe-ai/` | `src/content/compare/inoro-vs-observe-ai.md` |
| `/alternatives/nice-alternative/` | `src/content/compare/nice-alternative.md` |
| `/alternatives/verint-alternative/` | `src/content/compare/verint-alternative.md` |
| `/alternatives/callminer-alternative/` | `src/content/compare/callminer-alternative.md` |

### Wiedza / Resources (huby edukacyjne)

| URL | Plik |
|---|---|
| `/wiedza/wskazniki-call-center/` | `src/content/resources/pl/wskazniki-call-center.md` |
| `/wiedza/rodo-nagrywanie-rozmow/` | `src/content/resources/pl/rodo-nagrywanie-rozmow.md` |
| `/wiedza/dashboard-call-center/` | `src/content/resources/pl/dashboard-call-center.md` |
| `/wiedza/ai-w-call-center/` | `src/content/resources/pl/ai-w-call-center.md` |
| `/wiedza/czym-jest-analiza-rozmow/` | `src/content/resources/pl/czym-jest-analiza-rozmow.md` |
| `/wiedza/slownik/` | `src/content/resources/pl/slownik.md` |
| `/wiedza/transkrypcja-audio-na-tekst/` | `src/content/resources/pl/transkrypcja-audio-na-tekst.md` |
| `/wiedza/tajemniczy-klient/` | `src/content/resources/pl/tajemniczy-klient.md` |
| `/resources/call-center-kpis/` | `src/content/resources/en/call-center-kpis.md` |
| `/resources/call-center-dashboard/` | `src/content/resources/en/call-center-dashboard.md` |
| `/resources/what-is-conversation-intelligence/` | `src/content/resources/en/what-is-conversation-intelligence.md` |
| `/resources/ai-call-center-analytics/` | `src/content/resources/en/ai-call-center-analytics.md` |
| `/resources/agent-performance-analytics/` | `src/content/resources/en/agent-performance-analytics.md` |
| `/resources/glossary/` | `src/content/resources/en/glossary.md` |
| `/resources/best-speech-analytics-software/` | `src/content/resources/en/best-speech-analytics-software.md` |

### Blog

| URL | Plik |
|---|---|
| `/wiedza/blog/` | Archiwum PL (auto-generowane z folderu) |
| `/resources/blog/` | Archiwum EN (auto-generowane z folderu) |
| `/wiedza/blog/{slug}/` | `src/content/blog/pl/{slug}.md` |
| `/resources/blog/{slug}/` | `src/content/blog/en/{slug}.md` |

### Standalone

| URL | Plik |
|---|---|
| `/demo/` | `src/pages/demo.astro` — formularz demo (⚠️ zmiana wymaga Dominika) |
| `/about/` | `src/pages/about.astro` — o firmie (⚠️ Dominik) |
| `/security/` | `src/pages/security.astro` — polityka bezpieczeństwa (⚠️ Dominik) |

Strony `.astro` mają wprawdzie treść w środku, ale mieszają ją z kodem — łatwo coś rozjebać. Zgłoś Dominikowi co chcesz w nich zmienić.

---

## Anatomia pliku `.md`

Każdy plik ma dwie części: **front matter** (metadane, YAML na górze między `---`) i **sections** (lista sekcji strony).

### Przykład (skrócony):

```yaml
---
title: "Analiza rozmów AI"
description: "Krótki opis pod SEO"
lang: "pl"
slug: "/analiza-rozmow/"
translationKey: "conversation-intelligence"
order: 10
seo:
  metaTitle: "Analiza rozmów AI — 100% połączeń pod kontrolą | InOro"
  metaDescription: "Meta pod Google, max 155 znaków"
sections:
  - type: hero
    badge: "Platforma"
    heading: "H1 nagłówek"
    subheading: "Zdanie pod H1"
    primaryCta: { label: "Umów demo", href: "/demo/" }
    secondaryCta: { label: "Zobacz cennik", href: "/cennik/" }

  - type: bluf
    term: "Analiza rozmów"
    body: "Definicja 40–60 słów..."

  - type: capability-grid
    heading: "Nagłówek sekcji"
    cards:
      - icon: "📋"
        title: "Nazwa funkcji"
        body: "Opis 1–2 zdania"
      - icon: "🎯"
        title: "Druga funkcja"
        body: "..."
---
```

### Pola front matter — co znaczą

- **`title`** — tytuł strony (używany w `<title>` przeglądarki jeśli brak `seo.metaTitle`)
- **`description`** — meta description domyślne (jeśli brak `seo.metaDescription`)
- **`lang`** — `"pl"` albo `"en"` — **⚠️ nie zmieniać**
- **`slug`** — URL strony — **⚠️ nie zmieniać bez Dominika** (zmiana URL = 404 dla Google)
- **`translationKey`** — łącznik między wersją PL i EN dla hreflang — **⚠️ nie ruszać**
- **`order`** — kolejność (nieużywane w renderowaniu, ale trzymamy dla porządku)
- **`seo.metaTitle`** — nadrzędny title dla Google (max ~60 znaków)
- **`seo.metaDescription`** — nadrzędny description dla Google (max ~155 znaków)

**Zasada BHP:** edytuj bez lęku `title`, `description`, `seo.metaTitle`, `seo.metaDescription`. **Nie ruszaj** `lang`, `slug`, `translationKey`, `order`.

---

## Typy sekcji — co potrafi każda

Każda sekcja zaczyna się od `- type: nazwa-typu`. Niżej lista typów które mamy dostępne:

### `hero` — nagłówek strony (S02)

```yaml
- type: hero
  badge: "Platforma"                              # opcjonalne (mała pigułka nad H1)
  heading: "Nagłówek H1"
  subheading: "Podnagłówek pod H1"
  primaryCta: { label: "CTA", href: "/demo/" }    # opcjonalne
  secondaryCta: { label: "Cennik", href: "/cennik/" }  # opcjonalne
  imageSrc: "/assets/screenshot.png"              # opcjonalne (obrazek po prawej)
  imageAlt: "Opis obrazka"                        # jeśli imageSrc
```

### `bluf` — blok definicyjny pod hero (S05)

```yaml
- type: bluf
  term: "Termin (bold)"          # opcjonalne
  body: "40–60 słów definicji. Obsługuje <strong>bold HTML</strong> i inne."
```

### `logo-bar` — pasek logotypów klientów (S03)

```yaml
- type: logo-bar
  # domyślnie: AASA, Tarczyński, elocity, Telbridge, Onerent
  caption: "Zaufali nam"  # opcjonalne — zostaw pusty, użyje domyślnego
```

### `how-it-works` — trzy kroki (S06)

```yaml
- type: how-it-works
  kicker: "Jak to działa"      # opcjonalne
  heading: "H2 sekcji"
  steps:
    - title: "Krok 1"
      body: "Opis kroku 1"
    - title: "Krok 2"
      body: "Opis kroku 2"
    - title: "Krok 3"
      body: "Opis kroku 3"
```

### `capability-grid` — siatka kart funkcji (S07)

```yaml
- type: capability-grid
  kicker: "Możliwości"          # opcjonalne
  heading: "H2 sekcji"          # opcjonalne
  cards:
    - icon: "📋"                # emoji lub jakiś znak
      title: "Nazwa funkcji"
      body: "Opis funkcji"
      linkText: "Dowiedz się więcej"     # opcjonalne
      linkHref: "/inna-strona/"          # opcjonalne
    # ...ile chcesz kart, zalecane 4–6
```

### `at-a-glance` — lista bulletów z liczbami (S09)

```yaml
- type: at-a-glance
  kicker: "W skrócie"
  heading: "H2 sekcji"
  bullets:
    - "Pierwszy fakt z <strong>liczbą</strong>"
    - "Drugi fakt"
    - "Trzeci fakt"
```

### `comparison-table` — tabela porównawcza (S10)

```yaml
- type: comparison-table
  kicker: "Zmiana"
  heading: "H2 sekcji"
  columns:
    - "Kolumna A"
    - "Kolumna B (highlight, InOro)"
  rows:
    - label: "Wiersz 1"
      values: ["wartość A", "wartość B"]
    - label: "Wiersz 2"
      values: ["wartość A", "wartość B"]
```

### `results-band` — pasek liczb-dowodów (S11)

```yaml
- type: results-band
  heading: "H2 sekcji"
  stats:
    - value: "1 mld+"
      label: "Analizowanych minut"
      sub: "na produkcji"          # opcjonalne
    - value: "1 700+"
      label: "Agentów u klienta"
  caseNote: "Opcjonalny opis case'a pod liczbami."
```

### `ai-chat` — widget czatu AI (S12)

```yaml
- type: ai-chat
  heading: "H2 sekcji"
  exchanges:
    - user: "Pytanie użytkownika"
      ai: "Odpowiedź AI z <strong>liczbą</strong>"
    - user: "Kolejne pytanie"
      ai: "Kolejna odpowiedź"
```

### `integrations-strip` — pasek integracji (S14)

```yaml
- type: integrations-strip
  heading: "Działa z Twoim stackiem"
  names: ["Genesys", "Avaya", "Cisco", "REST API"]
  linkText: "Wszystkie integracje"       # opcjonalne
  linkHref: "/integracje/"               # opcjonalne
```

### `security-band` — pasek bezpieczeństwa (S15)

```yaml
- type: security-band
  heading: "H2 sekcji"
  tiles:
    - title: "Hosting w UE"
      body: "Opis"
    - title: "SSO, SAML 2.0"
      body: "Opis"
  footer: "Opcjonalny tekst pod kafelkami."
```

### `pricing-teaser` — mini-cennik (S16)

```yaml
- type: pricing-teaser
  body: "Od <strong>0,20 zł/min</strong> — wszystko w cenie."
  linkText: "Zobacz cennik"
  linkHref: "/cennik/"
```

### `faq` — akordeon pytań (S18)

```yaml
- type: faq
  heading: "Najczęstsze pytania"
  items:
    - q: "Pytanie 1?"
      a: "Odpowiedź. Obsługuje <a href=\"/inna/\">linki HTML</a>."
    - q: "Pytanie 2?"
      a: "Odpowiedź."
```

### `related-resources` — 3 karty powiązanych treści (S19)

```yaml
- type: related-resources
  heading: "Zgłęb temat"
  cards:
    - title: "Tytuł powiązanego artykułu"
      body: "Krótki opis"                # opcjonalne
      href: "/wiedza/link/"
```

### `explore-platform` — mini-nawigacja po innych modułach (S20)

```yaml
- type: explore-platform
  heading: "Poznaj platformę"
  links:
    - label: "Analiza mowy"
      href: "/analiza-mowy/"
    - label: "Kontrola jakości"
      href: "/kontrola-jakosci-obslugi/"
```

### `cta-band` — pasek CTA na koniec (S21)

```yaml
- type: cta-band
  heading: "Nagłówek CTA"
  body: "Opis pod nagłówkiem"                    # opcjonalne
  primaryCta: { label: "Umów demo", href: "/demo/" }
  secondaryCta: { label: "Cennik", href: "/cennik/" }   # opcjonalne
```

### `pricing-plans` — tylko na /pricing/ i /cennik/

```yaml
- type: pricing-plans
  plans:
    - name: "InOro"
      price: "0,20 zł"
      period: "/ minuta"
      highlight: true                # rekomendowany plan
      features:
        - "Feature 1"
        - "Feature 2"
      ctaLabel: "Zamów"
      ctaHref: "/demo/"
```

### `roi-calculator` — kalkulator ROI (interaktywny)

```yaml
- type: roi-calculator
  heading: "Ile to wyjdzie u Ciebie?"
  perMinutePrice: 0.20
  currency: "zł "
```

### `problem` — 3 karty bólu + card kosztu (S04)

```yaml
- type: problem
  kicker: "Ślepa plama"                  # opcjonalne
  heading: "H2 sekcji"
  pains:
    - icon: "💸"
      title: "Ból 1"
      body: "Opis"
    - icon: "📊"
      title: "Ból 2"
      body: "Opis"
  costCard:                              # opcjonalne
    heading: "Koszt status quo"
    body: "Zdanie kosztu."
```

### `who-its-for` — karty person (S13)

```yaml
- type: who-its-for
  kicker: "Role"                         # opcjonalne
  heading: "Dla kogo"
  personas:
    - name: "Nagłówek karty"
      role: "COO"
      body: "Opis roli i wartości."
```

### `rich-body` — dowolna treść HTML (dla artykułów)

```yaml
- type: rich-body
  body: |
    <h2>Nagłówek</h2>
    <p>Akapit z <strong>bold</strong> i <a href="/link/">linkami</a>.</p>
    <ul>
      <li>Punkt 1</li>
      <li>Punkt 2</li>
    </ul>
```

**Uwaga:** `rich-body` wymaga HTML-a. Nie markdown. Do artykułów blogowych (`src/content/blog/pl/*.md`) używamy zwykłego markdown w body (poza front matterem) — tam Astro renderuje markdown natywnie.

---

## Nowy artykuł blogowy

Wejdź na folder `src/content/blog/pl/` (PL) lub `src/content/blog/en/` (EN) w brancku `preview/redesign`.

Klik **"Add file" → "Create new file"** (prawy górny róg listy plików).

Nazwa: `nazwa-artykulu.md` (bez spacji, małe litery, myślniki).

Wklej szablon:

```yaml
---
title: "Tytuł artykułu"
description: "Krótki opis pod SEO/OG"
lang: "pl"
slug: "/wiedza/blog/nazwa-artykulu/"
date: 2026-08-15
author: "Zespół InOro"
category: "KPI"
excerpt: "Zajawka na kaflu i pod H1"
readTime: 6
tags: ["kpi", "coaching"]
coverGradient: "linear-gradient(135deg, #1AA7E0 0%, #1e3a66 100%)"
---

Tu piszesz **czystym markdownem**. Nagłówki `## H2`, listy `- punkt`, linki `[tekst](url)`, obrazki `![alt](url)`.

## Nagłówek H2

Treść akapitu.
```

Commit → za ~60 sek pojawi się na `/wiedza/blog/nazwa-artykulu/`.

**Cover artykułu:** jeśli chcesz obrazek zamiast gradientu, dodaj `cover: "/blog/nazwa-artykulu.jpg"` we front matter i wrzuć plik do `public/blog/nazwa-artykulu.jpg` (przez "Upload files" na tym folderze).

---

## Dwa tryby publikacji (po tym jak zredesign już będzie na main)

### Tryb A — commit direct do main (drobne rzeczy)

Dla: literówka, korekta zdania, drobna zmiana w FAQ.

1. Otwórz plik na GitHubie (upewnij się że jesteś na `main`)
2. Klik ołówek "Edit"
3. Zmień
4. Wybierz **"Commit directly to the `main` branch"**
5. Commit changes
6. Za ~60 sek na inoro.ai

**Ryzyko:** literówka jest na produkcji przez ~60 sek zanim ją poprawisz. Akceptowalne dla drobnych rzeczy.

### Tryb B — nowy branch + PR (większe rzeczy)

Dla: nowy artykuł blogowy, przebudowa sekcji money page, większy patch, gdy chcesz najpierw zobaczyć na Vercelu.

1. Otwórz plik na GitHubie (na `main`)
2. Klik ołówek "Edit"
3. Zmień
4. Zjedź na dół, zaznacz **"Create a new branch for this commit and start a pull request"**
5. Zaproponuj nazwę brancha (np. `daniel-nowy-artykul`)
6. Klik **"Propose changes"** → GitHub przenosi cię do "Open a pull request"
7. Klik **"Create pull request"**
8. Vercel automatycznie doda komentarz w PR-ze z URL-em preview (np. `landing-inoro-git-daniel-nowy-artykul.vercel.app`)
9. Klikasz preview, oglądasz swoją zmianę
10. Jeśli OK → **"Merge pull request"** → **"Confirm merge"** → za 60 sek na inoro.ai
11. Jeśli nie — kolejny commit na tym samym branchu, Vercel odświeży preview

---

## Pułapki YAML — najczęstsze błędy

### 1. Cudzysłowy

**Źle:**
```yaml
title: "Cytat: „Coś tam" — ciąg dalszy"
#           ^-- polski cudzysłów      ^-- ASCII cudzysłów zamyka string!
```

**Dobrze — całkiem polskie cudzysłowy:**
```yaml
title: "Cytat: „Coś tam” — ciąg dalszy"
#                        ^-- polski cudzysłów zamykający, YAML string trwa
```

**Dobrze — zawinięcie w single quotes:**
```yaml
title: 'Cytat: "Coś tam" — ciąg dalszy'
#      ^ single quote otwiera i zamyka; wewnątrz " są zwykłymi znakami
```

**Zasada:** albo cały string w `"..."` z polskim `„…”` wewnątrz, albo cały string w `'...'` z `"..."` wewnątrz.

### 2. Apostrofy w polskich stringach

**Źle:**
```yaml
body: 'To Daniel's plik'
#            ^-- apostrof zamyka string, reszta = błąd
```

**Dobrze:**
```yaml
body: "To Daniel's plik"     # w double quotes apostrof jest OK
```

### 3. Wcięcia

YAML jest wrażliwy na wcięcia. Używaj **2 spacji** (nie tabulatorów, nie 4 spacji). Struktura zagnieżdżona:

```yaml
sections:
  - type: hero              # 2 spacje przed "-"
    heading: "Nagłówek"     # 4 spacje przed "heading" (2+2)
    primaryCta:             # 4 spacje
      label: "CTA"          # 6 spacji (4+2)
      href: "/demo/"
```

GitHub Web UI renderuje spacje poprawnie — nie musisz się martwić o tabulatory.

### 4. Puste linie

Puste linie **wewnątrz** stringów wielolinijkowych (przy `body: |`) mają znaczenie. Poza nimi puste linie są niegroźne — możesz je dodawać dla czytelności między sekcjami.

---

## Co robić jak build failed

Jeśli commit ma błąd YAML, GitHub Actions nie zdoła zbudować strony. Dostaniesz maila **"deploy-pages failed"** (i Vercel też może wysłać "Build failed").

### Krok 1: sprawdź co się nie powiodło

Klik na czerwony X przy commicie na GitHubie → wybierz nieudany workflow → obejrzyj logi. Zwykle na końcu jest linijka **"Location: src/content/... :LINIA:KOLUMNA"** — tam jest błąd.

### Krok 2: łatwe rollback — "Revert this commit"

Jeśli nie umiesz naprawić:

1. Wejdź na stronę commita (na GitHubie klik na skrót SHA)
2. W prawym górnym są trzy kropki → **"Revert"** (lub przycisk "Revert" na commit page)
3. GitHub tworzy commit odwracający zmiany
4. Merge → poprzedni stan wraca w minutę

### Krok 3: napisz do Dominika

Jeśli nie ogarniasz: dominik@web-2-business.com.

Podaj: który plik edytowałeś, jakiego typu była zmiana, treść komunikatu błędu (jeśli widzisz).

---

## Cheat sheet — 4 najczęstsze operacje

### A. Zmiana treści FAQ

Otwórz plik podstrony, znajdź sekcję `type: faq`, edytuj `q` (pytanie) i `a` (odpowiedź) w konkretnym `items:`.

### B. Dodanie karty w capability-grid

Otwórz plik, znajdź `type: capability-grid`, dopisz do `cards:` nową kartę:

```yaml
      - icon: "🚀"
        title: "Nowa funkcja"
        body: "Opis funkcji"
```

Uwaga na wcięcia — nowa karta musi mieć takie samo wcięcie jak poprzednie.

### C. Nowy artykuł blogowy

Zobacz sekcję **Nowy artykuł blogowy** wyżej.

### D. Zmiana tekstu w hero

Otwórz plik, znajdź `type: hero`, edytuj `heading`, `subheading`, `badge`.

---

## Kontakt

**Dominik Malik** — `dominik@web-2-business.com`

Używaj rzadko: reguła "próbowałem sam przez godzinę, cofnąłem błąd revertem, dalej nie wiem".
