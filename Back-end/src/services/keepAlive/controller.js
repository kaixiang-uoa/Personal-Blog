/**
 * Keep Alive Service Controller
 * 
 * Handles HTTP requests for the Keep Alive service,
 * providing endpoints for configuration, status, and manual operations.
 */

import { config } from './config.js';
import { service } from './index.js';

// Logger for controller
const logger = {
  controller: (message, data = {}) => {
    console.log(`[KeepAlive:Controller] ${message}`, data);
  },
  error: (message, error) => {
    console.error(`[KeepAlive:Controller:Error] ${message}`, {
      message: error.message,
      stack: error.stack
    });
  }
};

export class KeepAliveController {
  /**
   * Get current configuration
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getConfig(req, res) {
    logger.controller('GetConfig - Request received');
    try {
      const status = await service.getStatus();
      const response = {
        success: true,
        data: {
          interval: service.config.defaultInterval,
          enabled: status.enabled,
          isRunning: status.isRunning,
          targetUrl: config.targetUrl,
          lastPingTime: status.lastPingTime,
          lastPingStatus: status.lastPingStatus,
          lastPingError: status.lastPingError,
          nextPingTime: status.nextPingTime
        },
      };
      logger.controller('GetConfig - Response', response);
      res.json(response);
    } catch (error) {
      logger.error('GetConfig - Error', error);
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
    logger.controller('UpdateConfig - Request received', { 
      body: req.body,
      currentConfig: {
        targetUrl: config.targetUrl,
        interval: config.defaultInterval,
        enabled: config.enabled
      }
    });
    try {
      const { enabled, defaultInterval, interval } = req.body;
      const updatedConfig = await service.updateConfig({
        enabled,
        defaultInterval: defaultInterval ?? interval
      });
      
      res.json({ 
        success: true, 
        data: updatedConfig 
      });
    } catch (error) {
      logger.error('UpdateConfig - Error', error);
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
    logger.controller('StartService - Request received', { body: req.body });
    try {
      await service.start();
      const status = await service.getStatus();
      logger.controller('StartService - Response', status);
      res.json({
        success: true,
        message: 'Service started successfully',
        data: status
      });
    } catch (error) {
      logger.error('StartService - Error', error);
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
    logger.controller('StopService - Request received', { body: req.body });
    try {
      await service.stop();
      const status = await service.getStatus();
      logger.controller('StopService - Response', status);
      res.json({
        success: true,
        message: 'Service stopped successfully',
        data: status
      });
    } catch (error) {
      logger.error('StopService - Error', error);
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
    logger.controller('TriggerPing - Request received', { 
      body: req.body,
      config: {
        targetUrl: config.targetUrl,
        interval: config.defaultInterval
      }
    });
    try {
      const result = await service.manualPing();
      logger.controller('TriggerPing - Response', result);
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
      logger.error('TriggerPing - Error', error);
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
    logger.controller('GetStatus - Request received', { query: req.query });
    try {
      const status = await service.getStatus();
      logger.controller('GetStatus - Response', status);
      res.json({
        success: true,
        data: status
      });
    } catch (error) {
      logger.error('GetStatus - Error', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get service status',
        error: error.message
      });
    }
  }
}
