# 项目文档索引

本文档提供了Personal-Blog项目的所有技术文档的组织结构和索引。

## 文档组织结构

```
docs/
├── README.md                               # 文档索引（当前文件）
├── architecture/                           # 系统架构文档
│   ├── System_Architecture.md              # 系统整体架构
│   └── Database_Schema.md                  # 数据库模式设计
├── backend/                                # 后端开发文档
│   ├── API_Endpoints.md                    # API端点设计
│   ├── Database_Optimization.md            # 数据库优化指南
│   ├── Security_Measures.md                # 安全措施实施
│   └── Testing_Strategy.md                 # 测试策略
├── frontend/                               # 前端开发文档
│   ├── Component_Structure.md              # 组件结构设计
│   ├── Page_Structure.md                   # 页面结构指南
│   ├── Styling_Guidelines.md               # 样式指南
│   └── Internationalization.md             # 国际化实现
├── admin/                                  # 管理面板文档
│   ├── Admin_Panel_Overview.md             # 管理面板概述
│   ├── Authentication_System.md            # 认证系统
│   ├── Settings_System.md                  # 设置系统
│   └── Media_Management.md                 # 媒体管理系统
├── standards/                              # 编码标准文档
│   ├── Code_Comment_Standards.md           # 代码注释规范
│   ├── API_Documentation_Standards.md      # API文档规范
│   └── Git_Workflow.md                     # Git工作流
└── optimization/                           # 性能优化文档
    ├── Frontend_Performance.md             # 前端性能优化
    ├── Backend_Performance.md              # 后端性能优化
    └── Database_Query_Optimization.md      # 数据库查询优化
```

## 最近更新

以下是最近更新或新增的文档：

- 2023-06-15: 完成了[页面结构指南](frontend/Page_Structure.md)，整合About页面实现方案
- 2023-06-15: 新增[媒体管理系统](admin/Media_Management.md)文档，详细分析了媒体管理的API和存储逻辑
- 2023-06-14: 更新了[系统整体架构](architecture/System_Architecture.md)文档
- 2023-06-13: 添加了[数据库优化指南](backend/Database_Optimization.md)

## 文档迁移进度

本项目的文档体系正在经历一次重大整合，从分散的多个位置（`/docs`和`/Back-end/docs`）整合到统一的文档结构中。

### 已完成迁移

- [x] 数据库优化指南
- [x] 测试策略
- [x] 安全措施实施
- [x] 代码注释规范
- [x] API文档规范
- [x] 系统架构概述
- [x] 组件结构设计
- [x] 页面结构指南
- [x] 媒体管理系统

### 待完成迁移

- [ ] Git工作流
- [ ] 国际化实现
- [ ] 样式指南
- [ ] 管理面板概述

## 贡献指南

如需添加或修改文档，请遵循以下原则：

1. 使用Markdown格式编写文档
2. 文件名使用下划线分隔单词（如`System_Architecture.md`）
3. 文档内容应包含：
   - 标题（一级标题）
   - 概述
   - 详细内容（分节组织）
   - 相关文档链接（如适用）

提交前请确保文档格式正确，内容清晰，并在本索引文件中更新对应条目。 