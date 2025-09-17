// Jest setup file for TypeScript tests
// This file is run before each test file

// Set up any global test configuration here
// For example, you can configure test timeouts, mocks, etc.

// Increase timeout for integration tests
jest.setTimeout(10000);

// Mock console methods to reduce noise in tests
const originalConsole = console;
global.console = {
  ...originalConsole,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Restore console for actual error reporting
afterAll(() => {
  global.console = originalConsole;
});
