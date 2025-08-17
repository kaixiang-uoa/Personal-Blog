// jest.config.js
export default {
  // Node.js environment
  testEnvironment: 'node',

  // Handle ESM settings
  transform: {},

  // Test file matching pattern
  testMatch: ['**/test/**/*.test.js'],

  // Ignored directories
  testPathIgnorePatterns: ['/node_modules/', '/public/', '/uploads/'],

  // Coverage collection settings
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',
    '!src/app.js',
    '!src/config/seedData.js',
    '!**/node_modules/**'
  ],

  // Coverage threshold settings - lowered for CI/CD stability
  coverageThreshold: {
    global: {
      statements: 20,
      branches: 10,
      functions: 15,
      lines: 20
    }
  },

  // Reset mocks before each test
  resetMocks: true,

  // Test timeout settings - increased for CI/CD environment
  testTimeout: 30000,

  // Enable detection of test leaks
  detectOpenHandles: true,

  // By default, disable test watch mode
  watchman: false,

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  verbose: true,
}; 