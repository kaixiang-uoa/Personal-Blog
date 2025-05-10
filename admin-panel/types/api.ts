import { UserInfo } from "./auth";

// Base API response type
export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    token?: string;
    user?: UserInfo;
    error?: string;
  }