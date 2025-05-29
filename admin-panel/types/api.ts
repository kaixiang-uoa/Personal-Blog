import { ApiResponse } from "./common";
import { UserInfo } from "./auth";

// API specific response types
export interface AuthResponse extends ApiResponse<UserInfo> {
  token?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}