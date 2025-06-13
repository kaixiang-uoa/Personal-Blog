This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 项目架构

本项目采用简化的架构设计，避免过度工程化，以提高可维护性和开发效率。

### 主要目录结构

- `/app` - Next.js页面
- `/components` - UI组件
- `/contexts` - 简化的上下文组件
- `/hooks` - React钩子
- `/lib` - 工具库和API客户端
- `/types` - 类型定义

### 架构特点

- **直接API调用**: 使用简化的API客户端直接与后端通信
- **本地状态管理**: 使用React内置的useState和useEffect管理状态
- **简化类型系统**: 只定义核心业务类型
- **扁平化组件结构**: 避免过度嵌套和抽象

### 文档

详细的架构和开发指南请参考:

- `SIMPLIFIED-ARCHITECTURE.md` - 架构说明文档
- `COMPONENT-FIXES.md` - 组件开发指南
- `CLEANUP-SUMMARY.md` - 代码库优化总结

## 项目优化记录

本项目曾进行过架构优化，采用了"小而精"的设计理念，删除了过度工程化的组件。具体优化内容见ARCHITECTURE.md。

主要优化点：
- 简化API调用层
- 集中类型定义
- 优化UI组件结构
- 删除冗余抽象层
- 清理重复代码

这些优化使项目更易于维护和理解，同时保持了功能完整性。
