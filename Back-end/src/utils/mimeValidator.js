/**
 * MIME Type Validation Utility
 *
 * This module provides utility functions for validating MIME types
 * and handling file type restrictions.
 *
 * @module utils/mimeValidator
 */

/**
 * Allowed MIME types for file uploads
 * @type {Object}
 */
export const ALLOWED_MIME_TYPES = {
  // Images
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/gif": [".gif"],
  "image/webp": [".webp"],
  "image/svg+xml": [".svg"],

  // Documents
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    ".xlsx",
  ],
  "application/vnd.ms-powerpoint": [".ppt"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [
    ".pptx",
  ],
};

/**
 * Get file extension from MIME type
 * @param {string} mimeType - MIME type
 * @returns {string[]} Array of file extensions
 */
export const getExtensionsFromMimeType = mimeType => {
  return ALLOWED_MIME_TYPES[mimeType] || [];
};

/**
 * Get MIME type from file extension
 * @param {string} extension - File extension
 * @returns {string|null} MIME type or null if not found
 */
export const getMimeTypeFromExtension = extension => {
  const ext = extension.toLowerCase();
  for (const [mimeType, extensions] of Object.entries(ALLOWED_MIME_TYPES)) {
    if (extensions.includes(ext)) {
      return mimeType;
    }
  }
  return null;
};

/**
 * Check if MIME type is allowed
 * @param {string} mimeType - MIME type to check
 * @returns {boolean} Whether the MIME type is allowed
 */
export const isAllowedMimeType = mimeType => {
  return mimeType in ALLOWED_MIME_TYPES;
};

/**
 * Create multer file filter function
 * @returns {Function} Multer file filter function
 */
export const createMulterFileFilter = () => {
  return (req, file, cb) => {
    if (isAllowedMimeType(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}`), false);
    }
  };
};

/**
 * Validate file type using both MIME type and extension
 * @param {Object} file - File object
 * @param {string} file.mimetype - File MIME type
 * @param {string} file.originalname - Original file name
 * @returns {boolean} Whether the file type is valid
 */
export const validateFileType = file => {
  const extension = file.originalname.split(".").pop().toLowerCase();
  const mimeType = file.mimetype;

  // Check if MIME type is allowed
  if (!isAllowedMimeType(mimeType)) {
    return false;
  }

  // Check if extension matches MIME type
  const allowedExtensions = getExtensionsFromMimeType(mimeType);
  return allowedExtensions.includes(`.${extension}`);
};
