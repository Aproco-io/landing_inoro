export type MenuChild = { label: string; href: string; description?: string };
export type MenuItem = {
  label: string;
  href?: string;
  children?: MenuChild[];
};

export const MENU_PL: MenuItem[] = [
  {
    label: 'Produkt',
    children: [
      { label: 'Analiza rozmów (AI)', href: '/analiza-rozmow/', description: 'Brand pillar, kotwica CSI' },
      { label: 'Analiza mowy (speech analytics)', href: '/analiza-mowy/' },
      { label: 'Analityka call center', href: '/analityka-call-center/' },
      { label: 'Kontrola jakości obsługi (QA)', href: '/kontrola-jakosci-obslugi/' },
      { label: 'Transkrypcja rozmów', href: '/transkrypcja-rozmow/' },
      { label: 'Czat AI — zapytaj swoje rozmowy', href: '/czat-ai/' },
      { label: 'Integracje (Genesys, Avaya…)', href: '/integracje/' },
    ],
  },
  {
    label: 'Rozwiązania',
    children: [
      { label: 'Dla BPO / outsourcingu (white-label)', href: '/rozwiazania/bpo/' },
      { label: 'Dla banków, windykacji i compliance', href: '/rozwiazania/compliance/' },
      { label: 'Dla e-commerce i retail', href: '/rozwiazania/e-commerce/' },
      { label: 'Dla działów sprzedaży', href: '/rozwiazania/sprzedaz/' },
    ],
  },
  { label: 'Cennik', href: '/cennik/' },
  {
    label: 'Wiedza',
    href: '/wiedza/blog/',
    children: [
      { label: 'Wskaźniki (KPI) jakości obsługi', href: '/wiedza/wskazniki-call-center/' },
      { label: 'Dashboardy i raporty', href: '/wiedza/dashboard-call-center/' },
      { label: 'RODO a nagrywanie rozmów', href: '/wiedza/rodo-nagrywanie-rozmow/' },
      { label: 'AI w call center', href: '/wiedza/ai-w-call-center/' },
      { label: 'Poradniki (czym jest…)', href: '/wiedza/czym-jest-analiza-rozmow/' },
      { label: 'Słownik', href: '/wiedza/slownik/' },
    ],
  },
];

export const MENU_EN: MenuItem[] = [
  {
    label: 'Product',
    children: [
      { label: 'Conversation Intelligence', href: '/conversation-intelligence/', description: 'Brand pillar' },
      { label: 'Speech Analytics', href: '/speech-analytics/' },
      { label: 'Contact Center Analytics', href: '/contact-center-analytics/' },
      { label: 'Quality Assurance (Auto-QA)', href: '/call-center-quality-assurance/' },
      { label: 'Call Transcription', href: '/call-transcription/' },
      { label: 'AI Chat — Ask Your Calls', href: '/ai-chat/' },
      { label: 'Integrations', href: '/integrations/' },
    ],
  },
  {
    label: 'Solutions',
    children: [
      { label: 'BPO / Outsourcers (White-Label)', href: '/solutions/bpo/' },
      { label: 'Financial Services & Compliance', href: '/solutions/compliance/' },
      { label: 'Retail & E-commerce', href: '/solutions/retail/' },
      { label: 'Sales Intelligence', href: '/solutions/sales/' },
    ],
  },
  { label: 'Pricing', href: '/pricing/' },
  {
    label: 'Resources',
    href: '/resources/blog/',
    children: [
      { label: 'Call Center KPIs & Metrics', href: '/resources/call-center-kpis/' },
      { label: 'Dashboards & Reporting', href: '/resources/call-center-dashboard/' },
      { label: 'What is Conversation Intelligence', href: '/resources/what-is-conversation-intelligence/' },
      { label: 'AI & Predictive Analytics', href: '/resources/ai-call-center-analytics/' },
      { label: 'Agent Performance & Coaching', href: '/resources/agent-performance-analytics/' },
      { label: 'Glossary', href: '/resources/glossary/' },
    ],
  },
  {
    label: 'Compare',
    children: [
      { label: 'InOro vs NICE', href: '/compare/inoro-vs-nice/' },
      { label: 'InOro vs Verint', href: '/compare/inoro-vs-verint/' },
      { label: 'InOro vs CallMiner', href: '/compare/inoro-vs-callminer/' },
      { label: 'InOro vs Observe.AI', href: '/compare/inoro-vs-observe-ai/' },
      { label: 'NICE alternative', href: '/alternatives/nice-alternative/' },
      { label: 'Verint alternative', href: '/alternatives/verint-alternative/' },
      { label: 'CallMiner alternative', href: '/alternatives/callminer-alternative/' },
    ],
  },
];
