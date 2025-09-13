import { formatMonthYear, presentLabel, formatRange, relativeFrom } from '../dates';

describe('Date utilities', () => {
  describe('formatMonthYear', () => {
    test('formats English dates correctly', () => {
      const en = formatMonthYear('2022-01-15', 'en');
      expect(en).toMatch(/January\s+2022/);
    });

    test('formats Spanish dates correctly', () => {
      const es = formatMonthYear('2022-01-15', 'es');
      expect(es).toMatch(/enero|Enero/);
    });

    test('handles invalid dates gracefully', () => {
      const invalid = formatMonthYear('invalid-date', 'en');
      expect(typeof invalid).toBe('string');
    });
  });

  describe('presentLabel', () => {
    test('returns correct English present label', () => {
      expect(presentLabel('en')).toBe('Present');
    });

    test('returns correct Spanish present label', () => {
      expect(presentLabel('es')).toBe('Actual');
    });
  });

  describe('formatRange', () => {
    test('formats range with present correctly in English', () => {
      const range = formatRange('2022-01-15', null, 'en');
      expect(range).toMatch(/January\s+2022\s+—\s+Present/);
    });

    test('formats range with end date correctly in Spanish', () => {
      const range = formatRange('2022-01-15', '2022-06-30', 'es');
      expect(range).toMatch(/2022/);
      expect(range).toMatch(/enero|Enero/);
    });

    test('handles invalid dates gracefully', () => {
      const range = formatRange('invalid', 'invalid', 'en');
      expect(typeof range).toBe('string');
    });
  });

  describe('relativeFrom', () => {
    test('returns relative time string', () => {
      const relative = relativeFrom('2020-01-01', 'en');
      expect(typeof relative).toBe('string');
      expect(relative.length).toBeGreaterThan(0);
    });

    test('handles invalid dates gracefully', () => {
      const relative = relativeFrom('invalid-date', 'en');
      expect(typeof relative).toBe('string');
    });
  });
});
