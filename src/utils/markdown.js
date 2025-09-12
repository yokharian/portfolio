/*
Utility: Markdown parsing with frontmatter extraction
- Uses gray-matter for frontmatter
- Uses markdown-it for Markdown → HTML
- Security: HTML is disabled by default (safe mode), can be enabled via options.allowHtml
- Enhanced in Task 3.5: syntax highlighting, heading anchors, external link attrs, tables, lazy images
*/

const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');
const anchor = require('markdown-it-anchor');
const linkAttrs = require('markdown-it-link-attributes');
const mdTable = require('markdown-it-multimd-table');

function slugify(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Create a configured markdown-it instance
 * @param {Object} options
 * @param {boolean} [options.allowHtml=false] - allow raw HTML in markdown
 * @returns {import('markdown-it')} md instance
 */
function createMd(options = {}) {
  const { allowHtml = false } = options;
  const md = new MarkdownIt({
    html: !!allowHtml, // disable raw HTML by default for safety
    linkify: true,
    breaks: false,
    typographer: true,
    highlight: (str, lang) => {
      try {
        if (lang && hljs.getLanguage(lang)) {
          const { value } = hljs.highlight(str, { language: lang, ignoreIllegals: true });
          return `<pre><code class="hljs language-${lang}">${value}</code></pre>`;
        }
        const { value } = hljs.highlightAuto(str);
        return `<pre><code class="hljs">${value}</code></pre>`;
      } catch (e) {
        return ''; // use external escaping
      }
    }
  });

  // Headings: anchor IDs and aria-hidden permalink
  md.use(anchor, {
    slugify,
    // add a small '#' anchor after heading for accessibility
    permalink: anchor.permalink.ariaHidden({
      placement: 'after',
      class: 'header-anchor',
      symbol: '#'
    })
  });

  // Tables (GFM-like)
  md.use(mdTable, {
    multiline: true,
    rowspan: true,
    headerless: true
  });

  // External links open in new tab with safe rel
  md.use(linkAttrs, {
    pattern: /^(?:https?:)?\/\//,
    attrs: {
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  });

  // Add responsive/lazy attributes to images
  const defaultImageRenderer = md.renderer.rules.image || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    token.attrSet('loading', 'lazy');
    token.attrSet('decoding', 'async');
    const src = token.attrGet('src') || '';
    if (/^https?:\/\//.test(src)) {
      token.attrSet('referrerpolicy', 'no-referrer');
    }
    return defaultImageRenderer(tokens, idx, options, env, self);
  };

  return md;
}

/**
 * Parse Markdown text and extract frontmatter
 * @param {string} source Markdown file content
 * @param {Object} options
 * @param {boolean} [options.allowHtml=false]
 * @returns {{ data: object, content: string, html: string }}
 */
function parseMarkdown(source, options = {}) {
  if (typeof source !== 'string') {
    throw new TypeError('parseMarkdown: source must be a string');
  }
  try {
    const parsed = matter(source);
    const md = createMd(options);
    const html = md.render(parsed.content || '');
    return {
      data: parsed.data || {},
      content: parsed.content || '',
      html
    };
  } catch (err) {
    const error = new Error(`Failed to parse markdown: ${err.message}`);
    error.cause = err;
    throw error;
  }
}

module.exports = {
  createMd,
  parseMarkdown
};
