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
    'frtjs/(.*)': '<rootDir>/src/$1/src/index'
  },
  globalSetup: './test/config/setup.cjs',
  globalTeardown: './test/config/teardown.cjs',
  testEnvironment: './test/config/puppeteer_environment.cjs'
}
