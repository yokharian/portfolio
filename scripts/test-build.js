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

  console.log('Build snapshot tests passed.');
})();
