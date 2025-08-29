# Docker 部署文档

## 项目概览

本文档记录了将 Personal Blog 后端从 Render 迁移到 Oracle Cloud 免费版本的完整 Docker 部署流程。

## 部署架构

```
本地开发环境
    ↓ (docker build)
Docker Hub Registry
    ↓ (docker pull)
Oracle Cloud VM (Ubuntu 22.04)
    ↓ (docker run)
生产环境容器
```

## 三步部署计划

### 第一步：手动流程练习 ✅ 进行中
- [x] 创建 Dockerfile
- [ ] 本地构建和测试
- [ ] 推送到 Docker Hub
- [ ] Oracle VM 部署

### 第二步：GitHub Actions 自动化
- [ ] 配置 GitHub Actions workflow
- [ ] 设置 Docker Hub secrets
- [ ] 测试自动构建流程

### 第三步：生产环境自动化
- [ ] 配置 docker-compose
- [ ] 编写部署脚本
- [ ] 设置监控和日志

## 技术要求

- **后端**: Node.js 18+ + Express + MongoDB
- **容器**: Docker + Docker Compose
- **云平台**: Oracle Cloud Free Tier
- **CI/CD**: GitHub Actions
- **镜像仓库**: Docker Hub

## 环境变量要求

### 必需变量
- `PORT`: 服务端口 (默认 3002)
- `MONGODB_URI`: MongoDB 连接字符串
- `JWT_SECRET`: JWT 密钥 (≥32 字符)
- `JWT_EXPIRE`: JWT 过期时间

### 可选变量
- `NODE_ENV`: 运行环境 (production/development)
- `ALLOWED_ORIGINS`: CORS 允许的源
- `KEEP_ALIVE_TARGET_URL`: Keep-Alive 目标 URL

## 文档结构

```
docs/docker/
├── README.md                    # 主文档 (本文件)
├── docker-basics-guide.md      # 🆕 Docker 基础学习指南
├── step1-manual-deployment.md  # 第一步详细指南
├── github-actions-setup.md     # 🆕 GitHub Actions CI/CD 配置
├── step3-production-setup.md   # 第三步生产环境
├── progress-log.md             # 进度跟踪日志
├── troubleshooting.md          # 故障排除
└── environment-setup.md        # 环境配置指南
```

## 学习路径

### 🎓 Docker 新手
如果你对 Docker 完全陌生，建议按以下顺序学习：

1. **[Docker 基础学习指南](./docker-basics-guide.md)** 📚
   - Docker 核心概念和原理
   - Dockerfile 逐行详解
   - Docker Compose 配置解析
   - 常用命令和最佳实践

2. **[第一步：手动部署实践](./step1-manual-deployment.md)** 🛠️
   - 动手构建和测试镜像
   - 实际部署经验

3. **[GitHub Actions CI/CD 配置](./github-actions-setup.md)** 🔄
   - 自动化构建和推送流程
   - 配置 GitHub Secrets
   - 测试工作流

4. **[进度跟踪](./progress-log.md)** 📊
   - 查看完成情况和下一步计划

## 快速开始

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd Personal-Blog/Back-end
   ```

2. **构建镜像**
   ```bash
   docker build -t blog-backend:latest .
   ```

3. **运行容器**
   ```bash
   docker run -p 3002:3002 --env-file .env blog-backend:latest
   ```

## 下一步

开始 [第一步：手动流程练习](./step1-manual-deployment.md)