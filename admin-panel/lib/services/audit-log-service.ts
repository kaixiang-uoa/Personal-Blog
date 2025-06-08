/**
 * Audit Log Service
 * 
 * Provides functionality for logging and tracking user activities
 * for security and compliance purposes.
 */
import { apiClient } from './api-client';
import { TokenManager } from './token-manager';
import { csrfService } from './csrf-service';
import type { ApiResponse, PaginatedResponse } from '@/types/api.types';

/**
 * Activity log severity levels
 */
export enum LogSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

/**
 * Activity log categories
 */
export enum LogCategory {
  AUTH = 'authentication',
  DATA = 'data_modification',
  ADMIN = 'admin_action',
  SECURITY = 'security',
  SYSTEM = 'system'
}

/**
 * Activity log entry interface
 */
export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId?: string;
  username?: string;
  ipAddress?: string;
  userAgent?: string;
  action: string;
  category: LogCategory;
  severity: LogSeverity;
  details?: Record<string, unknown>;
  resource?: {
    type: string;
    id: string;
  };
}

/**
 * Activity log query parameters
 */
export interface AuditLogQueryParams {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  userId?: string;
  category?: LogCategory;
  severity?: LogSeverity;
  action?: string;
  resourceType?: string;
  resourceId?: string;
  search?: string;
}

/**
 * Activity log list response
 */
interface AuditLogListResponse {
  success: boolean;
  message?: string;
  data: {
    logs: AuditLogEntry[];
    total: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
}

/**
 * Create activity log entry parameters
 */
export interface CreateLogEntryParams {
  action: string;
  category: LogCategory;
  severity: LogSeverity;
  details?: Record<string, unknown>;
  resourceType?: string;
  resourceId?: string;
}

// Local log cache for offline state or network errors
const localLogCache: CreateLogEntryParams[] = [];
// Cache limit definition
const LOCAL_CACHE_LIMIT = 100;
// Flag to track if cache is being processed
let isProcessingCache = false;

/**
 * Audit Log Service - Tracks and manages user activity logs
 */
export const auditLogService = {
  /**
   * Get activity logs with optional filtering
   * @param params Query parameters for filtering and pagination
   * @returns Paginated list of activity logs
   */
  async getLogs(params?: AuditLogQueryParams): Promise<PaginatedResponse<AuditLogEntry[]>> {
    try {
      const response = await apiClient.get<AuditLogListResponse>('/audit-logs', { params });
      
      return {
        success: response.success,
        message: response.message,
        data: response.data.logs,
        pagination: {
          total: response.data.total,
          page: response.data.currentPage,
          limit: response.data.limit,
          pages: response.data.totalPages
        }
      };
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      throw error;
    }
  },
  
  /**
   * Create a new activity log entry
   * @param params Log entry parameters
   * @returns The created log entry
   */
  async createLogEntry(params: CreateLogEntryParams): Promise<ApiResponse<AuditLogEntry>> {
    try {
      // Add CSRF protection
      const protectedData = csrfService.protectForm(params);
      
      // Try to send log to server
      const response = await apiClient.post<ApiResponse<AuditLogEntry>>('/audit-logs', protectedData);
      
      // Process local cache if any
      if (localLogCache.length > 0 && !isProcessingCache) {
        this.processLocalCache();
      }
      
      return response;
    } catch (error) {
      // Cache locally if network or server error
      console.error('Error creating activity log entry:', error);
      this.cacheLogEntry(params);
      
      // Return a mock success response to avoid interrupting user operations
      return {
        success: true,
        message: 'Log entry stored locally',
        data: {
          id: 'local-' + Date.now(),
          timestamp: new Date().toISOString(),
          action: params.action,
          category: params.category,
          severity: params.severity,
          details: params.details,
          resource: params.resourceType && params.resourceId ? {
            type: params.resourceType,
            id: params.resourceId
          } : undefined
        }
      };
    }
  },
  
  /**
   * Log authentication related activity
   * @param action The action performed
   * @param severity The severity level
   * @param details Additional details about the action
   */
  async logAuthActivity(
    action: string, 
    severity: LogSeverity = LogSeverity.INFO, 
    details?: Record<string, unknown>
  ): Promise<void> {
    await this.createLogEntry({
      action,
      category: LogCategory.AUTH,
      severity,
      details
    });
  },
  
  /**
   * Log data modification activity
   * @param action The action performed
   * @param resourceType The type of resource modified
   * @param resourceId The ID of the resource modified
   * @param details Additional details about the modification
   */
  async logDataActivity(
    action: string,
    resourceType: string,
    resourceId: string,
    details?: Record<string, unknown>
  ): Promise<void> {
    await this.createLogEntry({
      action,
      category: LogCategory.DATA,
      severity: LogSeverity.INFO,
      resourceType,
      resourceId,
      details
    });
  },
  
  /**
   * Log security related activity
   * @param action The security action or event
   * @param severity The severity level
   * @param details Additional details about the security event
   */
  async logSecurityActivity(
    action: string,
    severity: LogSeverity = LogSeverity.WARNING,
    details?: Record<string, unknown>
  ): Promise<void> {
    await this.createLogEntry({
      action,
      category: LogCategory.SECURITY,
      severity,
      details
    });
  },
  
  /**
   * Log administrative actions
   * @param action The admin action performed
   * @param details Additional details about the admin action
   * @param resourceType Optional resource type
   * @param resourceId Optional resource ID
   */
  async logAdminActivity(
    action: string,
    details?: Record<string, unknown>,
    resourceType?: string,
    resourceId?: string
  ): Promise<void> {
    await this.createLogEntry({
      action,
      category: LogCategory.ADMIN,
      severity: LogSeverity.INFO,
      details,
      resourceType,
      resourceId
    });
  },
  
  /**
   * Cache a log entry locally when offline
   * @param params Log entry parameters to cache
   */
  cacheLogEntry(params: CreateLogEntryParams): void {
    // Add to local cache
    localLogCache.push(params);
    
    // Limit cache size
    if (localLogCache.length > LOCAL_CACHE_LIMIT) {
      localLogCache.shift(); // Remove oldest entry
    }
    
    // Store in sessionStorage for persistence across page reloads
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('auditLogCache', JSON.stringify(localLogCache));
      } catch (error) {
        console.error('Failed to store audit log cache in sessionStorage:', error);
      }
    }
  },
  
  /**
   * Process cached log entries
   * Attempts to send cached entries to the server
   */
  async processLocalCache(): Promise<void> {
    if (isProcessingCache || localLogCache.length === 0) return;
    
    isProcessingCache = true;
    
    try {
      // Create a copy of the cache to process
      const cacheToProcess = [...localLogCache];
      
      // Try to send each cached entry
      for (let i = 0; i < cacheToProcess.length; i++) {
        try {
          const protectedData = csrfService.protectForm(cacheToProcess[i]);
          await apiClient.post<ApiResponse<AuditLogEntry>>('/audit-logs', protectedData);
          
          // Remove successfully sent entry from cache
          const index = localLogCache.indexOf(cacheToProcess[i]);
          if (index !== -1) {
            localLogCache.splice(index, 1);
          }
        } catch (error) {
          console.error('Failed to process cached log entry:', error);
          // Stop processing on error
          break;
        }
      }
      
      // Update sessionStorage
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('auditLogCache', JSON.stringify(localLogCache));
        } catch (error) {
          console.error('Failed to update audit log cache in sessionStorage:', error);
        }
      }
    } finally {
      isProcessingCache = false;
    }
  },
  
  /**
   * Load cached entries from sessionStorage
   */
  loadCachedEntries(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const cachedData = sessionStorage.getItem('auditLogCache');
      if (cachedData) {
        const parsedCache = JSON.parse(cachedData) as CreateLogEntryParams[];
        
        // Validate and merge with current cache
        if (Array.isArray(parsedCache)) {
          // Clear current cache and add loaded entries
          localLogCache.length = 0;
          
          // Add only valid entries
          parsedCache.forEach(entry => {
            if (entry && typeof entry === 'object' && 'action' in entry && 'category' in entry && 'severity' in entry) {
              localLogCache.push(entry);
            }
          });
        }
      }
    } catch (error) {
      console.error('Failed to load audit log cache from sessionStorage:', error);
    }
  },
  
  /**
   * Initialize the audit log service
   */
  init(): void {
    this.loadCachedEntries();
    
    // Attempt to process cache when online
    if (typeof window !== 'undefined') {
      // Process cache when online
      if (navigator.onLine && localLogCache.length > 0) {
        this.processLocalCache();
      }
      
      // Set up online event listener to process cache when connection is restored
      window.addEventListener('online', () => {
        if (localLogCache.length > 0) {
          this.processLocalCache();
        }
      });
    }
  }
}; 