import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../config/db.js';

// load environment variables
dotenv.config();

// connect to database
await connectDB();

console.log('🔍 checking user passwords...');

try {
  // find all users
  const users = await User.find({});
  
  let updatedCount = 0;
  
  for (const user of users) {
    // check if it is plaintext password
    if (user.password.startsWith('plaintext:')) {
      const plainPassword = user.password.substring(10); // remove "plaintext:" prefix
      
      // generate salt
      const salt = await bcrypt.genSalt(10);
      
      // hash password
      const hashedPassword = await bcrypt.hash(plainPassword, salt);
      
      // update user password
      user.password = hashedPassword;
      await user.save();
      
      console.log(`✅ updated password for user ${user.username}`);
      updatedCount++;
    }
  }
  
  if (updatedCount > 0) {
    console.log(`🎉 successfully updated passwords for ${updatedCount} users`);
  } else {
    console.log('✅ no plaintext passwords found');
  }
  
  // show current admin account information
  const adminUsers = await User.find({ role: 'admin' }).select('username email');
  
  if (adminUsers.length > 0) {
    console.log('\n📊 current admin account:');
    adminUsers.forEach(admin => {
      console.log(`- username: ${admin.username}, email: ${admin.email}`);
    });
  }

  // 如果没有管理员账号，创建一个默认账号
  if (adminUsers.length === 0) {
    console.log('⚠️ no admin account found, creating default admin account');
    
    const defaultAdmin = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: 'Admin123!',
      role: 'admin',
      isActive: true
    });
    
    await defaultAdmin.save();
    console.log('✅ default admin account created');
    console.log('- username: admin');
    console.log('- email: admin@example.com');
    console.log('- password: Admin123!');
  }
  
  console.log('\n🚀 password fix completed!');
} catch (error) {
  console.error('❌ error:', error);
} finally {
  // close database connection
  mongoose.connection.close();
  process.exit(0);
} 