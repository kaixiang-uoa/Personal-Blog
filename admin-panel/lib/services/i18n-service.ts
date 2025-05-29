import apiClient from './api-client';
import type { ApiResponse, PaginatedResponse } from '@/types/common';

export interface Translation {
  _id: string;
  key: string;
  namespace: string;
  translations: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface TranslationFormData {
  key: string;
  namespace: string;
  translations: Record<string, string>;
}

export interface TranslationHistory {
  _id: string;
  translationId: string;
  key: string;
  namespace: string;
  oldTranslations: Record<string, string>;
  newTranslations: Record<string, string>;
  changedBy: string;
  createdAt: string;
}

export const i18nService = {
  getAll: async (params?: { namespace?: string; page?: number; limit?: number }): Promise<PaginatedResponse<Translation[]>> => {
    return apiClient.get("/i18n", { params });
  },

  getByKey: async (key: string, namespace: string): Promise<ApiResponse<Translation>> => {
    return apiClient.get(`/i18n/${namespace}/${key}`);
  },

  getByNamespace: async (namespace: string, params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Translation[]>> => {
    return apiClient.get(`/i18n/namespace/${namespace}`, { params });
  },

  create: async (data: TranslationFormData): Promise<ApiResponse<Translation>> => {
    return apiClient.post("/i18n", data);
  },

  batchCreate: async (data: TranslationFormData[]): Promise<ApiResponse<Translation[]>> => {
    return apiClient.post("/i18n/batch", data);
  },

  update: async (key: string, namespace: string, data: Partial<TranslationFormData>): Promise<ApiResponse<Translation>> => {
    return apiClient.put(`/i18n/${namespace}/${key}`, data);
  },

  delete: async (key: string, namespace: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/i18n/${namespace}/${key}`);
  },

  getHistory: async (params?: { key?: string; namespace?: string; page?: number; limit?: number }): Promise<PaginatedResponse<TranslationHistory[]>> => {
    const endpoint = params?.key && params?.namespace
      ? `/i18n/history/${params.namespace}/${params.key}`
      : '/i18n/history/all';
    return apiClient.get(endpoint, { params: { page: params?.page, limit: params?.limit } });
  },

  getVersions: async (key: string, namespace: string, limit: number = 5): Promise<ApiResponse<TranslationHistory[]>> => {
    return apiClient.get(`/i18n/versions/${namespace}/${key}`, { params: { limit } });
  },

  rollback: async (historyId: string): Promise<ApiResponse<Translation>> => {
    return apiClient.post(`/i18n/rollback/${historyId}`);
  },

  exportTranslations: async (namespace: string, format: 'json' | 'yaml' = 'json'): Promise<{
    metadata: {
      exportDate: string;
      version: string;
      namespace: string;
      format: string;
    };
    translations: Record<string, Record<string, string>>;
  }> => {
    const response = await apiClient.get(`/i18n/namespace/${namespace}`);
    const translations = response.data;
    
    if (!translations) {
      throw new Error('No translations available for export');
    }
    
    const formattedTranslations: Record<string, Record<string, string>> = {};
    
    translations.forEach((translation: Translation) => {
      formattedTranslations[translation.key] = translation.translations;
    });
    
    return {
      metadata: {
        exportDate: new Date().toISOString(),
        version: '1.0',
        namespace,
        format
      },
      translations: formattedTranslations
    };
  },

  importTranslations: async (namespace: string, data: Record<string, Record<string, string>>): Promise<ApiResponse<Translation[]>> => {
    const translations: TranslationFormData[] = Object.entries(data).map(([key, translations]) => ({
      key,
      namespace,
      translations
    }));
    
    return apiClient.post("/i18n/batch", translations);
  }
}; 