// Type definitions for i18n utilities

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

export interface InterpolationVars {
  [name: string]: string | number;
}

export interface I18nOptions {
  fallbackToKey?: boolean;
  warnOnMissing?: boolean;
  strictMode?: boolean;
}

export type LanguageCode = "en" | "es";
