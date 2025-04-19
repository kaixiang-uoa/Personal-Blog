// API基础URL
const API_BASE_URL = 'http://localhost:3000/api';

// 通用请求函数
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // 默认请求头
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // 如果有认证token，添加到请求头
  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  const config = {
    ...options,
    headers,
  };
  
  try {
    const response = await fetch(url, config);
    
    // 检查响应状态
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `请求失败: ${response.status}`);
    }
    
    // 解析JSON响应
    return await response.json();
  } catch (error) {
    console.error('API请求错误:', error);
    throw error;
  }
}

// 导出API方法
export const api = {
  // 文章相关
  posts: {
    getAll: () => request('/posts'),
    getById: (id) => request(`/posts/${id}`),
    create: (data) => request('/posts', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/posts/${id}`, { method: 'DELETE' }),
  },
  
  // 媒体相关
  media: {
    getAll: () => request('/media'),
    upload: (formData) => request('/media/upload', { 
      method: 'POST', 
      body: formData,
      headers: {} // 不设置Content-Type，让浏览器自动设置
    }),
    delete: (id) => request(`/media/${id}`, { method: 'DELETE' }),
  },
  
  // 用户认证
  auth: {
    login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
    me: () => request('/auth/me'),
  },
  
  // 站点统计
  stats: {
    get: () => request('/stats'),
  },
};