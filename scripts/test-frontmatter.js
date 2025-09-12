#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const { parseMarkdown } = require('../src/utils/markdown');
const { validateFrontmatter, isISODateString } = require('../src/utils/validateFrontmatter');

function readFixture(relPath) {
  const p = path.join(__dirname, '..', relPath);
  return fs.readFileSync(p, 'utf8');
}

function testISODate() {
  assert.ok(isISODateString('2024-12-01'));
  assert.ok(!isISODateString('2024/12/01'));
  assert.ok(!isISODateString('2024-13-01'));
}

function testValidationSuccess() {
  const src = readFixture('content/projects/sample-en.md');
  const parsed = parseMarkdown(src);
  const fm = validateFrontmatter(parsed.data);
  assert.strictEqual(fm.title, 'Sample Project');
  assert.strictEqual(fm.language, 'en');
  assert.strictEqual(typeof fm.featured, 'boolean');
}

function testValidationFailures() {
  const bad = {
    description: 'missing title',
    startDate: '2022-01-15',
    tags: ['JS'],
    heroImage: '/x.jpg',
    language: 'en'
  };
  let threw = false;
  try {
    validateFrontmatter(bad);
  } catch (e) {
    threw = true;
    assert.ok(e.message.includes('title'), 'error should mention missing title');
  }
  assert.ok(threw, 'should throw when required fields missing');

  const badDate = {
    title: 'x', description: 'y', startDate: '15-01-2022', tags: [], heroImage: 'x', language: 'en'
  };
  assert.throws(() => validateFrontmatter(badDate), /startDate: expected ISO date/);

  const badLang = {
    title: 'x', description: 'y', startDate: '2022-01-15', tags: [], heroImage: 'x', language: 'fr'
  };
  assert.throws(() => validateFrontmatter(badLang), /language: invalid value/);
}

function main() {
  testISODate();
  testValidationSuccess();
  testValidationFailures();
  console.log('All frontmatter validation tests passed.');
}

main();
