import Setting from '../models/Setting.js';
import connectDB from '../config/db.js';
import { logger } from '../utils/logger.js';

// default settings
const defaultSettings = [
  // general settings
  { 
    key: 'general.siteName', 
    value: 'Modern Blog', 
    group: 'general', 
    description: 'Website name',
    description_en: 'Website name',
    description_zh: '网站名称'
  },
  { 
    key: 'general.siteDescription', 
    value: 'A trendy blog for web development enthusiasts', 
    group: 'general', 
    description: 'Short description of the website',
    description_en: 'Short description of the website',
    description_zh: '网站简短描述'
  },
  { 
    key: 'general.logo', 
    value: '', 
    group: 'general', 
    description: 'Website logo URL',
    description_en: 'Website logo URL',
    description_zh: '网站Logo地址'
  },
  { 
    key: 'general.favicon', 
    value: '/favicon.ico', 
    group: 'general', 
    description: 'Website favicon URL',
    description_en: 'Website favicon URL',
    description_zh: '网站图标地址'
  },
  { 
    key: 'general.metaKeywords', 
    value: 'blog,tech,programming,web development', 
    group: 'general', 
    description: 'Meta keywords for SEO',
    description_en: 'Meta keywords for SEO',
    description_zh: 'SEO关键词'
  },
  
  // [INCOMPLETE TRANSLATION] 外观settings
  { 
    key: 'appearance.theme', 
    value: 'system', 
    group: 'appearance', 
    description: 'Website theme (light/dark/system)',
    description_en: 'Website theme (light/dark/system)',
    description_zh: '网站主题 (亮色/暗色/跟随系统)'
  },
  { 
    key: 'appearance.accentColor', 
    value: '#0891b2', 
    group: 'appearance', 
    description: 'Accent color for UI elements',
    description_en: 'Accent color for UI elements',
    description_zh: 'UI元素强调色'
  },
  { 
    key: 'appearance.showSidebar', 
    value: true, 
    group: 'appearance', 
    description: 'Show sidebar on articles page',
    description_en: 'Show sidebar on articles page',
    description_zh: '在文章页面显示侧边栏'
  },
  { 
    key: 'appearance.sidebarPosition', 
    value: 'right', 
    group: 'appearance', 
    description: 'Sidebar position (left/right)',
    description_en: 'Sidebar position (left/right)',
    description_zh: '侧边栏位置 (左/右)'
  },
  
  // [INCOMPLETE TRANSLATION] Banner图片settings
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
  
  // [INCOMPLETE TRANSLATION] 移动端Banner图片settings
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
  },
  
  // postsettings
  { 
    key: 'posts.perPage', 
    value: 10, 
    group: 'advanced', 
    description: 'Number of posts per page',
    description_en: 'Number of posts per page',
    description_zh: '每页文章数量'
  },
  { 
    key: 'posts.defaultSort', 
    value: 'latest', 
    group: 'advanced', 
    description: 'Default post sorting (latest/oldest/popular)',
    description_en: 'Default post sorting (latest/oldest/popular)',
    description_zh: '默认文章排序 (最新/最早/最热)'
  },
  
  // [INCOMPLETE TRANSLATION] 关于settings
  { 
    key: 'about.intro', 
    value: 'Welcome to my blog! I write about web development and technology.', 
    group: 'about', 
    description: 'About me introduction',
    description_en: 'About me introduction',
    description_zh: '关于我的介绍'
  },
  { 
    key: 'about.contactEmail', 
    value: 'contact@example.com', 
    group: 'about', 
    description: 'Contact email address',
    description_en: 'Contact email address',
    description_zh: '联系邮箱'
  },
  
  // [INCOMPLETE TRANSLATION] 高级settings
  { 
    key: 'advanced.cacheTimeout', 
    value: 3600, 
    group: 'advanced', 
    description: 'Cache timeout in seconds',
    description_en: 'Cache timeout in seconds',
    description_zh: '缓存超时时间(秒)'
  },
  { 
    key: 'advanced.debugMode', 
    value: false, 
    group: 'advanced', 
    description: 'Enable debug mode',
    description_en: 'Enable debug mode',
    description_zh: '启用调试模式'
  }
];

// initialize settings
export async function initializeSettings() {
  try {
    // connect to database
    await connectDB();
    logger.info('Connected to MongoDB for settings initialization');

    // check if settings already exist
    const settingsCount = await Setting.countDocuments();
    
    if (settingsCount === 0) {
      // if no settings, create default settings
      await Setting.insertMany(defaultSettings);
      logger.info('🌱 Default settings initialized successfully');
    } else {
      logger.warn('⚠️ Settings already exist, skipping initialization');
      // validate and update all default settings
      await validateSettings(true);
    }
    
    logger.info('✅ Settings initialization process completed');
    return true;
  } catch (error) {
    logger.error(`❌ Error initializing settings: ${error.message}`);
    throw error;
  }
}

// settings validation function
export async function validateSettings(silent = false) {
  try {
    if (!silent) {
      logger.info('🔍 Validating settings...');
    }
    
    // check all required settings
    for (const setting of defaultSettings) {
      const exists = await Setting.findOne({ key: setting.key });
      
      if (!exists) {
        // if setting does not exist, create it
        await Setting.create(setting);
        if (!silent) {
          logger.info(`Created missing setting: ${setting.key}`);
        }
      }
    }
    
    if (!silent) {
      logger.info('✅ Settings validation completed');
    }
    return true;
  } catch (error) {
    logger.error(`❌ Error validating settings: ${error.message}`);
    throw error;
  }
} 