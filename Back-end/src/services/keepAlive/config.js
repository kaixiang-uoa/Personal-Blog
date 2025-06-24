// default config
const defaultConfig = {
  interval: '*/10 * * * *', // every 10 minutes
  targetUrl: process.env.KEEP_ALIVE_TARGET_URL || 'http://localhost:3001/api/v1/health',
  timezone: 'Australia/Adelaide',
  maxRetries: 3
};

// dynamic config object
let dynamicConfig = { ...defaultConfig };

// config manager class
class ConfigManager {
  static getConfig() {
    return { ...dynamicConfig };
  }

  static updateConfig(newConfig) {
    dynamicConfig = { ...dynamicConfig, ...newConfig };
    return this.getConfig();
  }

  static getInterval() {
    return dynamicConfig.interval;
  }

  static setInterval(interval) {
    dynamicConfig.interval = interval;
    return this.getConfig();
  }

  // convert minutes to cron expression
  static minutesToCron(minutes) {
    // limit the minimum to 1 minute, maximum to 14 minutes (avoid Render 15 minutes sleep)
    if (minutes < 1) minutes = 1;
    if (minutes > 14) minutes = 14;
    return `*/${minutes} * * * *`;
  }

  // convert cron expression to minutes
  static cronToMinutes(cronExpression) {
    const match = cronExpression.match(/^\*\/(\d+) \* \* \* \*$/);
    const minutes = match ? parseInt(match[1]) : 10;
    // ensure the returned minutes are in the valid range
    if (minutes < 1) return 1;
    if (minutes > 14) return 14;
    return minutes;
  }

  // testing valid interval for keepAlive
  static isValidInterval(minutes) {
    return minutes >= 1 && minutes <= 14;
  }
}

export default ConfigManager; 