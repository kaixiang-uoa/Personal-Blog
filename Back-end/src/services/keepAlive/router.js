/**
 * Keep Alive Service Router
 * 
 * API Endpoints:
 * GET  /config  - Get current service configuration
 * PUT /config  - Update service configuration
 * POST /start  - Start the keep alive service
 * POST /stop   - Stop the keep alive service
 * POST /ping   - Manually trigger a ping
 * GET  /status - Get current service status
 */

import express from 'express';
import { protect } from '../../middleware/authMiddleware.js';
import { KeepAliveController } from './controller.js';
import { config } from './config.js';

// Logger for keep alive service
const logger = {
  router: (message, data = {}) => {
    console.log(`[KeepAlive:Router] ${message}`, data);
  },
  error: (message, error) => {
    console.error(`[KeepAlive:Router:Error] ${message}`, {
      message: error.message,
      stack: error.stack
    });
  }
};

const router = express.Router();

/**
 * Get current service configuration
 * @route GET /config
 * @access Private
 * @returns {Object} Configuration object
 */
router.get('/config', protect, async (req, res) => {
  logger.router('GET /config - Request received', { user: req.user?.id });
  try {
    await KeepAliveController.getConfig(req, res);
  } catch (error) {
    logger.error('GET /config - Error', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get configuration',
      error: error.message
    });
  }
});

/**
 * Update service configuration
 * @route PUT /config
 * @access Private
 * @param {Object} req.body.interval - New ping interval in milliseconds
 * @param {boolean} req.body.enabled - Whether the service should be enabled
 * @returns {Object} Updated configuration
 */
router.put('/config', protect, async (req, res) => {
  logger.router('PUT /config - Request received', { 
    user: req.user?.id,
    body: req.body,
    currentConfig: {
      targetUrl: config.targetUrl,
      interval: config.defaultInterval,
      enabled: config.enabled
    }
  });
  try {
    await KeepAliveController.updateConfig(req, res);
  } catch (error) {
    logger.error('PUT /config - Error', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update configuration',
      error: error.message
    });
  }
});

/**
 * Start the keep alive service
 * @route POST /start
 * @access Private
 * @returns {Object} Service status
 */
router.post('/start', protect, async (req, res) => {
  logger.router('POST /start - Request received', { 
    user: req.user?.id,
    body: req.body 
  });
  try {
    await KeepAliveController.startService(req, res);
  } catch (error) {
    logger.error('POST /start - Error', error);
    res.status(500).json({
      success: false,
      message: 'Failed to start service',
      error: error.message
    });
  }
});

/**
 * Stop the keep alive service
 * @route POST /stop
 * @access Private
 * @returns {Object} Service status
 */
router.post('/stop', protect, async (req, res) => {
  logger.router('POST /stop - Request received', { 
    user: req.user?.id,
    body: req.body 
  });
  try {
    await KeepAliveController.stopService(req, res);
  } catch (error) {
    logger.error('POST /stop - Error', error);
    res.status(500).json({
      success: false,
      message: 'Failed to stop service',
      error: error.message
    });
  }
});

/**
 * Manually trigger a ping
 * @route POST /ping
 * @access Private
 * @returns {Object} Ping result
 */
router.post('/ping', protect, async (req, res) => {
  logger.router('POST /ping - Request received', { 
    user: req.user?.id,
    body: req.body,
    config: {
      targetUrl: config.targetUrl,
      interval: config.defaultInterval
    }
  });
  try {
    await KeepAliveController.triggerPing(req, res);
  } catch (error) {
    logger.error('POST /ping - Error', error);
    res.status(500).json({
      success: false,
      message: 'Failed to trigger ping',
      error: error.message
    });
  }
});

/**
 * Get current service status
 * @route GET /status
 * @access Private
 * @returns {Object} Service status
 */
router.get('/status', protect, async (req, res) => {
  logger.router('GET /status - Request received', { 
    user: req.user?.id,
    query: req.query 
  });
  try {
    await KeepAliveController.getStatus(req, res);
  } catch (error) {
    logger.error('GET /status - Error', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get service status',
      error: error.message
    });
  }
});

export default router;
