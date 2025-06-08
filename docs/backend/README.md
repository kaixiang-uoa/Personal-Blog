# 个人博客系统文档中心

本文档中心包含个人博客系统的所有技术文档，用于系统学习和复习项目中使用的技术和最佳实践。文档按照以下分类组织：

## 1. 系统架构

- [系统架构概览](./architecture/System_Architecture_Overview.md) - 系统整体架构设计和模块划分 ✅
- [数据库ER图](./architecture/Database_ER_Diagram.md) - 数据库实体关系图和表结构说明 ✅
- [前端序列图](./architecture/Frontend_Sequence_Diagram.md) - 前端主要流程和数据流向 ✅
- [后台序列图](./architecture/Admin_Sequence_Diagram.md) - 管理后台操作流程和交互 ✅

## 2. 后端开发

- [后端架构与优化](./backend/Backend_Overview.md) - 后端架构概述和主要优化措施 ✅
- [API设计与文档](./backend/API_Documentation.md) - RESTful API设计规范和详细接口文档 ✅
- [安全增强措施](./backend/Security_Enhancements.md) - 后端安全措施和最佳实践 🔄
- [数据库优化指南](./backend/Database_Optimization.md) - 数据库性能优化和索引策略 ✅
- [后端测试策略](./backend/Testing_Strategy.md) - 单元测试和集成测试方法 🔄

## 3. 前端开发

- [前端架构与优化](./frontend/Frontend_Overview.md) - 前端架构概述和主要优化措施 🔄
- [组件目录结构](./frontend/Component_Structure.md) - 组件组织和目录结构设计 🔄
- [页面结构指南](./frontend/Page_Structure.md) - 页面布局和路由组织 🔄
- [状态管理策略](./frontend/State_Management.md) - 全局状态和本地状态管理 🔄
- [国际化实现](./frontend/Internationalization.md) - 多语言支持实现方案 🔄

## 4. 管理后台

- [设置系统设计](./admin/Setting_System.md) - 全局设置系统的设计与实现 🔄
- [后台面板优化](./admin/Admin_Panel_Optimization.md) - 后台界面的设计优化 🔄
- [媒体管理系统](./admin/Media_Management.md) - 媒体文件上传和管理 🔄

## 5. 编码规范

- [代码注释规范](./standards/Code_Comment_Standards.md) - 代码注释风格和JSDoc规范 🔄
- [注释迁移指南](./standards/Comment_Migration_Guide.md) - 中文注释到英文注释的迁移 🔄
- [API对接规范](./standards/API_Integration_Standards.md) - 前后端API对接的最佳实践 🔄

## 6. 性能优化

- [标准化优化](./optimization/Standardization.md) - 代码和API标准化优化 🔄
- [数据库性能](./optimization/Database_Performance.md) - 数据库查询和索引优化 🔄
- [前端性能](./optimization/Frontend_Performance.md) - 前端加载和渲染性能优化 🔄

## 技术栈概览

### 后端技术栈
- **Node.js** - JavaScript运行时
- **Express.js** - Web应用框架
- **MongoDB** - NoSQL数据库
- **Mongoose** - MongoDB对象模型
- **JWT** - 用户认证
- **Winston** - 日志记录
- **Jest** - 测试框架

### 前端技术栈
- **Next.js** - React框架
- **React** - UI库
- **TypeScript** - 类型安全的JavaScript
- **Tailwind CSS** - 实用优先的CSS框架
- **React Query** - 数据获取和缓存
- **Next-Intl** - 国际化
- **Axios** - HTTP客户端
- **Shadcn/ui** - UI组件库

## 学习路径建议

如果你是新加入项目的开发者，建议按以下顺序阅读文档：

1. 首先阅读[系统架构概览](./architecture/System_Architecture_Overview.md)了解整体架构
2. 然后阅读[后端架构与优化](./backend/Backend_Overview.md)和前端架构与优化
3. 接着阅读[API设计与文档](./backend/API_Documentation.md)了解API接口
4. 最后根据具体需要深入特定领域的文档

## 贡献指南

文档更新和维护规范：

1. 所有文档使用Markdown格式
2. 新功能开发需同步更新相关文档
3. 重大重构需要先更新架构文档
4. 文档提交前进行拼写和链接检查

## 文档整合进度

- ✅ 已完成
- 🔄 进行中
- ⏳ 待完成

文档整合正在进行中，优先完成系统架构和后端开发部分，接下来将整合前端部分文档。 