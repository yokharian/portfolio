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

import * as fs from "fs";
import * as path from "path";
import type {
  TranslationDictionary,
  InterpolationVars,
  I18nOptions,
  LanguageCode
} from "../types/i18n.d.ts";
import { InvalidFormatInputError } from "./format";
import { logger } from "./logger";


// Custom error classes
export class I18nError extends Error {
  constructor(
    message: string,
    public readonly key: string,
    public readonly language: string,
    public readonly context?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "I18nError";
  }
}

export class TranslationNotFoundError extends I18nError {
  constructor(key: string, language: string) {
    super(
      `Translation not found for key "${key}" in language "${language}"`,
      key,
      language,
    );
    this.name = "TranslationNotFoundError";
  }
}

export class InvalidLanguageError extends I18nError {
  constructor(language: string) {
    super(`Unsupported language: "${language}"`, "", language);
    this.name = "InvalidLanguageError";
  }
}


// Type guards with proper narrowing
export function isValidLanguageCode(value: unknown): value is LanguageCode {
  return typeof value === "string" && ["en", "es"].includes(value);
}

export function isTranslationDictionary(
  value: unknown,
): value is TranslationDictionary {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function isInterpolationVars(
  value: unknown,
): value is InterpolationVars {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const obj = value as Record<string, unknown>;
  return Object.values(obj).every(
    (v) => typeof v === "string" || typeof v === "number",
  );
}

// Translation cache for performance optimization
let translationCache: TranslationDictionary | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Enhanced translation loading with caching, error handling, and logging
function loadTranslations(): TranslationDictionary {
  const now = Date.now();

  // Return cached translations if still valid
  if (translationCache && now - cacheTimestamp < CACHE_TTL) {
    // noinspection JSUnusedGlobalSymbols
    logger.debug(
      { cacheAge: now - cacheTimestamp },
      "Using cached translations",
    );
    return translationCache;
  }

  try {
    logger.debug("Loading translations from file");
    const translationsPath = path.join(
      process.cwd(),
      "src",
      "data",
      "i18n.json",
    );

    if (!fs.existsSync(translationsPath)) {
      logger.error({ path: translationsPath }, "Translations file not found");
      throw new I18nError("Translations file not found", "", "", {
        path: translationsPath,
      });
    }

    const raw = fs.readFileSync(translationsPath, "utf8");
    const translations = JSON.parse(raw) as TranslationDictionary;

    if (!isTranslationDictionary(translations)) {
      logger.error({ path: translationsPath }, "Invalid translations format");
      throw new I18nError("Invalid translations format", "", "", {
        path: translationsPath,
      });
    }

    // Update cache
    translationCache = translations;
    cacheTimestamp = now;

    // noinspection JSUnusedGlobalSymbols
    logger.info(
      { path: translationsPath, languages: Object.keys(translations) },
      "Translations loaded successfully",
    );
    return translations;
  } catch (error) {
    if (error instanceof I18nError) {
      logger.error(
        { error: error.message, context: error.context },
        "Translation loading failed with I18nError",
      );
      throw error;
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    logger.error({ error: errorMessage }, "Translation loading failed");
    throw new I18nError(`Failed to load translations: ${errorMessage}`, "", "");
  }
}

// Enhanced nested object access with type safety (consolidated from JS implementation)
function get<T>(obj: Record<string, unknown>, key: string, fallback: T): T {
  if (!key || typeof key !== "string") {
    return fallback;
  }

  const parts = String(key).split(".");
  let current: unknown = obj;

  for (const k of parts) {
    if (
      !current ||
      typeof current !== "object" ||
      !(k in (current as Record<string, unknown>))
    ) {
      return fallback;
    }
    current = (current as Record<string, unknown>)[k];
  }

  return current as T;
}

// Language normalization with validation
function normalizeLanguage(lang: LanguageCode): LanguageCode {
  const supported: LanguageCode[] = ["en", "es"];
  return supported.includes(lang) ? lang : "en";
}

// Advanced translation function with comprehensive error handling and logging
export function t(
  key: string,
  lang: LanguageCode = "en",
  vars: InterpolationVars = {},
  options: I18nOptions = {},
): string {
  const {
    fallbackToKey = true,
    warnOnMissing = true,
    strictMode = false,
  } = options;

  try {
    logger.debug({ key, lang, vars, options }, "Starting translation");

    // Validate inputs
    if (!key || typeof key !== "string") {
      logger.error({ key, type: typeof key }, "Invalid translation key");
      throw new InvalidFormatInputError(key, "string");
    }

    if (!isValidLanguageCode(lang)) {
      logger.error({ lang }, "Invalid language code");
      throw new InvalidLanguageError(lang);
    }

    if (!isInterpolationVars(vars)) {
      logger.error({ vars }, "Invalid interpolation variables");
      throw new InvalidFormatInputError(vars, "InterpolationVars");
    }

    const normalizedLang = normalizeLanguage(lang);
    const translations = loadTranslations();

    // Get translation with fallback chain (consolidated from JS implementation)
    const langTranslations = translations[normalizedLang];
    const template = get(
      langTranslations && typeof langTranslations === "object"
        ? (langTranslations as Record<string, unknown>)
        : {},
      key,
      null,
    );

    if (typeof template !== "string") {
      if (strictMode) {
        logger.error(
          { key, lang: normalizedLang },
          "Translation not found in strict mode",
        );
        throw new TranslationNotFoundError(key, normalizedLang);
      }

      if (warnOnMissing) {
        logger.warn(
          { key, lang: normalizedLang },
          "Translation not found, using fallback",
        );
      }

      const fallback = fallbackToKey ? key : "";
      // noinspection JSUnusedGlobalSymbols
      logger.info(
        { key, lang: normalizedLang, fallback },
        "Using fallback translation",
      );
      return fallback;
    }

    // Interpolate variables (consolidated from JS implementation)
    const result = template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, name) =>
      String(vars[name] ?? ""),
    );
    logger.debug(
      { key, lang: normalizedLang, result },
      "Translation completed successfully",
    );
    return result;
  } catch (error) {
    if (
      error instanceof I18nError ||
      error instanceof InvalidFormatInputError
    ) {
      logger.error(
        { key, lang, vars, options, error: error.message },
        "Translation failed with known error",
      );
      throw error;
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    logger.error(
      { key, lang, vars, options, error: errorMessage },
      "Translation failed with unknown error",
    );
    throw new I18nError(`Translation failed: ${errorMessage}`, key, lang, {
      vars,
      options,
    });
  }
}
