// Central mapping between Polish and English URLs.
// Used for the language switcher and hreflang tags.
// Key = source URL, value = its equivalent in the other language.
// Include a trailing slash. Absence of a key means "no known alternate".

export const SITE_URL = 'https://inoro.ai';
export const DEFAULT_LANG: 'en' = 'en';

export type Lang = 'pl' | 'en';

// Detect the language a given path belongs to, from the mapping alone.
// If a path exists in BOTH keysets you get a false positive, so we build
// two disjoint sets below.

export const URL_ALTERNATES: Record<string, string> = {
  // Home
  '/': '/pl/',
  '/pl/': '/',

  // Products (flat)
  '/conversation-intelligence/': '/pl/analiza-rozmow/',
  '/pl/analiza-rozmow/': '/conversation-intelligence/',
  '/speech-analytics/': '/pl/analiza-mowy/',
  '/pl/analiza-mowy/': '/speech-analytics/',
  '/contact-center-analytics/': '/pl/analityka-call-center/',
  '/pl/analityka-call-center/': '/contact-center-analytics/',
  '/call-center-quality-assurance/': '/pl/kontrola-jakosci-obslugi/',
  '/pl/kontrola-jakosci-obslugi/': '/call-center-quality-assurance/',
  '/call-transcription/': '/pl/transkrypcja-rozmow/',
  '/pl/transkrypcja-rozmow/': '/call-transcription/',
  '/ai-chat/': '/pl/czat-ai/',
  '/pl/czat-ai/': '/ai-chat/',
  '/integrations/': '/pl/integracje/',
  '/pl/integracje/': '/integrations/',

  // Solutions
  '/solutions/bpo/': '/pl/rozwiazania/bpo/',
  '/pl/rozwiazania/bpo/': '/solutions/bpo/',
  '/solutions/compliance/': '/pl/rozwiazania/compliance/',
  '/pl/rozwiazania/compliance/': '/solutions/compliance/',
  '/solutions/retail/': '/pl/rozwiazania/e-commerce/',
  '/pl/rozwiazania/e-commerce/': '/solutions/retail/',
  '/solutions/sales/': '/pl/rozwiazania/sprzedaz/',
  '/pl/rozwiazania/sprzedaz/': '/solutions/sales/',

  // Pricing
  '/pricing/': '/pl/cennik/',
  '/pl/cennik/': '/pricing/',

  // Resources / Wiedza
  '/resources/call-center-kpis/': '/pl/wiedza/wskazniki-call-center/',
  '/pl/wiedza/wskazniki-call-center/': '/resources/call-center-kpis/',
  '/resources/call-center-dashboard/': '/pl/wiedza/dashboard-call-center/',
  '/pl/wiedza/dashboard-call-center/': '/resources/call-center-dashboard/',
  '/resources/what-is-conversation-intelligence/': '/pl/wiedza/czym-jest-analiza-rozmow/',
  '/pl/wiedza/czym-jest-analiza-rozmow/': '/resources/what-is-conversation-intelligence/',
  '/resources/ai-call-center-analytics/': '/pl/wiedza/ai-w-call-center/',
  '/pl/wiedza/ai-w-call-center/': '/resources/ai-call-center-analytics/',
  '/resources/glossary/': '/pl/wiedza/slownik/',
  '/pl/wiedza/slownik/': '/resources/glossary/',
  // Single-language resource pages omitted:
  // PL-only: /pl/wiedza/rodo-nagrywanie-rozmow/, /pl/wiedza/transkrypcja-audio-na-tekst/, /pl/wiedza/tajemniczy-klient/
  // EN-only: /resources/agent-performance-analytics/, /resources/best-speech-analytics-software/, /alternatives/*, /compare/*

  // Standalone EN pages (no PL counterpart yet)
  // /about/, /demo/, /security/ — omit; alternatesFor() falls back to home.

  // Blog
  '/resources/blog/': '/pl/wiedza/blog/',
  '/pl/wiedza/blog/': '/resources/blog/',
  '/resources/blog/how-to-measure-fcr/': '/pl/wiedza/blog/jak-mierzyc-fcr-w-call-center/',
  '/pl/wiedza/blog/jak-mierzyc-fcr-w-call-center/': '/resources/blog/how-to-measure-fcr/',
  '/resources/blog/auto-qa-vs-classical-qa/': '/pl/wiedza/blog/auto-qa-vs-klasyczne-qa/',
  '/pl/wiedza/blog/auto-qa-vs-klasyczne-qa/': '/resources/blog/auto-qa-vs-classical-qa/',
  // Note: /pl/wiedza/blog/jak-mierzyc-jakosc-obslugi-call-center/ has no EN twin yet.
};

// Home URL per language (used by the language switcher when the current
// page has no direct translation).
export const HOME_URL: Record<Lang, string> = {
  en: '/',
  pl: '/pl/',
};

/**
 * For a given current path, return the pair (en, pl) URLs to place in
 * hreflang tags. Falls back to home when a page has no alternate mapped.
 */
export function alternatesFor(currentPath: string, currentLang: Lang): { en: string; pl: string } {
  const path = normalize(currentPath);
  const mapped = URL_ALTERNATES[path];
  if (mapped) {
    return currentLang === 'en'
      ? { en: path, pl: mapped }
      : { pl: path, en: mapped };
  }
  // No translation yet: canonical points to itself, the other language
  // points to its home page (fallback).
  return currentLang === 'en'
    ? { en: path, pl: HOME_URL.pl }
    : { pl: path, en: HOME_URL.en };
}

/**
 * Target URL for a language-switcher button. Requires currentLang so it
 * knows which side of the mapping to return — asking for the same lang
 * you're already on should give you the current URL, not the alternate.
 * Kept for callers that don't have access to both sides at once.
 */
export function switchTo(currentPath: string, targetLang: Lang, currentLang: Lang): string {
  const alt = alternatesFor(currentPath, currentLang);
  return targetLang === 'pl' ? alt.pl : alt.en;
}

function normalize(p: string): string {
  if (!p) return '/';
  const withSlash = p.endsWith('/') ? p : p + '/';
  return withSlash;
}
