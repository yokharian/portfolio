#!/usr/bin/env node

const assert = require('assert');
const { formatMonthYear, presentLabel, formatRange, relativeFrom } = require('../src/utils/dates');

function testFormatMonthYear() {
  const en = formatMonthYear('2022-01-15', 'en');
  const es = formatMonthYear('2022-01-15', 'es');
  assert.ok(/January\s+2022/.test(en), `Expected English month+year, got: ${en}`);
  assert.ok(/enero|Enero/.test(es), `Expected Spanish month name, got: ${es}`);
}

function testPresentAndRange() {
  assert.strictEqual(presentLabel('en'), 'Present');
  assert.strictEqual(presentLabel('es'), 'Actual');
  const r1 = formatRange('2022-01-15', null, 'en');
  assert.ok(/January\s+2022\s+—\s+Present/.test(r1), `Range with present failed: ${r1}`);
  const r2 = formatRange('2022-01-15', '2022-06-30', 'es');
  assert.ok(/2022/.test(r2) && /enero|Enero/.test(r2), `Spanish range should contain localized month: ${r2}`);
}

function testRelative() {
  const r = relativeFrom('2020-01-01', 'en');
  assert.ok(typeof r === 'string' && r.length > 0, 'relativeFrom should return a non-empty string');
}

(function main() {
  testFormatMonthYear();
  testPresentAndRange();
  testRelative();
  console.log('All date utility tests passed.');
})();
