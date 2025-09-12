/*
Utility: Markdown parsing with frontmatter extraction
- Uses gray-matter for frontmatter
- Uses markdown-it for Markdown → HTML
- Security: HTML is disabled by default (safe mode), can be enabled via options.allowHtml
- Linkification enabled; images/links left to later enhancements (Task 3.5)
*/

const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');

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
    typographer: true
  });
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
