/**
 * AWS S3 configuration
 *
 * handles file upload and storage configuration
 */

import AWS from 'aws-sdk';
import { validateS3Config } from '../utils/s3ConfigValidator.js';
import { logger } from '../utils/logger.js';

// AWS S3 configuration
const s3Config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1',
};

// S3 bucket configuration
const bucketConfig = {
  bucketName: process.env.AWS_S3_BUCKET,
  region: process.env.AWS_REGION || 'us-east-1',
};

// Initialize S3 client
let s3;

// Only initialize S3 if not in test environment and AWS credentials are provided
if (process.env.NODE_ENV !== 'test' && process.env.AWS_ACCESS_KEY_ID) {
  try {
    // validate S3 configuration
    validateS3Config(s3Config, bucketConfig);

    // create S3 instance
    s3 = new AWS.S3(s3Config);

    logger.info('S3 client initialized successfully');
  } catch (error) {
    logger.error(`Failed to initialize S3 client: ${error.message}`);
    s3 = null;
  }
} else {
  logger.info('S3 client not initialized (test environment or missing credentials)');
  s3 = null;
}

export { s3, s3Config, bucketConfig };
