import apiClient from './api-client';
import type { ApiResponse, PaginatedResponse } from '@/types/common';

export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'archived';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  notes?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactNote {
  _id: string;
  contactId: string;
  content: string;
  createdBy: string;
  createdAt: string;
}

export const contactService = {
  getAll: async (params?: { 
    status?: Contact['status']; 
    priority?: Contact['priority'];
    assignedTo?: string;
    page?: number; 
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<PaginatedResponse<Contact[]>> => {
    return apiClient.get("/contacts", { params });
  },

  getById: async (id: string): Promise<ApiResponse<Contact>> => {
    return apiClient.get(`/contacts/${id}`);
  },

  create: async (data: ContactFormData): Promise<ApiResponse<Contact>> => {
    return apiClient.post("/contacts", data);
  },

  update: async (id: string, data: Partial<Contact>): Promise<ApiResponse<Contact>> => {
    return apiClient.put(`/contacts/${id}`, data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/contacts/${id}`);
  },

  updateStatus: async (id: string, status: Contact['status']): Promise<ApiResponse<Contact>> => {
    return apiClient.patch(`/contacts/${id}/status`, { status });
  },

  updatePriority: async (id: string, priority: Contact['priority']): Promise<ApiResponse<Contact>> => {
    return apiClient.patch(`/contacts/${id}/priority`, { priority });
  },

  assignTo: async (id: string, userId: string): Promise<ApiResponse<Contact>> => {
    return apiClient.patch(`/contacts/${id}/assign`, { assignedTo: userId });
  },

  getNotes: async (contactId: string): Promise<ApiResponse<ContactNote[]>> => {
    return apiClient.get(`/contacts/${contactId}/notes`);
  },

  addNote: async (contactId: string, content: string): Promise<ApiResponse<ContactNote>> => {
    return apiClient.post(`/contacts/${contactId}/notes`, { content });
  },

  deleteNote: async (contactId: string, noteId: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/contacts/${contactId}/notes/${noteId}`);
  },

  getStats: async (): Promise<ApiResponse<{
    total: number;
    byStatus: Record<Contact['status'], number>;
    byPriority: Record<Contact['priority'], number>;
    averageResponseTime: number;
    recentActivity: {
      date: string;
      count: number;
    }[];
  }>> => {
    return apiClient.get("/contacts/stats");
  },

  exportContacts: async (params?: {
    status?: Contact['status'];
    priority?: Contact['priority'];
    startDate?: string;
    endDate?: string;
    format?: 'csv' | 'excel';
  }): Promise<Blob> => {
    const response = await apiClient.get("/contacts/export", {
      params,
      responseType: 'blob'
    });
    return response.data;
  },

  bulkUpdate: async (ids: string[], data: Partial<Contact>): Promise<ApiResponse<Contact[]>> => {
    return apiClient.patch("/contacts/bulk", { ids, data });
  },

  bulkDelete: async (ids: string[]): Promise<ApiResponse<void>> => {
    return apiClient.delete("/contacts/bulk", { data: { ids } });
  }
}; 