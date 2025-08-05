# 第一步：手动流程练习

本文档详细记录手动 Docker 部署的每个步骤，确保对整个部署链条的每个环节都熟悉。

## 1.1 本地 Dockerfile 构建

### 1.1.1 Dockerfile 设计要点

我们的 Dockerfile 采用以下最佳实践：

```dockerfile
# 多阶段构建优化 (当前为单阶段，生产环境可考虑多阶段)
FROM node:18-alpine

# 安全性：创建非 root 用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S blogapi -u 1001

# 缓存优化：先复制 package*.json
COPY package*.json ./

# 生产优化：只安装生产依赖
RUN npm ci --only=production

# 健康检查：确保容器状态可监控
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3
```

### 1.1.2 构建镜像

```bash
# 进入后端目录
cd Back-end/

# 构建镜像 (注意最后的点)
docker build -t blog-backend:latest .

# 查看构建的镜像
docker images | grep blog-backend
```

**预期输出：**
```
blog-backend   latest   abc123def456   2 minutes ago   150MB
```

### 1.1.3 镜像大小优化

- **基础镜像**: `node:18-alpine` (~40MB) vs `node:18` (~900MB)
- **依赖优化**: `npm ci --only=production` 排除开发依赖
- **层缓存**: 合理安排 COPY 顺序，利用 Docker 层缓存

## 1.2 本地容器测试

### 1.2.1 环境变量准备

创建测试用的环境变量文件：

```bash
# 创建 .env.docker 文件
cat > .env.docker << EOF
# 基础配置
NODE_ENV=production
PORT=3002

# 数据库配置 (使用你的 MongoDB URI)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog?retryWrites=true&w=majority

# JWT 配置
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
JWT_EXPIRE=7d

# CORS 配置
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Keep-Alive 配置 (可选)
KEEP_ALIVE_TARGET_URL=http://localhost:3002/api/v1/health
EOF
```

### 1.2.2 运行容器

```bash
# 运行容器，映射端口和环境变量
docker run -d \
  --name blog-backend-test \
  -p 3002:3002 \
  --env-file .env.docker \
  blog-backend:latest

# 查看容器状态
docker ps

# 查看容器日志
docker logs blog-backend-test

# 查看健康检查状态
docker inspect blog-backend-test | grep -A 10 "Health"
```

### 1.2.3 功能验证

```bash
# 1. 健康检查端点
curl http://localhost:3002/api/v1/health

# 预期响应：
# {"status":"OK","timestamp":"2024-01-01T00:00:00.000Z","uptime":123.456}

# 2. API 基础端点测试
curl http://localhost:3002/api/v1/posts

# 3. 检查 CORS 配置
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     http://localhost:3002/api/v1/posts
```

### 1.2.4 容器管理

```bash
# 停止容器
docker stop blog-backend-test

# 删除容器
docker rm blog-backend-test

# 清理未使用的镜像
docker image prune -f
```

## 1.3 推送到 Docker Hub

### 1.3.1 Docker Hub 准备

```bash
# 1. 登录 Docker Hub
docker login

# 2. 为镜像打标签 (替换 yourusername)
docker tag blog-backend:latest yourusername/blog-backend:latest
docker tag blog-backend:latest yourusername/blog-backend:v1.0.0

# 3. 推送镜像
docker push yourusername/blog-backend:latest
docker push yourusername/blog-backend:v1.0.0
```

### 1.3.2 验证推送

```bash
# 删除本地镜像进行测试
docker rmi yourusername/blog-backend:latest

# 从 Docker Hub 拉取
docker pull yourusername/blog-backend:latest

# 验证可以正常运行
docker run -d \
  --name blog-backend-hub-test \
  -p 3002:3002 \
  --env-file .env.docker \
  yourusername/blog-backend:latest
```

## 1.4 Oracle VM 部署

### 1.4.1 VM 环境准备

```bash
# SSH 连接到 Oracle VM
ssh -i your-key.pem ubuntu@your-vm-ip

# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 将用户添加到 docker 组
sudo usermod -aG docker ubuntu

# 重新登录或执行
newgrp docker

# 验证 Docker 安装
docker --version
docker run hello-world
```

### 1.4.2 部署应用

```bash
# 1. 创建应用目录
mkdir -p ~/blog-app
cd ~/blog-app

# 2. 创建环境变量文件
nano .env.production
# 复制并修改环境变量，注意：
# - MONGODB_URI 使用生产数据库
# - ALLOWED_ORIGINS 包含前端域名
# - JWT_SECRET 使用强密码

# 3. 拉取镜像
docker pull yourusername/blog-backend:latest

# 4. 运行容器
docker run -d \
  --name blog-backend-prod \
  -p 3002:3002 \
  --env-file .env.production \
  --restart unless-stopped \
  yourusername/blog-backend:latest

# 5. 验证部署
curl http://localhost:3002/api/v1/health
```

### 1.4.3 配置防火墙

```bash
# 检查防火墙状态
sudo ufw status

# 允许 SSH (确保不会断开连接)
sudo ufw allow ssh

# 允许应用端口
sudo ufw allow 3002

# 启用防火墙
sudo ufw enable
```

### 1.4.4 设置 SSL (可选，推荐)

```bash
# 安装 Nginx
sudo apt install nginx -y

# 配置反向代理
sudo nano /etc/nginx/sites-available/blog-api

# 配置内容：
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# 启用站点
sudo ln -s /etc/nginx/sites-available/blog-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 1.5 验证完整部署

### 1.5.1 功能测试

```bash
# 1. 健康检查
curl http://your-vm-ip:3002/api/v1/health

# 2. API 端点测试
curl http://your-vm-ip:3002/api/v1/posts

# 3. 如果配置了 Nginx
curl http://your-domain.com/api/v1/health
```

### 1.5.2 监控和日志

```bash
# 查看容器状态
docker ps
docker stats blog-backend-prod

# 查看应用日志
docker logs -f blog-backend-prod

# 查看系统资源
htop
df -h
```

## 1.6 故障排除

### 常见问题

1. **容器启动失败**
   ```bash
   # 检查环境变量
   docker logs blog-backend-prod
   
   # 检查端口占用
   sudo netstat -tlnp | grep 3002
   ```

2. **数据库连接失败**
   ```bash
   # 验证 MongoDB URI
   # 检查网络连接
   # 确认数据库白名单包含 VM IP
   ```

3. **健康检查失败**
   ```bash
   # 进入容器调试
   docker exec -it blog-backend-prod sh
   
   # 手动测试健康检查
   curl localhost:3002/api/v1/health
   ```

## 下一步

完成第一步验证后，继续 [第二步：GitHub Actions 自动构建](./step2-github-actions.md)