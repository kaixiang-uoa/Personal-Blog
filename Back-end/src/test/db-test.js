import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import PingRecord from '../models/SchedulerStatus.js';

async function testDbWrite() {
  try {
    // 1. 连接数据库
    console.log('正在连接数据库...');
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('数据库连接成功');

    // 2. 模拟一次 ping 结果并写入
    const pingResult = {
      timestamp: new Date(),
      status: 200,
      duration: 100,
      type: 'auto',
      error: null,
      isRunning: true,
      enabled: true
    };

    console.log('准备写入数据:', pingResult);
    const record = await PingRecord.create(pingResult);
    console.log('数据写入成功:', record);

  } catch (error) {
    console.error('发生错误:', error);
  } finally {
    // 关闭数据库连接
    await mongoose.connection.close();
    console.log('数据库连接已关闭');
  }
}

// 执行测试
testDbWrite(); 