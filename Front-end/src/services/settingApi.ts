import { getApiData } from './api';
import type { GetFallbackRouteParams } from '@/types';

interface Settings {
  [key: string]: any;
}

export const settingApi = {
  getAllSettings: async (): Promise<Settings> => {
    return getApiData<Settings>('/settings');
  },

  getSettingsByGroup: async (group: string): Promise<Settings> => {
    return getApiData<Settings>('/settings', { group });
  },

  // support specific language settings
  getAllSettingsWithLang: async (params?: GetFallbackRouteParams): Promise<Settings> => {
    return getApiData<Settings>('/settings', params);
  },
}; 