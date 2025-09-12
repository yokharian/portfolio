/*
Language utilities for filtering and fallbacks.
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

module.exports = {
  SUPPORTED,
  normalizeLang,
  filterByLanguage,
};
