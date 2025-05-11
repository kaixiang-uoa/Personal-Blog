import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Setting from '../models/Setting.js';
import { logger } from '../utils/logger.js';

// 加载环境变量
dotenv.config();

// 更新About页面设置组别
const updateAboutSettings = async () => {
  try {
    // 连接数据库
    console.log('MongoDB URI:', process.env.MONGODB_URI.substring(0, 20) + '...');
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('✅ MongoDB connected for updating about settings group');
    
    // 找到所有以about.开头的键
    const aboutSettings = await Setting.find({ key: { $regex: /^about\./ } });
    
    if (aboutSettings.length === 0) {
      logger.info('No about settings found to update');
    } else {
      // 批量更新所有about设置的组别
      const result = await Setting.updateMany(
        { key: { $regex: /^about\./ } },
        { $set: { group: 'about' } }
      );
      
      logger.info(`✅ Successfully updated ${result.modifiedCount} about settings to 'about' group`);
    }
  } catch (err) {
    console.error('❌ Failed to update about settings group:', err);
    console.error('Error details:', err.message);
    console.error('Stack trace:', err.stack);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    logger.info('MongoDB disconnected');
    process.exit(0);
  }
};

// 运行更新脚本
updateAboutSettings(); 