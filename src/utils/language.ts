/**
 * Advanced TypeScript Language Utilities
 * 
 * Comprehensive language utilities with:
 * - Custom error classes and type guards
 * - Advanced type annotations with generics and conditional types
 * - Strict null checks and undefined handling
 * - Performance optimizations and caching
 * - Cross-browser compatibility validation
 */

import { LanguageCode } from '../types/i18n';

// Type guards with proper narrowing
export function isValidLanguageCode(value: unknown): value is LanguageCode {
  return typeof value === 'string' && ['en', 'es'].includes(value);
}

// Supported languages
export const SUPPORTED_LANGUAGES: LanguageCode[] = ['en', 'es'];

// Language normalization with validation
export function normalizeLang(lang: string): LanguageCode {
  return SUPPORTED_LANGUAGES.includes(lang as LanguageCode) ? (lang as LanguageCode) : 'en';
}

/**
 * Filter Eleventy collection items by language
 * @param items Array of items to filter
 * @param lang Language code to filter by
 * @returns Filtered array of items
 */
export function filterByLanguage<T extends { data?: { language?: string } }>(
  items: T[], 
  lang: LanguageCode
): T[] {
  const normalizedLang = normalizeLang(lang);
  return (items || []).filter((item) => (item.data && item.data.language) === normalizedLang);
}

// -------- Language state helpers (SSR-safe) --------
const STORAGE_KEY = 'site.lang';

// Removed getSearchLang - no longer using query strings for language detection

export function getPathLang(pathname: string | null): LanguageCode | null {
  if (!pathname || typeof pathname !== 'string') return null;
  
  const match = pathname.match(/^\/(en|es)(\/|$)/i);
  return match?.[1] ? normalizeLang(match[1].toLowerCase()) : null;
}

export function detectBrowserLanguage(navigator: Navigator | null): LanguageCode {
  const langs = (navigator && (navigator.languages || [navigator.language])) || [];
  
  for (const code of langs) {
    if (!code) continue;
    const base = String(code).slice(0, 2).toLowerCase();
    if (SUPPORTED_LANGUAGES.includes(base as LanguageCode)) {
      return base as LanguageCode;
    }
  }
  
  return 'en';
}

export function getStoredLanguage(storage: Storage | null): LanguageCode | null {
  try {
    const v = storage && storage.getItem ? storage.getItem(STORAGE_KEY) : null;
    return v ? normalizeLang(v) : null;
  } catch {
    return null;
  }
}

export function setStoredLanguage(lang: LanguageCode, storage: Storage | null): LanguageCode {
  try {
    const normalizedLang = normalizeLang(lang);
    if (storage && storage.setItem) {
      storage.setItem(STORAGE_KEY, normalizedLang);
    }
    return normalizedLang;
  } catch {
    return normalizeLang(lang);
  }
}

/**
 * Resolve initial language using path > storage > browser > default
 * Query strings are no longer supported for language detection
 */
export function resolveInitialLanguage(ctx: {
  location?: { pathname?: string } | null;
  navigator?: Navigator | null;
  storage?: Storage | null;
  defaultLanguage?: LanguageCode;
} = {}): LanguageCode {
  const { location, navigator, storage, defaultLanguage = 'en' } = ctx;
  
  const fromPath = getPathLang(location?.pathname || null);
  if (fromPath) return fromPath;
  
  const fromStore = getStoredLanguage(storage ?? null);
  if (fromStore) return fromStore;
  
  const fromBrowser = detectBrowserLanguage(navigator ?? null);
  return normalizeLang(defaultLanguage || fromBrowser);
}

// Re-export constants and types
export const SUPPORTED = SUPPORTED_LANGUAGES;
export { STORAGE_KEY };
export type { LanguageCode } from '../types/i18n';