# Authentication APIs

## 1. Login
### Request
```typescript
interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}
```

### Response
```typescript
interface LoginResponse {
  success: boolean;
  token: string;
  refreshToken: string;
  user: UserInfo;
  message?: string;
}

interface UserInfo {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'author';
  avatar?: string;
  displayName?: string;
  permissions?: string[];
}
```

### Example
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123",
  "rememberMe": true
}
```

## 2. Refresh Token
### Request
```typescript
interface RefreshTokenRequest {
  refreshToken: string;
}
```

### Response
```typescript
interface RefreshTokenResponse {
  success: boolean;
  token: string;
  refreshToken: string;
  message?: string;
}
```

### Example
```http
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

## 3. Logout
### Request
```typescript
interface LogoutRequest {
  refreshToken: string;
}
```

### Response
```typescript
interface LogoutResponse {
  success: boolean;
  message: string;
}
```

### Example
```http
POST /api/v1/auth/logout
Content-Type: application/json
Authorization: Bearer <token>

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

## 4. Password Reset
### Request Reset Link
```typescript
interface RequestPasswordResetRequest {
  email: string;
}
```

### Reset Password
```typescript
interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
```

### Response
```typescript
interface PasswordResetResponse {
  success: boolean;
  message: string;
}
```

### Example
```http
POST /api/v1/auth/request-password-reset
Content-Type: application/json

{
  "email": "user@example.com"
}
```

```http
POST /api/v1/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-123",
  "newPassword": "newPassword123",
  "confirmPassword": "newPassword123"
}
```

## Error Handling
### Common Errors
- 401: Authentication Failed
- 403: Invalid or Expired Token
- 404: User Not Found
- 429: Too Many Requests

### Error Response Example
```json
{
  "success": false,
  "error": {
    "code": "AUTH_FAILED",
    "message": "Invalid email or password"
  }
}
```

## Security Notes
1. All password transmissions must use HTTPS
2. Password reset tokens typically expire after 1 hour
3. Refresh tokens typically expire after 7 days
4. Access tokens typically expire after 1 hour
5. Account will be temporarily locked after 5 failed login attempts
```

</rewritten_file>