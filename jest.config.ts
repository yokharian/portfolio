import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/src/tests'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/_site/',
    '/.cache/',
    '/coverage/',
    '/src/assets/js/'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/_site/',
    '/.cache/',
    '/src/assets/js/'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  verbose: true
};

export default config;
