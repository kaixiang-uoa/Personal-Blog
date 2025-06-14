# Admin Panel Development Guide

## Directory Structure

```
Admin-panel/
├── src/
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── store/           # State management
│   ├── styles/          # Style files
│   └── utils/           # Utility functions
```

## Quick Start

1. **Requirements**
   - Node.js 18+
   - pnpm 8+

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Development Server**
   ```bash
   pnpm dev
   ```

4. **Build for Production**
   ```bash
   pnpm build
   ```

## Core Features

1. **User Authentication**
   - Login/Logout
   - Permission control
   - Session management

2. **Content Management**
   - Article management
   - Category management
   - Tag management

3. **Media Management**
   - Image upload
   - File management
   - Storage configuration

4. **System Settings**
   - Basic configuration
   - User management
   - Permission management

## Page Structure

### 1. Layout Component
```typescript
// src/components/layout/AdminLayout.tsx
export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};
```

### 2. Route Configuration
```typescript
// src/routes/index.tsx
const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    auth: true
  },
  {
    path: '/articles',
    component: ArticleList,
    auth: true
  },
  {
    path: '/media',
    component: MediaManager,
    auth: true
  },
  {
    path: '/settings',
    component: Settings,
    auth: true,
    admin: true
  }
];
```

## State Management

### 1. User State
```typescript
// src/store/userSlice.ts
interface UserState {
  user: User | null;
  token: string | null;
  permissions: string[];
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.permissions = [];
    }
  }
});
```

### 2. Permission Control
```typescript
// src/utils/auth.ts
export const checkPermission = (permission: string): boolean => {
  const userPermissions = store.getState().user.permissions;
  return userPermissions.includes(permission);
};

export const ProtectedRoute: React.FC<{
  permission?: string;
  children: React.ReactNode;
}> = ({ permission, children }) => {
  const hasPermission = permission ? checkPermission(permission) : true;
  return hasPermission ? <>{children}</> : <AccessDenied />;
};
```

## Media Management

### 1. Upload Component
```typescript
// src/components/media/Uploader.tsx
export const MediaUploader: React.FC<{
  onUpload: (file: File) => Promise<void>;
}> = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);
  
  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      await onUpload(file);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="uploader">
      <input
        type="file"
        onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
        disabled={uploading}
      />
      {uploading && <Loading />}
    </div>
  );
};
```

### 2. File Management
```typescript
// src/services/media.ts
export const mediaService = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return await api.post('/media/upload', formData);
  },
  
  list: async (params: MediaListParams) => {
    return await api.get('/media', { params });
  },
  
  delete: async (id: string) => {
    return await api.delete(`/media/${id}`);
  }
};
```

## System Settings

### 1. Configuration Management
```typescript
// src/services/settings.ts
export const settingsService = {
  get: async () => {
    return await api.get('/settings');
  },
  
  update: async (settings: SystemSettings) => {
    return await api.put('/settings', settings);
  }
};
```

### 2. User Management
```typescript
// src/services/users.ts
export const userService = {
  list: async (params: UserListParams) => {
    return await api.get('/users', { params });
  },
  
  create: async (user: CreateUserDto) => {
    return await api.post('/users', user);
  },
  
  update: async (id: string, user: UpdateUserDto) => {
    return await api.put(`/users/${id}`, user);
  },
  
  delete: async (id: string) => {
    return await api.delete(`/users/${id}`);
  }
};
```

## Performance Optimization

1. **Code Splitting**
   - Route-level splitting
   - Component lazy loading
   - Dynamic imports

2. **Caching Strategy**
   - Data caching
   - Component caching
   - API response caching

3. **Resource Optimization**
   - Image optimization
   - Bundle size optimization
   - Tree shaking

## Security Measures

1. **Authentication**
   - JWT token management
   - Session handling
   - Secure storage

2. **Authorization**
   - Role-based access control
   - Permission checking
   - Route protection

3. **Data Security**
   - Input validation
   - XSS prevention
   - CSRF protection

## Testing Strategy

1. **Unit Testing**
   - Component testing
   - Service testing
   - Utility testing

2. **Integration Testing**
   - Page testing
   - API integration testing
   - State management testing

3. **E2E Testing**
   - User flow testing
   - Critical path testing
   - Cross-browser testing

## Deployment

1. **Build Process**
   - Environment configuration
   - Build optimization
   - Asset management

2. **Deployment Steps**
   - Build generation
   - Server configuration
   - Service startup

3. **Monitoring**
   - Error tracking
   - Performance monitoring
   - User analytics

## Changelog

### 2024-03-21
- Restructured documentation
- Optimized component organization
- Improved error handling

### 2024-03-20
- Added media management
- Optimized performance
- Updated dependencies 