// 默认配置
const defaultConfig = {
  interval: '*/10 * * * *', // 每 10 分钟
  targetUrl: process.env.KEEP_ALIVE_TARGET_URL || 'http://localhost:3001/api/v1/health',
  timezone: 'Australia/Adelaide',
  maxRetries: 3
};

// 动态配置对象
let dynamicConfig = { ...defaultConfig };

// 配置管理类
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

  // 将分钟数转换为 cron 表达式
  static minutesToCron(minutes) {
    // 限制最小1分钟，最大14分钟（避免Render 15分钟sleep）
    if (minutes < 1) minutes = 1;
    if (minutes > 14) minutes = 14;
    return `*/${minutes} * * * *`;
  }

  // 将 cron 表达式转换为分钟数
  static cronToMinutes(cronExpression) {
    const match = cronExpression.match(/^\*\/(\d+) \* \* \* \*$/);
    const minutes = match ? parseInt(match[1]) : 10;
    // 确保返回的分钟数在有效范围内
    if (minutes < 1) return 1;
    if (minutes > 14) return 14;
    return minutes;
  }

  // 验证间隔是否有效
  static isValidInterval(minutes) {
    return minutes >= 1 && minutes <= 14;
  }
}

export default ConfigManager; 