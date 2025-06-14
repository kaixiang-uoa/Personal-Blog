# Frontend Development Guide

## Directory Structure

```
Front-end/
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # Reusable components
│   ├── contexts/         # React Context
│   ├── hooks/           # Custom Hooks
│   ├── i18n/            # Internationalization resources
│   ├── lib/             # Utility libraries
│   ├── services/        # API services
│   ├── types/           # TypeScript types
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

1. **Internationalization**
   - Implemented using next-intl
   - Supports Chinese and English
   - On-demand language pack loading

2. **Responsive Design**
   - Mobile-first approach
   - Breakpoint design
   - Component adaptability

3. **State Management**
   - React Query for server state
   - Context for global state
   - Local state with useState

## Component Structure

### 1. Layout Components
- `Layout` - Page layout
- `Header` - Top navigation
- `Footer` - Footer
- `Sidebar` - Sidebar

### 2. Feature Components
- `ArticleCard` - Article card
- `Pagination` - Pagination
- `SearchBar` - Search bar
- `LanguageSwitcher` - Language switcher

### 3. Common Components
- `Button` - Button
- `Input` - Input field
- `Modal` - Modal dialog
- `Loading` - Loading state

## API Client

### 1. Basic Configuration
```typescript
// Create API instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
});

// Create internal API instance
const internalAxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
});
```

### 2. Error Handling
- Unified error handling component
- User-friendly error messages
- Error retry support
- Internationalized error messages

### 3. Data Fetching
```typescript
// Using React Query
export function useArticles(params: GetAllPostsParams) {
  return useQuery<PostsData, Error>({
    queryKey: ['articles', params],
    queryFn: () => postApi.getAllPosts(params),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 2,
  });
}
```

## Page Structure

### 1. Route Design
- `/[locale]/` - Home page
- `/[locale]/about` - About page
- `/[locale]/articles` - Article list
- `/[locale]/articles/[id]` - Article detail

### 2. Page Components
- `HomePage` - Home page
- `AboutPage` - About page
- `ArticleListPage` - Article list
- `ArticleDetailPage` - Article detail

## Development Standards

1. **Code Style**
   - Use ESLint and Prettier
   - Follow TypeScript strict mode
   - Use functional components

2. **Naming Conventions**
   - PascalCase for components
   - camelCase for functions
   - UPPER_CASE for constants

3. **File Organization**
   - Organize by feature modules
   - Keep related files in the same directory
   - Avoid deep directory nesting

## Performance Optimization

1. **Build Optimization**
   - Code splitting
   - Image optimization
   - Caching strategy

2. **Runtime Optimization**
   - Component lazy loading
   - Virtual lists
   - Debounce and throttle

## Common Issues

1. **Development Environment**
   - Environment variable configuration
   - Proxy settings
   - Hot reload issues

2. **Build and Deployment**
   - Build failure handling
   - Deployment process
   - Performance monitoring

## Changelog

### 2024-03-21
- Restructured documentation
- Optimized component organization
- Improved error handling

### 2024-03-20
- Added internationalization support
- Optimized page performance
- Updated dependencies 