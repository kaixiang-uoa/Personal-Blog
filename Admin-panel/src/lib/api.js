import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加认证令牌
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器 - 处理常见错误
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 处理401错误 - 未授权/令牌过期
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth_token');
      // 可以在这里添加重定向到登录页的逻辑
      // 目前我们先简单处理，之后添加路由时可以优化
      alert('您的登录已过期，请重新登录');
    }
    return Promise.reject(error);
  }
);

export default api; 