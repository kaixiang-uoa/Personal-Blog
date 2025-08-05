import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './logger.js';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// for storing ID mapping
const idMap = new Map();

const loadJsonData = (filename) => {
  try {
    const dataPath = path.join(__dirname, '../data', `${filename}.json`);
    if (!fs.existsSync(dataPath)) {
      logger.info(`⚠️ ${filename}.json file does not exist, skipping import`);
      return [];
    }

    const jsonData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(jsonData);

    return data.map((item) => {
      const { _id, ...rest } = item;
      if (_id) {
        const newId = new mongoose.Types.ObjectId();
        idMap.set(_id, newId);
        return { _id: newId, ...rest };
      }
      return rest;
    });
  } catch (error) {
    logger.error(`⚠️ Error processing ${filename}.json file:`, error.message);
    return [];
  }
};

const processReferences = (data, refFields) => {
  return data.map((item) => {
    const newItem = { ...item };
    refFields.forEach((field) => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        if (newItem[parent] && newItem[parent][child]) {
          if (Array.isArray(newItem[parent][child])) {
            newItem[parent][child] = newItem[parent][child].map((id) =>
              idMap.has(id) ? idMap.get(id) : id,
            );
          } else if (idMap.has(newItem[parent][child])) {
            newItem[parent][child] = idMap.get(newItem[parent][child]);
          }
        }
      } else if (Array.isArray(newItem[field])) {
        newItem[field] = newItem[field].map((id) =>
          idMap.has(id) ? idMap.get(id) : id,
        );
      } else if (newItem[field] && idMap.has(newItem[field])) {
        newItem[field] = idMap.get(newItem[field]);
      }
    });
    return newItem;
  });
};

export const importInitialData = async (models) => {
  const { Category, Tag, Post, Setting } = models;

  try {
    // load and import other data
    const categories = loadJsonData('categories');
    const tags = loadJsonData('tags');
    const posts = loadJsonData('posts');
    const settings = loadJsonData('settings');

    // process reference relations
    const processedCategories = processReferences(categories, ['parent']);
    const processedTags = processReferences(tags, ['posts']);
    const processedPosts = processReferences(posts, [
      'author',
      'categories',
      'tags',
    ]);
    const processedSettings = processReferences(settings, []);

    // import data in order
    if (processedCategories.length > 0) {
      await Category.insertMany(processedCategories);
      logger.info(`✅ Imported ${processedCategories.length} categories`);
    }

    if (processedTags.length > 0) {
      await Tag.insertMany(processedTags);
      logger.info(`✅ Imported ${processedTags.length} tags`);
    }

    if (processedPosts.length > 0) {
      await Post.insertMany(processedPosts);
      logger.info(`✅ Imported ${processedPosts.length} posts`);
    }

    if (processedSettings.length > 0) {
      await Setting.insertMany(processedSettings);
      logger.info(`✅ Imported ${processedSettings.length} settings`);
    }

    logger.info('✅ Initial data import completed');
  } catch (error) {
    logger.error('❌ Error importing initial data:', error);
    throw error;
  }
};
