#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const { parseMarkdown } = require('../src/utils/markdown');

function readFixture(relPath) {
  const p = path.join(__dirname, '..', relPath);
  return fs.readFileSync(p, 'utf8');
}

function testValid() {
  const src = readFixture('content/projects/sample-en.md');
  const { data, content, html } = parseMarkdown(src);
  assert.strictEqual(data.title, 'Sample Project', 'frontmatter.title should be parsed');
  assert.ok(content.includes('# Hello Markdown'), 'content should contain markdown body');
  assert.ok(/<h1[^>]*>Hello Markdown<\/h1>/.test(html), 'html should render h1');
  assert.ok(html.includes('<li>Item 1</li>'), 'html should render list items');
  // Ensure raw HTML is disabled by default
  const evil = '---\ntitle: x\n---\n<script>alert(1)</script>';
  const rendered = parseMarkdown(evil);
  assert.ok(!rendered.html.includes('<script>'), 'raw HTML must be disabled by default');
}

function testInvalidFrontmatter() {
  const bad = readFixture('content/projects/invalid-frontmatter.md');
  let threw = false;
  try {
    parseMarkdown(bad);
  } catch (e) {
    threw = true;
    assert.ok(/Failed to parse markdown/.test(e.message), 'should wrap and rethrow with context');
  }
  assert.ok(threw, 'parseMarkdown should throw on invalid frontmatter');
}

function main() {
  testValid();
  testInvalidFrontmatter();
  console.log('All markdown tests passed.');
}

main();
