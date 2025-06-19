// jest.config.js
export default {
  // Node.js environment
  testEnvironment: 'node',
  
  // Handle ESM settings
  transform: {},
  extensionsToTreatAsEsm: ['.js'],
  
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
  
  // Coverage threshold settings
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 40,
      functions: 50,
      lines: 50
    }
  },
  
  // Reset mocks before each test
  resetMocks: true,
  
  // Test timeout settings (default is 5000ms, here increased to 10000ms)
  testTimeout: 10000,
  
  // Enable detection of test leaks
  detectOpenHandles: true,
  
  // By default, disable test watch mode
  watchman: false,
  
  // Experimental support for ESM
  // Node.js ESM support
  // https://jestjs.io/docs/ecmascript-modules
  experimental: {
    // Configuration for Node.js support for ESM
    useExperimentalESM: true
  },
  
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  
  verbose: true,
}; 