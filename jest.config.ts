export default {
  collectCoverage: false,
  transform: {
    '^.+\\.ts$': [
      'ts-jest', {
        tsconfig: './tsconfig.json',
        diagnostics: false
      }
    ]
  },
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  preset: 'ts-jest',
  moduleNameMapper: {
    '@/test/(.*)': '<rootDir>/test/$1',
    '@frtjs/(.*)': '<rootDir>/packages/$1/src/index'
  },
  globalSetup: './test/config/setup.js',
  globalTeardown: './test/config/teardown.js',
  testEnvironment: './test/config/puppeteer_environment.js'
}
