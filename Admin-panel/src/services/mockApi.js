// 导入模拟数据
import settingsData from '../mockData/SystemSettings.json';
import dashboardData from '../mockData/Dashboard.json';
import contentData from '../mockData/ContentManagement.json';
import mediaData from '../mockData/MediaManagement.json';

// 模拟API请求的工具函数
export const fetchMockData = (endpoint) => {
  return new Promise((resolve) => {
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
          resolve(null);
      }
    }, 300); // 模拟300ms的网络延迟
  });
};