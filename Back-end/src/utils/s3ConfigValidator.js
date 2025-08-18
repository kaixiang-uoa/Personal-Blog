/**
 * S3 Configuration Validator
 *
 * This module provides utility functions for validating S3 configuration
 * and environment variables.
 *
 * @module utils/s3ConfigValidator
 */

/**
 * Validate S3 configuration and environment variables
 * @param {Object} config - S3 configuration object
 * @throws {Error} If validation fails
 */
export const validateS3Config = _config => {
  const requiredEnvVars = [
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "AWS_S3_BUCKET",
    "AWS_REGION",
  ];

  const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }

  // Validate bucket name
  if (process.env.AWS_S3_BUCKET) {
    const bucketName = process.env.AWS_S3_BUCKET;

    if (bucketName.includes(" ")) {
      throw new Error("Bucket name cannot contain spaces");
    }

    if (/[A-Z]/.test(bucketName)) {
      throw new Error("Bucket name must be lowercase");
    }

    if (bucketName.length < 3 || bucketName.length > 63) {
      throw new Error("Bucket name must be between 3 and 63 characters");
    }

    if (!/^[a-z0-9.-]+$/.test(bucketName)) {
      throw new Error(
        "Bucket name can only contain lowercase letters, numbers, dots, and hyphens"
      );
    }
  }
};

// Log S3 configuration details (with sensitive information masked)
// Currently unused but kept for future debugging needs
// const _logS3Config = (_config) => {
//   // Remove logging of configuration details
//   return true;
// };
