import Setting from '../models/Setting.js';
import connectDB from '../config/db.js';
import { logger } from '../utils/logger.js';

// Banner设置项
const bannerSettings = [
  { 
    key: 'appearance.homeBanner', 
    value: '', 
    group: 'appearance', 
    description: 'Home page banner image URL',
    description_en: 'Home page banner image URL',
    description_zh: '首页横幅图片URL'
  },
  { 
    key: 'appearance.aboutBanner', 
    value: '', 
    group: 'appearance', 
    description: 'About page banner image URL',
    description_en: 'About page banner image URL',
    description_zh: '关于页面横幅图片URL'
  },
  { 
    key: 'appearance.contactBanner', 
    value: '', 
    group: 'appearance', 
    description: 'Contact page banner image URL',
    description_en: 'Contact page banner image URL',
    description_zh: '联系页面横幅图片URL'
  },
  // 移动端Banner设置
  { 
    key: 'appearance.homeBannerMobile', 
    value: '', 
    group: 'appearance', 
    description: 'Home page banner image URL for mobile devices',
    description_en: 'Home page banner image URL for mobile devices',
    description_zh: '首页移动端横幅图片URL'
  },
  { 
    key: 'appearance.aboutBannerMobile', 
    value: '', 
    group: 'appearance', 
    description: 'About page banner image URL for mobile devices',
    description_en: 'About page banner image URL for mobile devices',
    description_zh: '关于页面移动端横幅图片URL'
  },
  { 
    key: 'appearance.contactBannerMobile', 
    value: '', 
    group: 'appearance', 
    description: 'Contact page banner image URL for mobile devices',
    description_en: 'Contact page banner image URL for mobile devices',
    description_zh: '联系页面移动端横幅图片URL'
  }
];

// 更新Banner设置
async function updateBannerSettings() {
  try {
    // 连接数据库
    await connectDB();
    logger.info('Connected to MongoDB for banner settings update');

    let updatedCount = 0;
    
    // 检查并更新每个Banner设置项
    for (const setting of bannerSettings) {
      const exists = await Setting.findOne({ key: setting.key });
      
      if (!exists) {
        // 如果设置不存在，创建它
        await Setting.create(setting);
        logger.info(`Created new banner setting: ${setting.key}`);
        updatedCount++;
      } else {
        logger.info(`Banner setting already exists: ${setting.key}`);
      }
    }
    
    if (updatedCount > 0) {
      logger.info(`✅ Added ${updatedCount} new banner settings successfully`);
    } else {
      logger.info('✅ All banner settings already exist');
    }
    
    process.exit(0);
  } catch (error) {
    logger.error(`❌ Error updating banner settings: ${error.message}`);
    process.exit(1);
  }
}

// 执行更新
updateBannerSettings(); 