/**
 * 模拟数据示例
 * 
 * 这个文件展示了如何创建模拟数据，用于在后端服务不可用时提供前端开发环境使用
 * 在开发环境中，可以使用这些模拟数据来避免因后端不可用导致的开发中断
 */

// 模拟文章数据
export const mockPosts = [
  {
    id: 1,
    title: "模拟文章标题 1",
    content: "这是模拟文章内容...",
    slug: "mock-post-1",
    excerpt: "模拟文章摘要...",
    coverImage: "/images/placeholder.jpg",
    publishedAt: new Date().toISOString(),
    author: {
      id: 1,
      name: "模拟作者",
      avatar: "/images/avatar.jpg"
    },
    categories: [
      { id: 1, name: "技术", slug: "technology" }
    ],
    tags: [
      { id: 1, name: "React", slug: "react" },
      { id: 2, name: "Next.js", slug: "nextjs" }
    ]
  },
  // 可以添加更多模拟文章...
];

// 模拟分类数据
export const mockCategories = [
  { id: 1, name: "技术", slug: "technology" },
  { id: 2, name: "设计", slug: "design" },
  { id: 3, name: "生活", slug: "life" }
];

// 模拟标签数据
export const mockTags = [
  { id: 1, name: "React", slug: "react" },
  { id: 2, name: "Next.js", slug: "nextjs" },
  { id: 3, name: "TypeScript", slug: "typescript" },
  { id: 4, name: "CSS", slug: "css" }
];