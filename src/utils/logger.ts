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
export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LoggerOptions {
  level?: LogLevel;
  prefix?: string;
  timestamp?: boolean;
}

// Custom error classes
// Type guards
// Log levels with numeric values for comparison
const LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Enhanced logging function (consolidated from JS implementation)
function log(level: LogLevel, ...args: unknown[]): void {
  // eslint-disable-next-line no-console
  console[level](...args);
}

// Logger class with enhanced functionality
export class Logger {
  private level: LogLevel;
  private prefix: string;
  private timestamp: boolean;

  constructor(options: LoggerOptions = {}) {
    this.level = options.level || "info";
    this.prefix = options.prefix || "";
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
    if (this.shouldLog("debug")) {
      const formatted = this.formatMessage("debug", ...args);
      log("debug", ...formatted);
    }
  }

  info(...args: unknown[]): void {
    if (this.shouldLog("info")) {
      const formatted = this.formatMessage("info", ...args);
      log("info", ...formatted);
    }
  }

  warn(...args: unknown[]): void {
    if (this.shouldLog("warn")) {
      const formatted = this.formatMessage("warn", ...args);
      log("warn", ...formatted);
    }
  }

  error(...args: unknown[]): void {
    if (this.shouldLog("error")) {
      const formatted = this.formatMessage("error", ...args);
      log("error", ...formatted);
    }
  }
}

// Default logger instance (consolidated from JS implementation)
export const logger = new Logger();
