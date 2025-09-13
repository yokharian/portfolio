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
  // Heading rendered and has an id + anchor link
  assert.ok(/<h1[^>]*id="hello-markdown"[^>]*>\s*Hello Markdown/.test(html), 'h1 should have an anchor id');
  assert.ok(html.includes('<li>Item 1</li>'), 'html should render list items');
  // External link attributes added
  assert.ok(/<a[^>]*href="https:\/\/example.com"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/.test(html), 'external links should open in new tab with rel attrs');
  // Code block highlighted
  assert.ok(/<code class="hljs\s+language-js">/.test(html), 'code block should be highlighted with language class');
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

function testTablesAndImages() {
  const mdTable = '| a | b |\n| --- | --- |\n| 1 | 2 |';
  const { html: tableHtml } = parseMarkdown(mdTable);
  assert.ok(/<table>/.test(tableHtml), 'tables should render to <table>');

  const { html: imgHtml } = parseMarkdown('![alt](https://example.com/a.png)');
  assert.ok(/<img[^>]*loading="lazy"/.test(imgHtml), 'images should be lazy-loaded');
  assert.ok(/<img[^>]*decoding="async"/.test(imgHtml), 'images should set decoding=async');
  assert.ok(/<img[^>]*referrerpolicy="no-referrer"/.test(imgHtml), 'external images should set referrerpolicy');
}

function main() {
  testValid();
  testInvalidFrontmatter();
  testTablesAndImages();
  console.log('All markdown tests passed.');
}

main();
