// Internationalization (i18n) types for the portfolio project.

export type TranslationValue = string | number | boolean | null | undefined;

export interface TranslationDictionary {
  [key: string]: TranslationValue | TranslationDictionary;
}

export interface I18nConfig {
  defaultLanguage: string;
  languages: string[];
  translations: Record<string, TranslationDictionary>;
}

export interface I18nFormatter {
  // Basic formatter: t('home.title')
  t: (key: string, params?: Record<string, TranslationValue>) => string;
  // Change language at runtime
  setLocale: (lang: string) => void;
  // Get current locale
  getLocale: () => string;
}
