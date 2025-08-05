/**
 * File Naming Utility Functions
 *
 * This module provides utility functions for generating standardized file names
 * and handling file naming strategies.
 *
 * @module utils/fileNaming
 */

import crypto from 'crypto';

/**
 * Generate a random string of specified length
 * @param {number} length - Length of the random string
 * @returns {string} Random string
 */
const generateRandomString = (length = 8) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

/**
 * Generate a standardized file name based on configuration
 * @param {Object} options - File naming options
 * @param {string} options.originalName - Original file name
 * @param {string} [options.prefix='media/'] - File name prefix
 * @param {boolean} [options.timestamp=true] - Whether to include timestamp
 * @param {boolean} [options.randomString=true] - Whether to include random string
 * @returns {string} Generated file name
 */
export const generateFileName = ({
  originalName,
  prefix = 'media/',
  timestamp = true,
  randomString = true,
}) => {
  // Get file extension from original name
  const ext = originalName.split('.').pop().toLowerCase();

  // Generate timestamp if needed
  const timestampStr = timestamp ? `-${Date.now()}` : '';

  // Generate random string if needed
  const randomStr = randomString ? `-${generateRandomString()}` : '';

  // Combine all parts
  return `${prefix}${timestampStr}${randomStr}.${ext}`;
};

/**
 * Extract file extension from file name
 * @param {string} fileName - File name
 * @returns {string} File extension
 */
export const getFileExtension = (fileName) => {
  return fileName.split('.').pop().toLowerCase();
};

/**
 * Validate file name format
 * @param {string} fileName - File name to validate
 * @returns {boolean} Whether the file name is valid
 */
export const isValidFileName = (fileName) => {
  // Basic validation rules
  const rules = [
    // No empty file names
    fileName.length > 0,
    // No special characters except for allowed ones
    /^[a-zA-Z0-9\-_./]+$/.test(fileName),
    // Maximum length check
    fileName.length <= 255,
  ];

  return rules.every((rule) => rule === true);
};