/**
 * Unit tests for logger utilities
 */

import { Logger, logger, type LogLevel, type LoggerOptions } from "../logger";

// Mock console methods
const mockConsole = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Replace global console with mock
Object.assign(console, mockConsole);

describe("Logger", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("constructor", () => {
    it("should create logger with default options", () => {
      const logger = new Logger();
      expect(logger).toBeInstanceOf(Logger);
    });

    it("should create logger with custom options", () => {
      const options: LoggerOptions = {
        level: "warn",
        prefix: "TEST",
        timestamp: false,
      };
      const logger = new Logger(options);
      expect(logger).toBeInstanceOf(Logger);
    });

    it("should create logger with partial options", () => {
      const options: LoggerOptions = {
        level: "debug",
      };
      const logger = new Logger(options);
      expect(logger).toBeInstanceOf(Logger);
    });
  });

  describe("log level filtering", () => {
    it("should log debug messages when level is debug", () => {
      const logger = new Logger({ level: "debug" });
      logger.debug("test message");
      expect(mockConsole.debug).toHaveBeenCalled();
    });

    it("should not log debug messages when level is info", () => {
      const logger = new Logger({ level: "info" });
      logger.debug("test message");
      expect(mockConsole.debug).not.toHaveBeenCalled();
    });

    it("should log info messages when level is info", () => {
      const logger = new Logger({ level: "info" });
      logger.info("test message");
      expect(mockConsole.info).toHaveBeenCalled();
    });

    it("should not log info messages when level is warn", () => {
      const logger = new Logger({ level: "warn" });
      logger.info("test message");
      expect(mockConsole.info).not.toHaveBeenCalled();
    });

    it("should log warn messages when level is warn", () => {
      const logger = new Logger({ level: "warn" });
      logger.warn("test message");
      expect(mockConsole.warn).toHaveBeenCalled();
    });

    it("should not log warn messages when level is error", () => {
      const logger = new Logger({ level: "error" });
      logger.warn("test message");
      expect(mockConsole.warn).not.toHaveBeenCalled();
    });

    it("should log error messages when level is error", () => {
      const logger = new Logger({ level: "error" });
      logger.error("test message");
      expect(mockConsole.error).toHaveBeenCalled();
    });

    it("should log all levels when level is debug", () => {
      const logger = new Logger({ level: "debug" });
      logger.debug("debug message");
      logger.info("info message");
      logger.warn("warn message");
      logger.error("error message");
      
      expect(mockConsole.debug).toHaveBeenCalled();
      expect(mockConsole.info).toHaveBeenCalled();
      expect(mockConsole.warn).toHaveBeenCalled();
      expect(mockConsole.error).toHaveBeenCalled();
    });
  });

  describe("message formatting", () => {
    it("should format messages with timestamp by default", () => {
      const logger = new Logger({ level: "debug" });
      logger.debug("test message");
      
      const call = mockConsole.debug.mock.calls[0];
      expect(call[0]).toMatch(/^\[.*\]$/);
      expect(call[1]).toBe("[DEBUG]");
      expect(call[2]).toBe("test message");
    });

    it("should format messages without timestamp when disabled", () => {
      const logger = new Logger({ level: "debug", timestamp: false });
      logger.debug("test message");
      
      const call = mockConsole.debug.mock.calls[0];
      expect(call[0]).toBe("[DEBUG]");
      expect(call[1]).toBe("test message");
    });

    it("should include prefix in formatted messages", () => {
      const logger = new Logger({ level: "debug", prefix: "TEST" });
      logger.debug("test message");
      
      const call = mockConsole.debug.mock.calls[0];
      expect(call[0]).toMatch(/^\[.*\]$/);
      expect(call[1]).toBe("[DEBUG]");
      expect(call[2]).toBe("[TEST]");
      expect(call[3]).toBe("test message");
    });

    it("should handle multiple arguments", () => {
      const logger = new Logger({ level: "debug" });
      logger.debug("message", { data: "test" }, 123);
      
      const call = mockConsole.debug.mock.calls[0];
      expect(call).toHaveLength(5); // timestamp, level, message, object, number
      expect(call[0]).toMatch(/^\[.*\]$/);
      expect(call[1]).toBe("[DEBUG]");
      expect(call[2]).toBe("message");
      expect(call[3]).toEqual({ data: "test" });
      expect(call[4]).toBe(123);
    });

    it("should handle empty arguments", () => {
      const logger = new Logger({ level: "debug" });
      logger.debug();
      
      const call = mockConsole.debug.mock.calls[0];
      expect(call).toHaveLength(2); // timestamp and level only
      expect(call[0]).toMatch(/^\[.*\]$/);
      expect(call[1]).toBe("[DEBUG]");
    });
  });

  describe("log methods", () => {
    let logger: Logger;

    beforeEach(() => {
      logger = new Logger({ level: "debug" });
    });

    it("should call console.debug for debug method", () => {
      logger.debug("debug message");
      expect(mockConsole.debug).toHaveBeenCalledTimes(1);
    });

    it("should call console.info for info method", () => {
      logger.info("info message");
      expect(mockConsole.info).toHaveBeenCalledTimes(1);
    });

    it("should call console.warn for warn method", () => {
      logger.warn("warn message");
      expect(mockConsole.warn).toHaveBeenCalledTimes(1);
    });

    it("should call console.error for error method", () => {
      logger.error("error message");
      expect(mockConsole.error).toHaveBeenCalledTimes(1);
    });
  });

  describe("edge cases", () => {
    it("should handle undefined and null values", () => {
      const logger = new Logger({ level: "debug" });
      logger.debug(undefined, null, "message");
      
      const call = mockConsole.debug.mock.calls[0];
      expect(call[0]).toMatch(/^\[.*\]$/);
      expect(call[1]).toBe("[DEBUG]");
      expect(call[2]).toBeUndefined();
      expect(call[3]).toBeNull();
      expect(call[4]).toBe("message");
    });

    it("should handle objects and arrays", () => {
      const logger = new Logger({ level: "debug" });
      const obj = { key: "value" };
      const arr = [1, 2, 3];
      
      logger.debug("object:", obj, "array:", arr);
      
      const call = mockConsole.debug.mock.calls[0];
      expect(call[0]).toMatch(/^\[.*\]$/);
      expect(call[1]).toBe("[DEBUG]");
      expect(call[2]).toBe("object:");
      expect(call[3]).toEqual(obj);
      expect(call[4]).toBe("array:");
      expect(call[5]).toEqual(arr);
    });

    it("should handle special characters and unicode", () => {
      const logger = new Logger({ level: "debug" });
      logger.debug("Special chars: !@#$%^&*()", "Unicode: 🚀🌟");
      
      const call = mockConsole.debug.mock.calls[0];
      expect(call[0]).toMatch(/^\[.*\]$/);
      expect(call[1]).toBe("[DEBUG]");
      expect(call[2]).toBe("Special chars: !@#$%^&*()");
      expect(call[3]).toBe("Unicode: 🚀🌟");
    });
  });
});

describe("default logger instance", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should export a default logger instance", () => {
    expect(logger).toBeInstanceOf(Logger);
  });

  it("should use default options", () => {
    logger.info("test message");
    expect(mockConsole.info).toHaveBeenCalled();
  });
});

describe("LogLevel type", () => {
  it("should accept valid log levels", () => {
    const levels: LogLevel[] = ["debug", "info", "warn", "error"];
    levels.forEach(level => {
      const logger = new Logger({ level });
      expect(logger).toBeInstanceOf(Logger);
    });
  });
});

describe("LoggerOptions interface", () => {
  it("should accept valid options", () => {
    const options: LoggerOptions = {
      level: "warn",
      prefix: "TEST",
      timestamp: true,
    };
    const logger = new Logger(options);
    expect(logger).toBeInstanceOf(Logger);
  });

  it("should accept partial options", () => {
    const options: LoggerOptions = {
      level: "error",
    };
    const logger = new Logger(options);
    expect(logger).toBeInstanceOf(Logger);
  });

  it("should accept empty options", () => {
    const options: LoggerOptions = {};
    const logger = new Logger(options);
    expect(logger).toBeInstanceOf(Logger);
  });
});
