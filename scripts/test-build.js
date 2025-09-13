#!/usr/bin/env node

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

function runBuild() {
  cp.execSync('npm run -s build', { stdio: 'inherit' });
}

function readOut(rel) {
  const base = path.join(process.cwd(), '_site');
  const p = path.join(base, rel);
  if (fs.existsSync(p)) return fs.readFileSync(p, 'utf8');
  // Fallback: some Eleventy configs include input path in output (e.g., src/pages/index.html)
  const alt = path.join(base, 'src', 'pages', rel);
  if (fs.existsSync(alt)) return fs.readFileSync(alt, 'utf8');
  throw new Error(`Output file not found in expected locations: ${p} or ${alt}`);
}

(function main() {
  runBuild();

  // Project page snapshot
  const proj = readOut('projects/sample-en/index.html');
  assert.ok(/<h1[^>]*>\s*Sample Project\s*<\/h1>/.test(proj), 'Project page should render title');
  assert.ok(/Technologies Used/.test(proj), 'Project page should contain Technologies Used section');
  assert.ok(/<a[^>]*href=\"https:\/\/example.com\"[^>]*target=\"_blank\"[^>]*rel=\"noopener noreferrer\"/.test(proj), 'External link attrs should be present on project page');

  // Homepage hero image optimization checks
  const home = readOut('index.html');
  assert.ok(/<img[^>]*data-anim=\"image\"/i.test(home), 'Hero image should include data-anim="image"');
  assert.ok(/<img[^>]*fetchpriority=\"high\"/i.test(home), 'Hero image should set fetchpriority=high');
  assert.ok(/<img[^>]*decoding=\"async\"/i.test(home), 'Hero image should set decoding=async');
  assert.ok(/<img[^>]*width=\"640\"/i.test(home), 'Hero image should declare width');
  assert.ok(/<img[^>]*height=\"640\"/i.test(home), 'Hero image should declare height');
  assert.ok(/<link[^>]+rel=\"preload\"[^>]+as=\"image\"[^>]+href=\"\/assets\/images\/profile\.svg\"/i.test(home), 'Homepage should preload the profile image');

  // Featured projects section
  assert.ok(/Featured Work/.test(home), 'Homepage should include Featured Work heading');
  assert.ok(/<a[^>]+href=\"\/projects\/sample-en\/?\/[\s\S]*aria-label=\"View project: Sample Project\"/i.test(home) || /aria-label=\"View project: Sample Project\"[\s\S]*<a[^>]+href=\"\/projects\/sample-en\//i.test(home), 'Featured card link and accessible aria-label should be present');
  assert.ok(/<img[^>]*sizes=\"/i.test(home), 'Project card image should include a responsive sizes attribute');
  assert.ok(/<img[^>]*loading=\"lazy\"/i.test(home), 'Project card image should be lazy-loaded');
  assert.ok(/<img[^>]*decoding=\"async\"/i.test(home), 'Project card image should set decoding=async');

  // At least one featured project card should render
  const featuredCount = (home.match(/aria-label=\"View project:/g) || []).length;
  assert.ok(featuredCount >= 1, 'Homepage should render at least one featured project card');

  // Responsive image markup should include srcset or picture element
  assert.ok(/<picture[\s>]/i.test(home) || /<img[^>]*srcset=/i.test(home), 'Featured project image should use responsive markup (picture/srcset)');

  // Accessibility semantics for list/grid
  assert.ok(/role=\"list\"/i.test(home), 'Featured grid should have role="list"');
  assert.ok(/role=\"listitem\"/i.test(home), 'Featured cards should have role="listitem"');

  console.log('Build snapshot tests passed.');
})();
