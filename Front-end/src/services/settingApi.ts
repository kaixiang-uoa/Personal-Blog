import { externalApi } from './api';
import type { GetFallbackRouteParams } from '@/types/dto/commonDto';
import type { SettingItem, Settings } from '@/types/models/setting';

export const settingApi = {
  getAllSettings: async (): Promise<Settings> => {
    return externalApi.get<Settings>('/settings');
  },

  getSettingsByGroup: async (group: string): Promise<SettingItem[]> => {
    const data = await externalApi.get<Settings>('/settings', { group });
    
    // 确保返回的是数组格式
    if (Array.isArray(data)) {
      return data;
    } else {
      // 如果是对象格式，转换为数组格式
      return Object.entries(data).map(([key, value]) => ({
        key,
        value,
        group
      }));
    }
  },

  // support specific language settings
  getAllSettingsWithLang: async (params?: GetFallbackRouteParams): Promise<Settings> => {
    return externalApi.get<Settings>('/settings', params);
  },
}; 