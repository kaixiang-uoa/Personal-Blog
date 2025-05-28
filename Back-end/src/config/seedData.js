import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import databaseConnect from './db.js';
import logger from './logger.js';
import { importInitialData } from './importData.js';

// 获取当前文件的目录路径（ES模块兼容方式）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import models
import User from '../models/User.js';
import Post from '../models/Post.js';
import Category from '../models/Category.js';
import Tag from '../models/Tag.js';
import Setting from '../models/Setting.js';

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
              } catch (error) {
                console.error(`analyse error: ${error.message}`);
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

const createAdminUser = async () => {
    try {
        // 检查是否已存在管理员账号
        const adminExists = await User.findOne({ role: 'admin' });
        
        if (adminExists) {
            logger.info('Admin user already exists, skipping creation');
            return;
        }

        // 创建管理员账号
        const adminUser = await User.create({
            username: process.env.ADMIN_USERNAME || 'admin',
            email: process.env.ADMIN_EMAIL || 'admin@example.com',
            password: process.env.ADMIN_PASSWORD || 'Admin@123',
            role: 'admin',
            displayName: 'System Administrator',
            isActive: true
        });

        logger.info('Admin user created successfully:', {
            username: adminUser.username,
            email: adminUser.email
        });
    } catch (error) {
        logger.error('Error creating admin user:', error);
        throw error;
    }
};

const seedDatabase = async () => {
    try {
        await databaseConnect();

        logger.info('🔄 Starting database seeding...');
        
        // 清空所有数据
        await User.deleteMany({});
        await Category.deleteMany({});
        await Tag.deleteMany({});
        await Post.deleteMany({});
        await Setting.deleteMany({});

        logger.info('✅ Database cleared successfully');

        // 创建管理员账号
        await createAdminUser();

        // 如果需要导入初始数据，取消下面的注释
        // await importInitialData({ Category, Tag, Post, Setting });

        logger.info('🎉 Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        logger.error('❌ Database seeding failed:', error);
        logger.error('Error details:', error.stack);
        process.exit(1);
    }
};

// 如果直接运行此文件，则执行种子脚本
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    seedDatabase();
}

export default seedDatabase;