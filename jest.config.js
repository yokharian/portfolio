module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  moduleFileExtensions: ["ts", "js", "json"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/.astro/",
    "/coverage/",
    "/src/assets/js/",
    "/src/public/",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/.astro/",
    "/src/assets/js/",
    "/src/public/",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  verbose: true,
};
