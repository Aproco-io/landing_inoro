---
title: "Integracje — działa z Twoim systemem call center"
description: "InOro łączy się z Genesys, Avaya, Cisco i każdym źródłem nagrań przez API lub SFTP. Power BI/Tableau, webhooki do CRM, SSO. Wdrożenie 1–2 tygodnie, bez wymiany systemu."
lang: "pl"
slug: "/pl/integracje/"
translationKey: "integrations"
order: 70
seo:
  metaTitle: "Integracje — działa z Twoim systemem call center | InOro"
  metaDescription: "InOro łączy się z Genesys, Avaya, Cisco i każdym źródłem nagrań przez API lub SFTP. Power BI/Tableau, webhooki do CRM, SSO. Wdrożenie 1–2 tygodnie, bez wymiany systemu."
sections:
  - type: hero
    badge: "Bez wymiany systemu"
    heading: "InOro podpina się do call center, które już masz"
    subheading: "Bez migracji telefonii, bez instalacji na stanowiskach konsultantów, bez nowych narzędzi do nauki. InOro łączy się z Twoimi nagraniami, analizuje je i oddaje wyniki tam, gdzie pracujesz — wdrożenie w 1–2 tygodnie."
    primaryCta: { label: "Umów demo", href: "/demo/" }
    secondaryCta: { label: "Porozmawiaj z inżynierem", href: "/demo/" }

  - type: bluf
    body: "InOro to <strong>nakładka, nie zamiennik</strong>: pobiera nagrania rozmów z Twojego obecnego systemu (natywnie z Genesys, Avaya i Cisco; przez REST API lub SFTP z każdego innego), analizuje je po zakończeniu połączeń i zwraca wyniki przez dashboardy, Power BI/Tableau, webhooki i otwarte API."

  - type: logo-bar

  - type: capability-grid
    kicker: "Wejście — audio"
    heading: "Jak audio trafia do InOro"
    cards:
      - icon: "📞"
        title: "Konektory natywne"
        body: "Genesys, Avaya, Cisco: nagrania płyną automatycznie, bez pośredników."
      - icon: "🔌"
        title: "REST API"
        body: "Wysyłaj nagrania i metadane programistycznie z dowolnego dialera, centrali czy platformy nagrywającej; to samo API wystawia wszystkie wyniki."
      - icon: "📁"
        title: "SFTP (batch)"
        body: "Uniwersalny wariant: pliki audio (np. stereo WAV) lądują w ustalonej lokalizacji, InOro pobiera je wg harmonogramu. Działa z legacy i niestandardowymi rejestratorami."

  - type: capability-grid
    kicker: "Wyjście — insighty"
    heading: "Jak wyniki trafiają do Twojego zespołu"
    cards:
      - icon: "📊"
        title: "Łącznik BI"
        body: "Zasilanie na żywo Power BI / Tableau; buduj własne raporty na ocenionych, skategoryzowanych danych z rozmów."
      - icon: "🔔"
        title: "Webhooki → CRM i systemy"
        body: "Streszczenia i zdarzenia (naruszenie, ocena poniżej progu) trafiają do CRM, ticketingu lub alertingu — bez wpisywania przez konsultantów."
      - icon: "🔗"
        title: "Otwarte REST/JSON API"
        body: "Pełny dostęp do danych: transkrypty, oceny, tematy, zdarzenia. Zero vendor lock-inu na poziomie danych."

  - type: at-a-glance
    kicker: "W skrócie"
    heading: "Wdrożenie bez rewolucji"
    bullets:
      - "Wdrożenie w <strong>1–2 tygodnie</strong> (typowo)"
      - "<strong>Zero zmian dla konsultantów</strong> — działa w tle na nagraniach"
      - "Natywnie: <strong>Genesys · Avaya · Cisco</strong>; reszta przez <strong>API/SFTP</strong>"
      - "Wyniki: <strong>Power BI/Tableau, webhooki, REST API</strong>"
      - "Logowanie: <strong>SSO (SAML 2.0)</strong>, dostęp per rola"
      - "Wdrożenie: <strong>SaaS lub w pełni on-premise</strong>"

  - type: comparison-table
    kicker: "Alternatywa"
    heading: "Analityka bez projektu migracyjnego"
    columns:
      - "Wymiana platformy CC"
      - "InOro jako nakładka"
    rows:
      - label: "Czas"
        values: ["miesiące–lata", "1–2 tygodnie"]
      - label: "Wpływ na konsultantów"
        values: ["szkolenia, nowe narzędzia", "żaden"]
      - label: "Telefonia"
        values: ["migrowana", "bez zmian"]
      - label: "Ryzyko"
        values: ["przełączenie big-bang", "30-dniowy pilotaż na realnych rozmowach"]
      - label: "Dane"
        values: ["zamknięte w nowej suicie", "otwarte API, Twoje narzędzia BI"]

  - type: results-band
    heading: "Sprawdzone w praktyce"
    stats:
      - value: "10 mln+"
        label: "Przeanalizowanych minut"
        sub: "na produkcji"
      - value: "1 000+"
        label: "Agentów łącznie"
        sub: "wdrożenia produkcyjne"
      - value: "SaaS + on-prem"
        label: "Oba modele na produkcji"
    caseNote: "Wdrożenia produkcyjne SaaS i on-premise · duże operacje wieloprojektowe podłączone przez istniejącą infrastrukturę — bez zmiany telefonii, w 1–2 tygodnie i bez zmian po stronie konsultantów."

  - type: security-band
    heading: "Bezpieczeństwo w standardzie"
    tiles:
      - title: "Hosting w UE lub on-premise"
        body: "RODO by design."
      - title: "SSO, SAML 2.0, RBAC"
        body: "Enterprise kontrola dostępów."
      - title: "Logi audytu"
        body: "Pełen ślad każdej akcji."
      - title: "Anonimizacja danych wrażliwych"
        body: "Szyfrowanie w transmisji i spoczynku."

  - type: faq
    heading: "Najczęstsze pytania"
    items:
      - q: "Nasza telefonia to nie Genesys, Avaya ani Cisco — podłączycie się?"
        a: "Tak. Każdy system, który produkuje nagrania, działa przez REST API lub SFTP; formaty niestandardowe i nietypowe dialery obsługujemy z naszymi inżynierami przy wdrożeniu."
      - q: "Czy konsultanci muszą coś instalować lub zmieniać?"
        a: "Nie. InOro pracuje w tle na nagraniach; interfejs działa w przeglądarce, nic nie staje na stanowiskach."
      - q: "Ile trwa integracja?"
        a: "Zwykle 1–2 tygodnie, zależnie od infrastruktury. 30-dniowy pilotaż obejmuje wdrożenie."
      - q: "Czy wyniki trafią do naszego CRM i BI?"
        a: "Tak — webhooki wysyłają streszczenia i zdarzenia do CRM; łącznik na żywo zasila Power BI/Tableau; resztę pokrywa REST API."
      - q: "Czy możemy uruchomić on-premise?"
        a: 'Tak — pełne wdrożenie on-premise jest dostępne; dane nie opuszczają Twojej infrastruktury. <a href="/pl/rozwiazania/compliance/">Compliance</a>'
      - q: "A single sign-on?"
        a: "SSO przez SAML 2.0 z dostępem per rola i logami audytowymi."

  - type: related-resources
    heading: "Zgłęb temat"
    cards:
      - title: "Czym jest analiza rozmów"
        body: "Kategoria wyjaśniona."
        href: "/pl/wiedza/czym-jest-analiza-rozmow/"
      - title: "Dashboardy i raporty call center"
        body: "Szablony i best-practice."
        href: "/pl/wiedza/dashboard-call-center/"
      - title: "RODO a nagrywanie rozmów"
        body: "Kiedy nagrywanie jest legalne."
        href: "/pl/wiedza/rodo-nagrywanie-rozmow/"

  - type: explore-platform
    heading: "Poznaj platformę"
    links:
      - label: "Analiza rozmów"
        href: "/pl/analiza-rozmow/"
      - label: "Analiza mowy"
        href: "/pl/analiza-mowy/"
      - label: "Analityka call center"
        href: "/pl/analityka-call-center/"
      - label: "Kontrola jakości obsługi"
        href: "/pl/kontrola-jakosci-obslugi/"
      - label: "Transkrypcja rozmów"
        href: "/pl/transkrypcja-rozmow/"
      - label: "Czat AI"
        href: "/pl/czat-ai/"

  - type: cta-band
    heading: "Powiedz nam, na czym pracujesz — rozpiszemy połączenie"
    body: "30 minut z inżynierem, plan integracji w cenie. 30-dniowy bezpłatny pilotaż • bez karty."
    primaryCta: { label: "Umów demo", href: "/demo/" }
    secondaryCta: { label: "Zobacz cennik", href: "/pl/cennik/" }
---
