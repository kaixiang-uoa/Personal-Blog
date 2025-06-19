/**
 * Keep Alive Service
 * 
 * This service maintains the blog's availability by periodically sending ping requests.
 * It supports both automatic and manual ping operations, with state persistence in MongoDB.
 */

import { config } from './config.js';
import router from './router.js';
import cron from 'node-cron';
import axios from 'axios';
import schedule from 'node-schedule';
import PingRecord from "../../models/SchedulerStatus.js";
import mongoose from 'mongoose';

// Logger for keep alive service
const logger = {
  service: (message, data = {}) => {
    console.log(`[KeepAlive:Service] ${message}`, data);
  },
  ping: (message, data = {}) => {
    console.log(`[KeepAlive:Ping] ${message}`, data);
  },
  error: (message, error) => {
    console.error(`[KeepAlive:Error] ${message}`, {
      message: error.message,
      stack: error.stack,
      ...(error.response && {
        status: error.response.status,
        data: error.response.data
      })
    });
  },
  info: (message, data = {}) => {
    console.info(`[KeepAlive:Info] ${message}`, data);
  },
  warn: (message, data = {}) => {
    console.warn(`[KeepAlive:Warn] ${message}`, data);
  }
};

class KeepAliveService {
  constructor() {
    this.isRunning = false;
    this.cronJob = null;
    this.nextPingTime = null;
    this.isManualPingInProgress = false;
    this.manualPingCooldown = 5000; // 5 second cooldown period after manual ping
    this.config = {
      ...config,
      enabled: config.enabled,
      defaultInterval: config.defaultInterval
    };
    this.lastPingTime = null;
    this.lastPingStatus = null;
    this.lastPingError = null;
  }

  /**
   * Initialize service when server starts
   * Perform initial ping, set enabled state, and start node-cron
   */
  async initializeService() {
    try {
      logger.service('Performing initial ping for service initialization', {});
      
      // 1. set enabled state
      this.config.enabled = true;
      
      // 2. perform initial ping
      const pingResult = await this.ping();
      
      // 3. directly set cron job
      const cronExpression = `0 */${this.config.defaultInterval / 60000} * * * *`;
      this.scheduler = schedule.scheduleJob(cronExpression, async () => {
        try {
          logger.ping('Executing scheduled ping', {});
          await this.ping();
        } catch (error) {
          logger.error('Scheduled ping failed', error);
        }
      });

      logger.service('Scheduling ping', { 
        interval: this.config.defaultInterval / 60000,
        cronExpression 
      });
      
      logger.service('Service initialized successfully', {
        enabled: this.config.enabled,
        isRunning: this.isRunning
      });
      
      return pingResult;
    } catch (error) {
      // if initialization fails, reset enabled state
      this.config.enabled = false;
      logger.error('Service initialization failed', error);
      throw error;
    }
  }

  /**
   * Initialize scheduler status
   */
  async initializeSchedulerStatus() {
    try {
      // check if there are recent ping records
      const lastPing = await PingRecord.findOne().sort({ timestamp: -1 });
      
      if (!lastPing) {
        // if no records, create an initial record
        await PingRecord.create({
          timestamp: new Date(),
          status: null,
          duration: 0,
          type: 'initial',
          error: null
        });
      }

      logger.service('Scheduler status initialized', {
        enabled: this.config.enabled,
        isRunning: this.isRunning
      });
    } catch (error) {
      logger.error('Failed to initialize scheduler status', error);
      throw error;
    }
  }

  /**
   * Get current service status
   */
  async getStatus() {
    try {
      return {
        isRunning: this.isRunning,
        enabled: this.config.enabled,
        lastPingTime: this.lastPingTime,
        lastPingStatus: this.lastPingStatus,
        lastPingError: this.lastPingError,
        nextPingTime: this.nextPingTime,
        defaultInterval: this.config.defaultInterval
      };
    } catch (error) {
      logger.error('Failed to get status', error);
      throw error;
    }
  }

  /**
   * Update configuration
   */
  async updateConfig(newConfig) {
    try {
      // validate config
      if (newConfig.defaultInterval) {
        const minInterval = 60000; // 1 minute
        const maxInterval = 840000; // 14 minutes
        if (newConfig.defaultInterval < minInterval || newConfig.defaultInterval > maxInterval) {
          throw new Error(`Interval must be between ${minInterval} and ${maxInterval} milliseconds`);
        }
      }

      // update config
      this.config = {
        ...this.config,
        ...newConfig
      };

      // if service is running, need to restart to apply new config
      if (this.isRunning) {
        await this.stop();
        await this.start();
      }

      logger.service('Configuration updated', this.config);
      return this.config;
    } catch (error) {
      logger.error('Failed to update configuration', error);
      throw error;
    }
  }

  /**
   * Add ping history record
   */
  async addPingHistory(pingResult) {
    try {
      // check database connection status
      if (mongoose.connection.readyState !== 1) {
        logger.error('Database not connected', { readyState: mongoose.connection.readyState });
        throw new Error('Database not connected');
      }

      const record = await PingRecord.create({
        timestamp: pingResult.timestamp,
        status: pingResult.status,
        duration: pingResult.duration,
        type: pingResult.type,
        error: pingResult.error,
        isRunning: pingResult.isRunning,
        enabled: pingResult.enabled
      });

      logger.service('Ping history added', pingResult);
      return record;
    } catch (error) {
      logger.error('Failed to add ping history', error);
      throw error;
    }
  }

  /**
   * Stop the keep alive service
   * Cancels scheduled pings and updates service state
   */
  async stop() {
    if (this.scheduler) {
      this.scheduler.cancel();
      this.scheduler = null;
    }

    this.nextPingTime = null;
    this.config.enabled = false;  // service stopped, must set enabled to false
    logger.service('Service stopped', { config });
  }

  /**
   * Start the keep-alive service
   */
  async start() {
    try {
      // check database connection
      if (mongoose.connection.readyState !== 1) {
        logger.error('Database not connected', { readyState: mongoose.connection.readyState });
        throw new Error('Database not connected');
      }

      // ensure config exists
      if (!this.config) {
        throw new Error('Service configuration is not initialized');
      }

      // only perform initial ping if config is enabled
      if (this.config.enabled) {
        logger.service('Performing initial ping after startup', {});
        
        try {
          await this.ping();
          logger.service('Initial ping successful', {});
        } catch (error) {
          logger.warn('Initial ping failed, but service will continue running', error);
        }
      }

      // only schedule ping if config is enabled
      if (this.config.enabled) {
        const cronExpression = `0 */${this.config.defaultInterval / 60000} * * * *`;
        this.scheduler = schedule.scheduleJob(cronExpression, async () => {
          try {
            logger.ping('Executing scheduled ping', {});
            await this.ping();
          } catch (error) {
            logger.error('Scheduled ping failed', error);
          }
        });

        logger.service('Scheduling ping', { 
          interval: this.config.defaultInterval / 60000,
          cronExpression 
        });
      }

      this.config.enabled = true;  // service started, must set enabled to true
      logger.service('Service started with scheduled pings', { config: this.config });
    } catch (error) {
      logger.error('Failed to start service', error);
      throw error;
    }
  }

  /**
   * Schedule the ping task using node-cron
   * Handles automatic ping scheduling and rescheduling based on manual pings
   */
  async schedulePing() {
    if (!config.enabled) return;

    const minutes = Math.floor(config.defaultInterval / (60 * 1000));
    const safeMinutes = Math.max(1, minutes);
    const cronExpression = `0 */${safeMinutes} * * * *`;
    
    logger.service('Scheduling ping', { interval: safeMinutes, cronExpression });
    
    const now = new Date();
    this.nextPingTime = new Date(now.getTime() + (safeMinutes * 60 * 1000));
    
    this.cronJob = cron.schedule(cronExpression, async () => {
      // Skip if manual ping is in progress
      if (this.isManualPingInProgress) {
        logger.info('Scheduled ping skipped - manual ping in progress');
        return;
      }

      // Only check rescheduling if service is enabled
      if (config.enabled && this.nextPingTime) {
        const timeSinceLastManualPing = Date.now() - this.nextPingTime.getTime();

        // If last manual ping was too recent, reschedule
        if (timeSinceLastManualPing < config.defaultInterval) {
          const newNextPingTime = new Date(this.nextPingTime.getTime() + config.defaultInterval);
          this.nextPingTime = newNextPingTime;
          logger.info('Rescheduling next ping due to recent manual ping', {
            lastManualPingTime: this.nextPingTime,
            timeSinceLastManualPing,
            newNextPingTime
          });
          return;
        }
      }

      try {
        logger.ping('Executing scheduled ping');
        const result = await this.ping();
        logger.ping('Scheduled ping successful', {
          status: result.status,
          duration: result.duration,
          timestamp: result.timestamp
        });
      } catch (error) {
        logger.error('Scheduled ping failed', error);
        
        if (this.nextPingTime) {
          logger.service('Too many consecutive failures, restarting service');
          await this.stop();
          await this.start();
        }
      } finally {
        const nextTime = new Date();
        this.nextPingTime = new Date(nextTime.getTime() + (safeMinutes * 60 * 1000));
        logger.service('Next ping scheduled', { nextPingTime: this.nextPingTime });
      }
    });

    this.cronJob.on('error', (error) => {
      logger.error('Cron job error', error);
      this.schedulePing();
    });
  }

  /**
   * Manually trigger ping with priority
   * Handles manual ping requests and updates scheduling accordingly
   */
  async manualPing() {
    try {
      // process manual ping
      const result = await this.ping();
      
      // update next ping time
      if (this.config.enabled) {
        const now = new Date();
        let interval = this.config.defaultInterval;
        
        // ensure interval is not greater than max limit
        if (interval > this.config.maxInterval) {
          interval = this.config.maxInterval;
        }
        
        // calculate next ping time
        const nextPing = new Date(now.getTime() + interval);
        
        // ensure time difference is not greater than max limit
        if (nextPing.getTime() - now.getTime() > this.config.maxInterval) {
          nextPing.setTime(now.getTime() + this.config.maxInterval);
        }
        
        this.nextPingTime = nextPing;
        logger.info('Updated next ping time after manual ping', {
          currentTime: now,
          nextPingTime: this.nextPingTime,
          interval: interval,
          maxInterval: this.config.maxInterval
        });
      }
      
      return result;
    } catch (error) {
      logger.error('Manual ping failed', error);
      throw error;
    }
  }

  /**
   * Perform ping request
   */
  async ping() {
    const startTime = Date.now();
    try {
      logger.ping('Sending ping request', { targetUrl: this.config.targetUrl });

      const response = await axios.get(this.config.targetUrl);
      const duration = Date.now() - startTime;

      // set isRunning based on response status
      this.isRunning = response.status === 200;

      const pingResult = {
        timestamp: new Date(),
        status: response.status,
        isRunning: this.isRunning,
        enabled: this.config.enabled,
        duration,
        type: 'auto',
        error: null
      };

      // update status
      this.lastPingTime = pingResult.timestamp;
      console.log('lastPingTime', this.lastPingTime);
      this.lastPingStatus = pingResult.status;
      this.lastPingError = null;

      await this.addPingHistory(pingResult);
      logger.ping('Ping completed', pingResult);

      return pingResult;
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage = error.response ? 
        `HTTP Error: ${error.response.status} - ${error.response.statusText}` : 
        `Network Error: ${error.message}`;

      // set isRunning to false when ping fails
      this.isRunning = false;

      const pingResult = {
        timestamp: new Date(),
        status: error.response?.status,
        duration,
        type: 'auto',
        error: errorMessage,
        isRunning: this.isRunning,
        enabled: this.config.enabled
      };

      // update status
      this.lastPingTime = pingResult.timestamp;
      this.lastPingStatus = pingResult.status;
      this.lastPingError = errorMessage;

      await this.addPingHistory(pingResult);
      logger.error('Ping failed', error);

      throw error;
    }
  }
}

// Create singleton instance
const service = new KeepAliveService();

// if service is enabled, node-cron will start the service automatically
if (config.enabled) {
  logger.info('Auto-starting service', { config });
  service.start();
}

// Export functions for controller use
export const startService = () => service.start();
export const stopService = () => service.stop();
export const ping = () => service.ping();
export const getStatus = () => service.getStatus();
export const updateConfig = (newConfig) => service.updateConfig(newConfig);
export const initializeService = () => service.initializeService();

export {
  service,
  router,
};


/**
 * Alternative Implementation Approaches:
 * 
 * 1. Mutex Pattern (For scenarios requiring strict mutual exclusion)
 * class KeepAliveService {
 *   constructor() {
 *     this.isManualPingInProgress = false;
 *     this.manualPingLock = new Promise(resolve => resolve());
 *   }
 * 
 *   async ping() {
 *     if (this.isManualPingInProgress) {
 *       await this.manualPingLock;
 *     }
 *     // Execute ping logic
 *   }
 * 
 *   async manualPing() {
 *     this.isManualPingInProgress = true;
 *     let resolveLock;
 *     this.manualPingLock = new Promise(resolve => {
 *       resolveLock = resolve;
 *     });
 *     
 *     try {
 *       const result = await this.ping();
 *       return result;
 *     } finally {
 *       this.isManualPingInProgress = false;
 *       resolveLock();
 *     }
 *   }
 * }
 * 
 * 2. Queue Pattern (For scenarios requiring strict sequential execution)
 * class KeepAliveService {
 *   constructor() {
 *     this.pingQueue = [];
 *     this.isProcessing = false;
 *   }
 * 
 *   async processQueue() {
 *     if (this.isProcessing) return;
 *     this.isProcessing = true;
 * 
 *     while (this.pingQueue.length > 0) {
 *       const { type, resolve } = this.pingQueue.shift();
 *       try {
 *         const result = await this.ping();
 *         resolve(result);
 *       } catch (error) {
 *         resolve({ error });
 *       }
 *     }
 * 
 *     this.isProcessing = false;
 *   }
 * 
 *   async manualPing() {
 *     return new Promise(resolve => {
 *       this.pingQueue.unshift({ type: 'manual', resolve });
 *       this.processQueue();
 *     });
 *   }
 * 
 *   async scheduledPing() {
 *     return new Promise(resolve => {
 *       this.pingQueue.push({ type: 'scheduled', resolve });
 *       this.processQueue();
 *     });
 *   }
 * }
 * 
 * Current implementation uses Priority Flag Pattern because:
 * 1. Simple and straightforward, easy to understand and maintain
 * 2. Meets current system requirements (personal use, low concurrency)
 * 3. Low implementation cost, no need for complex locking mechanisms or queue management
 * 4. Easy to add cooldown periods and state checks
 * 
 * If system scale increases, consider migrating to other patterns:
 * - Use Mutex Pattern if strict mutual exclusion is needed
 * - Use Queue Pattern if strict sequential execution is needed
 */
