/**
 * test database configure
 *
 * use mongodb-memory-server to create an in-memory MongoDB instance,
 * for unit tests and integration tests, avoid affecting actual database
 */

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

// in-memory MongoDB instance
let mongoServer;

/**
 * connect to test database
 */
export const connectTestDB = async () => {
  try {
    // Set test environment variables
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-purposes-only-32-chars';
    process.env.JWT_EXPIRES_IN = '1h';
    process.env.JWT_EXPIRE = '1h';
    process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-key-for-testing-32-chars';
    process.env.JWT_REFRESH_EXPIRES_IN = '7d';
    process.env.JWT_REFRESH_EXPIRE = '7d';

    // create in-memory MongoDB instance
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    logger.info(`Connecting to test MongoDB at ${mongoUri}`);

    // connect to MongoDB
    await mongoose.connect(mongoUri);

    logger.info('Successfully connected to test MongoDB');
  } catch (error) {
    logger.error(`Failed to connect to test MongoDB: ${error.message}`);
    throw error;
  }
};

/**
 * disconnect from test database
 */
export const disconnectTestDB = async () => {
  try {
    await mongoose.disconnect();

    if (mongoServer) {
      await mongoServer.stop();
    }

    logger.info('Disconnected from test MongoDB');
  } catch (error) {
    logger.error(`Failed to disconnect from test MongoDB: ${error.message}`);
    throw error;
  }
};

/**
 * clear all collections
 */
export const clearDatabase = async () => {
  try {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }

    logger.info('Test database cleared');
  } catch (error) {
    logger.error(`Failed to clear test database: ${error.message}`);
    throw error;
  }
};
