# Admin Panel Development Guide

## Directory Structure

```
admin-panel/
├── app/
│   ├── (admin)/              # Admin route group
│   │   ├── dashboard/        # Admin dashboard
│   │   ├── posts/           # Post management
│   │   ├── categories/      # Category management
│   │   ├── media/           # Media management
│   │   └── settings/        # Site settings
│   ├── login/               # Admin authentication
│   ├── register/            # Admin registration
│   ├── forgot-password/     # Password recovery
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── providers.tsx        # Context providers
├── components/
│   ├── posts/               # Post-related components
│   │   ├── editor/          # Rich text editor
│   │   ├── CategorySelector.tsx
│   │   ├── TagSelector.tsx
│   │   └── FeaturedImageUploader.tsx
│   ├── settings/            # Settings components
│   │   ├── about/           # About page settings
│   │   ├── AppearanceSettingsForm.tsx
│   │   ├── GeneralSettingsForm.tsx
│   │   ├── PasswordChangeForm.tsx
│   │   └── PostsSettingsForm.tsx
│   ├── layouts/             # Layout components
│   ├── navigation/          # Navigation components
│   └── ui/                  # Base UI components
├── contexts/                # React contexts
├── hooks/                   # Custom React hooks
├── lib/                     # Utility libraries
├── types/                   # TypeScript types
└── public/                  # Static assets
```

## Quick Start

1. **Requirements**
   - Node.js 18+
   - npm or pnpm

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_API_URL=http://localhost:3002/api/v1
   ```

4. **Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## Core Features

1. **User Authentication**
   - JWT-based login/logout
   - Role-based permission control
   - Session management
   - Password recovery

2. **Content Management**
   - Article creation and editing
   - Category management
   - Tag management
   - Content preview
   - Draft and publish workflow

3. **Rich Text Editor**
   - Tiptap-based editor
   - Code block support
   - Image insertion
   - Link management
   - Markdown support

4. **Media Management**
   - Image upload and storage
   - File management
   - Media library
   - Image optimization

5. **Site Settings**
   - General site configuration
   - Appearance settings
   - About page content
   - Social media links
   - SEO settings

6. **Form Validation**
   - Zod-based validation
   - Real-time validation
   - Error handling
   - User feedback

## Technology Stack

- **Framework**: Next.js 15.2.4
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Editor**: Tiptap 2.x
- **Forms**: React Hook Form + Zod
- **State Management**: React Context + Custom Hooks
- **HTTP Client**: Axios
- **UI Components**: Radix UI + shadcn/ui

## Component Architecture

### 1. Layout Components
```typescript
// components/layouts/main-layout.tsx
export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};
```

### 2. Rich Text Editor
```typescript
// components/posts/editor/PostEditor.tsx
export const PostEditor: React.FC<PostEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      Underline,
      Placeholder.configure({
        placeholder: 'Start writing your post...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="editor-container">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
```

### 3. Form Components
```typescript
// components/settings/GeneralSettingsForm.tsx
export const GeneralSettingsForm: React.FC = () => {
  const form = useForm<GeneralSettings>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      siteName: '',
      siteDescription: '',
      authorName: '',
    },
  });

  const onSubmit = async (data: GeneralSettings) => {
    try {
      await settingsService.updateGeneral(data);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="siteName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
};
```

## State Management

### 1. Authentication Context
```typescript
// contexts/auth-context.tsx
interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    setUser(response.user);
    localStorage.setItem('token', response.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 2. Custom Hooks
```typescript
// hooks/usePosts.ts
export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await postService.getAll();
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createPost = async (postData: CreatePostDto) => {
    const response = await postService.create(postData);
    setPosts(prev => [response.data, ...prev]);
    return response.data;
  };

  return { posts, isLoading, fetchPosts, createPost };
};
```

## API Integration

### 1. Service Layer
```typescript
// lib/services/auth-service.ts
export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};
```

### 2. Error Handling
```typescript
// lib/api.ts
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## Form Validation

### 1. Validation Schemas
```typescript
// lib/validators/settings-schemas.ts
export const generalSettingsSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  siteDescription: z.string().max(160, 'Description too long'),
  authorName: z.string().min(1, 'Author name is required'),
});

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
  tags: z.array(z.string()).optional(),
  featuredImage: z.string().optional(),
});
```

### 2. Form Components
```typescript
// components/ui/form.tsx
export const Form = FormProvider;

export const FormField = ({ control, name, render }: FormFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={render}
    />
  );
};
```

## Media Management

### 1. Upload Component
```typescript
// components/media/MediaUploader.tsx
export const MediaUploader: React.FC<MediaUploaderProps> = ({ onUpload, accept }) => {
  const [uploading, setUploading] = useState(false);
  
  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await mediaService.upload(formData);
      onUpload(response.data);
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="uploader">
      <input
        type="file"
        accept={accept}
        onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
        disabled={uploading}
      />
      {uploading && <LoadingSpinner />}
    </div>
  );
};
```

### 2. Media Library
```typescript
// components/media/MediaGrid.tsx
export const MediaGrid: React.FC = () => {
  const { media, isLoading, fetchMedia } = useMedia();
  
  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {media.map((item) => (
        <MediaItem key={item.id} media={item} />
      ))}
    </div>
  );
};
```

## Settings Management

### 1. Settings Structure
```typescript
interface Settings {
  general: {
    siteName: string;
    siteDescription: string;
    authorName: string;
  };
  appearance: {
    theme: 'light' | 'dark';
    primaryColor: string;
  };
  about: {
    content: string;
    socialLinks: SocialLink[];
  };
  posts: {
    postsPerPage: number;
    allowComments: boolean;
  };
}
```

### 2. Settings Form
```typescript
// components/settings/AboutSettingsForm.tsx
export const AboutSettingsForm: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  
  const form = useForm<AboutSettings>({
    resolver: zodResolver(aboutSettingsSchema),
    defaultValues: settings.about,
  });

  const onSubmit = async (data: AboutSettings) => {
    await updateSettings({ about: data });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About Content</FormLabel>
              <FormControl>
                <Textarea {...field} rows={10} />
              </FormControl>
            </FormItem>
          )}
        />
        <SocialLinksField control={form.control} />
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
};
```

## Performance Optimization

1. **Code Splitting**
   - Route-based splitting
   - Component lazy loading
   - Dynamic imports

2. **Caching Strategy**
   - React Query for API data
   - Local storage for user preferences
   - Image caching

3. **Bundle Optimization**
   - Tree shaking
   - Dead code elimination
   - Compression

## Security Measures

1. **Authentication**
   - JWT token management
   - Secure token storage
   - Automatic token refresh

2. **Authorization**
   - Role-based access control
   - Route protection
   - API endpoint protection

3. **Data Validation**
   - Input sanitization
   - XSS prevention
   - CSRF protection

## Testing Strategy

1. **Unit Testing**
   - Component testing
   - Hook testing
   - Utility function testing

2. **Integration Testing**
   - Form submission testing
   - API integration testing
   - User flow testing

3. **E2E Testing**
   - Critical admin workflows
   - Content management testing
   - Settings management testing

## Deployment

1. **Build Process**
   - Type checking
   - Linting
   - Bundle optimization
   - Environment configuration

2. **Vercel Deployment**
   - Automatic deployments
   - Environment variables
   - Preview deployments

3. **Monitoring**
   - Error tracking
   - Performance monitoring
   - User analytics

## Common Issues and Solutions

1. **Development Issues**
   - Hot reload problems
   - TypeScript errors
   - Build failures

2. **Runtime Issues**
   - Authentication problems
   - API connection issues
   - Form validation errors

3. **Performance Issues**
   - Large bundle size
   - Slow loading times
   - Memory leaks

## Changelog

### 2024-12-19
- Updated to Next.js 15.2.4 and React 18
- Enhanced form validation with Zod
- Improved error handling
- Added comprehensive settings management
- Enhanced media management features

### 2024-03-21
- Restructured documentation
- Optimized component organization
- Improved authentication flow
- Enhanced user experience

### 2024-03-20
- Added rich text editor integration
- Implemented media management
- Updated dependencies
- Enhanced security measures 