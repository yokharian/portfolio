// Type definitions for date utility functions
// Keeps options minimal and extensible for formatting and parsing dates

export interface DateFormatOptions {
  format?: string; // e.g., 'yyyy-MM-dd'
  locale?: string; // e.g., 'en-US'
  timezone?: string; // IANA time zone name, e.g., 'UTC', 'America/New_York'
  fallback?: string; // Fallback value when date is invalid
}

export interface DateValidationResult {
  isValid: boolean;
  error?: string | undefined;
  normalizedDate?: Date | undefined;
}

export interface DateRangeOptions {
  allowSameDay?: boolean;
  maxRange?: number; // Maximum days between dates
}

export type DateInput = Date | string | number;
export type LanguageCode = 'en' | 'es';

// Custom error classes
export class DateUtilityError extends Error {
  constructor(
    message: string, 
    public readonly input: unknown,
    public readonly context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'DateUtilityError';
  }
}

export class DateValidationError extends DateUtilityError {
  constructor(
    message: string,
    input: unknown,
    public readonly validationErrors: string[] = []
  ) {
    super(message, input, { validationErrors });
    this.name = 'DateValidationError';
  }
}
