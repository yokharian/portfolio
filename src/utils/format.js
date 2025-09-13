/*
Locale-aware number and currency formatting utilities.
*/
const { normalizeLang } = require('./language');

function formatNumber(value, lang = 'en', options = {}) {
  const l = normalizeLang(lang);
  try {
    const n = Number(value);
    if (!Number.isFinite(n)) return '';
    return new Intl.NumberFormat(l, options).format(n);
  } catch (_) {
    return String(value);
  }
}

function formatCurrency(value, currency = 'USD', lang = 'en') {
  return formatNumber(value, lang, { style: 'currency', currency });
}

module.exports = {
  formatNumber,
  formatCurrency,
};
