/**
 * Upload Logging Utility
 *
 * This module provides utility functions for logging upload-related events
 * and debugging information.
 *
 * @module utils/uploadLogger
 */

/**
 * Log upload request details
 * @param {Object} req - Express request object
 */
export const logUploadRequest = (req) => {
  console.log('Upload request received:', {
    files: req.files ? req.files.map((f) => ({
      originalname: f.originalname,
      mimetype: f.mimetype,
      size: f.size,
      key: f.key,
      location: f.location,
    })) : 'No files',
    body: req.body,
    user: req.user ? { id: req.user.id } : 'No user',
  });
};

/**
 * Log file processing details
 * @param {Object} file - File object
 */
export const logFileProcessing = (file) => {
  console.log('Processing file:', {
    originalname: file.originalname,
    key: file.key,
    size: file.size,
    mimetype: file.mimetype,
    location: file.location,
  });
};

/**
 * Log upload error
 * @param {Error} error - Error object
 */
export const logUploadError = (error) => {
  console.error('Upload error:', error);
};