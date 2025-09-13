/*
Lightweight i18n helper for Nunjucks filter integration.
*/

const path = require('path');
const fs = require('fs');
const { normalizeLang } = require('./language');

let cache = null;

function loadTranslations() {
  if (cache) return cache;
  const p = path.join(process.cwd(), 'src', 'data', 'i18n.json');
  const raw = fs.readFileSync(p, 'utf8');
  cache = JSON.parse(raw);
  return cache;
}

function get(obj, key, fallback) {
  const parts = String(key).split('.');
  let cur = obj;
  for (const k of parts) {
    if (!cur || typeof cur !== 'object' || !(k in cur)) return fallback;
    cur = cur[k];
  }
  return cur;
}

/**
 * Translate a key for a given language.
 * @param {string} key dot.notation key (e.g., "hero.title")
 * @param {string} lang language code (en|es)
 * @param {Record<string,string|number>} [vars] optional interpolation vars
 */
function t(key, lang = 'en', vars = {}) {
  const l = normalizeLang(lang);
  const dict = loadTranslations();
  const template = get(dict[l] || {}, key, '');
  if (typeof template !== 'string') return '';
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, name) => String(vars[name] ?? ''));
}

module.exports = { t };
