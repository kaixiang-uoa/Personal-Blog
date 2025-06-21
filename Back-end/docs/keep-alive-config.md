# Keep-Alive 服务配置说明

## 环境变量配置

Keep-Alive 服务使用以下环境变量进行配置：

### 必需配置

```bash
# Keep-Alive 目标URL
KEEP_ALIVE_TARGET_URL=http://localhost:3001/api/v1/health
```

### 默认配置

如果未设置环境变量，服务将使用以下默认值：

- **targetUrl**: `http://localhost:3001/api/v1/health`
- **timezone**: `Australia/Adelaide`
- **interval**: `*/10 * * * *` (每10分钟)
- **maxRetries**: `3`

## 时区配置

服务使用 `Australia/Adelaide` 时区，这是澳大利亚阿德莱德的标准时区。

## 时间间隔限制

为了确保在 Render 等平台上不会进入 sleep 状态，时间间隔有以下限制：

- **最小间隔**: 1 分钟
- **最大间隔**: 14 分钟
- **默认间隔**: 10 分钟

## 配置示例

### 开发环境 (.env)
```bash
KEEP_ALIVE_TARGET_URL=http://localhost:3001/api/v1/health
```

### 生产环境 (.env)
```bash
KEEP_ALIVE_TARGET_URL=https://your-production-domain.com/api/v1/health
```

### Render 部署环境
```bash
KEEP_ALIVE_TARGET_URL=https://your-app.onrender.com/api/v1/health
```

## API 端点

### 启动服务
```bash
POST /api/keep-alive/start
Authorization: Bearer <token>
```

### 停止服务
```bash
POST /api/keep-alive/stop
Authorization: Bearer <token>
```

### 获取状态
```bash
GET /api/keep-alive/status
Authorization: Bearer <token>
```

### 更新间隔
```bash
PUT /api/keep-alive/interval
Authorization: Bearer <token>
Content-Type: application/json

{
  "minutes": 7
}
```

## 状态说明

服务返回的状态包含以下字段：

- **isRunning**: Croner 任务是否正在运行
- **isLiving**: 目标服务器是否存活（HTTP 200 状态码）
- **nextRun**: 下次执行时间
- **config**: 当前配置信息
  - **interval**: cron 表达式
  - **intervalMinutes**: 间隔分钟数
  - **targetUrl**: 目标URL
  - **timezone**: 时区

## 注意事项

1. **Render 兼容性**: 最大间隔设置为14分钟，避免15分钟无请求导致的 sleep 状态
2. **时区**: 使用 Adelaide 时区，确保在澳大利亚地区正确运行
3. **认证**: 所有 API 端点都需要有效的 JWT 认证
4. **持久化**: ping 记录会保存到 MongoDB 数据库中
5. **错误处理**: 服务包含完善的错误处理和重试机制 