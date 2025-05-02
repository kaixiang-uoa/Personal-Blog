// 导入模拟数据
import settingsData from '../mockData/SystemSettings.json';
import dashboardData from '../mockData/Dashboard.json';
import contentData from '../mockData/ContentManagement.json';
import mediaData from '../mockData/MediaManagement.json';

// 模拟API服务
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟API请求的工具函数
export const fetchMockData = (endpoint) => {
  return new Promise((resolve, reject) => {
    // 模拟网络延迟
    setTimeout(() => {
      // 根据endpoint返回不同的模拟数据
      switch (endpoint) {
        case 'settings':
          resolve(settingsData);
          break;
        case 'dashboard':
          resolve(dashboardData);
          break;
        case 'content':
          resolve(contentData);
          break;
        case 'media':
          resolve(mediaData);
          break;
        default:
          reject(new Error(`未找到数据类型: ${endpoint}`));
      }
    }, 300); // 模拟300ms的网络延迟
  });
};

// 如果需要使用内联数据（用于测试或开发），可以使用以下函数
export const fetchMockDataInline = async (dataType) => {
  // 这里可以放置内联数据，如果需要的话
  console.warn('fetchMockDataInline 已弃用，请使用 fetchMockData');
  return fetchMockData(dataType);
};