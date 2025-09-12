/*
Frontmatter Schema Definition
- Provides a declarative schema and JSDoc @typedef for frontmatter
- Enforces required/optional fields and basic type expectations
- Language is an enum; dates must be ISO-8601 strings
- Defaults are provided for some optional fields
*/

/**
 * @typedef {Object} Frontmatter
 * @property {string} title - Project title (required)
 * @property {string} description - Project short description (required)
 * @property {string} [employer] - Employer or client name (optional)
 * @property {string} startDate - ISO date string YYYY-MM-DD (required)
 * @property {string} [endDate] - ISO date string YYYY-MM-DD (optional)
 * @property {string[]} tags - Technologies used (required)
 * @property {string} heroImage - Path to hero image (required)
 * @property {('en'|'es')} language - Content language (required)
 * @property {string} [slug] - Custom slug override (optional)
 * @property {boolean} [featured=false] - Featured flag (optional)
 */

const LanguageEnum = ['en', 'es'];

const defaults = {
  featured: false
};

const schema = {
  title: { type: 'string', required: true },
  description: { type: 'string', required: true },
  employer: { type: 'string', required: false },
  startDate: { type: 'string', required: true, format: 'iso-date' },
  endDate: { type: 'string', required: false, format: 'iso-date' },
  tags: { type: 'string[]', required: true },
  heroImage: { type: 'string', required: true },
  language: { type: 'enum', required: true, values: LanguageEnum },
  slug: { type: 'string', required: false },
  featured: { type: 'boolean', required: false, default: defaults.featured }
};

module.exports = {
  LanguageEnum,
  defaults,
  schema
};
