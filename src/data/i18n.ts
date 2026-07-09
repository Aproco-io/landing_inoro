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
  '/conversation-intelligence/': '/analiza-rozmow/',
  '/analiza-rozmow/': '/conversation-intelligence/',
  '/speech-analytics/': '/analiza-mowy/',
  '/analiza-mowy/': '/speech-analytics/',
  '/contact-center-analytics/': '/analityka-call-center/',
  '/analityka-call-center/': '/contact-center-analytics/',
  '/call-center-quality-assurance/': '/kontrola-jakosci-obslugi/',
  '/kontrola-jakosci-obslugi/': '/call-center-quality-assurance/',
  '/call-transcription/': '/transkrypcja-rozmow/',
  '/transkrypcja-rozmow/': '/call-transcription/',
  '/ai-chat/': '/czat-ai/',
  '/czat-ai/': '/ai-chat/',
  '/integrations/': '/integracje/',
  '/integracje/': '/integrations/',

  // Solutions
  '/solutions/bpo/': '/rozwiazania/bpo/',
  '/rozwiazania/bpo/': '/solutions/bpo/',
  '/solutions/compliance/': '/rozwiazania/compliance/',
  '/rozwiazania/compliance/': '/solutions/compliance/',
  '/solutions/retail/': '/rozwiazania/e-commerce/',
  '/rozwiazania/e-commerce/': '/solutions/retail/',
  '/solutions/sales/': '/rozwiazania/sprzedaz/',
  '/rozwiazania/sprzedaz/': '/solutions/sales/',

  // Pricing
  '/pricing/': '/cennik/',
  '/cennik/': '/pricing/',

  // Resources / Wiedza
  '/resources/call-center-kpis/': '/wiedza/wskazniki-call-center/',
  '/wiedza/wskazniki-call-center/': '/resources/call-center-kpis/',
  '/resources/call-center-dashboard/': '/wiedza/dashboard-call-center/',
  '/wiedza/dashboard-call-center/': '/resources/call-center-dashboard/',
  '/resources/what-is-conversation-intelligence/': '/wiedza/czym-jest-analiza-rozmow/',
  '/wiedza/czym-jest-analiza-rozmow/': '/resources/what-is-conversation-intelligence/',
  '/resources/ai-call-center-analytics/': '/wiedza/ai-w-call-center/',
  '/wiedza/ai-w-call-center/': '/resources/ai-call-center-analytics/',
  '/resources/glossary/': '/wiedza/slownik/',
  '/wiedza/slownik/': '/resources/glossary/',
  // Compare pages don't have a PL counterpart yet — omit.
  // Single-language resource pages omitted:
  // PL-only: /wiedza/rodo-nagrywanie-rozmow/, /wiedza/transkrypcja-audio-na-tekst/, /wiedza/tajemniczy-klient/
  // EN-only: /resources/agent-performance-analytics/, /resources/best-speech-analytics-software/, /alternatives/*, /compare/*

  // Standalone EN pages (no PL counterpart yet)
  // /about/, /demo/, /security/ — omit; alternatesFor() falls back to home.

  // Blog
  '/resources/blog/': '/wiedza/blog/',
  '/wiedza/blog/': '/resources/blog/',
  '/resources/blog/how-to-measure-fcr/': '/wiedza/blog/jak-mierzyc-fcr-w-call-center/',
  '/wiedza/blog/jak-mierzyc-fcr-w-call-center/': '/resources/blog/how-to-measure-fcr/',
  '/resources/blog/auto-qa-vs-classical-qa/': '/wiedza/blog/auto-qa-vs-klasyczne-qa/',
  '/wiedza/blog/auto-qa-vs-klasyczne-qa/': '/resources/blog/auto-qa-vs-classical-qa/',
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
 * Target URL for clicking the "other language" button in the nav.
 * If the current page has a direct translation, go there. Otherwise
 * go to the home page of the target language.
 */
export function switchTo(currentPath: string, targetLang: Lang): string {
  const path = normalize(currentPath);
  const mapped = URL_ALTERNATES[path];
  if (mapped) {
    // mapped is always the other language of `path`. If target matches
    // the other language, use it; otherwise stay on the current URL.
    return mapped;
  }
  return HOME_URL[targetLang];
}

function normalize(p: string): string {
  if (!p) return '/';
  const withSlash = p.endsWith('/') ? p : p + '/';
  return withSlash;
}
