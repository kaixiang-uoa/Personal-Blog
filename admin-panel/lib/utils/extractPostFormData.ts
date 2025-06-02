// 提取 post 数据为表单结构
export function extractPostFormData(post: any) {
  return {
    ...post,
    categoryData: Array.isArray(post.categories) ? post.categories : [],
    originalTags: Array.isArray(post.tags) ? post.tags : [],
    displayTags: Array.isArray(post.tags) ? post.tags.map((tag: any) => tag.name?.en || tag.name || '') : [],
  };
} 