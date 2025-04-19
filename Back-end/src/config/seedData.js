const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const connectDB = require('./db');

// 导入模型
const User = require('../models/User');
const Post = require('../models/Post');
const Category = require('../models/Category');
const Tag = require('../models/Tag');
const Setting = require('../models/Setting');

// 加载环境变量
dotenv.config();

// 创建新的 ObjectId 映射表，用于将 UUID 映射到 MongoDB 的 ObjectId
const idMap = new Map();

// 读取JSON数据文件并处理数据
const loadJsonData = (filename) => {
  try {
    const dataPath = path.join(__dirname, '../data', `${filename}.json`);
    
    // 检查文件是否存在
    if (!fs.existsSync(dataPath)) {
      console.log(`⚠️ ${filename}.json 文件不存在，跳过导入`);
      return [];
    }
    
    const jsonData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(jsonData);
    
    // 处理数据，移除不兼容的 _id 字段并创建映射
    return data.map(item => {
      // 创建一个新对象，不包含 _id
      const { _id, ...rest } = item;
      
      // 为每个原始 UUID 创建一个新的 MongoDB ObjectId 并存储映射关系
      if (_id) {
        const newId = new mongoose.Types.ObjectId();
        idMap.set(_id, newId);
        // 返回带有新 _id 的对象
        return { _id: newId, ...rest };
      }
      
      return rest;
    });
  } catch (error) {
    console.error(`⚠️ 处理 ${filename}.json 文件时出错:`, error.message);
    return [];
  }
};

// 处理引用关系
const processReferences = (data, refFields) => {
  return data.map(item => {
    const newItem = { ...item };
    
    // 处理每个引用字段
    refFields.forEach(field => {
      // 处理嵌套字段，如 'seo.keywords'
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        if (newItem[parent] && newItem[parent][child]) {
          // 如果是数组，处理数组中的每个元素
          if (Array.isArray(newItem[parent][child])) {
            newItem[parent][child] = newItem[parent][child].map(id => 
              idMap.has(id) ? idMap.get(id) : id
            );
          } 
          // 如果是单个值，直接处理
          else if (idMap.has(newItem[parent][child])) {
            newItem[parent][child] = idMap.get(newItem[parent][child]);
          }
        }
      } 
      // 处理数组字段，如 categories, tags
      else if (Array.isArray(newItem[field])) {
        newItem[field] = newItem[field].map(id => {
          // 处理字符串形式的数组
          if (typeof id === 'string') {
            // 尝试解析可能是字符串形式的数组
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
        
        // 展平可能的嵌套数组
        if (newItem[field].some(Array.isArray)) {
          newItem[field] = newItem[field].flat();
        }
      } 
      // 处理单个引用字段，如 author, updatedBy
      else if (newItem[field]) {
        if (typeof newItem[field] === 'string' && idMap.has(newItem[field])) {
          newItem[field] = idMap.get(newItem[field]);
        } 
        // 处理可能是对象的情况
        else if (typeof newItem[field] === 'object' && newItem[field] !== null) {
          // 如果字段是对象，检查对象中的 userId 或类似字段
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

// 清空数据库并导入新数据
const seedDatabase = async () => {
  try {
    // 连接数据库
    await connectDB();
    
    // 清空现有数据
    await User.deleteMany({});
    await Category.deleteMany({});
    await Tag.deleteMany({});
    await Post.deleteMany({});
    await Setting.deleteMany({});
    
    console.log('✅ 数据库已清空');
    
    // 加载JSON数据 - 先加载不依赖其他集合的数据
    const userData = loadJsonData('users');
    const categoryData = loadJsonData('categories');
    const tagData = loadJsonData('tags');
    
    // 导入用户数据
    if (userData.length > 0) {
      await User.insertMany(userData);
      console.log(`✅ 已导入 ${userData.length} 个用户`);
    }
    
    // 导入分类数据
    if (categoryData.length > 0) {
      await Category.insertMany(categoryData);
      console.log(`✅ 已导入 ${categoryData.length} 个分类`);
    }
    
    // 导入标签数据
    if (tagData.length > 0) {
      await Tag.insertMany(tagData);
      console.log(`✅ 已导入 ${tagData.length} 个标签`);
    }
    
    // 加载并处理依赖其他集合的数据
    let postData = loadJsonData('posts');
    postData = processReferences(postData, ['author', 'categories', 'tags']);
    
    // 导入文章数据
    if (postData.length > 0) {
      await Post.insertMany(postData);
      console.log(`✅ 已导入 ${postData.length} 篇文章`);
    }
    
    // 加载设置数据
    let settingData = loadJsonData('settings');
    
    // 如果 settings.json 存在，处理其中的引用关系
    if (settingData.length > 0) {
      // 处理设置数据中的 updatedBy 字段
      settingData = processReferences(settingData, ['updatedBy']);
      
      // 如果处理后仍有问题，可以尝试移除 updatedBy 字段
      settingData = settingData.map(item => {
        // 如果 updatedBy 不是 ObjectId 类型，则移除它
        if (item.updatedBy && typeof item.updatedBy === 'string' && !mongoose.Types.ObjectId.isValid(item.updatedBy)) {
          const { updatedBy, ...rest } = item;
          return rest;
        }
        return item;
      });
      
      await Setting.insertMany(settingData);
      console.log(`✅ 已导入 ${settingData.length} 个设置项`);
    }
    
    console.log('🎉 数据库初始化完成!');
    process.exit(0);
  } catch (error) {
    console.error('❌ 数据库初始化失败:', error);
    console.error('错误详情:', error.stack);
    process.exit(1);
  }
};

// 执行种子脚本
seedDatabase();