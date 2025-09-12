#!/usr/bin/env node

const assert = require('assert');
const path = require('path');
const { discoverProjects, slugify } = require('../src/utils/content');

(function main() {
  const root = path.join(process.cwd(), 'content', 'projects');
  const projects = discoverProjects(root);

  assert.ok(Array.isArray(projects), 'discoverProjects should return an array');
  assert.ok(projects.length >= 1, 'Should discover at least one project');

  const first = projects[0];
  assert.ok(first.slug && typeof first.slug === 'string', 'Project should have a slug');
  assert.ok(first.filePath && typeof first.filePath === 'string', 'Project should include filePath');
  assert.ok(first.frontmatter && typeof first.frontmatter === 'object', 'Project should include validated frontmatter');
  assert.ok(typeof first.imageValid === 'boolean', 'Project should include imageValid flag');
  assert.ok(typeof first.heroAlt === 'string' && first.heroAlt.length > 0, 'Project should include heroAlt text');
  assert.ok(first.content !== undefined, 'Project should include raw content');
  assert.ok(first.html && typeof first.html === 'string', 'Project should include rendered HTML');

  // Check sample-en.md assumptions if present
  const sample = projects.find(p => /sample-en\.md$/.test(p.filePath));
  if (sample) {
    assert.equal(sample.slug, slugify('sample-en'), 'Slug should be derived from filename when not provided');
    assert.equal(sample.frontmatter.language, 'en', 'Language should be en');
    assert.equal(sample.frontmatter.title, 'Sample Project', 'Title should match sample');
    assert.equal(sample.heroAlt, 'Sample Project', 'heroAlt should default to title');
  }

  // Output a brief success line
  // eslint-disable-next-line no-console
  console.log(`Content discovery tests passed. Discovered ${projects.length} project(s). Example slug: ${first.slug}`);
})();
