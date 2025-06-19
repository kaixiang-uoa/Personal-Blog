/**
 * Keep Alive Service Configuration
 * 
 * This module exports the configuration for the Keep Alive Service.
 * The service periodically pings a target URL to keep it alive.
 * 
 * Environment Variables:
 * - KEEP_ALIVE_TARGET_URL: The URL to ping (default: http://localhost:3001/api/v1/health)
 * - KEEP_ALIVE_DEFAULT_INTERVAL: Default interval in milliseconds (default: 5 minutes)
 * - KEEP_ALIVE_MIN_INTERVAL: Minimum allowed interval in milliseconds (default: 1 minute)
 * - KEEP_ALIVE_MAX_INTERVAL: Maximum allowed interval in milliseconds (default: 14 minutes)
 * - KEEP_ALIVE_ENABLED: Whether the service is enabled by default (default: false)
 */

// Configuration object
export const config = {
  // Default interval in milliseconds (5 minutes)
  defaultInterval: parseInt(process.env.KEEP_ALIVE_DEFAULT_INTERVAL) || 5 * 60 * 1000,
  
  // Minimum allowed interval (1 minute)
  minInterval: parseInt(process.env.KEEP_ALIVE_MIN_INTERVAL) || 60 * 1000,
  
  // Maximum allowed interval (14 minutes)
  maxInterval: parseInt(process.env.KEEP_ALIVE_MAX_INTERVAL) || 14 * 60 * 1000,
  
  // Target URL to ping
  targetUrl: process.env.KEEP_ALIVE_TARGET_URL || 'http://localhost:3001/api/v1/health',
  
  // Service enabled by default
  enabled: process.env.KEEP_ALIVE_ENABLED === 'true' || false
};

/**
 * Validate the configuration
 * @throws {Error} If the configuration is invalid
 */
export function validateConfig() {
  if (config.defaultInterval < config.minInterval || config.defaultInterval > config.maxInterval) {
    throw new Error(`Default interval must be between ${config.minInterval} and ${config.maxInterval} milliseconds`);
  }
  
  try {
    new URL(config.targetUrl);
  } catch (error) {
    throw new Error(`Invalid target URL: ${error.message}`);
  }
}

// Validate configuration on module load
validateConfig();
