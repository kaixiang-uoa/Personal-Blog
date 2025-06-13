# 个人博客管理系统架构

## 目录结构

```
admin-panel/
├── app/                     # Next.js App Router 目录
│   ├── (admin)/             # 管理页面路由组
│   │   ├── dashboard/       # 仪表盘
│   │   ├── posts/           # 文章管理
│   │   ├── media/           # 媒体管理
│   │   └── settings/        # 系统设置
│   ├── login/               # 登录页面
│   ├── register/            # 注册页面
│   └── forgot-password/     # 找回密码
├── components/              # UI组件
│   ├── categories/          # 分类相关组件
│   ├── common/              # 通用功能组件
│   ├── dashboard/           # 仪表盘组件
│   ├── layouts/             # 布局组件
│   ├── media/               # 媒体管理组件
│   ├── navigation/          # 导航组件
│   ├── posts/               # 文章组件
│   ├── settings/            # 设置组件
│   └── ui/                  # UI基础组件库
│       ├── data-display/    # 数据展示组件
│       ├── feedback/        # 反馈组件
│       ├── inputs/          # 输入组件
│       ├── navigation/      # 导航UI组件
│       └── scroll-area/     # 滚动区域组件
├── contexts/                # 上下文
│   └── auth-context.tsx     # 身份验证上下文
├── hooks/                   # 自定义Hooks
│   └── ui/                  # UI相关Hooks
├── lib/                     # 工具库
│   ├── api.ts               # API客户端
│   ├── utils.ts             # 工具函数
│   └── validators/          # 数据验证
│       ├── form-validation.ts   # 表单验证
│       ├── media-validation.ts  # 媒体验证
│       ├── security-schemas.ts  # 安全相关验证
│       └── settings-schemas.ts  # 设置验证
└── types/                   # 类型定义
    └── index.ts             # 集中类型定义
```

## 核心模块

1. **认证模块**
   - 登录、注册、找回密码
   - JWT认证
   - 用户角色管理

2. **内容管理**
   - 文章CRUD
   - 分类和标签管理
   - 编辑器集成

3. **媒体管理**
   - 图片上传
   - 媒体库
   - 文件管理

4. **系统设置**
   - 常规设置
   - 文章设置
   - 关于页设置
   - 密码修改

## 技术栈

- **前端框架**: Next.js (App Router)
- **UI组件**: shadcn/ui (基于Radix UI)
- **样式**: TailwindCSS
- **状态管理**: React Context API
- **表单处理**: React Hook Form + Zod
- **API调用**: Axios
- **编辑器**: Tiptap
- **语言**: TypeScript

## 数据流

1. **组件层**: 用户交互
2. **Context层**: 状态管理
3. **API层**: 数据请求/响应
4. **后端API**: 数据持久化和处理 