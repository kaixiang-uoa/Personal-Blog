/**
 * AWS S3 Configuration
 * 
 * This file contains the configuration for AWS S3 service integration.
 * It exports the S3 client instance and related configuration settings.
 * 
 * The configuration includes:
 * - AWS credentials and region settings
 * - S3 bucket configuration
 * - Basic upload settings
 * - URL generation settings
 * 
 * @requires aws-sdk
 * @requires dotenv
 */

import { S3Client } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
import { ALLOWED_MIME_TYPES } from '../utils/mimeValidator.js';
import { validateS3Config } from '../utils/s3ConfigValidator.js';

// Load environment variables
dotenv.config();

// AWS S3 Configuration
const s3Config = {
  // AWS credentials and region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION || 'us-east-1',
  // S3 bucket configuration
  bucket: process.env.AWS_S3_BUCKET,
  // Basic upload settings
  upload: {
    // Maximum file size (10MB)
    maxFileSize: 10 * 1024 * 1024,
    // Use MIME types from mimeValidator
    allowedMimeTypes: Object.keys(ALLOWED_MIME_TYPES),
    // File naming configuration
    fileNaming: {
      prefix: 'media/',
      timestamp: true,
      randomString: true
    }
  },
  // URL generation settings
  url: {
    // URL expiration time for signed URLs (in seconds)
    signedUrlExpiration: 3600, // 1 hour
    // Whether to use HTTPS
    useHttps: true,
  },
};

// Log configuration and validate
validateS3Config(s3Config);

// Create S3 client instance
const s3 = new S3Client({
  credentials: s3Config.credentials,
  region: s3Config.region,
});

export { s3, s3Config }; 