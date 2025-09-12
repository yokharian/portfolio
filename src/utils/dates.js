/*
Date utilities for formatting and relative time with basic i18n (en, es)
*/

const { normalizeLang } = require('./language');

function toDate(value) {
  const d = new Date(value);
  return isNaN(d) ? null : d;
}

function formatMonthYear(dateStr, lang = 'en') {
  const d = toDate(dateStr);
  if (!d) return '';
  const l = normalizeLang(lang);
  return new Intl.DateTimeFormat(l, { month: 'long', year: 'numeric' }).format(d);
}

function presentLabel(lang = 'en') {
  return normalizeLang(lang) === 'es' ? 'Actual' : 'Present';
}

function formatRange(startDate, endDate, lang = 'en') {
  const l = normalizeLang(lang);
  const start = formatMonthYear(startDate, l);
  const end = endDate ? formatMonthYear(endDate, l) : presentLabel(l);
  if (!start) return end || '';
  return `${start} — ${end}`;
}

function relativeFrom(dateStr, lang = 'en') {
  const l = normalizeLang(lang);
  const d = toDate(dateStr);
  if (!d) return '';
  const now = new Date();
  const diffMs = now - d;
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  // Choose largest sensible unit
  const rtf = new Intl.RelativeTimeFormat(l, { numeric: 'auto' });
  if (Math.abs(diffDays) >= 365) {
    const years = Math.round(diffDays / 365);
    return rtf.format(-years, 'year');
  }
  if (Math.abs(diffDays) >= 30) {
    const months = Math.round(diffDays / 30);
    return rtf.format(-months, 'month');
  }
  return rtf.format(-diffDays, 'day');
}

module.exports = {
  formatMonthYear,
  presentLabel,
  formatRange,
  relativeFrom,
};
