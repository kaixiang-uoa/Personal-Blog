const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const connectDB = require('./db');

// Import models
const User = require('../models/User');
const Post = require('../models/Post');
const Category = require('../models/Category');
const Tag = require('../models/Tag');
const Setting = require('../models/Setting');

// Load environment variables
dotenv.config();

const idMap = new Map();

const loadJsonData = (filename) => {
  try {
    const dataPath = path.join(__dirname, '../data', `${filename}.json`);
    if (!fs.existsSync(dataPath)) {
      console.log(`⚠️ ${filename}.json file does not exist, skipping import`);
      return [];
    }

    const jsonData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(jsonData);

    return data.map(item => {
      const { _id, ...rest } = item;
      if (_id) {
        const newId = new mongoose.Types.ObjectId();
        idMap.set(_id, newId);
        return { _id: newId, ...rest };
      }
      return rest;
    });
  } catch (error) {
    console.error(`⚠️ Error processing ${filename}.json file:`, error.message);
    return [];
  }
};

const processReferences = (data, refFields) => {
  return data.map(item => {
    const newItem = { ...item };
    refFields.forEach(field => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        if (newItem[parent] && newItem[parent][child]) {
          if (Array.isArray(newItem[parent][child])) {
            newItem[parent][child] = newItem[parent][child].map(id =>
              idMap.has(id) ? idMap.get(id) : id
            );
          } else if (idMap.has(newItem[parent][child])) {
            newItem[parent][child] = idMap.get(newItem[parent][child]);
          }
        }
      } else if (Array.isArray(newItem[field])) {
        newItem[field] = newItem[field].map(id => {
          if (typeof id === 'string') {
            if (id.startsWith('[') && id.endsWith(']')) {
              try {
                const parsedIds = JSON.parse(id.replace(/'/g, '"'));
                return Array.isArray(parsedIds)
                  ? parsedIds.map(subId => idMap.has(subId) ? idMap.get(subId) : subId)
                  : (idMap.has(id) ? idMap.get(id) : id);
              } catch (e) {
                return idMap.has(id) ? idMap.get(id) : id;
              }
            }
            return idMap.has(id) ? idMap.get(id) : id;
          }
          return id;
        });

        if (newItem[field].some(Array.isArray)) {
          newItem[field] = newItem[field].flat();
        }
      } else if (newItem[field]) {
        if (typeof newItem[field] === 'string' && idMap.has(newItem[field])) {
          newItem[field] = idMap.get(newItem[field]);
        } else if (typeof newItem[field] === 'object' && newItem[field] !== null) {
          Object.keys(newItem[field]).forEach(key => {
            if ((key === 'userId' || key === 'id') && idMap.has(newItem[field][key])) {
              newItem[field][key] = idMap.get(newItem[field][key]);
            }
          });
        }
      }
    });

    return newItem;
  });
};

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Category.deleteMany({});
    await Tag.deleteMany({});
    await Post.deleteMany({});
    await Setting.deleteMany({});

    console.log('✅ Database cleared');

    const userData = loadJsonData('users');
    const categoryData = loadJsonData('categories');
    const tagData = loadJsonData('tags');

    if (userData.length > 0) {
      await User.insertMany(userData);
      console.log(`✅ Imported ${userData.length} users`);
    }

    if (categoryData.length > 0) {
      await Category.insertMany(categoryData);
      console.log(`✅ Imported ${categoryData.length} categories`);
    }

    if (tagData.length > 0) {
      await Tag.insertMany(tagData);
      console.log(`✅ Imported ${tagData.length} tags`);
    }

    let postData = loadJsonData('posts');
    postData = processReferences(postData, ['author', 'categories', 'tags']);

    // ✅ 👇 转换 publishedAt 和 updatedAt 为 Date 类型
    postData = postData.map(post => {
      if (typeof post.publishedAt === 'string') {
        post.publishedAt = new Date(post.publishedAt);
      }
      if (typeof post.updatedAt === 'string') {
        post.updatedAt = new Date(post.updatedAt);
      }
      return post;
    });

    if (postData.length > 0) {
      await Post.insertMany(postData);
      console.log(`✅ Imported ${postData.length} posts`);
    }

    let settingData = loadJsonData('settings');
    if (settingData.length > 0) {
      settingData = processReferences(settingData, ['updatedBy']);
      settingData = settingData.map(item => {
        if (item.updatedBy && typeof item.updatedBy === 'string' && !mongoose.Types.ObjectId.isValid(item.updatedBy)) {
          const { updatedBy, ...rest } = item;
          return rest;
        }
        return item;
      });

      await Setting.insertMany(settingData);
      console.log(`✅ Imported ${settingData.length} settings`);
    }

    console.log('🎉 Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    console.error('Error details:', error.stack);
    process.exit(1);
  }
};

seedDatabase();
