// Type definitions for text formatting utilities

// Custom error classes
export class FormatError extends Error {
  constructor(
    message: string,
    public readonly input: unknown,
    public readonly context?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "FormatError";
  }
}

export class InvalidFormatInputError extends FormatError {
  constructor(input: unknown, expectedType: string) {
    super(
      `Invalid input type: expected ${expectedType}, got ${typeof input}`,
      input,
    );
    this.name = "InvalidFormatInputError";
  }
}
