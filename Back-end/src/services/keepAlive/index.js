import { Cron } from 'croner';
import axios from 'axios';
import ConfigManager from './config.js';
import PingRecord from '../../models/PingRecord.js';

class KeepAliveService {
  constructor() {
    this.cronJob = null;
    this.isLiving = false;  // server alive status
    this.lastPingResult = null;  // last ping result
  }

  async start() {
    if (this.cronJob && this.cronJob.isRunning()) {
      console.log('Keep-Alive service is already running');
      return;
    }

    try {
      console.log('Starting Keep-Alive service...');
      
      const config = ConfigManager.getConfig();
      
      // deep debug: remove options object, use the simplest constructor
      // this can help us determine if the problem is in options, especially timezone
      this.cronJob = new Cron(
        config.interval,
        async () => {
          console.log(`Cron job tick at ${new Date().toISOString()}`);
          await this.performPing();
        }
      );

      console.log('Keep-Alive service started successfully');
      console.log('Next run:', this.cronJob.nextRun());
      
      // initial ping
      await this.performPing();
      
    } catch (error) {
      console.error('Failed to start Keep-Alive service:', error);
      throw error;
    }
  }

  async stop() {
    if (!this.cronJob || this.cronJob.isStopped()) {
      console.log('Keep-Alive service is not running or already stopped');
      return;
    }

    try {
      this.cronJob.stop();
      // this.cronJob = null; // don't set object to null, otherwise the state will be lost
      console.log('Keep-Alive service stopped successfully');
    } catch (error) {
      console.error('Failed to stop Keep-Alive service:', error);
      throw error;
    }
  }

  // add: update interval and restart service
  async updateInterval(minutes) {
    try {
      console.log(`Updating interval to ${minutes} minutes...`);
      
      // validate minutes - limit to 14 minutes to avoid Render sleep
      if (minutes < 1 || minutes > 14) {
        throw new Error('Interval must be between 1 and 14 minutes to avoid Render sleep state');
      }
      
      // update interval
      const newCronExpression = ConfigManager.minutesToCron(minutes);
      ConfigManager.setInterval(newCronExpression);
      
      // if service is running, restart to apply new interval
      if (this.cronJob && this.cronJob.isRunning()) {
        console.log('Restarting service with new interval...');
        await this.stop();
        await this.start();
      }
      
      console.log(`Interval updated successfully to ${minutes} minutes (${newCronExpression})`);
      return true;
    } catch (error) {
      console.error('Failed to update interval:', error);
      throw error;
    }
  }

  async performPing() {
    const startTime = Date.now();
    const config = ConfigManager.getConfig();
    
    try {
      console.log('Performing ping to:', config.targetUrl);
      
      const response = await axios.get(config.targetUrl, {
        timeout: 10000
      });
      
      const duration = Date.now() - startTime;
      const success = response.status >= 200 && response.status < 300;
      
      // update server alive status - only 200 means server is alive
      this.isLiving = response.status === 200;  // only 200 means server is alive
      this.lastPingResult = {
        timestamp: new Date(),
        status: response.status,
        duration,
        success,
        isLiving: this.isLiving
      };
      
      // save to database
      await PingRecord.create({
        timestamp: new Date(),
        status: response.status,
        duration,
        success,
        isLiving: this.isLiving  // save alive status to database
      });
      
      console.log(`Ping successful: ${response.status} (${duration}ms) - Server is ${this.isLiving ? 'LIVING' : 'SLEEPING'}`);
      
    } catch (error) {
      const duration = Date.now() - startTime;
      const status = error.response?.status || 0;
      
      // update server alive status - set to false when failed
      this.isLiving = false;
      this.lastPingResult = {
        timestamp: new Date(),
        status,
        duration,
        success: false,
        isLiving: false
      };
      
      // save failed record to database
      await PingRecord.create({
        timestamp: new Date(),
        status,
        duration,
        success: false,
        isLiving: false
      });
      
      console.error(`Ping failed: ${error.message} (${duration}ms) - Server is SLEEPING`);
    }
  }

  getStatus() {
    const config = ConfigManager.getConfig();
    
    if (!this.cronJob) {
      return {
        isRunning: false,  // Croner task status
        isLiving: this.isLiving,  // server alive status
        nextRun: null,
        isStopped: true,
        isBusy: false,
        lastPingResult: this.lastPingResult,
        config: {
          interval: config.interval,
          intervalMinutes: ConfigManager.cronToMinutes(config.interval),
          targetUrl: config.targetUrl,
          timezone: config.timezone
        }
      };
    }

    return {
      isRunning: this.cronJob.isRunning(),  // Croner official status
      isLiving: this.isLiving,  // your custom status
      isStopped: this.cronJob.isStopped(),
      isBusy: this.cronJob.isBusy(),
      nextRun: this.cronJob.nextRun(),
      previousRun: this.cronJob.previousRun(),
      currentRun: this.cronJob.currentRun(),
      msToNext: this.cronJob.msToNext(),
      pattern: this.cronJob.getPattern(),
      lastPingResult: this.lastPingResult,
      config: {
        interval: config.interval,
        intervalMinutes: ConfigManager.cronToMinutes(config.interval),
        targetUrl: config.targetUrl,
        timezone: config.timezone
      }
    };
  }
}

// create singleton instance
const service = new KeepAliveService();

export default service; 