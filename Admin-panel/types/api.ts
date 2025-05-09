// admin-panel/types/api.ts

// Base API response type
export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    token?: string;
    user?: UserInfo;
    error?: string;
  }
  
  // User information type
  export interface UserInfo {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'editor' | 'author';
    avatar?: string;
    displayName?: string;
    permissions?: string[];
  }
  
  // Login request parameters type
  export interface LoginRequest {
    email: string;       // Backend uses email
    password: string;
  }
  
  // Login response type
  export interface LoginResponse {
    success: boolean;
    token: string;
    user: UserInfo;
    message?: string;
  }