// Type definitions for i18n utilities

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

export interface I18nConfig {
  defaultLanguage: string;
  supportedLanguages: string[];
  translations: {
    [language: string]: TranslationDictionary;
  };
}

export interface InterpolationVars {
  [name: string]: string | number;
}

export interface I18nOptions {
  fallbackToKey?: boolean;
  warnOnMissing?: boolean;
  strictMode?: boolean;
}

export type LanguageCode = 'en' | 'es';

// Custom error classes
export class I18nError extends Error {
  constructor(
    message: string,
    public readonly key: string,
    public readonly language: string,
    public readonly context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'I18nError';
  }
}

export class TranslationNotFoundError extends I18nError {
  constructor(key: string, language: string) {
    super(`Translation not found for key "${key}" in language "${language}"`, key, language);
    this.name = 'TranslationNotFoundError';
  }
}

export class InvalidLanguageError extends I18nError {
  constructor(language: string) {
    super(`Unsupported language: "${language}"`, '', language);
    this.name = 'InvalidLanguageError';
  }
}
