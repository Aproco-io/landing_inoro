---
title: "Czy można nagrywać rozmowy telefoniczne z klientem? RODO w praktyce"
description: "Czy firma może nagrywać rozmowy z klientem? Podstawy prawne, obowiązek informacyjny, retencja nagrań, żądanie kopii, kary z art. 83 RODO i analiza rozmów przez AI."
lang: "pl"
slug: "/pl/wiedza/blog/nagrywanie-rozmow-telefonicznych-rodo/"
date: 2026-09-23
author: "Adam Sipowicz"
category: "RODO"
excerpt: "Sam komunikat „rozmowa jest nagrywana” nie wystarcza. Podstawa prawna, informacja dla klienta, retencja, kopia nagrania na żądanie i co sprawdzić przed analizą rozmów przez AI."
cover: "/blog/nagrywanie-rozmow-rodo.jpg"
coverAlt: "Dłonie na klawiaturze laptopa, nad nimi ikona mikrofonu i fala dźwiękowa - symbol nagrywania rozmowy"
coverGradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
readTime: 8
tags: ["rodo", "nagrywanie rozmów", "compliance", "retencja", "uodo"]
sources:
  - title: "Principles of the GDPR"
    url: "https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr_en"
    publisher: "Komisja Europejska"
  - title: "Rozporządzenie (UE) 2016/679 (RODO)"
    url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=pl"
    publisher: "EUR-Lex"
  - title: "Process personal data lawfully"
    url: "https://www.edpb.europa.eu/sme/be-compliant/process-personal-data-lawfully_en"
    publisher: "EROD"
  - title: "Newsletter UODO nr 12/2022, s. 7-9"
    url: "https://uodo.gov.pl/pl/file/4193"
    publisher: "UODO"
  - title: "Kodeks pracy, art. 22³"
    url: "https://api.sejm.gov.pl/eli/acts/DU/2025/277/text.pdf"
    publisher: "Sejm RP"
  - title: "What if my company/organisation fails to comply with data protection rules?"
    url: "https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/enforcement-and-sanctions/sanctions/what-if-my-companyorganisation-fails-comply-data-protection-rules_en"
    publisher: "Komisja Europejska"
  - title: "Data controller or data processor?"
    url: "https://www.edpb.europa.eu/sme/learn-the-basics/data-controller-or-data-processor_en"
    publisher: "EROD"
draft: false
---

Tak, firma może nagrywać rozmowy telefoniczne z klientem, jeżeli ma odpowiednią podstawę prawną i spełnia obowiązki dotyczące ochrony danych. Sam komunikat „rozmowa jest nagrywana” nie wystarcza: trzeba określić cel, zakres wykorzystania i czas przechowywania nagrań oraz zapewnić bezpieczeństwo i realizację praw rozmówcy. Zgoda nie jest jedyną możliwą podstawą, ale także uzasadniony interes ani wykonanie umowy nie dają automatycznego prawa do nagrywania wszystkich połączeń. [Zasady RODO - Komisja Europejska](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr_en).

> **W skrócie:** przed uruchomieniem analizy rozmów sprawdź osobno zasady pozyskania nagrania i zasady wykorzystania jego treści w transkrypcji, ocenach oraz raportach.

## Nagranie, transkrypt i raport - gdzie są dane osobowe?

W rozmowie z klientem danymi osobowymi mogą być zarówno głos umożliwiający identyfikację, jak i wypowiedziane informacje: nazwisko, numer umowy czy opis reklamacji. Przepisanie rozmowy na tekst nie usuwa tych danych. Także raport przypisany do konkretnego klienta lub konsultanta może zawierać dane osobowe. [RODO, art. 4](https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=pl).

W praktyce analityki warto rozrysować cały przepływ: system telefoniczny → plik audio → transkrypt → ocena rozmowy → dashboard lub eksport. Dla każdego miejsca ustal, kto ma dostęp i kiedy dane są usuwane.

Usunięcie numeru PESEL z transkryptu nie oznacza jeszcze anonimizacji całego zbioru. Klienta może nadal identyfikować numer sprawy, kontekst wypowiedzi lub powiązanie z nagraniem. Nie traktuj maskowania wybranych pól jako automatycznego wyłączenia stosowania RODO. [RODO, motyw 26 i art. 4](https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=pl).

## Czy nagrywanie wymaga zgody klienta?

Podstawę dobiera się do konkretnego celu i okoliczności. Nie należy z góry zakładać, że w obsłudze klienta zawsze będzie nią zgoda albo zawsze uzasadniony interes.

| Rozważana podstawa | Co trzeba sprawdzić |
|---|---|
| Zgoda - art. 6 ust. 1 lit. a RODO | Czy jest dobrowolna, konkretna, świadoma i jednoznaczna oraz czy można ją wycofać? Samo pozostanie na linii nie powinno być traktowane jako uniwersalny sposób uzyskania ważnej zgody. |
| Wykonanie umowy - art. 6 ust. 1 lit. b | Czy właśnie nagrywanie jest obiektywnie niezbędne do wykonania umowy? To, że rozmowa dotyczy umowy, nie wystarcza. |
| Obowiązek prawny - art. 6 ust. 1 lit. c | Czy konkretny przepis nakazuje dane przetwarzanie i w jakim zakresie? Wewnętrzna procedura firmy nie jest takim przepisem. |
| Uzasadniony interes - art. 6 ust. 1 lit. f | Jaki jest interes, czy nagrywanie jest konieczne i czy przeważają nad nim prawa rozmówcy? Potrzebna jest ocena, nie samo wpisanie „jakość obsługi” do dokumentacji. |

Te przesłanki należy ocenić przed rozpoczęciem nagrywania. Informowanie o nagrywaniu i uzyskiwanie zgody to dwa różne zagadnienia. [Przewodnik EROD po podstawach przetwarzania](https://www.edpb.europa.eu/sme/be-compliant/process-personal-data-lawfully_en).

## Czy można nagrywać klienta bez uprzedzenia?

W standardowej obsłudze klienta firma powinna uprzedzić o nagrywaniu, zanim zacznie utrwalać jego wypowiedzi. Nie należy projektować procesu tak, by klient dowiadywał się o nagraniu dopiero po rozmowie. Obowiązek z art. 13 RODO wiąże się z momentem pozyskiwania danych; ewentualne wyjątki wymagają odrębnej oceny. [RODO, art. 13](https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=pl).

Informacja może być warstwowa: krótki komunikat na początku i łatwo dostępna pełna klauzula. Krótka zapowiedź nie zastępuje jednak kompletu wymaganych informacji. Pełna klauzula przekazywana rozmówcy powinna obejmować m.in. administratora i kontakt, cel i podstawę, okres lub kryteria przechowywania, odbiorców, właściwe prawa rozmówcy oraz kontakt do IOD, jeżeli został wyznaczony. [Komisja Europejska - przejrzystość i zasady przetwarzania](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr_en).

Praktyczny test przed wdrożeniem: wykonaj połączenie jak klient. Sprawdź kolejność zapowiedzi i rozpoczęcia nagrywania, zrozumiałość informacji oraz dostępność pełnej klauzuli. Przygotuj też instrukcję dla konsultanta na sytuację, gdy rozmówca odmawia zgody lub zgłasza sprzeciw - stosownie do wybranej podstawy prawnej.

## Jak długo przechowywać nagrania?

RODO nie wyznacza jednego terminu dla wszystkich rozmów. Okres należy uzasadnić celem i uwzględnić przepisy szczególne, jeśli mają zastosowanie. Nagrania do kontroli jakości nie powinny otrzymywać automatycznie takiego samego okresu jak materiał potrzebny w konkretnym sporze. [Komisja Europejska - ograniczenie przechowywania](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr_en).

W Inoro **domyślna retencja wynosi 90 dni**. Krótszy lub dłuższy okres jest ustalany indywidualnie z klientem. To parametr usługi potwierdzony przez zespół Inoro, a nie ustawowy termin ani potwierdzenie, że 90 dni będzie właściwe w każdej firmie.

Przy wdrożeniu ustal, jak retencja obejmuje audio, transkrypty, wyniki przypisane do osób, eksporty i kopie zapasowe. Jeżeli raport trafia do systemu BI, usunięcie pliku w jednym narzędziu nie potwierdza jeszcze usunięcia danych z pozostałych miejsc.

## Klient żąda nagrania: czego uczy przykład UODO?

W newsletterze UODO nr 12/2022, na stronach 7-9, opisano sprawę klienta żądającego kopii danych z rozmowy z konsultantem. Administrator przekazał dane tekstowo, ale pominął głos utrwalony na nagraniu. Prezes UODO nakazał dostarczenie kopii danych uwzględniającej głos skarżącego, z poszanowaniem praw innych osób. To opis konkretnego rozstrzygnięcia, a nie reguła nakazująca wydawanie każdemu pełnego, niezmienionego pliku audio. [Newsletter UODO 12/2022, s. 7-9](https://uodo.gov.pl/pl/file/4193).

Dla firmy oznacza to potrzebę przygotowania procesu: odnalezienia materiału, potwierdzenia tożsamości osoby i ustalenia zakresu udostępnienia. Nie wystarczy założenie, że wygenerowany transkrypt zawsze wyczerpuje żądanie dostępu do danych.

## A nagrywanie rozmów z pracownikiem?

Nagrywanie rozmów służbowych wymaga także oceny ochrony pracownika, w tym przepisów o innych formach monitoringu z art. 22³ Kodeksu pracy, ich niezbędności, celów i obowiązków informacyjnych - nie jest to ogólne zezwolenie na nagrywanie dowolnych rozmów pracowników. [Kodeks pracy, art. 22³](https://api.sejm.gov.pl/eli/acts/DU/2025/277/text.pdf).

Przy analizie rozmów konsultantów ustal również, kto widzi indywidualne wyniki i jak pracownik może wyjaśnić kontekst zakwestionowanej oceny. W procesie kontroli jakości potraktuj raport jako sygnał do sprawdzenia rozmowy i jej kontekstu.

## Co grozi za naruszenie RODO przy nagrywaniu?

Za naruszenia objęte wyższym progiem z art. 83 RODO maksymalna administracyjna kara wynosi **20 mln euro albo - w przypadku przedsiębiorstwa - 4% całkowitego rocznego światowego obrotu z poprzedniego roku obrotowego**, zależnie od tego, która kwota jest wyższa. To górny limit dla określonych naruszeń, nie automatyczna kara za każdą błędnie nagraną rozmowę. [RODO, art. 83 ust. 5-6](https://eur-lex.europa.eu/eli/reg/2016/679/oj/?pid=14006577).

Organ może także zastosować upomnienie lub ograniczenie przetwarzania. Dobór środka i wysokość kary zależą m.in. od charakteru, wagi i czasu trwania naruszenia oraz działań podjętych w celu ograniczenia szkody. [Komisja Europejska - konsekwencje naruszeń](https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/enforcement-and-sanctions/sanctions/what-if-my-companyorganisation-fails-comply-data-protection-rules_en).

## Analiza nagrań przez AI: co sprawdzić przed podłączeniem Inoro?

Inoro analizuje rozmowy **po ich zakończeniu**. Pobiera istniejące nagrania, transkrybuje je i ocenia według kryteriów ustalonych z klientem. Nie nagrywa połączeń i nie zastępuje systemu telefonicznego. Analiza może objąć całą przekazaną pulę rozmów; zakres pokrycia nie oznacza bezbłędności każdej oceny.

W modelu usługi, w którym Inoro przetwarza dane w imieniu klienta, współpracę obejmuje umowa powierzenia. Administrator ustala cele i zasadnicze sposoby przetwarzania, a procesor działa w granicach uzgodnionych instrukcji. Samo podpisanie DPA nie przesądza o zgodności całego procesu. [EROD - administrator i podmiot przetwarzający](https://www.edpb.europa.eu/sme/learn-the-basics/data-controller-or-data-processor_en).

Przed integracją przejdź przez cztery konkretne decyzje:

1. **Co chcesz wykrywać?** Oddziel kontrolę wymaganych elementów rozmowy od analizy potrzeb sprzedażowych. Sprawdź z osobą odpowiedzialną za ochronę danych, czy planowane wykorzystanie mieści się w celach i informacjach przekazanych rozmówcom.
2. **Jaki materiał jest potrzebny?** Ustal zakres nagrań i metadanych, kategorie danych oraz dostęp zespołów. Nie przesyłaj dodatkowych pól z CRM tylko dlatego, że eksport je zawiera.
3. **Gdzie będą wyniki?** Inoro udostępnia API i integracje lub eksport do narzędzi takich jak Power BI, Tableau i Apache Superset. Uwzględnij te dalsze miejsca w zasadach dostępu i retencji. Zweryfikuj też łańcuch dostawców i ewentualne transfery danych.
4. **Kto sprawdzi sygnał?** Zdefiniuj sposób weryfikacji przez człowieka. Flaga wskazująca potencjalne pominięcie wymaganego komunikatu wymaga sprawdzenia treści i kontekstu nagrania.

Przykładem potwierdzonym przez zespół Inoro są raporty pokazujące, w których rozmowach konsultant wymienił wskazane promocje lub produkty, a w których je pominął. Podobna zasada pracy - ustalone kryterium, wskazanie rozmowy, weryfikacja - jest użyteczna przy projektowaniu kontroli wymaganych elementów obsługi. Zakres konkretnej kontroli należy uzgodnić we wdrożeniu.

Więcej o tym zastosowaniu opisujemy na stronie [analizy rozmów pod kątem compliance](/pl/rozwiazania/compliance/). Etap zamiany audio na tekst omawia [transkrypcja rozmów](/pl/transkrypcja-rozmow/), a pracę z raportami - [analityka call center](/pl/analityka-call-center/).

## Najczęstsze pytania

### Czy można nagrywać rozmowy telefoniczne z klientem bez jego zgody?

Może istnieć inna właściwa podstawa prawna niż zgoda, ale trzeba wykazać jej zastosowanie do konkretnego celu i okoliczności. Nie znosi to obowiązków informacyjnych.

### Czy można nagrywać klienta bez uprzedzenia?

W standardowym procesie obsługi klienta - nie: firma powinna uprzedzić o nagrywaniu przed utrwaleniem jego wypowiedzi. Ewentualnego wyjątku nie należy zakładać bez odrębnej analizy prawnej.

### Czy RODO nakazuje usunąć nagranie po 90 dniach?

Nie ma jednego terminu RODO dla wszystkich nagrań. W Inoro 90 dni to domyślna retencja, którą uzgadnia się z klientem; wybrany okres musi mieć uzasadnienie w jego procesie.

### Czy klient może dostać kopię nagrania?

Może żądać dostępu i kopii swoich danych. Sposób realizacji powinien uwzględniać zakres przetwarzanych danych oraz prawa innych osób; sam transkrypt nie zawsze wystarczy.

### Czy umowa powierzenia wystarczy, żeby analizować rozmowy przez AI?

Nie. Trzeba też ocenić m.in. cele i podstawę przetwarzania, informacje dla osób, zakres danych, bezpieczeństwo oraz rolę dostawców; DPA reguluje relację z procesorem.

---

**Chcesz ustalić zakres analizy istniejących nagrań? [Sprawdź rozwiązanie Inoro dla compliance](/pl/rozwiazania/compliance/).**
