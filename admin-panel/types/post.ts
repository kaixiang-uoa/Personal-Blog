// Define post data type
export interface PostData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string[];
    status: string;
    featured: boolean;
    featuredImage: string;
    author?: {
      name: string;
      avatar?: string;
    };
    createdAt?: string;
    categoryData: any[];
    displayTags: string[];   // 显示用的标签数组
    originalTags: any[];     // 原始标签数据
    tempTags?: string[];     // 临时添加的标签
    tagsToRemove?: any[];    // 标记为需要删除的标签
  }

  
  // 使用具体的类型而不是 any
export  interface PostParams {
    id: string;
  }
  