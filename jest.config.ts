import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/src/scripts'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
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
    '/src/public/assets/js/'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/_site/',
    '/.cache/',
    '/src/public/assets/js/'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  verbose: true
};

export default config;
