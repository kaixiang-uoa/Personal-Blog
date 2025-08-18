import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

async function testDbConnection() {
  try {
    // 1. 连接数据库
    console.log("正在连接数据库...");
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("数据库连接成功");

    // 2. 测试数据库连接
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      "数据库集合列表:",
      collections.map(c => c.name)
    );
  } catch (error) {
    console.error("发生错误:", error);
  } finally {
    // 关闭数据库连接
    await mongoose.connection.close();
    console.log("数据库连接已关闭");
  }
}

// 执行测试
testDbConnection();
