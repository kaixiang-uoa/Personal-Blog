# 数据库优化指南

本文档详细介绍了博客系统中实施的数据库优化措施，以及如何运行相关优化脚本和监控数据库性能。

## 1. 优化策略概述

为了提高系统性能和响应速度，我们实施了以下数据库优化策略：

1. **索引优化** - 创建和维护高效的数据库索引
2. **查询优化** - 改进查询语句和模式，减少数据库负载
3. **缓存策略** - 使用内存缓存减少数据库访问
4. **资源管理** - 优化数据库连接和内存使用
5. **监控系统** - 实时跟踪数据库性能和识别瓶颈

## 2. 索引优化

### 2.1 实施的索引策略

为各集合实施了以下索引策略：

- **单字段索引** - 为高频查询字段创建索引
- **复合索引** - 为常见组合查询创建复合索引
- **文本索引** - 支持全文搜索功能
- **唯一索引** - 保证关键字段如slug的唯一性

### 2.2 集合索引明细

以下是主要集合的索引配置：

**Posts Collection**:
```javascript
// 单字段索引
{ "slug": 1 }, { unique: true }
{ "author": 1 }
{ "status": 1 }
{ "publishedAt": -1 }
{ "viewCount": -1 }

// 复合索引
{ "status": 1, "publishedAt": -1 }
{ "categories": 1, "status": 1, "publishedAt": -1 }
{ "tags": 1, "status": 1, "publishedAt": -1 }

// 文本索引
{ title: "text", content: "text" }
```

**Categories Collection**:
```javascript
{ "slug": 1 }, { unique: true }
{ "parentCategory": 1 }
```

**Tags Collection**:
```javascript
{ "slug": 1 }, { unique: true }
```

**Users Collection**:
```javascript
{ "username": 1 }, { unique: true }
{ "email": 1 }, { unique: true }
{ "role": 1 }
```

**Comments Collection**:
```javascript
{ "post": 1 }
{ "author": 1 }
{ "post": 1, "createdAt": -1 }
```

**Media Collection**:
```javascript
{ "type": 1 }
{ "uploadedBy": 1 }
```

### 2.3 索引维护

为确保索引始终处于最佳状态，我们开发了`ensureIndexes.js`脚本，它能够：

1. 检查当前索引状态
2. 创建缺少的索引
3. 优化现有索引
4. 移除不再需要的索引

## 3. 查询优化

### 3.1 投影查询

在许多查询中使用投影来减少不必要的数据传输：

```javascript
// 只返回列表所需字段，不返回完整内容
const posts = await Post.find({ status: 'published' }, 
  'title slug excerpt featuredImage publishedAt viewCount')
  .sort({ publishedAt: -1 })
  .limit(10);
```

### 3.2 Lean查询

对于只读操作，使用`.lean()`方法跳过Mongoose文档实例化，提高性能：

```javascript
// 比普通查询快3-5倍
const posts = await Post.find({ status: 'published' })
  .lean()
  .limit(10);
```

### 3.3 批量操作

对多条记录的操作使用批量API，减少数据库往返：

```javascript
// 使用bulkWrite而非多次单独更新
await Post.bulkWrite([
  { 
    updateOne: { 
      filter: { _id: post1Id }, 
      update: { $inc: { viewCount: 1 } } 
    } 
  },
  { 
    updateOne: { 
      filter: { _id: post2Id }, 
      update: { $inc: { viewCount: 1 } } 
    } 
  }
]);
```

### 3.4 并行执行

使用`Promise.all()`并行执行独立查询：

```javascript
// 并行获取相关数据
const [posts, categories, tags] = await Promise.all([
  Post.find({ status: 'published' }).limit(10).lean(),
  Category.find({}).lean(),
  Tag.find({}).sort({ name: 1 }).lean()
]);
```

### 3.5 延迟加载

对于复杂页面，实施数据延迟加载：

```javascript
// 先加载主要内容，后加载次要内容
const post = await Post.findOne({ slug }).lean();
// 在单独的请求中获取评论
const comments = await Comment.find({ post: post._id }).lean();
```

## 4. 缓存策略

### 4.1 内存缓存

使用`cacheManager.js`实现内存缓存系统，缓存：

- 热门文章列表
- 分类和标签数据
- 设置数据
- 侧边栏内容

```javascript
// 缓存示例
const posts = await cacheManager.wrap(
  'recent-posts', 
  async () => {
    return Post.find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .limit(10)
      .lean();
  },
  { ttl: 5 * 60 } // 5分钟缓存
);
```

### 4.2 缓存清理

实施了多种缓存失效机制：

1. **基于时间** - 缓存项有预设的TTL（生存时间）
2. **手动触发** - 当数据更新时手动清除相关缓存
3. **模式匹配** - 使用前缀/后缀匹配清除一组相关缓存

```javascript
// 当更新文章时清除相关缓存
await Post.findByIdAndUpdate(id, update);
await cacheManager.del(`post:${id}`);
await cacheManager.del('recent-posts');
await cacheManager.delByPattern(`post:${id}:*`);
```

## 5. 资源管理

### 5.1 连接池优化

优化了MongoDB连接池配置：

```javascript
// 在mongoose连接配置中
const options = {
  maxPoolSize: 10, // 生产环境可能需要更大值
  minPoolSize: 5,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
  heartbeatFrequencyMS: 10000,
};

mongoose.connect(process.env.MONGO_URI, options);
```

### 5.2 内存使用优化

通过以下措施优化内存使用：

1. 优先使用流式处理大文件
2. 限制查询返回的文档大小
3. 实施分页以减少单次查询数据量
4. 使用`.lean()`方法减少内存开销

## 6. 监控与分析

### 6.1 查询监控

实施了查询监控中间件，用于：

1. 记录所有数据库操作的耗时
2. 自动标记慢查询（>100ms）
3. 收集查询模式统计数据
4. 生成性能报告

### 6.2 性能分析

使用MongoDB的解释计划分析查询性能：

```javascript
// 分析查询性能
const explanation = await Post.find({ 
  status: 'published',
  categories: categoryId 
}).explain('executionStats');

console.log(explanation.executionStats.executionTimeMillis);
console.log(explanation.executionStats.totalDocsExamined);
```

### 6.3 性能监控API

提供了性能监控API端点：

- `/api/v1/admin/db-stats` - 返回数据库统计信息
- `/api/v1/admin/slow-queries` - 列出慢查询日志
- `/api/v1/admin/cache-stats` - 提供缓存命中率统计

## 7. 优化脚本运行指南

### 7.1 数据库索引脚本

运行以下命令确保所有索引正确创建：

```bash
# 运行索引优化脚本
npm run db:ensure-indexes
```

脚本执行过程：
1. 连接到MongoDB（使用.env中的配置）
2. 确保所有集合都有适当的索引
3. 报告已创建的新索引和已存在的索引
4. 在完成后断开连接

### 7.2 数据库诊断脚本

运行诊断脚本检查数据库健康状况：

```bash
# 运行数据库诊断
npm run db:diagnose
```

该脚本会分析：
1. 索引使用情况
2. 文档大小分布
3. 集合增长率
4. 缺失索引的查询模式

### 7.3 迁移到MongoDB Atlas

使用迁移脚本将本地数据库迁移到MongoDB Atlas：

```bash
# 迁移到MongoDB Atlas
npm run db:migrate-to-atlas
```

该脚本会：
1. 从本地数据库导出数据
2. 应用必要的数据转换
3. 将数据导入到Atlas
4. 创建所有必要的索引

## 8. 最佳实践和建议

在日常开发和维护中遵循以下数据库最佳实践：

### 8.1 查询设计

- 始终使用索引字段过滤数据
- 避免正则表达式查询，除非使用索引前缀
- 使用复合索引支持多字段查询
- 限制查询返回的结果数量
- 只请求需要的字段（投影）

### 8.2 写操作优化

- 使用批量操作替代多次单独写入
- 避免在循环中执行数据库操作
- 使用原子操作（如$inc, $set）而非读取-修改-写入模式
- 考虑写入操作的时间敏感性，必要时移至后台任务

### 8.3 索引管理

- 定期检查索引使用情况
- 移除未使用的索引
- 不要创建过多重叠的索引
- 考虑创建索引对写入性能的影响

### 8.4 监控建议

- 监控慢查询日志
- 观察系统内存使用
- 分析缓存命中率
- 跟踪连接池使用情况 