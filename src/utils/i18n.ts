/**
 * Advanced TypeScript I18n Utilities
 * 
 * Comprehensive internationalization utilities with:
 * - Custom error classes and type guards
 * - Advanced type annotations with generics and conditional types
 * - Strict null checks and undefined handling
 * - Performance optimizations and caching
 * - Cross-browser compatibility validation
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  TranslationDictionary,
  I18nConfig,
  InterpolationVars,
  I18nOptions,
  LanguageCode,
  I18nError,
  TranslationNotFoundError,
  InvalidLanguageError
} from '../types/i18n';
import { InvalidFormatInputError } from '../types/format';
import { logger } from './logger';

// Type guards with proper narrowing
export function isValidLanguageCode(value: unknown): value is LanguageCode {
  return typeof value === 'string' && ['en', 'es'].includes(value);
}

export function isTranslationDictionary(value: unknown): value is TranslationDictionary {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function isInterpolationVars(value: unknown): value is InterpolationVars {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  
  const obj = value as Record<string, unknown>;
  return Object.values(obj).every(v => typeof v === 'string' || typeof v === 'number');
}

// Translation cache for performance optimization
let translationCache: TranslationDictionary | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Enhanced translation loading with caching, error handling, and logging
function loadTranslations(): TranslationDictionary {
  const now = Date.now();
  
  // Return cached translations if still valid
  if (translationCache && (now - cacheTimestamp) < CACHE_TTL) {
    logger.debug({ cacheAge: now - cacheTimestamp }, 'Using cached translations');
    return translationCache;
  }
  
  try {
    logger.debug('Loading translations from file');
    const translationsPath = path.join(process.cwd(), 'src', 'data', 'i18n.json');
    
    if (!fs.existsSync(translationsPath)) {
      logger.error({ path: translationsPath }, 'Translations file not found');
      throw new I18nError('Translations file not found', '', '', { path: translationsPath });
    }
    
    const raw = fs.readFileSync(translationsPath, 'utf8');
    const translations = JSON.parse(raw) as TranslationDictionary;
    
    if (!isTranslationDictionary(translations)) {
      logger.error({ path: translationsPath }, 'Invalid translations format');
      throw new I18nError('Invalid translations format', '', '', { path: translationsPath });
    }
    
    // Update cache
    translationCache = translations;
    cacheTimestamp = now;
    
    logger.info({ path: translationsPath, languages: Object.keys(translations) }, 'Translations loaded successfully');
    return translations;
  } catch (error) {
    if (error instanceof I18nError) {
      logger.error({ error: error.message, context: error.context }, 'Translation loading failed with I18nError');
      throw error;
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error({ error: errorMessage }, 'Translation loading failed');
    throw new I18nError(`Failed to load translations: ${errorMessage}`, '', '');
  }
}

// Enhanced nested object access with type safety (consolidated from JS implementation)
function get<T>(
  obj: Record<string, unknown>, 
  key: string, 
  fallback: T
): T {
  if (!key || typeof key !== 'string') {
    return fallback;
  }
  
  const parts = String(key).split('.');
  let current: unknown = obj;
  
  for (const k of parts) {
    if (!current || typeof current !== 'object' || !(k in (current as Record<string, unknown>))) {
      return fallback;
    }
    current = (current as Record<string, unknown>)[k];
  }
  
  return current as T;
}

// Language normalization with validation
function normalizeLanguage(lang: LanguageCode): LanguageCode {
  const supported: LanguageCode[] = ['en', 'es'];
  return supported.includes(lang) ? lang : 'en';
}

// Enhanced interpolation with type safety
function interpolateTemplate(template: string, vars: InterpolationVars): string {
  if (!template || typeof template !== 'string') {
    return '';
  }
  
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, varName) => {
    const value = vars[varName];
    return value !== undefined ? String(value) : match;
  });
}

// Advanced translation function with comprehensive error handling and logging
export function t(
  key: string, 
  lang: LanguageCode = 'en', 
  vars: InterpolationVars = {},
  options: I18nOptions = {}
): string {
  const { fallbackToKey = true, warnOnMissing = true, strictMode = false } = options;
  
  try {
    logger.debug({ key, lang, vars, options }, 'Starting translation');
    
    // Validate inputs
    if (!key || typeof key !== 'string') {
      logger.error({ key, type: typeof key }, 'Invalid translation key');
      throw new InvalidFormatInputError(key, 'string');
    }
    
    if (!isValidLanguageCode(lang)) {
      logger.error({ lang }, 'Invalid language code');
      throw new InvalidLanguageError(lang);
    }
    
    if (!isInterpolationVars(vars)) {
      logger.error({ vars }, 'Invalid interpolation variables');
      throw new InvalidFormatInputError(vars, 'InterpolationVars');
    }
    
    const normalizedLang = normalizeLanguage(lang);
    const translations = loadTranslations();
    
    // Get translation with fallback chain (consolidated from JS implementation)
    const langTranslations = translations[normalizedLang];
    const template = get(langTranslations && typeof langTranslations === 'object' ? langTranslations as Record<string, unknown> : {}, key, '');
    
    if (typeof template !== 'string') {
      if (strictMode) {
        logger.error({ key, lang: normalizedLang }, 'Translation not found in strict mode');
        throw new TranslationNotFoundError(key, normalizedLang);
      }
      
      if (warnOnMissing) {
        logger.warn({ key, lang: normalizedLang }, 'Translation not found, using fallback');
      }
      
      const fallback = fallbackToKey ? key : '';
      logger.info({ key, lang: normalizedLang, fallback }, 'Using fallback translation');
      return fallback;
    }
    
    // Interpolate variables (consolidated from JS implementation)
    const result = template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, name) => String(vars[name] ?? ''));
    logger.debug({ key, lang: normalizedLang, result }, 'Translation completed successfully');
    return result;
    
  } catch (error) {
    if (error instanceof I18nError || error instanceof InvalidFormatInputError) {
      logger.error({ key, lang, vars, options, error: error.message }, 'Translation failed with known error');
      throw error;
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error({ key, lang, vars, options, error: errorMessage }, 'Translation failed with unknown error');
    throw new I18nError(`Translation failed: ${errorMessage}`, key, lang, { vars, options });
  }
}

// Language detection utilities
export function getLanguageFromUrl(url: string, supportedLanguages: LanguageCode[] = ['en', 'es']): LanguageCode {
  if (!url || typeof url !== 'string') {
    return 'en';
  }
  
  try {
    const pathSegments = url.split('/').filter(Boolean);
    const potentialLang = pathSegments[0] as LanguageCode;
    
    return supportedLanguages.includes(potentialLang) ? potentialLang : 'en';
  } catch (error) {
    console.warn(`[I18n] Error parsing language from URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return 'en';
  }
}

export function getLanguageFromPathname(pathname: string, supportedLanguages: LanguageCode[] = ['en', 'es']): LanguageCode {
  if (!pathname || typeof pathname !== 'string') {
    return 'en';
  }
  
  try {
    const match = pathname.match(/^\/(en|es)(\/|$)/i);
    const potentialLang = match?.[1] ? match[1].toLowerCase() as LanguageCode : null;
    
    return potentialLang && supportedLanguages.includes(potentialLang) ? potentialLang : 'en';
  } catch (error) {
    console.warn(`[I18n] Error parsing language from pathname: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return 'en';
  }
}

// Translation validation utilities
export function validateTranslationKey(key: string, lang: LanguageCode = 'en'): boolean {
  try {
    const translation = t(key, lang, {}, { fallbackToKey: false, warnOnMissing: false });
    return translation !== '';
  } catch {
    return false;
  }
}

export function getAvailableLanguages(): LanguageCode[] {
  return ['en', 'es'];
}

// Cache management
export function clearTranslationCache(): void {
  translationCache = null;
  cacheTimestamp = 0;
}

export function isTranslationCacheValid(): boolean {
  return translationCache !== null && (Date.now() - cacheTimestamp) < CACHE_TTL;
}

// Re-export types and error classes
export type { 
  TranslationDictionary, 
  I18nConfig, 
  InterpolationVars, 
  I18nOptions, 
  LanguageCode 
} from '../types/i18n';

export { 
  I18nError, 
  TranslationNotFoundError, 
  InvalidLanguageError 
} from '../types/i18n';
