/*
Frontmatter validation against schema with helpful errors and defaults.
*/

const { schema, defaults } = require('./frontmatterSchema');

function isISODateString(value) {
  if (typeof value !== 'string') return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(value + 'T00:00:00Z');
  return !isNaN(d.getTime());
}

/**
 * Validate frontmatter object
 * @param {Record<string, any>} data
 * @returns {import('./frontmatterSchema').Frontmatter}
 * @throws {Error} with detailed messages when invalid
 */
function validateFrontmatter(data) {
  const errors = [];
  const out = {};

  for (const [key, rule] of Object.entries(schema)) {
    const value = data[key];

    if ((value === undefined || value === null || value === '') && rule.required) {
      errors.push(`${key}: required field is missing`);
      continue;
    }

    if (value === undefined || value === null || value === '') {
      // apply default if any
      if ('default' in rule) {
        out[key] = rule.default;
      }
      continue;
    }

    switch (rule.type) {
      case 'string':
        if (typeof value !== 'string') {
          errors.push(`${key}: expected string, got ${typeof value}`);
        } else if (rule.format === 'iso-date' && !isISODateString(value)) {
          errors.push(`${key}: expected ISO date (YYYY-MM-DD)`);
        } else {
          out[key] = value;
        }
        break;
      case 'boolean':
        if (typeof value !== 'boolean') {
          errors.push(`${key}: expected boolean, got ${typeof value}`);
        } else {
          out[key] = value;
        }
        break;
      case 'string[]':
        if (!Array.isArray(value)) {
          errors.push(`${key}: expected array of strings, got ${typeof value}`);
        } else if (!value.every((v) => typeof v === 'string')) {
          errors.push(`${key}: all items must be strings`);
        } else {
          out[key] = value;
        }
        break;
      case 'enum':
        if (typeof value !== 'string') {
          errors.push(`${key}: expected string from enum, got ${typeof value}`);
        } else if (!rule.values.includes(value)) {
          errors.push(`${key}: invalid value '${value}', expected one of: ${rule.values.join(', ')}`);
        } else {
          out[key] = value;
        }
        break;
      default:
        errors.push(`${key}: unknown type '${rule.type}'`);
    }
  }

  // Extra fields: keep as-is but don't validate (could be used later)
  for (const k of Object.keys(data)) {
    if (!(k in schema)) {
      out[k] = data[k];
    }
  }

  if (errors.length) {
    const e = new Error(`Invalid frontmatter:\n- ${errors.join('\n- ')}`);
    e.errors = errors;
    throw e;
  }

  return out;
}

module.exports = {
  validateFrontmatter,
  isISODateString,
  defaults,
  schema
};
