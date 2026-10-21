---
title: "Automatyczna transkrypcja rozmów — dokładność i obsługa języków"
description: "Od czego zależy dokładność automatycznej transkrypcji rozmów, czym są WER, CER i LER oraz dlaczego modele radzą sobie gorzej po polsku niż po angielsku."
lang: "pl"
slug: "/pl/wiedza/blog/automatyczna-transkrypcja-rozmow-dokladnosc/"
date: 2026-10-21
author: "Tomasz Kretek"
category: "Transkrypcja"
excerpt: "Automatyczna transkrypcja rozmów to zamiana mowy na tekst przez system rozpoznawania mowy (ASR, automatic speech recognition), bez udziału człowieka."
cover: "/blog/dokladnosc-transkrypcji.jpg"
coverAlt: "Ilustracja: fala dźwiękowa rozmowy zamieniana na tekst, lupa nad błędnie rozpoznanymi słowami i wskaźnik dokładności"
coverGradient: "linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)"
readTime: 11
tags: ["transkrypcja", "asr", "wer", "cer", "język polski"]
seo:
  metaTitle: "Automatyczna transkrypcja rozmów: dokładność i języki"
  metaDescription: "Od czego zależy dokładność automatycznej transkrypcji rozmów, czym są WER, CER i LER oraz dlaczego modele radzą sobie gorzej po polsku niż po angielsku."
draft: false
---
Automatyczna transkrypcja rozmów to zamiana mowy na tekst przez system rozpoznawania mowy (ASR, *automatic speech recognition*), bez udziału człowieka. Jej dokładność nie jest jedną stałą liczbą — zależy przede wszystkim od czystości nagrania, języka rozmowy i słownictwa branżowego. Model, który na angielskim benchmarku myli się w co dwudziestym słowie, na polskiej rozmowie z infolinii potrafi mylić się kilka razy częściej. Wyjaśniamy, jak mierzyć dokładność, co ją psuje i jak sprawdzić ją na własnych nagraniach, zanim podpiszesz umowę.

Jeśli szukasz, jak włączyć transkrypcję w telefonie — odpowiadamy krótko [na końcu tekstu](#a-automatyczna-transkrypcja-w-telefonie). Ten artykuł jest o tym, czy transkrypcji można ufać w firmie.

> **W skrócie:**
> * Dokładność mierzy się najczęściej wskaźnikiem **WER** (odsetek błędnych słów). Dla polskiego warto patrzeć równolegle na **CER** i **LER** — każdy pokazuje inny rodzaj błędów.
> * WER z benchmarku dostawcy pochodzi z innych nagrań niż Twoje. Na polskich rozmowach telefonicznych błędów jest zwykle kilka razy więcej.
> * Ważniejsza od częstotliwości próbkowania jest **czystość** nagrania. Dobrze nagrana rozmowa w 8 kHz nadal transkrybuje się dobrze.
> * Słownik branżowy i kontekst tekstowy poprawiają rozpoznanie tam, gdzie błędy kosztują najwięcej — na nazwach własnych.
> * Większość modeli jest optymalizowana pod angielski, a część obsługuje **wyłącznie** angielski. Zawsze testuj w swoim języku.
> * Przed zakupem zrób test na 20–30 własnych, reprezentatywnych rozmowach.

---

## Jak działa automatyczna transkrypcja

Model rozpoznawania mowy robi dwie rzeczy naraz: „słucha”, jakie dźwięki padły, i „zgaduje”, jakie słowa pasują do tego, co było powiedziane wcześniej. Dlatego błędy biorą się zarówno ze słabego dźwięku, jak i z nietypowego słownictwa. Model wnioskuje z kontekstu — po „numer polisy to…” spodziewa się liczby, a nie rzeczownika. Więcej o samym procesie: [czym jest transkrypcja rozmów telefonicznych](/pl/wiedza/blog/transkrypcja-rozmow-telefonicznych/).

Transkrypcja na żywo musi zdecydować o słowie, zanim usłyszy, co padnie dalej. Transkrypcja po rozmowie (*post-call*) widzi całe nagranie i może skorygować wcześniejsze słowo na podstawie późniejszego, więc przy tym samym modelu jest zwykle dokładniejsza. Do analizy jakości i compliance wystarcza tryb post-call; tryb na żywo jest potrzebny tam, gdzie system odpowiada rozmówcy — np. w voicebotach.

## Czym jest dokładność transkrypcji i jak się ją mierzy

### WER (Word Error Rate) — definicja i sposób liczenia

WER (Word Error Rate, wskaźnik błędu słów) to odsetek słów, które system ASR rozpoznał błędnie w porównaniu z transkrypcją wzorcową przygotowaną przez człowieka. Liczy się słowa zamienione na inne, pominięte i dodane, a sumę dzieli przez liczbę słów we wzorcu. Im niższy WER, tym dokładniejsza transkrypcja.

Przykład: wzorzec „proszę podać numer umowy”, transkrypcja „proszę podać numery umowy” — jedno błędne słowo na cztery, czyli WER = 25%. „Numer” → „numery” waży przy tym tyle samo co zamiana „tak” na „nie”.

### CER i LER — dlaczego po polsku jeden wskaźnik nie wystarcza

WER źle znosi języki fleksyjne: model, który rozpoznał nazwisko, ale wstawił „Kowalskiego” zamiast „Kowalskiemu”, dostaje pełny błąd. Dlatego stosuje się dwa uzupełniające wskaźniki:

* **CER (Character Error Rate)** — ta sama logika, liczona na znakach. Błędna końcówka to jeden–dwa znaki, a nie całe słowo. CER lepiej koreluje z oceną ludzi niż WER, zwłaszcza w językach o bogatej morfologii ([Thennal i in., 2024](https://arxiv.org/abs/2410.07400)).
* **LER (Lemma Error Rate)** — WER liczony na lematach, czyli formach słownikowych. „Kowalskiego” i „Kowalskiemu” to ten sam lemat, więc błąd odmiany znika ([Bañeras-Roux i in., 2026](https://arxiv.org/abs/2604.27533); dla polskiego nie ma jeszcze ustalonego standardu).

LER jest uczciwszy zwłaszcza wtedy, gdy transkrypcję czyta potem model językowy (LLM) — jak w systemach do automatycznej oceny rozmów. LLM zrozumie zdanie z przekręconą końcówką, ale nie poradzi sobie z zamianą „mnie” → „nie” czy „jedynie” → „jeden”. W CER to różnice jednego–dwóch znaków, w LER — pełne błędy, bo zmienił się sens.

Każdy wskaźnik ma ślepą plamkę: **WER** przecenia błędy odmiany, **CER** nie docenia krótkich słów zmieniających sens, **LER** ignoruje odmianę nawet wtedy, gdy ma znaczenie. Dokładność po polsku najlepiej oceniać na wszystkich trzech naraz.

### Co WER pomija

* **Interpunkcję i wielkie litery** — przed liczeniem zwykle się je usuwa.
* **Zapis liczb, dat i kwot** — „2000 zł” i „dwa tysiące złotych” to ta sama treść, ale bez normalizacji WER policzy kilka błędów. W polskim benchmarku BIGOS sama normalizacja obniżyła WER o ok. 15 punktów procentowych ([Junczyk, 2024](https://arxiv.org/html/2408.00005v1)).
* **Wagę błędu** — pominięte „yyy” kosztuje tyle samo co zamiana „tak” na „nie”.

### Metryki bliższe biznesowi

W call center ważniejsze od średniego WER bywa to, czy system poprawnie rozpoznaje nazwy produktów, nazwiska, numery umów i kwoty oraz czy wykrywa obowiązkowe formuły (informację o nagrywaniu, pouczenia). Warto osobno liczyć błędy zmieniające znaczenie zdania — w naszych testach ten wskaźnik potrafił różnić dwa modele bardziej niż sam WER.

### Dlaczego benchmark dostawcy nie równa się wynikowi na Twoich rozmowach

Publiczne rankingi, np. [Open ASR Leaderboard](https://arxiv.org/abs/2510.06961), mierzą modele głównie na angielskim, na nagraniach czytanych, przemówieniach i spotkaniach — bez zbioru telefonicznego i bez polskiego. Rozmowy z infolinii to mowa spontaniczna, wąskie pasmo, żargon i nazwy własne. W polskim benchmarku BIGOS systemy komercyjne popełniały na mowie spontanicznej ponad dwa razy więcej błędów niż na czytanej ([Junczyk, 2024](https://arxiv.org/html/2408.00005v1)).

Podobny rozjazd widzimy we własnych testach na dwóch zbiorach polskich rozmów telefonicznych z ręcznie zweryfikowanym wzorcem (19 i 14 rozmów). Porównaliśmy komercyjne i otwarte modele:

* Popularne otwarte modele — NVIDIA Parakeet, NVIDIA Canary, MOSS i OpenAI Whisper — popełniały **od ok. 2,5 do 3,5 raza więcej błędów** niż najlepszy z testowanych modeli komercyjnych.
* Na drugim, trudniejszym zbiorze te same otwarte modele myliły się jeszcze częściej — od ok. 25% do prawie dwóch razy więcej niż na pierwszym.

Te same otwarte modele deklarują dla polskiego kilkukrotnie niższy błąd (np. [NVIDIA Parakeet](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3)) — ale zmierzony na czytanych zdaniach nagranych w dobrej jakości. Wynik z benchmarku to orientacja, nie obietnica.

## Co obniża dokładność transkrypcji rozmów telefonicznych

### Jakość audio, szum tła i sprzęt agenta

Czynnik numer jeden. Szum tła, przestery, trzaski, echo i rwące się połączenie szkodzą bardziej niż cokolwiek innego. Popularne przekonanie „8 kHz to za mało dla AI” jest przesadzone: **dobrze nagrana, czysta rozmowa w 8 kHz nadal transkrybuje się dobrze**.

### Kodek, kompresja i wąskie pasmo telefonii

Telefonia przenosi dźwięk w gorszej jakości niż dyktafon czy mikrofon studyjny, a kompresja usuwa część informacji — ale wpływ jest mniejszy niż szumu. Dane z testów modelu [NVIDIA Parakeet](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v2) pokazują to wprost: sprowadzenie nagrań do jakości telefonicznej zwiększyło liczbę błędów o ok. 4%, a silny szum — prawie dwukrotnie.

„Naprawianie” nagrania po fakcie rzadko pomaga. Sztuczne podniesienie jakości nie odtworzy dźwięku, którego w nagraniu nie było, a w naszych próbach automatyczne odszumianie wręcz pogorszyło wynik — filtr usuwał razem z szumem fragmenty mowy.

### Nakładanie się mówców i przerywanie sobie

Gdy agent i klient mówią jednocześnie w nagraniu mono, model gubi słowa obu stron.

### Akcenty, tempo mowy i mowa spontaniczna

Urwane zdania, poprawki w pół słowa, „yyy”, szybkie tempo i regionalizmy — to codzienność infolinii i rzadkość w benchmarkach.

### Słownictwo branżowe, nazwy własne, liczby i identyfikatory

Nazwy produktów, taryf, nazwiska, numery umów, PESEL, kwoty, literowane numery rejestracyjne. To najczęstsze źródło błędów, które mają realne skutki biznesowe.

### Nagranie mono vs dwa kanały

Wiele central nagrywa agenta i klienta w osobnych kanałach. Taki plik można rozdzielić i transkrybować każdy kanał osobno: system wie wtedy z pewnością, kto mówi, a nakładające się wypowiedzi przestają sobie przeszkadzać. Więcej w tekście o [rozdzieleniu wypowiedzi agenta i klienta](/pl/wiedza/blog/diaryzacja-mowcow/).

Jest też koszt: model transkrybujący jeden kanał traci kontekst drugiej strony — słyszy odpowiedź bez pytania, a przecież wnioskuje także językowo z poprzednich słów. Dlatego dokładność rozpoznania pojedynczych słów może lekko spaść. Dochodzi przesłuch: jeśli głos agenta „przecieka” na kanał klienta, oba kanały zawierają te same słowa. W naszych testach podział na kanały u jednych modeli obniżył WER, a u innych podniósł — warto zmierzyć oba warianty.

## Jak poprawić dokładność automatycznej transkrypcji

### Słownik branżowy i kontekst tekstowy

Dojrzałe systemy ASR pozwalają przekazać modelowi dodatkowe informacje:

* **Słownik niestandardowy** (*custom vocabulary*, *keyterms*) — nazwy produktów, taryf, marek, skróty, nazwiska.
* **Kontekst tekstowy** — opis rozmowy zwykłym językiem, np. „rozmowa infolinii sklepu z elektroniką, klient pyta o reklamację”. Model, który wie, o czym będzie rozmowa, łatwiej rozstrzyga niejednoznaczne fragmenty.

Taką możliwość oferuje większość komercyjnych dostawców (m.in. Soniox, Deepgram, AssemblyAI), choć w różnym zakresie — jedni przyjmują tylko listę słów, inni także opis branży.

Zysk w średnim WER bywa skromny — w naszym teście kontekst konkretnego klienta obniżył WER o ok. 0,4 punktu procentowego. Ale ta różnica przypada na słowa o największej wartości: nazwy produktów i nazwiska. Ze słownikiem nie należy przesadzać — zbyt długa lista podbija fałszywe trafienia. InOro.ai obsługuje słowniki branżowe i kontekst konfigurowane dla każdego klienta na etapie wdrożenia.

### Poprawa źródła audio

* Nagrywaj w dwóch kanałach, jeśli centrala na to pozwala, i sprawdź, czy nie ma przesłuchu.
* Unikaj wielokrotnego konwertowania i kompresowania plików z nagraniami.
* Zadbaj o sprzęt agentów: słuchawki z mikrofonem z redukcją szumów, ciche stanowiska.

### Weryfikacja próbki przez człowieka

Dokładność nie jest dana raz na zawsze — zmienia się oferta, sprzęt i konfiguracja centrali. Raz na jakiś czas porównaj kilkanaście transkrypcji z odsłuchem, dopisz brakujące nazwy do słownika i zmierz ponownie.

## Transkrypcja wielojęzyczna — na co uważać

### „Obsługiwany” a „dobrze obsługiwany” język

Większość modeli ASR powstaje z myślą o angielskim, bo dla niego jest najwięcej danych. Whisper (OpenAI) był trenowany na 680 tys. godzin nagrań, z czego **65% to angielski**, a polski — ok. 4,3 tys. godzin; autorzy pokazali, że błąd w danym języku silnie zależy od ilości danych w tym języku ([Radford i in., 2022](https://cdn.openai.com/papers/whisper.pdf)). Część popularnych modeli obsługuje **wyłącznie angielski** — m.in. jedna z wersji NVIDIA Parakeet, Distil-Whisper i Moonshine. Wysoka pozycja takiego modelu w rankingu nic nie mówi o polskim — w benchmarku opublikowanym przez Soniox jeden z modeli NVIDIA, dobry po angielsku, na polskim mylił się niemal w każdym słowie.

Nawet wśród modeli z polskim różnice są duże. W tym samym benchmarku (60 języków, nagrania z YouTube, marzec 2025 — benchmark dostawcy) najsłabszy dostawca popełniał na polskim ponad dwa razy więcej błędów niż najlepszy — najlepiej wypadli Soniox i Speechmatics, najsłabiej Google i AWS. Inni dostawcy, m.in. ElevenLabs i AssemblyAI, publikują własne zestawienia dla polskiego — każdy na innym materiale, więc wyników z różnych benchmarków nie należy zestawiać wprost.

### Polski vs angielski — dlaczego polski jest trudniejszy

* **Fleksja** — wiele form tego samego słowa to więcej okazji do pomyłki (stąd sens CER i LER).
* **Odmiana nazw własnych** — „Wiśniewska”, „Wiśniewskiej”, „Wiśniewską”: model musi znać nazwę i jej odmianę.
* **Swobodny szyk zdania** — model językowy ma mniej pewne przewidywania.

### Przełączanie języków i obcojęzyczne wtrącenia

Rozmowy rzadko są w stu procentach jednojęzyczne: angielskie nazwy produktów i aplikacji, coraz częściej rozmowy polsko-ukraińskie. Jedne modele przełączają język w trakcie rozmowy, inne wymuszają jeden na całe nagranie. Jeśli obsługujesz klientów w kilku językach, testuj każdy osobno, łącznie z rozmowami mieszanymi.

## Jak przetestować dokładność przed zakupem — procedura krok po kroku

1. **Wybierz 20–30 reprezentatywnych rozmów** — z różnych kolejek, pór dnia i agentów, w tym kilka trudnych (szum, przerywanie, dużo liczb i nazw). Pamiętaj o [zasadach nagrywania rozmów z klientem](/pl/wiedza/blog/nagrywanie-rozmow-telefonicznych-rodo/).
2. **Przygotuj transkrypcję wzorcową** — człowiek spisuje rozmowę słowo w słowo. Najlepiej od zera, a nie poprawiając wynik jednego z testowanych systemów, bo to go faworyzuje.
3. **Ustal zasady normalizacji** przed liczeniem: zapis liczb, kwot, dat, interpunkcja.
4. **Policz WER, CER i LER** — porównaj wynik każdego systemu ze wzorcem na poziomie słów, znaków i form słownikowych.
5. **Sprawdź metryki biznesowe** — nazwy produktów, nazwiska, kwoty, obowiązkowe formuły.
6. **Oceń osobno rozmowy trudne** — średnia potrafi ukryć, że system zawodzi tam, gdzie jest najbardziej potrzebny.
7. **Porównuj dostawców na tym samym zbiorze** i z tymi samymi zasadami normalizacji.

W InOro.ai dokładność weryfikujemy na Twoich rozmowach — zanim zaczniesz [analizować 100% połączeń](/pl/transkrypcja-rozmow/), wiesz, jak transkrypcja radzi sobie z Twoim audio i słownictwem.

## A automatyczna transkrypcja w telefonie?

Smartfony z Androidem i iOS mają wbudowaną transkrypcję na żywo, a w sklepach z aplikacjami jest wiele darmowych narzędzi do zamiany mowy na tekst. Do notatek czy dostępności dla osób niedosłyszących zwykle wystarczają. Darmowe narzędzia nie dają jednak gwarancji jakości (SLA), słowników branżowych ani kontroli nad tym, gdzie trafiają dane. A przede wszystkim w telefonie nikt nie mierzy dokładności — „działa u mnie” wystarcza. W firmie na transkrypcji opierasz ocenę konsultantów i kontrolę zgodności z przepisami, więc jej jakość musi być zmierzona i powtarzalna.

## FAQ

### Czy automatyczna transkrypcja rozmów jest dokładna?
Zależy od nagrania i języka. Na czystych nagraniach czytanych najlepsze modele mylą się w kilku procentach słów. Na polskich rozmowach telefonicznych z szumem, żargonem i przerywaniem — zwykle częściej, a słabsze modele nawet w co trzecim słowie. Dlatego dokładność trzeba sprawdzić na własnych nagraniach.

### Co to jest WER i jaka wartość jest dobra?
WER (Word Error Rate) to odsetek błędnie rozpoznanych słów względem transkrypcji wzorcowej. Nie ma jednej „dobrej” wartości — zależy od materiału i normalizacji tekstu. Porównuj WER tylko na tym samym zbiorze nagrań, a dla polskiego patrz też na CER i LER.

### Czym różnią się WER, CER i LER?
WER liczy błędy na słowach, CER — na znakach, LER — na formach słownikowych (lematach). WER zawyża błędy odmiany, CER zaniża błędy krótkich słów zmieniających sens („mnie” → „nie”), a LER pomija odmianę. Najlepiej używać wszystkich trzech.

### Co najbardziej obniża jakość transkrypcji rozmów telefonicznych?
Przede wszystkim zanieczyszczone audio: szum, przestery, echo i zakłócenia. Dalej: mówienie jednocześnie, nazwy własne i słownictwo branżowe, liczby oraz szybka, spontaniczna mowa. Sama częstotliwość 8 kHz ma mniejszy wpływ, niż się uważa.

### Czy transkrypcja działa dobrze po polsku?
Może, ale nie każdy model to potrafi. Większość modeli jest optymalizowana pod angielski, a część obsługuje tylko angielski. Nawet wśród modeli z polskim liczba błędów różni się kilkukrotnie — zawsze testuj na polskich nagraniach.

### Jak sprawdzić dokładność przed zakupem narzędzia?
Wybierz 20–30 reprezentatywnych rozmów, przygotuj ręczną transkrypcję wzorcową, ustal zasady normalizacji i policz WER, CER i LER oraz trafność na nazwach i kwotach. Porównuj dostawców na tym samym zbiorze.

## Chcesz sprawdzić, jak transkrypcja radzi sobie z Twoimi rozmowami?

InOro.ai analizuje 100% rozmów po ich zakończeniu, jako nakładka na Twoją obecną centralę (Genesys, Avaya, Cisco, API lub SFTP). Słownik branżowy i kontekst konfigurujemy pod Twoją firmę, dane przetwarzamy w UE, bez transferu poza EOG, a wdrożenie trwa typowo 1–2 tygodnie (przy dużych organizacjach dłużej). InOro nie działa w czasie rzeczywistym — transkrypcję na żywo stosujemy w voicebotach Aproco, a w przyszłości ta technologia może trafić także do InOro.

**[Sprawdź transkrypcję rozmów z InOro](/pl/transkrypcja-rozmow/)**

---

## Źródła

1. Srivastav i in., *Open ASR Leaderboard*, 2025 — [https://arxiv.org/abs/2510.06961](https://arxiv.org/abs/2510.06961)
2. Radford i in., *Robust Speech Recognition via Large-Scale Weak Supervision* (Whisper), 2022 — [https://cdn.openai.com/papers/whisper.pdf](https://cdn.openai.com/papers/whisper.pdf)
3. Junczyk, *BIGOS V2 Benchmark for Polish ASR*, NeurIPS 2024 — [https://arxiv.org/html/2408.00005v1](https://arxiv.org/html/2408.00005v1)
4. Thennal i in., *Advocating Character Error Rate for Multilingual ASR Evaluation*, 2024 — [https://arxiv.org/abs/2410.07400](https://arxiv.org/abs/2410.07400)
5. Bañeras-Roux i in., lemma error rate, 2026 — [https://arxiv.org/abs/2604.27533](https://arxiv.org/abs/2604.27533)
6. Karty modeli NVIDIA Parakeet TDT 0.6B v2 i v3, Canary 1B v2 (Hugging Face)
7. Soniox, *STT Benchmarks 2025* (benchmark dostawcy)
8. ElevenLabs, AssemblyAI — strony z benchmarkami dostawców
9. Dokumentacja kontekstu i słowników: Soniox, Deepgram, AssemblyAI, OpenAI Whisper
