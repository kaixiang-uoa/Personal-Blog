/**
 * S3 URL Generation Utility
 *
 * This module provides utility functions for generating S3 URLs,
 * including signed URLs for private file access.
 *
 * @module utils/s3UrlGenerator
 */

import { s3, bucketConfig } from "../config/s3.js";

/**
 * Generate a signed URL for accessing a private S3 object
 * @param {string} key - S3 object key
 * @param {Object} options - URL generation options
 * @param {number} [options.expiresIn] - URL expiration time in seconds (defaults to 3600)
 * @param {string} [options.responseContentDisposition] - Content-Disposition header value
 * @returns {Promise<string>} Signed URL
 */
export const generateSignedUrl = async (key, options = {}) => {
  const { expiresIn = 3600, responseContentDisposition } = options;

  const params = {
    Bucket: bucketConfig.bucketName,
    Key: key,
    Expires: expiresIn,
  };

  // Add Content-Disposition if specified
  if (responseContentDisposition) {
    params.ResponseContentDisposition = responseContentDisposition;
  }

  try {
    return await s3.getSignedUrlPromise("getObject", params);
  } catch (error) {
    throw new Error(`Failed to generate signed URL: ${error.message}`);
  }
};

/**
 * Generate a public URL for an S3 object
 * @param {string} key - The S3 object key
 * @returns {string} The public URL for the object
 */
export const generatePublicUrl = key => {
  if (!key) {
    throw new Error("Key is required to generate public URL");
  }

  // Clean the key by removing leading slash
  const cleanKey = key.startsWith("/") ? key.slice(1) : key;

  // Use virtual-hosted style URL with HTTPS
  const url = `https://${bucketConfig.bucketName}.s3.${bucketConfig.region}.amazonaws.com/${cleanKey}`;

  console.log("Generated S3 URL:", {
    bucket: bucketConfig.bucketName,
    region: bucketConfig.region,
    key: cleanKey,
    url,
  });

  return url;
};

/**
 * Generate a temporary download URL for a file
 * @param {string} key - S3 object key
 * @param {string} filename - Original filename
 * @param {number} [expiresIn] - URL expiration time in seconds (defaults to 3600)
 * @returns {Promise<string>} Download URL
 */
export const generateDownloadUrl = async (key, filename, expiresIn) => {
  const contentDisposition = `attachment; filename="${filename}"`;
  return generateSignedUrl(key, {
    expiresIn,
    responseContentDisposition: contentDisposition,
  });
};

/**
 * Check if a URL is a valid S3 URL
 * @param {string} url - URL to check
 * @returns {boolean} Whether the URL is a valid S3 URL
 */
export const isValidS3Url = url => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.endsWith(".amazonaws.com");
  } catch {
    return false;
  }
};
