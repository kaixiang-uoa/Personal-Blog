import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../config/db.js';

// 加载环境变量
dotenv.config();

// 连接数据库
await connectDB();

console.log('🔍 正在检查用户密码...');

try {
  // 查找所有用户
  const users = await User.find({});
  
  let updatedCount = 0;
  
  for (const user of users) {
    // 检查是否是明文密码
    if (user.password.startsWith('plaintext:')) {
      const plainPassword = user.password.substring(10); // 移除"plaintext:"前缀
      
      // 生成盐值
      const salt = await bcrypt.genSalt(10);
      
      // 加密密码
      const hashedPassword = await bcrypt.hash(plainPassword, salt);
      
      // 更新用户密码
      user.password = hashedPassword;
      await user.save();
      
      console.log(`✅ 已更新用户 ${user.username} 的密码`);
      updatedCount++;
    }
  }
  
  if (updatedCount > 0) {
    console.log(`🎉 成功更新了 ${updatedCount} 个用户的密码`);
  } else {
    console.log('✅ 没有找到需要更新的明文密码');
  }
  
  // 显示当前管理员账号信息
  const adminUsers = await User.find({ role: 'admin' }).select('username email');
  
  if (adminUsers.length > 0) {
    console.log('\n📊 当前管理员账号:');
    adminUsers.forEach(admin => {
      console.log(`- 用户名: ${admin.username}, 邮箱: ${admin.email}`);
    });
  }

  // 如果没有管理员账号，创建一个默认账号
  if (adminUsers.length === 0) {
    console.log('⚠️ 没有找到管理员账号，创建默认管理员账号');
    
    const defaultAdmin = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: 'Admin123!',
      role: 'admin',
      isActive: true
    });
    
    await defaultAdmin.save();
    console.log('✅ 已创建默认管理员账号');
    console.log('- 用户名: admin');
    console.log('- 邮箱: admin@example.com');
    console.log('- 密码: Admin123!');
  }
  
  console.log('\n🚀 密码修复完成！');
} catch (error) {
  console.error('❌ 错误:', error);
} finally {
  // 关闭数据库连接
  mongoose.connection.close();
  process.exit(0);
} 