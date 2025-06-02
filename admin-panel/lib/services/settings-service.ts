import apiClient from './api-client';
import type { ApiResponse, PaginatedResponse } from '@/types/common';

export interface Setting {
  _id: string;
  key: string;
  value: any;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SettingFormData {
  key: string;
  value: any;
  description?: string;
}

export interface SettingHistory {
  _id: string;
  settingId: string;
  key: string;
  oldValue: any;
  newValue: any;
  changedBy: string;
  createdAt: string;
}

export const settingsService = {
  getAll: async (): Promise<ApiResponse<Record<string, any>>> => {
    return apiClient.get("/settings");
  },

  getByKey: async (key: string): Promise<ApiResponse<Setting>> => {
    return apiClient.get(`/settings/${key}`);
  },

  create: async (data: SettingFormData): Promise<ApiResponse<Setting>> => {
    return apiClient.post("/settings", data);
  },

  batchUpdate: async (data: Record<string, any>): Promise<ApiResponse<Setting[]>> => {
    return apiClient.post("/settings/batch", data);
  },

  update: async (key: string, data: Partial<SettingFormData>): Promise<ApiResponse<Setting>> => {
    return apiClient.put(`/settings/${key}`, data);
  },

  delete: async (key: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/settings/${key}`);
  },

  getHistory: async (params?: { key?: string; page?: number; limit?: number }): Promise<PaginatedResponse<SettingHistory[]>> => {
    const endpoint = params?.key 
      ? `/settings/history/${params.key}`
      : '/settings/history/all';
    return apiClient.get(endpoint, { params: { page: params?.page, limit: params?.limit } });
  },

  getVersions: async (key: string, limit: number = 5): Promise<ApiResponse<SettingHistory[]>> => {
    return apiClient.get(`/settings/versions/${key}`, { params: { limit } });
  },

  rollback: async (historyId: string): Promise<ApiResponse<Setting>> => {
    return apiClient.post(`/settings/rollback/${historyId}`);
  },

  exportForEnvironment: async (env: 'development' | 'production' | 'staging'): Promise<{
    metadata: {
      exportDate: string;
      version: string;
      environment: string;
    };
    settings: Record<string, any>;
  }> => {
    const response = await apiClient.get("/settings") as { data: Record<string, any> };
    const settingsData = response.data;
    
    if (!settingsData) {
      throw new Error('No settings data available for export');
    }
    
    const environmentOverrides: Record<string, any> = {};
    
    if (env === 'production') {
      environmentOverrides['advanced.debugMode'] = false;
      environmentOverrides['advanced.cacheTimeout'] = 3600;
    } else if (env === 'staging') {
      environmentOverrides['advanced.debugMode'] = true;
      environmentOverrides['general.siteName'] = `[STAGING] ${settingsData['general.siteName'] || 'Blog'}`;
    } else {
      environmentOverrides['advanced.debugMode'] = true;
      environmentOverrides['advanced.cacheTimeout'] = 0;
    }
    
    return {
      metadata: {
        exportDate: new Date().toISOString(),
        version: '1.0',
        environment: env
      },
      settings: {
        ...settingsData,
        ...environmentOverrides
      }
    };
  }
}; 