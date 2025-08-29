# Docker 基础学习指南

## 目录
- [Docker 核心概念](#docker-核心概念)
- [Dockerfile 详解](#dockerfile-详解)
- [Docker Compose 详解](#docker-compose-详解)
- [环境变量配置](#环境变量配置)
- [常用命令解析](#常用命令解析)
- [最佳实践](#最佳实践)

## Docker 核心概念

### 什么是 Docker？
Docker 是一个容器化平台，可以将应用程序及其依赖项打包到轻量级、可移植的容器中。

### 核心组件

```
┌─────────────────────────────────────────┐
│                Docker                    │
├─────────────────────────────────────────┤
│  镜像 (Image)                           │
│  ├── 只读模板，包含应用和依赖             │
│  └── 类似于虚拟机的快照                  │
├─────────────────────────────────────────┤
│  容器 (Container)                       │
│  ├── 镜像的运行实例                      │
│  └── 轻量级、隔离的运行环境              │
├─────────────────────────────────────────┤
│  Dockerfile                             │
│  ├── 构建镜像的指令文件                  │
│  └── 定义如何创建镜像                    │
├─────────────────────────────────────────┤
│  Docker Compose                         │
│  ├── 多容器应用的编排工具                │
│  └── 用 YAML 文件定义服务                │
└─────────────────────────────────────────┘
```

### 容器 vs 虚拟机

| 特性 | 容器 | 虚拟机 |
|------|------|--------|
| 启动时间 | 秒级 | 分钟级 |
| 资源占用 | 少 | 多 |
| 隔离级别 | 进程级 | 硬件级 |
| 可移植性 | 高 | 中等 |

## Dockerfile 详解

### 我们的 Dockerfile 逐行解析

```dockerfile
# 1. 基础镜像选择
FROM node:18-alpine
```
**解释：**
- `FROM` 指令指定基础镜像
- `node:18-alpine` = Node.js 18 版本 + Alpine Linux
- Alpine Linux 是超轻量级发行版（~5MB vs Ubuntu ~180MB）

```dockerfile
# 2. 设置工作目录
WORKDIR /app
```
**解释：**
- 在容器内创建并切换到 `/app` 目录
- 后续的 `COPY`、`RUN` 等指令都在此目录执行
- 类似于 `cd /app`

```dockerfile
# 3. 创建非 root 用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S blogapi -u 1001
```
**解释：**
- `RUN` 执行 shell 命令
- `addgroup -g 1001 -S nodejs`：创建 nodejs 组，GID=1001，系统组
- `adduser -S blogapi -u 1001`：创建 blogapi 用户，UID=1001，系统用户
- `&&` 连接多个命令，`\` 换行符

**为什么不用 root？**
- 安全原则：最小权限
- 避免容器逃逸攻击
- 符合生产环境最佳实践

```dockerfile
# 4. 复制依赖文件
COPY package*.json ./
```
**解释：**
- `COPY` 从主机复制文件到容器
- `package*.json` 匹配 `package.json` 和 `package-lock.json`
- `./` 表示当前工作目录（/app）

**为什么先复制 package.json？**
- Docker 层缓存机制
- 如果 package.json 没变，npm install 层可以复用
- 大大加快构建速度

```dockerfile
# 5. 安装依赖
RUN npm ci --only=production && \
    npm cache clean --force
```
**解释：**
- `npm ci` vs `npm install`：
  - `ci` 更快，适合生产环境
  - 基于 package-lock.json 精确安装
  - 不会修改 package-lock.json
- `--only=production`：只安装生产依赖，排除 devDependencies
- `npm cache clean --force`：清理缓存，减少镜像体积

```dockerfile
# 6. 复制源代码
COPY src/ ./src/
```
**解释：**
- 复制应用源码到容器
- 放在依赖安装之后，利用缓存机制

```dockerfile
# 7. 创建目录并设置权限
RUN mkdir -p uploads && \
    chown -R blogapi:nodejs /app
```
**解释：**
- `mkdir -p uploads`：创建上传目录，`-p` 创建父目录
- `chown -R blogapi:nodejs /app`：递归更改所有者
  - `blogapi`：用户
  - `nodejs`：组
  - `/app`：目录

```dockerfile
# 8. 切换用户
USER blogapi
```
**解释：**
- 后续指令以 blogapi 用户身份执行
- 提高安全性

```dockerfile
# 9. 暴露端口
EXPOSE 3002
```
**解释：**
- 声明容器监听的端口
- 仅用于文档，不实际发布端口
- 实际端口映射在运行时指定：`-p 3002:3002`

```dockerfile
# 10. 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "..."
```
**解释：**
- `--interval=30s`：每30秒检查一次
- `--timeout=3s`：单次检查超时时间
- `--start-period=5s`：容器启动后等待5秒开始检查
- `--retries=3`：失败3次后标记为 unhealthy
- `CMD`：检查命令，这里用 Node.js 发送 HTTP 请求

```dockerfile
# 11. 环境变量
ENV NODE_ENV=production
ENV PORT=3002
```
**解释：**
- `ENV` 设置环境变量
- 这些变量在容器运行时可用

```dockerfile
# 12. 启动命令
CMD ["node", "src/server.js"]
```
**解释：**
- `CMD` 容器启动时执行的默认命令
- JSON 数组格式：`["executable", "param1", "param2"]`
- 可以被 docker run 命令覆盖

### Dockerfile 最佳实践

1. **层缓存优化**
   ```dockerfile
   # ✅ 好：先复制依赖文件
   COPY package*.json ./
   RUN npm ci
   COPY src/ ./src/
   
   # ❌ 差：一起复制，每次代码改动都要重新安装依赖
   COPY . .
   RUN npm ci
   ```

2. **镜像体积优化**
   ```dockerfile
   # ✅ 好：使用 Alpine 镜像
   FROM node:18-alpine
   
   # ✅ 好：清理缓存
   RUN npm ci && npm cache clean --force
   
   # ✅ 好：合并 RUN 指令
   RUN apt-get update && \
       apt-get install -y curl && \
       apt-get clean
   ```

3. **安全性**
   ```dockerfile
   # ✅ 好：使用非 root 用户
   USER blogapi
   
   # ✅ 好：最小权限
   RUN adduser -S -D blogapi
   ```

## Docker Compose 详解

### 我们的 docker-compose.yml 解析

```yaml
version: '3.8'
```
**解释：**
- 指定 Compose 文件版本
- 3.8 支持最新的 Docker 功能

```yaml
services:
  blog-backend:
```
**解释：**
- `services` 定义应用的各个服务
- `blog-backend` 是服务名称

```yaml
    build:
      context: .
      dockerfile: Dockerfile
```
**解释：**
- `build` 构建配置
- `context: .` 构建上下文为当前目录
- `dockerfile: Dockerfile` 指定 Dockerfile 文件

```yaml
    image: blog-backend:latest
```
**解释：**
- 构建后的镜像名称和标签

```yaml
    container_name: blog-backend-app
```
**解释：**
- 容器名称
- 不指定会自动生成：`目录名_服务名_序号`

```yaml
    ports:
      - "3002:3002"
```
**解释：**
- 端口映射：`主机端口:容器端口`
- 外部访问 localhost:3002 会转发到容器的 3002 端口

```yaml
    env_file:
      - .env.docker
```
**解释：**
- 从文件加载环境变量
- 支持多个文件

```yaml
    restart: unless-stopped
```
**解释：**
- 重启策略
- `unless-stopped`：除非手动停止，否则总是重启
- 其他选项：`no`、`always`、`on-failure`

```yaml
    healthcheck:
      test: ["CMD", "node", "-e", "..."]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```
**解释：**
- 健康检查配置
- 覆盖 Dockerfile 中的 HEALTHCHECK

```yaml
    volumes:
      - ./uploads:/app/uploads
```
**解释：**
- 数据卷映射：`主机路径:容器路径`
- 持久化上传文件

```yaml
    networks:
      - blog-network
```
**解释：**
- 指定网络
- 同一网络的容器可以互相通信

```yaml
networks:
  blog-network:
    driver: bridge
```
**解释：**
- 定义自定义网络
- `bridge` 是默认网络驱动

### Docker Compose 常用命令

```bash
# 构建并启动服务
docker-compose up -d --build

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f blog-backend

# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 进入容器
docker-compose exec blog-backend sh
```

## 环境变量配置

### .env.docker 文件结构

```bash
# 基础配置
NODE_ENV=production        # 运行环境
PORT=3002                 # 应用端口

# 数据库配置
MONGODB_URI=mongodb://... # 数据库连接字符串

# JWT 配置
JWT_SECRET=your-secret    # JWT 密钥
JWT_EXPIRE=7d            # 过期时间
```

### 环境变量的三种设置方式

1. **Dockerfile 中的 ENV**
   ```dockerfile
   ENV NODE_ENV=production
   ```
   - 构建时设置
   - 成为镜像的一部分

2. **docker-compose.yml 中的 environment**
   ```yaml
   environment:
     - NODE_ENV=production
     - PORT=3002
   ```
   - 运行时设置
   - 覆盖 Dockerfile 中的 ENV

3. **env_file**
   ```yaml
   env_file:
     - .env.docker
   ```
   - 从文件加载
   - 便于管理大量变量

### 优先级（高到低）
1. docker run -e
2. docker-compose.yml environment
3. env_file
4. Dockerfile ENV

## 常用命令解析

### 镜像操作
```bash
# 构建镜像
docker build -t blog-backend:latest .
#        ↑    ↑                    ↑
#      命令   标签                构建上下文

# 查看镜像
docker images

# 删除镜像
docker rmi blog-backend:latest

# 推送镜像
docker push username/blog-backend:latest
```

### 容器操作
```bash
# 运行容器
docker run -d \
  --name blog-backend-test \    # 容器名
  -p 3002:3002 \               # 端口映射
  --env-file .env.docker \     # 环境变量文件
  blog-backend:latest          # 镜像名

# 查看运行中的容器
docker ps

# 查看所有容器（包括停止的）
docker ps -a

# 查看容器日志
docker logs blog-backend-test

# 进入容器
docker exec -it blog-backend-test sh

# 停止容器
docker stop blog-backend-test

# 删除容器
docker rm blog-backend-test
```

### 调试命令
```bash
# 查看容器详细信息
docker inspect blog-backend-test

# 查看容器资源使用
docker stats blog-backend-test

# 查看容器内进程
docker top blog-backend-test

# 复制文件到容器
docker cp file.txt blog-backend-test:/app/

# 从容器复制文件
docker cp blog-backend-test:/app/logs ./
```

## 最佳实践

### 1. 安全性

```dockerfile
# ✅ 使用非 root 用户
RUN adduser -S -D appuser
USER appuser

# ✅ 使用具体版本标签
FROM node:18.17.0-alpine

# ✅ 扫描漏洞
docker scan blog-backend:latest
```

### 2. 性能优化

```dockerfile
# ✅ 多阶段构建
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY src ./src
CMD ["node", "src/server.js"]

# ✅ 层缓存优化
COPY package*.json ./
RUN npm ci
COPY src ./src
```

### 3. 监控和日志

```dockerfile
# ✅ 健康检查
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3002/health || exit 1

# ✅ 结构化日志
ENV LOG_FORMAT=json
```

```yaml
# ✅ 日志配置
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

### 4. 开发与生产环境

```yaml
# docker-compose.dev.yml
version: '3.8'
services:
  blog-backend:
    build:
      target: development
    volumes:
      - ./src:/app/src  # 代码热重载
    environment:
      - NODE_ENV=development
```

```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  blog-backend:
    build:
      target: production
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

### 5. 资源限制

```yaml
services:
  blog-backend:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
        reservations:
          memory: 256M
          cpus: '0.25'
```

## 故障排除

### 常见问题

1. **容器启动失败**
   ```bash
   # 查看详细错误
   docker logs blog-backend-test
   
   # 检查容器配置
   docker inspect blog-backend-test
   ```

2. **端口访问问题**
   ```bash
   # 检查端口映射
   docker port blog-backend-test
   
   # 检查防火墙
   netstat -tlnp | grep 3002
   ```

3. **环境变量问题**
   ```bash
   # 查看容器环境变量
   docker exec blog-backend-test env
   ```

4. **权限问题**
   ```bash
   # 检查文件权限
   docker exec blog-backend-test ls -la /app
   ```

### 调试技巧

```bash
# 1. 交互式运行容器
docker run -it --rm blog-backend:latest sh

# 2. 覆盖启动命令
docker run -it --rm blog-backend:latest /bin/sh

# 3. 挂载主机目录进行调试
docker run -it --rm -v $(pwd):/app blog-backend:latest sh

# 4. 使用 docker-compose 调试
docker-compose run --rm blog-backend sh
```

## 学习资源

### 推荐阅读
- [Docker 官方文档](https://docs.docker.com/)
- [Dockerfile 最佳实践](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Compose 文档](https://docs.docker.com/compose/)

### 实践练习
1. 修改 Dockerfile，添加新的环境变量
2. 尝试多阶段构建优化镜像体积
3. 配置不同环境的 docker-compose 文件
4. 实践容器间网络通信

这个指南应该能帮助你理解 Docker 的基础概念和我们项目中的具体配置。有任何不明白的地方都可以随时问我！