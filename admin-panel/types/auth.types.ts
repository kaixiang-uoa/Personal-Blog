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

// Alias UserInfo as User for new code
export type User = UserInfo;

// Login request parameters type
export interface LoginRequest {
  email: string;       // Backend uses email
  password: string;
  rememberMe?: boolean;
}

// Login response type
export interface LoginResponse {
  success: boolean;
  token: string;
  refreshToken: string;
  user: UserInfo;
  message?: string;
}

// Token refresh response type
export interface RefreshTokenResponse {
  success: boolean;
  token: string;
  refreshToken?: string;
  message?: string;
}

