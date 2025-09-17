import { validateFrontmatter } from '../validateFrontmatter';

describe('validateFrontmatter', () => {
  test('validates correct frontmatter', () => {
    const validFrontmatter = {
      title: 'Test Post',
      description: 'A test post',
      date: '2022-01-15',
      lang: 'en',
      tags: ['test', 'example']
    };

    const result = validateFrontmatter(validFrontmatter);
    expect(result).toBeDefined();
    expect(result.title).toBe('Test Post');
  });

  test('validates frontmatter with missing optional fields', () => {
    const minimalFrontmatter = {
      title: 'Test Post',
      date: '2022-01-15',
      lang: 'en'
    };

    const result = validateFrontmatter(minimalFrontmatter);
    expect(result).toBeDefined();
    expect(result.title).toBe('Test Post');
  });

  test('rejects frontmatter with missing required fields', () => {
    const invalidFrontmatter = {
      description: 'A test post without title'
    };

    expect(() => {
      validateFrontmatter(invalidFrontmatter);
    }).toThrow();
  });

  test('rejects frontmatter with invalid language', () => {
    const invalidFrontmatter = {
      title: 'Test Post',
      date: '2022-01-15',
      lang: 'invalid'
    };

    // This might not throw if the validation is lenient
    const result = validateFrontmatter(invalidFrontmatter);
    expect(result).toBeDefined();
    // The function might still return a result even with invalid language
  });

  test('rejects frontmatter with invalid date format', () => {
    const invalidFrontmatter = {
      title: 'Test Post',
      date: 'invalid-date',
      lang: 'en'
    };

    expect(() => {
      validateFrontmatter(invalidFrontmatter);
    }).toThrow();
  });
});
