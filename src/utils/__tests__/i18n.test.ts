/**
 * Simplified unit tests for i18n utilities
 */

import {
  I18nError,
  TranslationNotFoundError,
  InvalidLanguageError,
  t,
  isValidLanguageCode,
  isTranslationDictionary,
  isInterpolationVars,
} from "../i18n";
import { InvalidFormatInputError } from "../format";

// Mock fs module
jest.mock("fs");
const fs = require("fs");

// Mock logger
jest.mock("../logger", () => ({
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock translations data
const mockTranslations = {
  en: {
    simple: "Hello",
    nested: {
      key: "Nested value",
      deep: {
        value: "Deep nested value",
      },
    },
    withVars: "Hello {{name}}, you have {{count}} messages",
    withNumbers: "Count: {{num}}",
    empty: "",
  },
  es: {
    simple: "Hola",
    nested: {
      key: "Valor anidado",
      deep: {
        value: "Valor anidado profundo",
      },
    },
    withVars: "Hola {{name}}, tienes {{count}} mensajes",
    withNumbers: "Contador: {{num}}",
    empty: "",
  },
};

describe("i18n utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock fs.existsSync to return true
    fs.existsSync.mockReturnValue(true);
    
    // Mock fs.readFileSync to return mock translations
    fs.readFileSync.mockReturnValue(JSON.stringify(mockTranslations));
  });

  describe("isValidLanguageCode", () => {
    it("should return true for valid language codes", () => {
      expect(isValidLanguageCode("en")).toBe(true);
      expect(isValidLanguageCode("es")).toBe(true);
    });

    it("should return false for invalid language codes", () => {
      expect(isValidLanguageCode("fr")).toBe(false);
      expect(isValidLanguageCode("de")).toBe(false);
      expect(isValidLanguageCode("")).toBe(false);
      expect(isValidLanguageCode(null)).toBe(false);
      expect(isValidLanguageCode(undefined)).toBe(false);
      expect(isValidLanguageCode(123)).toBe(false);
      expect(isValidLanguageCode({})).toBe(false);
      expect(isValidLanguageCode([])).toBe(false);
    });
  });

  describe("isTranslationDictionary", () => {
    it("should return true for valid translation dictionaries", () => {
      expect(isTranslationDictionary({})).toBe(true);
      expect(isTranslationDictionary({ key: "value" })).toBe(true);
      expect(isTranslationDictionary({ nested: { key: "value" } })).toBe(true);
    });

    it("should return false for invalid values", () => {
      expect(isTranslationDictionary(null)).toBe(false);
      expect(isTranslationDictionary(undefined)).toBe(false);
      expect(isTranslationDictionary("string")).toBe(false);
      expect(isTranslationDictionary(123)).toBe(false);
      expect(isTranslationDictionary([])).toBe(false);
      expect(isTranslationDictionary(true)).toBe(false);
    });
  });

  describe("isInterpolationVars", () => {
    it("should return true for valid interpolation variables", () => {
      expect(isInterpolationVars({})).toBe(true);
      expect(isInterpolationVars({ name: "John" })).toBe(true);
      expect(isInterpolationVars({ count: 5 })).toBe(true);
      expect(isInterpolationVars({ name: "John", count: 5 })).toBe(true);
    });

    it("should return false for invalid values", () => {
      expect(isInterpolationVars(null)).toBe(false);
      expect(isInterpolationVars(undefined)).toBe(false);
      expect(isInterpolationVars("string")).toBe(false);
      expect(isInterpolationVars(123)).toBe(false);
      expect(isInterpolationVars([])).toBe(false);
      expect(isInterpolationVars({ name: null })).toBe(false);
      expect(isInterpolationVars({ name: undefined })).toBe(false);
      expect(isInterpolationVars({ name: {} })).toBe(false);
      expect(isInterpolationVars({ name: [] })).toBe(false);
    });
  });

  describe("translation function (t)", () => {
    describe("basic functionality", () => {
      it("should translate simple keys", () => {
        expect(t("simple", "en")).toBe("Hello");
        expect(t("simple", "es")).toBe("Hola");
      });

      it("should translate nested keys", () => {
        expect(t("nested.key", "en")).toBe("Nested value");
        expect(t("nested.key", "es")).toBe("Valor anidado");
      });

      it("should translate deeply nested keys", () => {
        expect(t("nested.deep.value", "en")).toBe("Deep nested value");
        expect(t("nested.deep.value", "es")).toBe("Valor anidado profundo");
      });

      it("should default to English when no language specified", () => {
        expect(t("simple")).toBe("Hello");
      });

      it("should throw error for invalid language codes", () => {
        expect(() => {
          t("simple", "fr" as any);
        }).toThrow(InvalidLanguageError);
        
        expect(() => {
          t("simple", "invalid" as any);
        }).toThrow(InvalidLanguageError);
      });
    });

    describe("variable interpolation", () => {
      it("should interpolate string variables", () => {
        expect(t("withVars", "en", { name: "John", count: 5 })).toBe(
          "Hello John, you have 5 messages"
        );
        expect(t("withVars", "es", { name: "Juan", count: 3 })).toBe(
          "Hola Juan, tienes 3 mensajes"
        );
      });

      it("should interpolate number variables", () => {
        expect(t("withNumbers", "en", { num: 42 })).toBe("Count: 42");
        expect(t("withNumbers", "es", { num: 100 })).toBe("Contador: 100");
      });

      it("should handle missing variables", () => {
        expect(t("withVars", "en", { name: "John" })).toBe(
          "Hello John, you have  messages"
        );
        expect(t("withVars", "en", {})).toBe("Hello , you have  messages");
      });

      it("should handle empty variables object", () => {
        expect(t("withVars", "en", {})).toBe("Hello , you have  messages");
      });
    });

    describe("options handling", () => {
      it("should return key when translation not found (default behavior)", () => {
        expect(t("nonexistent", "en")).toBe("nonexistent");
      });

      it("should return key when fallbackToKey is true", () => {
        expect(t("nonexistent", "en", {}, { fallbackToKey: true })).toBe("nonexistent");
      });

      it("should return empty string when fallbackToKey is false", () => {
        expect(t("nonexistent", "en", {}, { fallbackToKey: false })).toBe("");
      });

      it("should not warn when warnOnMissing is false", () => {
        const { logger } = require("../logger");
        t("nonexistent", "en", {}, { warnOnMissing: false });
        expect(logger.warn).not.toHaveBeenCalled();
      });

      it("should warn when warnOnMissing is true (default)", () => {
        const { logger } = require("../logger");
        t("nonexistent", "en");
        expect(logger.warn).toHaveBeenCalled();
      });

      it("should throw error in strict mode when translation not found", () => {
        expect(() => {
          t("nonexistent", "en", {}, { strictMode: true });
        }).toThrow(TranslationNotFoundError);
      });
    });

    describe("error handling", () => {
      it("should throw InvalidFormatInputError for invalid key", () => {
        expect(() => {
          t("" as any, "en");
        }).toThrow(InvalidFormatInputError);

        expect(() => {
          t(null as any, "en");
        }).toThrow(InvalidFormatInputError);

        expect(() => {
          t(123 as any, "en");
        }).toThrow(InvalidFormatInputError);
      });

      it("should throw InvalidLanguageError for invalid language", () => {
        expect(() => {
          t("simple", "invalid" as any, {}, { strictMode: true });
        }).toThrow(InvalidLanguageError);
      });

      it("should throw InvalidFormatInputError for invalid interpolation vars", () => {
        expect(() => {
          t("simple", "en", "invalid" as any);
        }).toThrow(InvalidFormatInputError);

        expect(() => {
          t("simple", "en", null as any);
        }).toThrow(InvalidFormatInputError);
      });
    });

    describe("edge cases", () => {
      it("should handle empty string translations", () => {
        expect(t("empty", "en")).toBe("");
      });

      it("should handle special characters in keys", () => {
        // This would need to be added to mock translations
        // For now, test that it doesn't crash
        expect(() => {
          t("special.chars!@#", "en");
        }).not.toThrow();
      });

      it("should handle very long keys", () => {
        const longKey = "a".repeat(1000);
        expect(() => {
          t(longKey, "en");
        }).not.toThrow();
      });

      it("should handle very long variable values", () => {
        const longValue = "a".repeat(1000);
        expect(() => {
          t("withVars", "en", { name: longValue });
        }).not.toThrow();
      });
    });
  });

  describe("error classes", () => {
    it("should create I18nError with proper properties", () => {
      const error = new I18nError("Test message", "key", "en", { context: "test" });
      expect(error.message).toBe("Test message");
      expect(error.key).toBe("key");
      expect(error.language).toBe("en");
      expect(error.context).toEqual({ context: "test" });
      expect(error.name).toBe("I18nError");
    });

    it("should create TranslationNotFoundError with proper message", () => {
      const error = new TranslationNotFoundError("missing.key", "en");
      expect(error.message).toBe('Translation not found for key "missing.key" in language "en"');
      expect(error.key).toBe("missing.key");
      expect(error.language).toBe("en");
      expect(error.name).toBe("TranslationNotFoundError");
    });

    it("should create InvalidLanguageError with proper message", () => {
      const error = new InvalidLanguageError("invalid");
      expect(error.message).toBe('Unsupported language: "invalid"');
      expect(error.key).toBe("");
      expect(error.language).toBe("invalid");
      expect(error.name).toBe("InvalidLanguageError");
    });
  });
});
