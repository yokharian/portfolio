import { formatReadableDate, formatDateRange, getRelativeTime } from '../date';

describe('Format utilities', () => {
  describe('formatReadableDate', () => {
    test('formats English dates correctly', () => {
      const date = new Date('2022-01-15T12:00:00Z');
      const formatted = formatReadableDate(date, 'en');
      expect(formatted).toMatch(/January\s+15,\s+2022/);
    });

    test('formats Spanish dates correctly', () => {
      const date = new Date('2022-01-15T12:00:00Z');
      const formatted = formatReadableDate(date, 'es');
      expect(formatted).toMatch(/15\s+de\s+enero\s+de\s+2022/);
    });

    test('handles invalid dates gracefully', () => {
      const invalid = new Date('invalid');
      const formatted = formatReadableDate(invalid, 'en');
      expect(typeof formatted).toBe('string');
    });
  });

  describe('formatDateRange', () => {
    test('formats range with present correctly in English', () => {
      const start = new Date('2022-01-15T12:00:00Z');
      const range = formatDateRange(start, null, 'en');
      expect(range).toMatch(/January\s+15,\s+2022\s+—\s+Present/);
    });

    test('formats range with end date correctly in Spanish', () => {
      const start = new Date('2022-01-15T12:00:00Z');
      const end = new Date('2022-06-30T12:00:00Z');
      const range = formatDateRange(start, end, 'es');
      expect(range).toMatch(/15\s+de\s+enero\s+de\s+2022\s+—\s+30\s+de\s+junio\s+de\s+2022/);
    });

    test('handles invalid dates gracefully', () => {
      const invalid = new Date('invalid');
      const range = formatDateRange(invalid, invalid, 'en');
      expect(typeof range).toBe('string');
    });
  });

  describe('getRelativeTime', () => {
    test('returns relative time string', () => {
      const past = new Date('2020-01-01');
      const relative = getRelativeTime(past, 'en');
      expect(typeof relative).toBe('string');
      expect(relative.length).toBeGreaterThan(0);
    });

    test('handles invalid dates gracefully', () => {
      const invalid = new Date('invalid');
      const relative = getRelativeTime(invalid, 'en');
      expect(typeof relative).toBe('string');
    });
  });
});
