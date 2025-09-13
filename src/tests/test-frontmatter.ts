#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import * as assert from 'assert';
import { parseMarkdown } from '../utils/markdown.js';
import { validateFrontmatter, isISODateString } from '../utils/validateFrontmatter.js';

function readFixture(relPath: string): string {
  const p = path.join(__dirname, '..', relPath);
  return fs.readFileSync(p, 'utf8');
}

function testISODate(): void {
  assert.ok(isISODateString('2024-12-01'));
  assert.ok(!isISODateString('2024/12/01'));
  assert.ok(!isISODateString('2024-13-01'));
}

function testValidationSuccess(): void {
  const src = readFixture('content/projects/sample-en.md');
  const parsed = parseMarkdown(src);
  const fm = validateFrontmatter(parsed.data);
  assert.strictEqual(fm.title, 'Sample Project');
  assert.strictEqual(fm.language, 'en');
  assert.strictEqual(typeof fm.featured, 'boolean');
}

function testValidationFailures(): void {
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
  } catch (e: any) {
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

function main(): void {
  testISODate();
  testValidationSuccess();
  testValidationFailures();
  console.log('All frontmatter validation tests passed.');
}

main();
