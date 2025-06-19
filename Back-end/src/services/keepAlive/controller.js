/**
 * Keep Alive Service Controller
 * 
 * Handles HTTP requests for the Keep Alive service,
 * providing endpoints for configuration, status, and manual operations.
 */

import { service } from './index.js';

export class KeepAliveController {
  /**
   * Get current configuration
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getConfig(req, res) {
    try {
      const status = await service.getStatus();
      res.json({
        success: true,
        data: {
          interval: service.config.defaultInterval,
          enabled: status.enabled,
          isRunning: status.isRunning,
          targetUrl: service.config.targetUrl,
          lastPingTime: status.lastPingTime,
          lastPingStatus: status.lastPingStatus,
          lastPingError: status.lastPingError,
          nextPingTime: status.nextPingTime
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get configuration',
        error: error.message,
      });
    }
  }

  /**
   * Update configuration
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async updateConfig(req, res) {
    console.log('updateConfig', req.body);
    try {
      const { enabled, defaultInterval, interval } = req.body;
      const updatedConfig = await service.updateConfig({
        enabled: enabled,
        defaultInterval: defaultInterval ?? interval
      });
      res.json({
        success: true,
        data: updatedConfig
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update configuration',
        error: error.message
      });
    }
  }

  /**
   * Start the keep alive service
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async startService(req, res) {
    try {
      await service.start();
      const status = await service.getStatus();
      res.json({
        success: true,
        message: 'Service started successfully',
        data: status
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to start service',
        error: error.message
      });
    }
  }

  /**
   * Stop the keep alive service
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async stopService(req, res) {
    try {
      await service.stop();
      const status = await service.getStatus();
      res.json({
        success: true,
        message: 'Service stopped successfully',
        data: status
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to stop service',
        error: error.message
      });
    }
  }

  /**
   * Manually trigger ping
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async triggerPing(req, res) {
    try {
      const result = await service.manualPing();
      res.json({
        success: true,
        message: 'Ping triggered successfully',
        data: {
          timestamp: result.timestamp,
          status: result.status,
          duration: result.duration,
          type: result.type,
          error: result.error
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to trigger ping',
        error: error.message,
        data: {
          timestamp: new Date(),
          status: null,
          duration: 0,
          type: 'manual',
          error: error.message
        }
      });
    }
  }

  /**
   * Get service status
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getStatus(req, res) {
    try {
      const status = await service.getStatus();
      res.json({
        success: true,
        data: status
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get service status',
        error: error.message
      });
    }
  }
}
