import { apiClient } from './api-client';
import type { ApiResponse, PaginatedResponse } from '@/types/api.types';
import type { 
  Setting, 
  SettingFormData, 
  SettingHistory, 
  SettingsResponse, 
  SettingsHistoryResponse 
} from '@/types/settings.types';
import axios from 'axios';

/**
 * Settings service with methods for managing system settings
 */
export const settingsService = {
  /**
   * Get all settings
   * @returns Record of all settings
   */
  getAll: async (): Promise<ApiResponse<Record<string, unknown>>> => {
    try {
      return await apiClient.get<SettingsResponse>("/settings");
    } catch (error: unknown) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  },

  /**
   * Get settings by group
   * @param group - Settings group name
   * @returns Settings in the specified group
   */
  getByGroup: async (group: string): Promise<ApiResponse<Record<string, unknown>>> => {
    try {
      return await apiClient.get<SettingsResponse>("/settings", { params: { group } });
    } catch (error: unknown) {
      console.error('Error fetching settings by group:', error);
      throw error;
    }
  },

  /**
   * Get a setting by its key
   * @param key - Setting key
   * @returns Setting details
   */
  getByKey: async (key: string): Promise<ApiResponse<Setting>> => {
    try {
      return await apiClient.get<ApiResponse<Setting>>(`/settings/${key}`);
    } catch (error: unknown) {
      console.error('Error fetching setting by key:', error);
      throw error;
    }
  },

  /**
   * Create a new setting
   * @param data - Setting form data
   * @returns Created setting
   */
  create: async (data: SettingFormData): Promise<ApiResponse<Setting>> => {
    try {
      return await apiClient.post<ApiResponse<Setting>>("/settings", data);
    } catch (error: unknown) {
      console.error('Error creating setting:', error);
      throw error;
    }
  },

  /**
   * Batch update multiple settings
   * @param data - Array of settings to update
   * @returns Updated settings
   */
  batchUpdate: async (data: SettingFormData[]): Promise<ApiResponse<Setting[]>> => {
    try {
      return await apiClient.post<ApiResponse<Setting[]>>("/settings/batch", { settings: data });
    } catch (error: unknown) {
      console.error('Error batch updating settings:', error);
      throw error;
    }
  },

  /**
   * Update a setting
   * @param key - Setting key
   * @param data - Setting data to update
   * @returns Updated setting
   */
  update: async (key: string, data: Partial<SettingFormData>): Promise<ApiResponse<Setting>> => {
    try {
      return await apiClient.put<ApiResponse<Setting>>(`/settings/${key}`, data);
    } catch (error: unknown) {
      console.error('Error updating setting:', error);
      throw error;
    }
  },

  /**
   * Delete a setting
   * @param key - Setting key
   * @returns API response
   */
  delete: async (key: string): Promise<ApiResponse<void>> => {
    try {
      return await apiClient.delete<ApiResponse<void>>(`/settings/${key}`);
    } catch (error: unknown) {
      console.error('Error deleting setting:', error);
      throw error;
    }
  },

  /**
   * Get setting history
   * @param params - Optional parameters for filtering and pagination
   * @returns Paginated list of setting history records
   */
  getHistory: async (params?: { key?: string; page?: number; limit?: number }): Promise<PaginatedResponse<SettingHistory[]>> => {
    try {
      const endpoint = params?.key 
        ? `/settings/history/${params.key}`
        : '/settings/history/all';
      return await apiClient.get<SettingsHistoryResponse>(endpoint, { 
        params: { page: params?.page, limit: params?.limit } 
      });
    } catch (error: unknown) {
      console.error('Error fetching setting history:', error);
      throw error;
    }
  },

  /**
   * Get versions of a setting
   * @param key - Setting key
   * @param limit - Maximum number of versions to retrieve
   * @returns List of setting versions
   */
  getVersions: async (key: string, limit: number = 5): Promise<ApiResponse<SettingHistory[]>> => {
    try {
      return await apiClient.get<ApiResponse<SettingHistory[]>>(`/settings/versions/${key}`, { params: { limit } });
    } catch (error: unknown) {
      console.error('Error fetching setting versions:', error);
      throw error;
    }
  },

  /**
   * Rollback a setting to a previous version
   * @param historyId - History record ID
   * @returns Updated setting
   */
  rollback: async (historyId: string): Promise<ApiResponse<Setting>> => {
    try {
      return await apiClient.post<ApiResponse<Setting>>(`/settings/rollback/${historyId}`);
    } catch (error: unknown) {
      console.error('Error rolling back setting:', error);
      throw error;
    }
  },

  /**
   * Export settings for a specific environment
   * @param env - Environment name
   * @returns Exported settings with metadata
   */
  exportForEnvironment: async (env: 'development' | 'production' | 'staging'): Promise<{
    metadata: {
      exportDate: string;
      version: string;
      environment: string;
    };
    settings: Record<string, unknown>;
  }> => {
    try {
      const response = await apiClient.get<SettingsResponse>("/settings");
      const settingsData = response.data;
      
      if (!settingsData) {
        throw new Error('No settings data available for export');
      }
      
      const environmentOverrides: Record<string, unknown> = {};
      
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
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('API Error exporting settings:', error.response?.data || error.message);
      } else {
        console.error('Error exporting settings:', error);
      }
      throw error;
    }
  }
}; 