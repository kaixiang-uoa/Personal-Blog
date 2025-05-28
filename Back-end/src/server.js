import dotenv from 'dotenv';

// Load environment variables FIRST - before any other imports
dotenv.config();

import connectDB from './config/db.js';
import app from './app.js';
import { logger } from './utils/logger.js';
import { validateSettings } from './scripts/initSettings.js';

// Async function to start the server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Validate settings, ensure all default settings exist (silent mode)
    await validateSettings(true);
    
    // 获取预期端口
    let PORT = parseInt(process.env.PORT || '3002', 10);
    let maxRetries = 5;
    let retries = 0;
    
    const startAppWithRetry = () => {
      // 创建服务器但不立即监听
      const server = app.listen(PORT)
        .on('listening', () => {
          logger.info(`服务器成功运行在端口 ${PORT}`);
          console.log(`
====================================
🚀 服务器已启动!
📡 本地: http://localhost:${PORT}
====================================
          `);
        })
        .on('error', (err) => {
          if (err.code === 'EADDRINUSE' && retries < maxRetries) {
            PORT++;
            retries++;
            logger.warn(`端口 ${PORT-1} 已被占用，尝试端口 ${PORT}...`);
            // 关闭当前服务器并重试
            server.close();
            startAppWithRetry();
          } else {
            logger.error(`无法启动服务器: ${err.message}`);
            process.exit(1);
          }
        });
    };
    
    // 开始尝试启动服务器
    console.log(`尝试启动服务器，初始端口: ${PORT}`);
    startAppWithRetry();
  } catch (error) {
    logger.error(`服务器启动失败: ${error.message}`);
    process.exit(1);
  }
};

// Start the server
startServer(); 