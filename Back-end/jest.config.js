// jest.config.js
export default {
  // 指定测试环境为Node.js
  testEnvironment: 'node',
  
  // 处理ES模块的设置
  transform: {},
  extensionsToTreatAsEsm: ['.js'],
  
  // 测试文件匹配模式
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  
  // 忽略的目录
  testPathIgnorePatterns: ['/node_modules/', '/public/', '/uploads/'],
  
  // 覆盖率收集设置
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',
    '!src/app.js',
    '!src/config/seedData.js',
    '!**/node_modules/**'
  ],
  
  // 覆盖率阈值设置
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 40,
      functions: 50,
      lines: 50
    }
  },
  
  // 在每次测试前重置模拟
  resetMocks: true,
  
  // 测试超时设置 (默认是5000ms，这里增加到10000ms)
  testTimeout: 10000,
  
  // 启用检测测试泄漏
  detectOpenHandles: true,
  
  // 默认情况下，禁用测试监视模式
  watchman: false,
  
  // 为ESM设置实验性支持
  // Node.js ESM支持
  // https://jestjs.io/docs/ecmascript-modules
  experimental: {
    // 需要Node.js支持ESM的配置
    useExperimentalESM: true
  }
}; 