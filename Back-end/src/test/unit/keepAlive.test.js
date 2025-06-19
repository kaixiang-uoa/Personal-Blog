import { describe, it, before, after, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import { service as keepAliveService } from '../../services/keepAlive/index.js';
import { config } from '../../services/keepAlive/config.js';
import mongoose from 'mongoose';

// test config
const testConfig = {
  defaultInterval: 60 * 1000, // 1min
  targetUrl: 'http://localhost:3001/api/v1/health',
  enabled: true
};

/**
 * KeepAlive Service Admin Panel Test Suite
 * 
 * 注意：这些测试假设后端服务已经启动，并且 node-cron 正在运行。
 * 测试用例设计考虑了以下因素：
 * 1. 不干扰正在运行的 node-cron 服务
 * 2. 测试用例与定时任务不会冲突
 * 3. 验证 admin-panel 操作的正确性
 */
describe('KeepAlive Service - Admin Panel Operations', function() {
  this.timeout(10000);

  // save original config
  const originalConfig = { ...config };
  
  before(async () => {
    console.log('\n=== KeepAlive Service Admin Panel Test Suite Started ===\n');
    console.log('注意：测试假设后端服务已启动，node-cron 正在运行');
    await mongoose.connect('mongodb://localhost:27017/test');
  });

  after(async () => {
    console.log('\n=== KeepAlive Service Admin Panel Test Suite Completed ===\n');
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // 保存当前配置，但不修改运行中的服务状态
    Object.assign(config, testConfig);
    console.log('\n--- Test Case Setup ---');
    console.log('Current Config:', {
      interval: config.defaultInterval,
      enabled: config.enabled,
      targetUrl: config.targetUrl
    });
  });

  afterEach(async () => {
    // 恢复原始配置，但不停止服务
    Object.assign(config, originalConfig);
    console.log('--- Test Case Cleanup ---\n');
  });

  describe('Configuration Management', () => {
    it('should update configuration and reflect changes in status', async () => {
      // 1. 获取当前运行状态
      const initialStatus = await keepAliveService.getStatus();
      console.log('Current service status:', initialStatus);

      // 2. 更新配置（不影响正在运行的服务）
      const newConfig = {
        enabled: false,
        defaultInterval: 120 * 1000 // 2 minutes
      };
      await keepAliveService.updateConfig(newConfig);
      
      // 3. 验证配置更新
      const updatedStatus = await keepAliveService.getStatus();
      console.log('Updated status:', updatedStatus);

      expect(updatedStatus.enabled).to.equal(newConfig.enabled);
      expect(updatedStatus.defaultInterval).to.equal(newConfig.defaultInterval);
    });

    it('should validate interval constraints', async () => {
      const invalidConfig = {
        defaultInterval: 30 * 1000 // 30 seconds, too short
      };
      
      try {
        await keepAliveService.updateConfig(invalidConfig);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('Interval must be between');
      }
    });
  });

  describe('Service Control', () => {
    it('should handle service state changes through admin-panel', async () => {
      // 1. 获取当前状态
      const currentStatus = await keepAliveService.getStatus();
      console.log('Current service status:', currentStatus);
      
      // 2. 通过 updateConfig 禁用服务
      await keepAliveService.updateConfig({ enabled: false });
      const disabledStatus = await keepAliveService.getStatus();
      console.log('Service disabled through admin-panel:', disabledStatus);
      
      // 3. 通过 updateConfig 重新启用服务
      await keepAliveService.updateConfig({ enabled: true });
      const enabledStatus = await keepAliveService.getStatus();
      console.log('Service enabled through admin-panel:', enabledStatus);

      // 验证状态变化
      expect(disabledStatus.enabled).to.be.false;
      expect(enabledStatus.enabled).to.be.true;
    });

    it('should handle service state changes through direct stop/start', async () => {
      // 1. 获取当前状态
      const currentStatus = await keepAliveService.getStatus();
      console.log('Current service status:', currentStatus);
      
      // 2. 直接调用 stop()
      await keepAliveService.stop();
      const stoppedStatus = await keepAliveService.getStatus();
      console.log('Service stopped directly:', stoppedStatus);

      // 3. 直接调用 start()
      await keepAliveService.start();
      const startedStatus = await keepAliveService.getStatus();
      console.log('Service started directly:', startedStatus);
      
      // 验证状态变化
      expect(stoppedStatus.enabled).to.be.false;  // stop() 应该设置 enabled = false
      expect(startedStatus.enabled).to.be.true;   // start() 应该设置 enabled = true
    });

    it('should handle admin-panel sync after direct stop', async () => {
      // 1. 直接停止服务
      await keepAliveService.stop();
      const stoppedStatus = await keepAliveService.getStatus();
      console.log('Service stopped directly:', stoppedStatus);
      
      // 2. 模拟 admin-panel 连接，获取当前状态
      const currentStatus = await keepAliveService.getStatus();
      console.log('Current status for admin-panel:', currentStatus);
      
      // 3. 如果 admin-panel 显示 enabled = true，应该调用 start()
      if (currentStatus.enabled) {
        await keepAliveService.start();
        const startedStatus = await keepAliveService.getStatus();
        console.log('Service started after admin-panel sync:', startedStatus);
        expect(startedStatus.enabled).to.be.true;
      }
    });
  });

  describe('Manual Ping Operations', () => {
    it('should handle manual ping requests correctly', async () => {
      // 1. 执行手动 ping（与定时任务并行）
      const pingResult = await keepAliveService.manualPing();
      console.log('Manual ping result:', pingResult);

      // 2. 验证结果
      expect(pingResult).to.have.property('timestamp');
      expect(pingResult).to.have.property('status');
      expect(pingResult).to.have.property('duration');
      expect(pingResult).to.have.property('isRunning');
      expect(pingResult).to.have.property('enabled');

      // 3. 验证状态更新
      const status = await keepAliveService.getStatus();
      expect(status.lastPingTime).to.deep.equal(pingResult.timestamp);
      expect(status.lastPingStatus).to.equal(pingResult.status);
    });
  });

  describe('Status Reporting', () => {
    it('should provide accurate service status information', async () => {
      // 1. 获取当前运行状态
      const currentStatus = await keepAliveService.getStatus();
      console.log('Current service status:', currentStatus);
      
      // 2. 执行一次 ping（与定时任务并行）
      await keepAliveService.ping();

      // 3. 获取更新后的状态
      const updatedStatus = await keepAliveService.getStatus();
      console.log('Updated status:', updatedStatus);

      // 4. 验证状态信息完整性
      expect(updatedStatus).to.have.all.keys([
        'isRunning',
        'enabled',
        'lastPingTime',
        'lastPingStatus',
        'lastPingError',
        'nextPingTime',
        'defaultInterval'
      ]);

      // 5. 验证状态值类型
      expect(updatedStatus.isRunning).to.be.a('boolean');
      expect(updatedStatus.enabled).to.be.a('boolean');
      expect(updatedStatus.lastPingTime).to.be.a('Date');
      expect(updatedStatus.lastPingStatus).to.be.a('number');
      expect(updatedStatus.defaultInterval).to.be.a('number');
    });
  });
}); 