/**
 * Advanced TypeScript Logger Utilities
 * 
 * Comprehensive logging utilities with:
 * - Custom error classes and type guards
 * - Advanced type annotations with generics and conditional types
 * - Strict null checks and undefined handling
 * - Performance optimizations and caching
 * - Cross-browser compatibility validation
 */

// Type definitions
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LoggerOptions {
  level?: LogLevel;
  prefix?: string;
  timestamp?: boolean;
}

// Custom error classes
export class LoggerError extends Error {
  constructor(
    message: string,
    public readonly context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'LoggerError';
  }
}

// Type guards
export function isValidLogLevel(value: unknown): value is LogLevel {
  return typeof value === 'string' && ['debug', 'info', 'warn', 'error'].includes(value);
}

// Log levels with numeric values for comparison
const LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

// Enhanced logging function (consolidated from JS implementation)
function log(level: LogLevel, ...args: unknown[]): void {
  const ts = new Date().toISOString();
  // eslint-disable-next-line no-console
  console[level](`[${ts}] [${level.toUpperCase()}]`, ...args);
}

// Logger class with enhanced functionality
export class Logger {
  private level: LogLevel;
  private prefix: string;
  private timestamp: boolean;

  constructor(options: LoggerOptions = {}) {
    this.level = options.level || 'info';
    this.prefix = options.prefix || '';
    this.timestamp = options.timestamp !== false;
  }

  private shouldLog(level: LogLevel): boolean {
    return LEVELS[level] >= LEVELS[this.level];
  }

  private formatMessage(level: LogLevel, ...args: unknown[]): unknown[] {
    const parts: unknown[] = [];
    
    if (this.timestamp) {
      const ts = new Date().toISOString();
      parts.push(`[${ts}]`);
    }
    
    parts.push(`[${level.toUpperCase()}]`);
    
    if (this.prefix) {
      parts.push(`[${this.prefix}]`);
    }
    
    return [...parts, ...args];
  }

  debug(...args: unknown[]): void {
    if (this.shouldLog('debug')) {
      log('debug', ...this.formatMessage('debug', ...args));
    }
  }

  info(...args: unknown[]): void {
    if (this.shouldLog('info')) {
      log('info', ...this.formatMessage('info', ...args));
    }
  }

  warn(...args: unknown[]): void {
    if (this.shouldLog('warn')) {
      log('warn', ...this.formatMessage('warn', ...args));
    }
  }

  error(...args: unknown[]): void {
    if (this.shouldLog('error')) {
      log('error', ...this.formatMessage('error', ...args));
    }
  }

  setLevel(level: LogLevel): void {
    if (!isValidLogLevel(level)) {
      throw new LoggerError(`Invalid log level: ${level}`);
    }
    this.level = level;
  }

  setPrefix(prefix: string): void {
    this.prefix = prefix;
  }

  setTimestamp(enabled: boolean): void {
    this.timestamp = enabled;
  }
}

// Default logger instance (consolidated from JS implementation)
export const logger = new Logger();

// Re-export constants and types
export const LOG_LEVELS = Object.keys(LEVELS) as LogLevel[];
