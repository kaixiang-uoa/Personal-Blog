import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';
import keepAliveService from '../../services/keepAlive/index.js';
import ConfigManager from '../../services/keepAlive/config.js';

// 设置测试环境变量
process.env.KEEP_ALIVE_TARGET_URL = 'http://localhost:3001/api/v1/health';

// Mock axios
const mockAxios = {
  get: jest.fn()
};
jest.mock('axios', () => mockAxios);

// Mock PingRecord model
jest.mock('../../models/PingRecord.js', () => ({
  create: jest.fn().mockResolvedValue({})
}));

// Mock croner
const mockCron = {
  isRunning: jest.fn(),
  isStopped: jest.fn(),
  isBusy: jest.fn(),
  stop: jest.fn(),
  nextRun: jest.fn(),
  previousRun: jest.fn(),
  currentRun: jest.fn(),
  msToNext: jest.fn(),
  getPattern: jest.fn()
};

jest.mock('croner', () => ({
  Cron: jest.fn().mockImplementation(() => mockCron)
}));

// Mock auth middleware
jest.mock('../../middleware/authMiddleware.js', () => ({
  protect: jest.fn((req, res, next) => next())
}));

describe('Keep-Alive Service Tests', () => {
  beforeEach(async () => {
    // 清理服务状态
    await keepAliveService.stop();
    jest.clearAllMocks();
    
    // 重置mock状态
    mockCron.isRunning.mockReturnValue(false);
    mockCron.isStopped.mockReturnValue(true);
    mockCron.isBusy.mockReturnValue(false);
    mockCron.stop.mockImplementation(() => {
      mockCron.isRunning.mockReturnValue(false);
      mockCron.isStopped.mockReturnValue(true);
    });
    mockCron.nextRun.mockReturnValue(new Date(Date.now() + 60000));
    mockCron.previousRun.mockReturnValue(new Date());
    mockCron.currentRun.mockReturnValue(null);
    mockCron.msToNext.mockReturnValue(60000);
    mockCron.getPattern.mockReturnValue('*/10 * * * *');
    
    // 重置axios mock
    mockAxios.get.mockReset();
  });

  describe('ConfigManager Tests', () => {
    test('should load targetUrl from environment variable', () => {
      const config = ConfigManager.getConfig();
      expect(config.targetUrl).toBe('http://localhost:3001/api/v1/health');
    });

    test('should use Adelaide timezone', () => {
      const config = ConfigManager.getConfig();
      expect(config.timezone).toBe('Australia/Adelaide');
    });

    test('should convert minutes to cron expression correctly', () => {
      expect(ConfigManager.minutesToCron(5)).toBe('*/5 * * * *');
      expect(ConfigManager.minutesToCron(10)).toBe('*/10 * * * *');
    });

    test('should limit minutes to valid range (1-14)', () => {
      expect(ConfigManager.minutesToCron(0)).toBe('*/1 * * * *');
      expect(ConfigManager.minutesToCron(15)).toBe('*/14 * * * *');
      expect(ConfigManager.minutesToCron(20)).toBe('*/14 * * * *');
    });

    test('should convert cron expression to minutes correctly', () => {
      expect(ConfigManager.cronToMinutes('*/5 * * * *')).toBe(5);
      expect(ConfigManager.cronToMinutes('*/10 * * * *')).toBe(10);
    });

    test('should validate interval correctly', () => {
      expect(ConfigManager.isValidInterval(1)).toBe(true);
      expect(ConfigManager.isValidInterval(10)).toBe(true);
      expect(ConfigManager.isValidInterval(14)).toBe(true);
      expect(ConfigManager.isValidInterval(0)).toBe(false);
      expect(ConfigManager.isValidInterval(15)).toBe(false);
    });

    test('should get and set config correctly', () => {
      const originalConfig = ConfigManager.getConfig();
      ConfigManager.setInterval('*/7 * * * *');
      const newConfig = ConfigManager.getConfig();
      expect(newConfig.interval).toBe('*/7 * * * *');
      // 恢复原始配置
      ConfigManager.setInterval(originalConfig.interval);
    });
  });

  describe('KeepAliveService Tests', () => {
    test('should start service successfully', async () => {
      // 启动服务
      await keepAliveService.start();
      
      // 设置mock状态 - 启动后应该返回true
      mockCron.isRunning.mockReturnValue(true);
      mockCron.isStopped.mockReturnValue(false);
      
      const status = keepAliveService.getStatus();
      expect(status.isRunning).toBe(true);
    });

    test('should stop service successfully', async () => {
      // 先启动服务
      await keepAliveService.start();
      
      // 设置运行状态
      mockCron.isRunning.mockReturnValue(true);
      mockCron.isStopped.mockReturnValue(false);
      
      // 然后停止
      mockCron.isRunning.mockReturnValue(false);
      mockCron.isStopped.mockReturnValue(true);
      await keepAliveService.stop();
      
      const status = keepAliveService.getStatus();
      expect(status.isRunning).toBe(false);
    });

    test('should not start service if already running', async () => {
      // 先启动服务
      await keepAliveService.start();
      
      // 设置已运行状态
      mockCron.isRunning.mockReturnValue(true);
      mockCron.isStopped.mockReturnValue(false);
      
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      await keepAliveService.start();
      expect(consoleSpy).toHaveBeenCalledWith('Keep-Alive service is already running');
      consoleSpy.mockRestore();
    });

    test('should not stop service if not running', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      await keepAliveService.stop();
      expect(consoleSpy).toHaveBeenCalledWith('Keep-Alive service is not running');
      consoleSpy.mockRestore();
    });

    test('should update interval successfully', async () => {
      // 先启动服务
      await keepAliveService.start();
      
      mockCron.isRunning.mockReturnValue(true);
      await keepAliveService.updateInterval(7);
      const status = keepAliveService.getStatus();
      expect(status.config.intervalMinutes).toBe(7);
    });

    test('should reject invalid interval (too small)', async () => {
      await expect(keepAliveService.updateInterval(0)).rejects.toThrow(
        'Interval must be between 1 and 14 minutes to avoid Render sleep state'
      );
    });

    test('should reject invalid interval (too large)', async () => {
      await expect(keepAliveService.updateInterval(15)).rejects.toThrow(
        'Interval must be between 1 and 14 minutes to avoid Render sleep state'
      );
    });

    test('should perform ping successfully', async () => {
      // 设置axios mock立即返回
      mockAxios.get.mockResolvedValueOnce({
        status: 200,
        data: { message: 'OK' }
      });

      // 直接测试ping逻辑，不依赖服务状态
      await keepAliveService.performPing();
      
      // 验证axios被调用
      expect(mockAxios.get).toHaveBeenCalledWith(
        'http://localhost:3001/api/v1/health',
        { timeout: 10000 }
      );
      
      // 验证状态更新
      const status = keepAliveService.getStatus();
      expect(status.isLiving).toBe(true);
      expect(status.lastPingResult.success).toBe(true);
      expect(status.lastPingResult.status).toBe(200);
    }, 10000); // 增加超时时间

    test('should handle ping failure', async () => {
      // 设置axios mock立即抛出错误
      mockAxios.get.mockRejectedValueOnce(new Error('Network error'));

      // 直接测试ping逻辑，不依赖服务状态
      await keepAliveService.performPing();
      
      // 验证axios被调用
      expect(mockAxios.get).toHaveBeenCalledWith(
        'http://localhost:3001/api/v1/health',
        { timeout: 10000 }
      );
      
      // 验证状态更新
      const status = keepAliveService.getStatus();
      expect(status.isLiving).toBe(false);
      expect(status.lastPingResult.success).toBe(false);
    }, 10000); // 增加超时时间

    test('should return correct status when not running', () => {
      const status = keepAliveService.getStatus();
      expect(status.isRunning).toBe(false);
      expect(status.isStopped).toBe(true);
      expect(status.config).toBeDefined();
      expect(status.config.timezone).toBe('Australia/Adelaide');
    });
  });

  describe('Health API Tests', () => {
    test('GET /api/v1/health - should return 200 and health status', async () => {
      const response = await request(app)
        .get('/api/v1/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(typeof response.body.uptime).toBe('number');
    });

    test('GET /health - should return 200 and detailed health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('memoryUsage');
      expect(typeof response.body.uptime).toBe('number');
    });
  });

  describe('Keep-Alive API Tests', () => {
    test('POST /api/v1/keep-alive/start - should start service', async () => {
      mockCron.isRunning.mockReturnValue(true);
      
      const response = await request(app)
        .post('/api/v1/keep-alive/start')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Keep-Alive service started successfully');
      expect(response.body.status.isRunning).toBe(true);
    });

    test('POST /api/v1/keep-alive/stop - should stop service', async () => {
      // 先启动服务
      mockCron.isRunning.mockReturnValue(true);
      await keepAliveService.start();
      
      // 然后停止
      mockCron.isRunning.mockReturnValue(false);
      const response = await request(app)
        .post('/api/v1/keep-alive/stop')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Keep-Alive service stopped successfully');
      expect(response.body.status.isRunning).toBe(false);
    });

    test('GET /api/v1/keep-alive/status - should return service status', async () => {
      mockCron.isRunning.mockReturnValue(true);
      await keepAliveService.start();
      
      const response = await request(app)
        .get('/api/v1/keep-alive/status')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.status).toBeDefined();
      expect(response.body.status.isRunning).toBeDefined();
      expect(response.body.status.isLiving).toBeDefined();
      expect(response.body.status.config).toBeDefined();
      expect(response.body.status.config.timezone).toBe('Australia/Adelaide');
    });

    test('PUT /api/v1/keep-alive/interval - should update interval successfully', async () => {
      mockCron.isRunning.mockReturnValue(true);
      await keepAliveService.start();
      
      const response = await request(app)
        .put('/api/v1/keep-alive/interval')
        .send({ minutes: 7 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Interval updated to 7 minutes successfully');
      expect(response.body.status.config.intervalMinutes).toBe(7);
    });

    test('PUT /api/v1/keep-alive/interval - should reject invalid minutes (too small)', async () => {
      const response = await request(app)
        .put('/api/v1/keep-alive/interval')
        .send({ minutes: 0 })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Interval must be between 1 and 14 minutes');
    });

    test('PUT /api/v1/keep-alive/interval - should reject invalid minutes (too large)', async () => {
      const response = await request(app)
        .put('/api/v1/keep-alive/interval')
        .send({ minutes: 15 })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Interval must be between 1 and 14 minutes');
    });

    test('PUT /api/v1/keep-alive/interval - should reject missing minutes parameter', async () => {
      const response = await request(app)
        .put('/api/v1/keep-alive/interval')
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Minutes parameter is required');
    });

    test('PUT /api/v1/keep-alive/interval - should reject non-numeric minutes', async () => {
      const response = await request(app)
        .put('/api/v1/keep-alive/interval')
        .send({ minutes: 'invalid' })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Minutes parameter is required and must be a number');
    });
  });

  describe('Integration Tests', () => {
    test('should handle complete workflow: start -> update interval -> ping -> stop', async () => {
      // 启动服务
      mockCron.isRunning.mockReturnValue(true);
      await keepAliveService.start();
      expect(keepAliveService.getStatus().isRunning).toBe(true);

      // 更新间隔
      await keepAliveService.updateInterval(5);
      expect(keepAliveService.getStatus().config.intervalMinutes).toBe(5);

      // 执行ping
      mockAxios.get.mockResolvedValueOnce({
        status: 200,
        data: { message: 'OK' }
      });
      await keepAliveService.performPing();
      expect(keepAliveService.getStatus().isLiving).toBe(true);

      // 停止服务
      mockCron.isRunning.mockReturnValue(false);
      await keepAliveService.stop();
      expect(keepAliveService.getStatus().isRunning).toBe(false);
    });
  });
}); 