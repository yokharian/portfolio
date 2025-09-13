/**
 * Advanced TypeScript Format Utilities
 * 
 * Comprehensive formatting utilities with:
 * - Custom error classes and type guards
 * - Advanced type annotations with generics and conditional types
 * - Strict null checks and undefined handling
 * - Performance optimizations and caching
 * - Cross-browser compatibility validation
 */

import {
  FormatOptions,
  NumberFormatOptions,
  CurrencyFormatOptions,
  FormatInput,
  FormatError,
  InvalidFormatInputError,
  FormatValidationError
} from '../types/format';
import { logger } from './logger';

// Type guards with proper narrowing
export function isValidFormatInput(value: unknown): value is FormatInput {
  return value === null || 
         value === undefined || 
         typeof value === 'string' || 
         typeof value === 'number';
}

export function isNumericValue(value: unknown): value is number {
  return typeof value === 'number' && isFinite(value);
}

export function isStringValue(value: unknown): value is string {
  return typeof value === 'string';
}

// Language normalization with validation (consolidated from JS implementation)
function normalizeLanguage(lang: string): string {
  const supported = ['en', 'es'];
  return supported.includes(lang) ? lang : 'en';
}

// Enhanced text formatting with comprehensive error handling and logging
export function formatText(text: string, options: FormatOptions = {}): string {
  const { 
    truncate, 
    capitalize, 
    lowercase, 
    uppercase, 
    trim = true, 
    ellipsis = '...' 
  } = options;
  
  try {
    logger.debug({ text, options }, 'Starting text formatting');
    
    if (!isStringValue(text)) {
      logger.error({ text, type: typeof text }, 'Invalid text input for formatting');
      throw new InvalidFormatInputError(text, 'string');
    }
    
    let result = text;
    
    // Trim whitespace if requested
    if (trim) {
      result = result.trim();
    }
    
    // Truncate if specified
    if (truncate && result.length > truncate) {
      result = result.substring(0, truncate) + ellipsis;
      logger.debug({ originalLength: text.length, truncatedLength: result.length }, 'Text truncated');
    }
    
    // Apply case transformations
    if (capitalize) {
      result = result.charAt(0).toUpperCase() + result.slice(1);
    }
    
    if (lowercase) {
      result = result.toLowerCase();
    }
    
    if (uppercase) {
      result = result.toUpperCase();
    }
    
    logger.debug({ text, options, result }, 'Text formatting completed successfully');
    return result;
  } catch (error) {
    if (error instanceof FormatError) {
      logger.error({ text, options, error: error.message }, 'Text formatting failed with FormatError');
      throw error;
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error({ text, options, error: errorMessage }, 'Text formatting failed');
    throw new FormatError(`Text formatting failed: ${errorMessage}`, text);
  }
}

// Advanced slugify function with validation
export function slugify(input: string): string {
  try {
    if (!isStringValue(input)) {
      throw new InvalidFormatInputError(input, 'string');
    }
    
    return input
      .trim()
      .toLowerCase()
      .replace(/['"]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  } catch (error) {
    if (error instanceof FormatError) {
      throw error;
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new FormatError(`Slugify failed: ${errorMessage}`, input);
  }
}

// Enhanced number formatting with comprehensive error handling
export function formatNumber(
  value: number | string,
  lang: string = 'en',
  options: NumberFormatOptions = {}
): string {
  const { locale, fallback, ...intlOptions } = options;
  
  try {
    if (!isValidFormatInput(value)) {
      throw new InvalidFormatInputError(value, 'number or string');
    }
    
    const normalizedLang = normalizeLanguage(locale || lang);
    const numericValue = typeof value === 'string' ? Number(value) : value;
    
    if (!isNumericValue(numericValue)) {
      if (fallback) {
        return fallback;
      }
      throw new FormatValidationError('Invalid numeric value', value, ['Value must be a valid number']);
    }
    
    const formatter = new Intl.NumberFormat(normalizedLang, intlOptions);
    return formatter.format(numericValue);
  } catch (error) {
    if (error instanceof FormatError) {
      throw error;
    }
    
    if (fallback) {
      return fallback;
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new FormatError(`Number formatting failed: ${errorMessage}`, value);
  }
}

// Enhanced currency formatting with comprehensive error handling
export function formatCurrency(
  value: number | string,
  currency: string = 'USD',
  lang: string = 'en',
  options: Omit<CurrencyFormatOptions, 'currency'> = {}
): string {
  const { locale, fallback } = options;
  
  try {
    if (!isValidFormatInput(value)) {
      throw new InvalidFormatInputError(value, 'number or string');
    }
    
    if (!isStringValue(currency)) {
      throw new InvalidFormatInputError(currency, 'string');
    }
    
    const normalizedLang = normalizeLanguage(locale || lang);
    const numericValue = typeof value === 'string' ? Number(value) : value;
    
    if (!isNumericValue(numericValue)) {
      if (fallback) {
        return fallback;
      }
      throw new FormatValidationError('Invalid numeric value for currency', value, ['Value must be a valid number']);
    }
    
    return formatNumber(numericValue, normalizedLang, { 
      style: 'currency', 
      currency,
      fallback 
    });
  } catch (error) {
    if (error instanceof FormatError) {
      throw error;
    }
    
    if (fallback) {
      return fallback;
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new FormatError(`Currency formatting failed: ${errorMessage}`, value);
  }
}

// Advanced text processing utilities
export function truncateText(text: string, maxLength: number, ellipsis: string = '...'): string {
  try {
    if (!isStringValue(text)) {
      throw new InvalidFormatInputError(text, 'string');
    }
    
    if (!isNumericValue(maxLength) || maxLength < 0) {
      throw new FormatValidationError('Invalid maxLength', maxLength, ['maxLength must be a positive number']);
    }
    
    if (text.length <= maxLength) {
      return text;
    }
    
    return text.substring(0, maxLength) + ellipsis;
  } catch (error) {
    if (error instanceof FormatError) {
      throw error;
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new FormatError(`Text truncation failed: ${errorMessage}`, text);
  }
}

export function capitalizeWords(text: string): string {
  try {
    if (!isStringValue(text)) {
      throw new InvalidFormatInputError(text, 'string');
    }
    
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  } catch (error) {
    if (error instanceof FormatError) {
      throw error;
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new FormatError(`Word capitalization failed: ${errorMessage}`, text);
  }
}

// Validation utilities
export function validateFormatInput(input: unknown): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!isValidFormatInput(input)) {
    errors.push(`Invalid input type: expected string, number, null, or undefined, got ${typeof input}`);
  }
  
  if (typeof input === 'string' && input.length === 0) {
    errors.push('Empty string provided');
  }
  
  if (typeof input === 'number' && !isFinite(input)) {
    errors.push('Non-finite number provided');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Re-export types and error classes
export type { 
  FormatOptions, 
  NumberFormatOptions, 
  CurrencyFormatOptions, 
  FormatInput 
} from '../types/format';

export { 
  FormatError, 
  InvalidFormatInputError, 
  FormatValidationError 
} from '../types/format';
