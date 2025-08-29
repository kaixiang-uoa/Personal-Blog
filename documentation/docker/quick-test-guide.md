# Docker 快速测试指南

## 当前状态
✅ Docker 已安装 (version 28.1.1)  
✅ Dockerfile 已创建  
✅ .env.docker 已创建  
❌ Docker Desktop 需要启动  

## 立即执行步骤

### 1. 启动 Docker Desktop
请手动启动 Docker Desktop 应用程序，然后等待其完全启动。

### 2. 验证 Docker 环境
```bash
# 检查 Docker 是否运行
docker info

# 应该看到 Docker 系统信息，而不是连接错误
```

### 3. 更新数据库配置
当前 `.env.docker` 使用的是测试数据库 URI：
```
MONGODB_URI=mongodb://localhost:27017/blogdb-docker-test
```

**你需要替换为实际的 MongoDB URI：**
```bash
# 编辑环境变量文件
nano .env.docker

# 或者使用 VS Code
code .env.docker
```

将 `MONGODB_URI` 改为你的实际数据库连接字符串，例如：
```
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/blog?retryWrites=true&w=majority
```

### 4. 构建和测试
```bash
# 使用我们的部署脚本
./deploy.sh build

# 测试镜像
./deploy.sh test
```

### 5. 验证清单
- [ ] Docker Desktop 已启动
- [ ] `docker info` 显示正常信息
- [ ] `.env.docker` 包含正确的 MongoDB URI
- [ ] 镜像构建成功
- [ ] 容器启动正常
- [ ] 健康检查通过 (http://localhost:3002/api/v1/health)

## 预期结果

### 构建成功输出
```
[INFO] Building Docker image...
Step 1/12 : FROM node:18-alpine
 ---> abc123def456
...
Successfully built abc123def456
Successfully tagged blog-backend:latest
[SUCCESS] Image build completed
```

### 测试成功输出
```
[INFO] Testing Docker image...
[INFO] Starting test container...
[INFO] Waiting for container to start...
[INFO] Performing health check...
[SUCCESS] Health check passed
[SUCCESS] Image test passed
```

## 如果遇到问题

### Docker 守护进程未运行
```bash
# 错误信息
Cannot connect to the Docker daemon at unix:///Users/xxx/.docker/run/docker.sock

# 解决方案
启动 Docker Desktop 应用程序
```

### 数据库连接失败
```bash
# 查看容器日志
docker logs blog-backend-test

# 常见错误
MongooseServerSelectionError: Could not connect to any servers

# 解决方案
检查 .env.docker 中的 MONGODB_URI 是否正确
```

### 端口占用
```bash
# 错误信息
Port 3002 is already in use

# 解决方案
./deploy.sh cleanup  # 清理测试容器
# 或者
docker stop blog-backend-test && docker rm blog-backend-test
```

## 下一步
测试成功后，我们将继续：
1. 推送镜像到 Docker Hub
2. 准备 Oracle VM 环境
3. 生产环境部署

---

**准备好了吗？请按照上述步骤操作，然后告诉我结果！** 🚀