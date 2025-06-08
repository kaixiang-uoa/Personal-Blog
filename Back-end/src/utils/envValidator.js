/**
 * environment variable validation utility
 * 
 * used to validate necessary environment variables exist and are valid
 */

import logger from '../config/logger.js';

/**
 * required environment variables list
 */
const REQUIRED_VARIABLES = [
  'PORT',
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_EXPIRE',
];

/**
 * sensitive operation environment variables list (missing will cause security risks)
 */
const SECURITY_VARIABLES = [
  'JWT_SECRET',
  'JWT_EXPIRE',
];

/**
 * validate single environment variable
 * 
 * @param {String} name - environment variable name
 * @param {Boolean} isSecurity - whether it is a security related variable
 * @returns {Boolean} whether the variable is valid
 */
const validateVariable = (name, isSecurity = false) => {
  const value = process.env[name];
  
  if (!value) {
    const message = isSecurity
      ? `安全风险: 缺少关键环境变量 ${name}`
      : `缺少环境变量 ${name}`;
    
    logger.error(message);
    return false;
  }
  
  // check JWT_SECRET strength
  if (name === 'JWT_SECRET' && value.length < 32) {
    logger.warn(`Security risk: JWT_SECRET is too short, at least 32 characters are recommended`);
  }
  
  return true;
};

/**
 * validate all necessary environment variables
 * 
 * @returns {Object} validate result, contains whether success and error information
 */
export const validateEnvironment = () => {
  logger.info('正在验证环境变量...');
  
  let missingCount = 0;
  let securityIssues = 0;
  
  // validate necessary variables
  REQUIRED_VARIABLES.forEach(variable => {
    const isSecurityVariable = SECURITY_VARIABLES.includes(variable);
    const isValid = validateVariable(variable, isSecurityVariable);
    
    if (!isValid) {
      missingCount++;
      if (isSecurityVariable) {
        securityIssues++;
      }
    }
  });
  
  // check recommended variables
  if (!process.env.NODE_ENV) {
    logger.warn('NODE_ENV is not set, default to development');
  }
  
  if (!process.env.ALLOWED_ORIGINS) {
    logger.warn('ALLOWED_ORIGINS is not set, default to *');
  }
  
  if (missingCount === 0) {
    logger.info('Environment variable validation passed');
    return { 
      success: true 
    };
  } else {
    const message = `Environment variable validation failed: missing ${missingCount} necessary variables, including ${securityIssues} security related variables`;
    logger.error(message);
    
    return { 
      success: false, 
      message,
      missingCount,
      securityIssues
    };
  }
};

/**
 * validate environment variables, if there are serious problems, throw an exception to stop the startup
 * used to check when the application starts
 */
export const validateEnvironmentOrExit = () => {
  const result = validateEnvironment();
  
  if (!result.success && result.securityIssues > 0) {
    logger.error('There are security risks, the application will exit. Please set all necessary environment variables and restart.');
    process.exit(1);
  }
  
  return result;
}; 