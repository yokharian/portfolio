// Type definitions for text formatting utilities

export interface FormatOptions {
  truncate?: number; // Maximum number of characters
  capitalize?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  trim?: boolean;
  ellipsis?: string; // Custom ellipsis character(s)
}

export interface NumberFormatOptions extends Intl.NumberFormatOptions {
  locale?: string;
  fallback?: string | undefined;
}

export interface CurrencyFormatOptions {
  currency: string;
  locale?: string;
  fallback?: string | undefined;
}

export type FormatInput = string | number | null | undefined;

// Custom error classes
export class FormatError extends Error {
  constructor(
    message: string,
    public readonly input: unknown,
    public readonly context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'FormatError';
  }
}

export class InvalidFormatInputError extends FormatError {
  constructor(input: unknown, expectedType: string) {
    super(`Invalid input type: expected ${expectedType}, got ${typeof input}`, input);
    this.name = 'InvalidFormatInputError';
  }
}

export class FormatValidationError extends FormatError {
  constructor(
    message: string,
    input: unknown,
    public readonly validationErrors: string[] = []
  ) {
    super(message, input, { validationErrors });
    this.name = 'FormatValidationError';
  }
}
