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
      { label: 'Analiza rozmów (AI)', href: '/pl/analiza-rozmow/' },
      { label: 'Analiza mowy (speech analytics)', href: '/pl/analiza-mowy/' },
      { label: 'Analityka call center', href: '/pl/analityka-call-center/' },
      { label: 'Kontrola jakości obsługi (QA)', href: '/pl/kontrola-jakosci-obslugi/' },
      { label: 'Transkrypcja rozmów', href: '/pl/transkrypcja-rozmow/' },
      { label: 'Czat AI — zapytaj swoje rozmowy', href: '/pl/czat-ai/' },
      { label: 'Integracje (Genesys, Avaya…)', href: '/pl/integracje/' },
    ],
  },
  {
    label: 'Rozwiązania',
    children: [
      { label: 'Dla BPO / outsourcingu (white-label)', href: '/pl/rozwiazania/bpo/' },
      { label: 'Dla banków, windykacji i compliance', href: '/pl/rozwiazania/compliance/' },
      { label: 'Dla e-commerce i retail', href: '/pl/rozwiazania/e-commerce/' },
      { label: 'Dla działów sprzedaży', href: '/pl/rozwiazania/sprzedaz/' },
    ],
  },
  { label: 'Cennik', href: '/pl/cennik/' },
  {
    label: 'Wiedza',
    children: [
      { label: 'Wskaźniki (KPI) jakości obsługi', href: '/pl/wiedza/wskazniki-call-center/' },
      { label: 'Dashboardy i raporty', href: '/pl/wiedza/dashboard-call-center/' },
      { label: 'AI w call center', href: '/pl/wiedza/ai-w-call-center/' },
      { label: 'Poradniki (czym jest…)', href: '/pl/wiedza/czym-jest-analiza-rozmow/' },
      { label: 'Słownik', href: '/pl/wiedza/slownik/' },
    ],
  },
  { label: 'Blog', href: '/pl/wiedza/blog/' },
];

export const MENU_EN: MenuItem[] = [
  {
    label: 'Product',
    children: [
      { label: 'Conversation Intelligence', href: '/conversation-intelligence/' },
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
    children: [
      { label: 'Call Center KPIs & Metrics', href: '/resources/call-center-kpis/' },
      { label: 'Dashboards & Reporting', href: '/resources/call-center-dashboard/' },
      { label: 'What is Conversation Intelligence', href: '/resources/what-is-conversation-intelligence/' },
      { label: 'AI & Predictive Analytics', href: '/resources/ai-call-center-analytics/' },
      { label: 'Agent Performance & Coaching', href: '/resources/agent-performance-analytics/' },
      { label: 'Glossary', href: '/resources/glossary/' },
    ],
  },
  { label: 'Blog', href: '/resources/blog/' },
  // Compare/Alternatives dropdown hidden until legal review completes
  // Files remain in src/content/compare/ but routes are removed.
];
