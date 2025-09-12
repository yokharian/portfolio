/*
Content discovery utility for Task 3.4
- Recursively scans content/projects for Markdown files
- Parses markdown + frontmatter, validates against schema
- Generates slug (from frontmatter.slug or filename)
- Returns a collection of project objects
- Logs errors but continues processing other files
*/

const fs = require('fs');
const path = require('path');
const { parseMarkdown } = require('./markdown');
const { validateFrontmatter } = require('./validateFrontmatter');
const { logger } = require('./logger');

/**
 * Slugify a string to URL friendly form
 * @param {string} s
 * @returns {string}
 */
function slugify(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isMarkdownFile(file) {
  return file.toLowerCase().endsWith('.md') || file.toLowerCase().endsWith('.mdx');
}

function collectMarkdownFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMarkdownFiles(full));
    } else if (entry.isFile() && isMarkdownFile(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Discover and process project markdown files.
 * @param {string} [rootDir] Absolute or relative path to the projects directory.
 * @param {{ allowHtml?: boolean }} [options]
 * @returns {Array<{ slug: string, filePath: string, frontmatter: object, content: string, html: string, language?: string }>}
 */
function discoverProjects(rootDir = path.join(process.cwd(), 'content', 'projects'), options = {}) {
  const base = path.isAbsolute(rootDir) ? rootDir : path.join(process.cwd(), rootDir);

  if (!fs.existsSync(base) || !fs.statSync(base).isDirectory()) {
    logger.warn(`discoverProjects: directory not found or not a directory: ${base}`);
    return [];
  }

  const files = collectMarkdownFiles(base);
  const projects = [];

  for (const file of files) {
    try {
      const raw = fs.readFileSync(file, 'utf8');
      const { data, content, html } = parseMarkdown(raw, options);
      const fm = validateFrontmatter(data);

      // Determine slug: prefer explicit slug, else from filename
      const baseName = path.basename(file).replace(/\.(md|mdx)$/i, '');
      const fmSlug = fm.slug && typeof fm.slug === 'string' ? fm.slug : '';
      const slug = fmSlug ? slugify(fmSlug) : slugify(baseName);

      projects.push({
        slug,
        filePath: file,
        frontmatter: fm,
        content,
        html,
        language: fm.language
      });
    } catch (err) {
      logger.error(`discoverProjects: failed to process ${file}: ${err.message}`);
      // continue to next file
    }
  }

  return projects;
}

module.exports = {
  discoverProjects,
  slugify
};
