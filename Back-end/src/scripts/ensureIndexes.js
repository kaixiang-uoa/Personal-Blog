/**
 * Ensure Indexes Script
 * 
 * This script creates optimal indexes for all collections based on common query patterns.
 * It analyzes the schema and creates appropriate indexes for frequently accessed fields.
 * 
 * Usage: 
 * node src/scripts/ensureIndexes.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from '../utils/logger.js';

// Import all models
import Post from '../models/Post.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Tag from '../models/Tag.js';
import Comment from '../models/Comment.js';
import Media from '../models/Media.js';
import Setting from '../models/Setting.js';
import SettingHistory from '../models/SettingHistory.js';

// Initialize config
dotenv.config();

/**
 * Create an index and log the result
 * @param {Model} model - Mongoose model
 * @param {Object} index - Index definition
 * @param {Object} options - Index options
 */
const createIndex = async (model, index, options = {}) => {
  try {
    await model.collection.createIndex(index, options);
    logger.info(`✅ Created index on ${model.collection.name}: ${JSON.stringify(index)}`);
  } catch (error) {
    if (error.code === 85) { // Index already exists
      logger.info(`ℹ️ Index already exists on ${model.collection.name}: ${JSON.stringify(index)}`);
    } else {
      logger.error(`❌ Error creating index on ${model.collection.name}: ${error.message}`);
    }
  }
};

/**
 * Ensure all necessary indexes exist for all collections
 */
const ensureIndexes = async () => {
  try {
    // Connect to MongoDB
    const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-blog';
    logger.info(`Connecting to MongoDB: ${dbUri}`);
    
    await mongoose.connect(dbUri);
    logger.info('✅ MongoDB connected for index creation');

    // Post indexes
    await createIndex(Post, { slug: 1 }, { unique: true }); // Fast lookup by slug
    await createIndex(Post, { status: 1 }); // Filter by status
    await createIndex(Post, { author: 1 }); // Filter by author
    await createIndex(Post, { categories: 1 }); // Filter by category
    await createIndex(Post, { tags: 1 }); // Filter by tag
    await createIndex(Post, { publishedAt: -1 }); // Sort by publish date
    await createIndex(Post, { updatedAt: -1 }); // Sort by update date
    await createIndex(Post, { viewCount: -1 }); // Sort by popularity
    await createIndex(Post, { title: "text", content: "text", excerpt: "text" }); // Text search

    // User indexes
    await createIndex(User, { email: 1 }, { unique: true }); // Fast lookup by email
    await createIndex(User, { username: 1 }, { unique: true }); // Fast lookup by username
    await createIndex(User, { role: 1 }); // Filter by role

    // Category indexes
    await createIndex(Category, { slug: 1 }, { unique: true }); // Fast lookup by slug
    await createIndex(Category, { parent: 1 }); // Find child categories
    await createIndex(Category, { name: 1 }); // Sort by name

    // Tag indexes
    await createIndex(Tag, { slug: 1 }, { unique: true }); // Fast lookup by slug
    await createIndex(Tag, { name: 1 }); // Sort by name

    // Comment indexes
    await createIndex(Comment, { post: 1 }); // Find comments for a post
    await createIndex(Comment, { user: 1 }); // Find comments by a user
    await createIndex(Comment, { parentComment: 1 }); // Find replies to a comment
    await createIndex(Comment, { createdAt: -1 }); // Sort by creation date

    // Media indexes
    await createIndex(Media, { type: 1 }); // Filter by media type
    await createIndex(Media, { uploadedBy: 1 }); // Filter by uploader
    await createIndex(Media, { createdAt: -1 }); // Sort by creation date

    // Setting indexes
    await createIndex(Setting, { key: 1 }, { unique: true }); // Fast lookup by key
    await createIndex(Setting, { group: 1 }); // Group settings

    // SettingHistory indexes
    await createIndex(SettingHistory, { key: 1 }); // Filter by setting key
    await createIndex(SettingHistory, { createdAt: -1 }); // Sort by creation date

    logger.info('✅ All indexes created successfully');
  } catch (error) {
    logger.error(`❌ Error ensuring indexes: ${error.message}`);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    logger.info('MongoDB disconnected');
  }
};

// Run the function
ensureIndexes(); 