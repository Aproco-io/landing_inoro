# Lokalny preview strony InOro — instrukcja

**Dla:** Daniel Borowski
**Cel:** żebyś mógł edytować pliki i widzieć zmiany na żywo (w przeglądarce, na swoim komputerze) **przed publikacją** na inoro.ai.

**Uwaga**: to jest **alternatywa** dla edycji przez GitHub Web UI. Jeśli lokalny setup Ci nie pójdzie — **nie panikuj**, edytuj przez GitHub Web UI wg `EDYCJA-TRESCI-INSTRUKCJA.md`. Tam też wszystko działa, tylko bez podglądu przed publikacją.

---

## Co dostajesz po skonfigurowaniu

- Otwierasz plik `.md` w edytorze
- Zmieniasz treść
- Zapisujesz (Ctrl+S / Cmd+S)
- Przeglądarka na `http://localhost:4321` **od razu** odświeża zmienioną podstronę
- Klikasz commit + push → zmiany trafiają na GitHub → mergujesz PR → idzie na inoro.ai

Cykl: **edit → save → refresh → widzisz** w ~2 sekundy. Bez Vercela, bez czekania na build.

---

## Krok 0: Sprawdź jaki masz system

Windows czy Mac?

- **Windows**: instrukcja pod Ciebie w wariantach **[W]**
- **Mac**: instrukcja pod Ciebie w wariantach **[M]**

---

## Krok 1: Zainstaluj Node.js (jednorazowo, ~5 min)

Node.js to silnik JavaScript — Astro (nasz framework strony) go potrzebuje.

1. Wejdź na **https://nodejs.org/**
2. Kliknij dużą zieloną plamę **"Download Node.js (LTS)"** — pobierze się installer dla Twojego systemu (Windows: `.msi`, Mac: `.pkg`)
3. Otwórz pobrany plik, klikaj **Next / Continue** — instalacja domyślna wystarczy
4. **Zrestartuj terminal** jeśli był otwarty przed instalacją

### Sprawdzenie że działa

Otwórz terminal:
- **[W]** Wciśnij `Win + R`, wpisz `powershell`, Enter
- **[M]** Cmd+Space, wpisz `Terminal`, Enter

Wpisz w terminalu i wciśnij Enter:
```
node --version
```

Powinno pojawić się coś w rodzaju `v22.12.0` (numer wersji może być wyższy). Jeśli tak — Node.js działa.

Jeśli terminal pisze "command not found" — Node.js się nie zainstalował. Powtórz krok 1 lub napisz do Dominika.

---

## Krok 2: Zainstaluj GitHub Desktop (jednorazowo, ~3 min)

GitHub Desktop to graficzna aplikacja do gita. **Bez tego musiałbyś używać komend git w terminalu** — a to trudniejsze.

1. Wejdź na **https://desktop.github.com/**
2. Kliknij **"Download for [Windows/Mac]"**
3. Otwórz pobrany plik, zainstaluj domyślnie
4. Uruchom GitHub Desktop
5. Zaloguj się swoim GitHub-em (`danielborowski-w2b`)

---

## Krok 3: Zainstaluj VS Code (jednorazowo, ~3 min)

VS Code to edytor kodu — podświetla YAML kolorami, pokazuje błędy w czasie rzeczywistym, i **od razu ostrzega jak wcięcie jest źle albo cudzysłów nie zamknięty**. Bez tego edytowałbyś w Notatniku i błędy widać dopiero po commit.

1. Wejdź na **https://code.visualstudio.com/**
2. Download for Windows / Mac
3. Zainstaluj domyślnie, uruchom

### Dodatek: rozszerzenie Astro (opcjonalne ale przydatne)

W VS Code:
1. Lewy panel, klikni ikonę kwadratów (Extensions) — czwarta od góry
2. Wpisz w wyszukiwarce `Astro`
3. Kliknij **Install** przy oficjalnym rozszerzeniu **Astro** (autor: astro-build)

Teraz VS Code rozumie pliki `.astro` i lepiej podświetla YAML w `.md`.

---

## Krok 4: Sklonuj repo InOro (jednorazowo, ~1 min)

"Sklonuj" znaczy: skopiuj repo z GitHuba na swój dysk.

1. Otwórz **GitHub Desktop**
2. **File → Clone repository...** (Ctrl+Shift+O / Cmd+Shift+O)
3. Zakładka **URL** na górze okna
4. W polu **Repository URL** wklej:
   ```
   https://github.com/Aproco-io/landing_inoro
   ```
5. **Local path**: gdzie zapisać na dysku — zostaw domyślne (np. `Documents/GitHub/landing_inoro`) lub wybierz inne miejsce
6. Kliknij **Clone**
7. Po ~30 sek pojawi się pytanie "How are you planning to use this fork?" — wybierz **"To contribute to the parent project"** i **Continue**

### Przełącz się na branch `preview/redesign`

Domyślnie GitHub Desktop pokazuje branch `main` (produkcja inoro.ai). My chcemy edytować **redesign** który jeszcze nie został opublikowany.

1. Na górze aplikacji: kliknij **"Current Branch: main"**
2. Z listy wybierz **`preview/redesign`**
3. GitHub Desktop pobierze pliki tej gałęzi

---

## Krok 5: Zainstaluj zależności projektu (jednorazowo, ~2 min)

Repo ma listę bibliotek których potrzebuje Astro (żeby zbudować preview). Musisz je pobrać.

1. Otwórz terminal
2. Przejdź do folderu projektu:
   - **[W]** `cd Documents\GitHub\landing_inoro`
   - **[M]** `cd Documents/GitHub/landing_inoro`
   (dopasuj ścieżkę jeśli sklonowałeś gdzie indziej — GitHub Desktop → menu Repository → Show in Explorer/Finder pokaże Ci gdzie jest)
3. Wpisz:
   ```
   npm install
   ```
4. Poczekaj ~1-2 minuty. Może pojawić się kilka ostrzeżeń o "deprecated packages" — **zignoruj**, to normalne.

Gdy skończy się z komunikatem typu **"added 252 packages"** — gotowe.

---

## Krok 6: Odpal preview na żywo

1. W tym samym terminalu (nadal w folderze projektu) wpisz:
   ```
   npm run dev
   ```
2. Po ~3 sekundach zobaczysz coś w rodzaju:
   ```
   astro  v6.0.2 ready in 2588 ms
   ┃ Local    http://localhost:4321/
   ```
3. Otwórz przeglądarkę, wpisz w pasku adresu:
   ```
   http://localhost:4321
   ```
4. Widzisz stronę InOro na swoim komputerze. **To jest Twoja piaskownica.**

### Zatrzymanie preview

Gdy skończysz — wróć do terminala i wciśnij **Ctrl+C** (na Mac też Ctrl+C, nie Cmd+C). Preview się zatrzyma.

Za każdym razem gdy chcesz odpalić preview — wracasz do kroku 6 (`cd` do folderu + `npm run dev`).

---

## Krok 7: Edycja i podgląd

### Otwórz projekt w VS Code

- W GitHub Desktop: **Repository → Open in Visual Studio Code** (Ctrl+Shift+A / Cmd+Shift+A)
- Albo w VS Code: **File → Open Folder** → wskaż folder `landing_inoro`

### Zmapowanie: który plik = która podstrona

Zobacz **`docs/EDYCJA-TRESCI-INSTRUKCJA.md`** w projekcie — tabela URL → plik. Otwiera się w VS Code po kliknięciu na plik z listy po lewej.

### Cykl edycji

1. Otwórz `.md` który chcesz zmienić (np. `src/content/product/pl/analiza-rozmow.md`)
2. Zmień treść
3. **Ctrl+S / Cmd+S** żeby zapisać
4. Przełącz się na przeglądarkę, na `http://localhost:4321/pl/analiza-rozmow/` (PL — z prefiksem `/pl/`) albo `http://localhost:4321/conversation-intelligence/` (EN — bez prefiksu)
5. Odświeżenie jest automatyczne (Astro to wykrywa) — powinieneś od razu zobaczyć zmianę

Jeśli nie odświeżyło się automatycznie — Ctrl+R / Cmd+R (hard refresh: Ctrl+Shift+R).

### Błędy YAML — od razu widoczne

Jeśli źle wstawiłeś cudzysłów albo wcięcie, VS Code podkreśli linię na czerwono (jeśli masz Astro extension). Terminal z `npm run dev` też pokaże błąd. Poprawiasz i zapisujesz — błąd znika.

**To główna zaleta lokalnego preview** — złapiesz literówkę zanim zdąży trafić na produkcję.

---

## Krok 8: Publikacja zmian

Jak wszystko sprawdzisz na `localhost:4321` i chcesz opublikować:

### Commit + push przez GitHub Desktop

1. Wróć do GitHub Desktop
2. Zobaczysz listę **Changes** po lewej — pliki które zmieniłeś
3. Zaznacz checkbox przy plikach (albo górny checkbox "Select all" — powyżej listy)
4. Na dole panelu Changes:
   - **Summary**: krótki opis (np. "poprawka literówki w hero analiza rozmów")
   - **Description**: opcjonalnie, dłuższy opis
5. Kliknij duży niebieski przycisk **"Commit to preview/redesign"**
6. Po commit, w górze aplikacji pojawi się przycisk **"Push origin"** — kliknij
7. Zmiany są na GitHubie

### Merge PR na produkcję

Kiedy jesteś **całkowicie gotowy** żeby zmiany trafiły na **inoro.ai**:

1. Wejdź na PR: **https://github.com/Aproco-io/landing_inoro/pull/4**
2. Zjedź na dół
3. Kliknij **"Merge pull request"** → **"Confirm merge"**
4. Po ~60 sekundach `inoro.ai` pokazuje redesign i wszystkie Twoje zmiany

---

## Troubleshooting — najczęstsze problemy

### `npm install` failuje z komunikatem o błędzie

- Sprawdź wersję Node.js: `node --version` — musi być **22.12.0 lub wyższa**
- Jeśli masz starszą — wróć do kroku 1, pobierz nowszą wersję Node
- Jeśli masz dobrą — spróbuj: `rm -rf node_modules && npm install` (Mac) / `Remove-Item -Recurse -Force node_modules; npm install` (Windows)
- Nadal nie działa — screenshot błędu na maila do Dominika

### `npm run dev` pisze "port 4321 in use"

- Coś już zajęło port 4321. Zamknij inne terminale albo restartuj komputer.

### Preview pokazuje białą stronę

- Zajrzyj do terminala z `npm run dev` — na pewno jest tam czerwony komunikat błędu
- Zwykle błąd YAML w pliku który właśnie edytowałeś: `bad indentation`, `unexpected quote` itp.
- Wskaże Ci linię z błędem — cofnij ostatnią zmianę w tej linii, zapisz, sprawdź

### Zmiany nie wchodzą do przeglądarki mimo save

- Ctrl+Shift+R (hard refresh w przeglądarce)
- Sprawdź czy terminal z `npm run dev` nadal działa (jak jest pusty, znaczy że się zatrzymał — odpal ponownie)

### GitHub Desktop pyta o coś przy commit

- Standardowy dialog "Configure Git" — wpisz email i imię jak przy zakładaniu GitHuba
- To jednorazowo, nie ponowi się

### Wielkie zmiany na innych plikach które nie edytowałem

- Astro tworzy folder `dist/` i `.astro/` które są **plikami wygenerowanymi** — one nie powinny być commitowane
- W GitHub Desktop odznacz je z listy Changes (albo dodaj do `.gitignore` — poproś Dominika)

---

## Ściąga — codzienne komendy

Do zapamiętania (albo zapisania w notatniku):

```
# Otwórz projekt lokalnie
cd ~/Documents/GitHub/landing_inoro
npm run dev

# Preview: http://localhost:4321

# Zatrzymanie: Ctrl+C w terminalu
```

Reszta cyklu (edit, save, commit, push, merge) → wystarczy klikać w GitHub Desktop, VS Code i przeglądarkę.

---

## Kontakt

Jeśli utknąłeś na którymś kroku i po 30 minutach nie ruszasz — screenshot błędu i mail do **dominik@web-2-business.com**.

Fallback: **edycja przez GitHub Web UI** wg `EDYCJA-TRESCI-INSTRUKCJA.md`. Tam też wszystko działa, tylko bez podglądu przed publikacją.
