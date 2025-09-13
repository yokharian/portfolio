/*
Language utilities for filtering, fallbacks, and client/server language state.
*/

const SUPPORTED = ['en', 'es'];

function normalizeLang(lang) {
  return SUPPORTED.includes(lang) ? lang : 'en';
}

/**
 * Filter Eleventy collection items by language
 * @param {Array} items
 * @param {string} lang
 */
function filterByLanguage(items, lang) {
  const l = normalizeLang(lang);
  return (items || []).filter((it) => (it.data && it.data.language) === l);
}

// -------- Language state helpers (SSR-safe) --------
const STORAGE_KEY = 'site.lang';

function getSearchLang(search) {
  if (!search) return null;
  try {
    const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
    const v = params.get('lang');
    return v ? normalizeLang(v) : null;
  } catch (_) {
    return null;
  }
}

function getPathLang(pathname) {
  if (!pathname || typeof pathname !== 'string') return null;
  const m = pathname.match(/^\/(en|es)(\/|$)/i);
  return m ? normalizeLang(m[1].toLowerCase()) : null;
}

function detectBrowserLanguage(nav) {
  const langs = (nav && (nav.languages || [nav.language])) || [];
  for (const code of langs) {
    if (!code) continue;
    const base = String(code).slice(0, 2).toLowerCase();
    if (SUPPORTED.includes(base)) return base;
  }
  return 'en';
}

function getStoredLanguage(storage) {
  try {
    const v = storage && storage.getItem ? storage.getItem(STORAGE_KEY) : null;
    return v ? normalizeLang(v) : null;
  } catch (_) {
    return null;
  }
}

function setStoredLanguage(lang, storage) {
  try {
    const l = normalizeLang(lang);
    if (storage && storage.setItem) storage.setItem(STORAGE_KEY, l);
    return l;
  } catch (_) {
    return normalizeLang(lang);
  }
}

/**
 * Resolve initial language using URL > storage > browser > default
 */
function resolveInitialLanguage(ctx = {}) {
  const { location, navigator, storage, defaultLanguage = 'en' } = ctx;
  const fromSearch = getSearchLang(location && location.search);
  if (fromSearch) return fromSearch;
  const fromPath = getPathLang(location && location.pathname);
  if (fromPath) return fromPath;
  const fromStore = getStoredLanguage(storage);
  if (fromStore) return fromStore;
  const fromBrowser = detectBrowserLanguage(navigator);
  return normalizeLang(defaultLanguage || fromBrowser);
}

module.exports = {
  SUPPORTED,
  normalizeLang,
  filterByLanguage,
  STORAGE_KEY,
  getSearchLang,
  getPathLang,
  detectBrowserLanguage,
  getStoredLanguage,
  setStoredLanguage,
  resolveInitialLanguage,
};
