// Type definitions for content processing utilities

export interface ContentProcessingOptions {
  stripHtml?: boolean;
  excerpt?: number; // Maximum number of characters for excerpt
  markdown?: boolean; // Whether input is markdown
  preserveWhitespace?: boolean;
  removeEmptyLines?: boolean;
  maxLength?: number;
}

export interface ContentItem {
  content: string;
  data?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface DiscoverOptions {
  allowHtml?: boolean;
  recursive?: boolean;
  includeHidden?: boolean;
  maxDepth?: number;
}

export interface ProjectRecord {
  slug: string;
  filePath: string;
  frontmatter: Record<string, unknown>;
  content: string;
  html: string;
  language?: string;
  imageValid?: boolean;
  heroAlt?: string;
}

export interface ContentValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Custom error classes
export class ContentProcessingError extends Error {
  constructor(
    message: string,
    public readonly input: unknown,
    public readonly context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ContentProcessingError';
  }
}

export class ContentValidationError extends ContentProcessingError {
  constructor(
    message: string,
    input: unknown,
    public readonly validationErrors: string[] = []
  ) {
    super(message, input, { validationErrors });
    this.name = 'ContentValidationError';
  }
}

export class FileProcessingError extends ContentProcessingError {
  constructor(
    message: string,
    public readonly filePath: string,
    public readonly originalError?: Error
  ) {
    super(message, filePath, { originalError: originalError?.message });
    this.name = 'FileProcessingError';
  }
}
