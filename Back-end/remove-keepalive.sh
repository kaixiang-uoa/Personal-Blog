#!/bin/bash

echo "🗑️ 开始彻底移除 Keep-Alive 服务..."

# 第一步：删除文件结构
echo "📁 删除文件结构..."
rm -rf src/services/keepAlive/
rm -f src/models/SchedulerStatus.js
rm -f src/test/unit/keepAlive.test.js

echo "✅ 文件结构删除完成"

# 第二步：移除依赖
echo "📦 移除依赖..."
npm uninstall node-cron node-schedule axios

echo "✅ 依赖移除完成"

# 第三步：检查是否还有其他文件引用
echo "🔍 检查剩余引用..."
grep -r "keepAlive\|keep-alive\|SchedulerStatus" src/ || echo "✅ 没有发现剩余引用"

echo "🎉 Keep-Alive 服务移除完成！"
echo ""
echo "⚠️  注意：您还需要手动修改以下文件："
echo "   - src/app.js (移除导入和路由)"
echo "   - src/server.js (移除导入和初始化代码)"
echo "   - package.json (移除测试脚本)"
echo "   - .env (移除环境变量)"
echo ""
echo "📝 建议执行：npm run dev 来验证没有错误" 