#!/usr/bin/env node

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

function runBuild() {
  cp.execSync('npm run -s build', { stdio: 'inherit' });
}

function readOut(rel) {
  const p = path.join(process.cwd(), '_site', rel);
  return fs.readFileSync(p, 'utf8');
}

(function main() {
  runBuild();
  const html = readOut('projects/sample-en/index.html');
  assert.ok(/<h1[^>]*>\s*Sample Project\s*<\/h1>/.test(html), 'Page should render title');
  assert.ok(/Technologies Used/.test(html), 'Page should contain Technologies Used section');
  assert.ok(/<a[^>]*href="https:\/\/example.com"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/.test(html), 'External link attrs should be present');
  console.log('Build snapshot test passed.');
})();
