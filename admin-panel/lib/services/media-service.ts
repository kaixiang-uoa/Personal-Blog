import { apiClient } from './api-client';
import { adaptMedia, adaptMediaListResponse } from '../adapters/apiAdapters';
import { csrfService } from './csrf-service';
import type { ApiResponse, PaginatedResponse } from '@/types/api.types';
import type { 
  Media, 
  MediaFormData, 
  MediaQueryParams, 
  MediaListResponse, 
  UploadProgressEvent,
  MediaApiResponse 
} from '@/types/media.types';
import axios from 'axios';

/**
 * Media service with methods for managing media files
 */
export const mediaService = {
  /**
   * Get all media files
   * @param params - Query parameters for filtering and pagination
   * @returns List of media files
   */
  getAll: async (params?: MediaQueryParams): Promise<PaginatedResponse<Media[]>> => {
    try {
      const response = await apiClient.get("/media", { params });
      return adaptMediaListResponse(response);
    } catch (error: unknown) {
      console.error('Error fetching media:', error);
      throw error;
    }
  },

  /**
   * Get a media file by ID
   * @param id - Media ID
   * @returns Media file details
   */
  getById: async (id: string): Promise<ApiResponse<Media>> => {
    try {
      const response = await apiClient.get(`/media/${id}`) as MediaApiResponse;
      
      if (!response.success || !response.media) {
        return {
          success: false,
          message: response.message || 'Failed to fetch media',
          data: undefined
        };
      }
      
      return {
        success: response.success,
        message: response.message,
        data: adaptMedia(response.media)
      };
    } catch (error: unknown) {
      console.error('Error fetching media by ID:', error);
      throw error;
    }
  },

  /**
   * Upload a media file
   * @param formData - Form data containing the file
   * @param onUploadProgress - Optional callback for tracking upload progress
   * @returns Uploaded media file details
   */
  upload: async (
    formData: FormData, 
    onUploadProgress?: (progressEvent: UploadProgressEvent) => void
  ): Promise<ApiResponse<Media>> => {
    try {
      const response = await apiClient.post("/media", formData, {
        onUploadProgress: onUploadProgress ? (progressEvent) => {
          if (progressEvent.total) {
            const progress = progressEvent.loaded / progressEvent.total;
            onUploadProgress({
              loaded: progressEvent.loaded,
              total: progressEvent.total,
              progress: progress,
              bytes: progressEvent.loaded,
            });
          }
        } : undefined,
      }) as MediaApiResponse;
      
      if (!response.success || !response.media) {
        return {
          success: false,
          message: response.message || 'Failed to upload media',
          data: undefined
        };
      }
      
      return {
        success: response.success,
        message: response.message,
        data: adaptMedia(response.media)
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Upload error:', error.response?.data || error.message);
      } else {
        console.error('Upload error:', error);
      }
      throw error;
    }
  },

  /**
   * Update a media file
   * @param id - Media ID
   * @param data - Updated media data
   * @returns Updated media file details
   */
  update: async (id: string, data: Partial<MediaFormData>): Promise<ApiResponse<Media>> => {
    try {
      const apiData = {
        ...data,
        alt: data.alt, 
        alt_en: data.alt, 
        alt_zh: data.alt, 
        caption: data.description, 
        caption_en: data.description, 
        caption_zh: data.description 
      };
      
      const protectedData = csrfService.protectForm(apiData);
      
      const response = await apiClient.put(`/media/${id}`, protectedData) as MediaApiResponse;
      
      if (!response.success || !response.media) {
        return {
          success: false,
          message: response.message || 'Failed to update media',
          data: undefined
        };
      }
      
      return {
        success: response.success,
        message: response.message,
        data: adaptMedia(response.media)
      };
    } catch (error: unknown) {
      console.error('Error updating media:', error);
      throw error;
    }
  },

  /**
   * Delete one or more media files
   * @param ids - Single ID or array of IDs to delete
   * @returns API response
   */
  delete: async (ids: string | string[]): Promise<ApiResponse<void>> => {
    try {
      const csrfData = csrfService.protectForm({});
      
      if (Array.isArray(ids)) {
        return await apiClient.delete(`/media`, { 
          data: { 
            ...csrfData,
            ids 
          } 
        });
      }
      return await apiClient.delete(`/media/${ids}`, { data: csrfData });
    } catch (error: unknown) {
      console.error('Error deleting media:', error);
      throw error;
    }
  }
}; 