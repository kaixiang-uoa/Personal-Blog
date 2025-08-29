# Frontend Development Guide

## Directory Structure

```
Front-end/
├── src/
│   ├── app/              # Next.js app router
│   │   ├── [locale]/     # Internationalized routes
│   │   ├── api/          # API routes
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   ├── robots.ts     # Dynamic robots.txt
│   │   └── sitemap.xml/  # Dynamic sitemap
│   ├── components/       # Reusable components
│   │   ├── common/       # Common components (SEO, AnalyticsListener)
│   │   ├── features/     # Feature-specific components
│   │   ├── layout/       # Layout components
│   │   └── ui/           # Base UI components (shadcn/ui)
│   ├── contexts/         # React Context
│   ├── hooks/           # Custom Hooks
│   ├── i18n/            # Internationalization resources
│   ├── lib/             # Utility libraries
│   ├── services/        # API services
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   └── middleware.ts    # Next.js middleware
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
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
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

1. **Internationalization**
   - Implemented using next-intl
   - Supports Chinese and English
   - On-demand language pack loading
   - Dynamic locale routing

2. **Responsive Design**
   - Mobile-first approach
   - Breakpoint design
   - Component adaptability
   - Tailwind CSS utility classes

3. **SEO Optimization**
   - Server-side rendering (SSR)
   - Static site generation (SSG)
   - Dynamic meta tags
   - Structured data (Schema.org)
   - Sitemap generation
   - Robots.txt configuration
   - Open Graph tags
   - Twitter Cards

4. **Performance Monitoring**
   - Vercel Speed Insights integration
   - Google Analytics 4 (GA4) tracking
   - Performance metrics monitoring
   - Core Web Vitals tracking

5. **State Management**
   - React Query for server state
   - Context for global state
   - Local state with useState
   - Optimistic updates

6. **Image Optimization**
   - Next.js Image component
   - WebP/AVIF format support
   - Lazy loading
   - Responsive images
   - SEO-friendly image handling

7. **Accessibility**
   - ARIA labels and roles
   - Focus management
   - Keyboard navigation
   - High contrast support
   - Screen reader compatibility

## Component Structure

### 1. Layout Components
- `Layout` - Page layout wrapper
- `Navbar` - Top navigation with theme toggle
- `Footer` - Site footer
- `Sidebar` - Filter sidebar

### 2. Feature Components
- `ArticleCard` - Article preview card
- `ArticleList` - Articles grid/list
- `ArticleSkeleton` - Loading skeleton
- `Pagination` - Page navigation
- `SearchBar` - Search functionality
- `CategoryList` - Category filtering
- `FilterSidebar` - Advanced filtering

### 3. Common Components
- `SEOHead` - SEO meta tags management
- `PageSEO` - Page-level SEO
- `ArticleSEO` - Article-specific SEO
- `AnalyticsListener` - GA4 route tracking
- `OptimizedImage` - Image optimization wrapper
- `ErrorBoundary` - Error handling
- `LoadingSpinner` - Loading states

### 4. UI Components (shadcn/ui)
- `Button` - Various button styles
- `Input` - Form inputs
- `Dialog` - Modal dialogs
- `Dropdown` - Dropdown menus
- `Toast` - Notification system
- `Badge` - Status indicators

## API Client

### 1. Basic Configuration
```typescript
// services/api.ts
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 2. Error Handling
- Unified error handling component
- User-friendly error messages
- Error retry support
- Internationalized error messages
- Network error detection

### 3. Data Fetching with React Query
```typescript
// hooks/useArticles.ts
export function useArticles(params: GetAllPostsParams) {
  return useQuery<PostsData, Error>({
    queryKey: ['articles', params],
    queryFn: () => postApi.getAllPosts(params),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
```

## SEO Implementation

### 1. Meta Tags Management
```typescript
// components/common/SEOHead.tsx
export function SEOHead() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />
    </>
  );
}
```

### 2. Structured Data
```typescript
// utils/seo.ts
export function generateArticleStructuredData(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "author": {
      "@type": "Person",
      "name": article.author.displayName
    },
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt,
  };
}
```

### 3. Dynamic Sitemap
```typescript
// app/sitemap.xml/route.ts
export async function GET() {
  const sitemap = new SitemapGenerator();
  // Add dynamic routes
  sitemap.addUrl('/', { priority: 1.0 });
  sitemap.addUrl('/about', { priority: 0.8 });
  return sitemap.generate();
}
```

## Analytics Integration

### 1. Google Analytics 4
```typescript
// components/common/AnalyticsListener.tsx
export function AnalyticsListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (pathname) {
      const url = window.location.origin + pathname;
      gtag('event', 'page_view', { page_location: url });
    }
  }, [pathname, searchParams]);
}
```

### 2. Performance Monitoring
```typescript
// components/common/PerformanceMonitor.tsx
export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Monitor Core Web Vitals
      web_vitals.getCLS(console.log);
      web_vitals.getFID(console.log);
      web_vitals.getFCP(console.log);
    }
  }, []);
}
```

## Page Structure

### 1. Route Design
- `/[locale]/` - Home page with articles list
- `/[locale]/about` - About page
- `/[locale]/contact` - Contact page
- `/[locale]/article/[slug]` - Article detail page

### 2. Page Components
- `HomePage` - Home page with featured articles
- `AboutPage` - About page with dynamic content
- `ContactPage` - Contact form
- `ArticleDetailPage` - Article with comments

## Development Standards

1. **Code Style**
   - ESLint configuration
   - Prettier formatting
   - TypeScript strict mode
   - Functional components with hooks

2. **Naming Conventions**
   - PascalCase for components
   - camelCase for functions and variables
   - UPPER_CASE for constants
   - kebab-case for CSS classes

3. **File Organization**
   - Feature-based organization
   - Related files in same directory
   - Avoid deep nesting
   - Clear import/export structure

4. **Performance Guidelines**
   - Lazy load components
   - Optimize images
   - Minimize bundle size
   - Use React.memo for expensive components

## Performance Optimization

1. **Build Optimization**
   - Code splitting by route
   - Tree shaking
   - Bundle analysis
   - Compression

2. **Runtime Optimization**
   - Component lazy loading
   - Virtual scrolling for large lists
   - Debounce and throttle
   - Memoization

3. **Image Optimization**
   - Next.js Image component
   - WebP/AVIF formats
   - Responsive images
   - Lazy loading

4. **Caching Strategy**
   - React Query caching
   - Static generation
   - CDN caching
   - Browser caching

## Testing Strategy

1. **Unit Testing**
   - Component testing with React Testing Library
   - Hook testing
   - Utility function testing
   - Mock API calls

2. **Integration Testing**
   - Page testing
   - API integration
   - User interactions
   - Error scenarios

3. **E2E Testing**
   - Critical user flows
   - Cross-browser testing
   - Performance testing
   - Accessibility testing

## Deployment

1. **Vercel Deployment**
   - Automatic deployments from Git
   - Environment variables configuration
   - Preview deployments
   - Performance monitoring

2. **Environment Configuration**
   ```bash
   # Production environment variables
   NEXT_PUBLIC_API_URL=https://your-api-domain.com/api/v1
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Build Process**
   - Type checking
   - Linting
   - Formatting
   - Bundle optimization

## Common Issues and Solutions

1. **Development Environment**
   - Environment variable configuration
   - API proxy settings
   - Hot reload issues
   - TypeScript errors

2. **Build and Deployment**
   - Build failure handling
   - Environment variable issues
   - Performance optimization
   - SEO configuration

3. **Performance Issues**
   - Bundle size optimization
   - Image optimization
   - Caching strategies
   - Core Web Vitals

## Changelog

### 2024-12-19
- Updated to Next.js 15.3.3 and React 19
- Added comprehensive SEO optimization
- Integrated Google Analytics 4
- Added Vercel Speed Insights
- Improved accessibility features
- Enhanced image optimization

### 2024-03-21
- Restructured documentation
- Optimized component organization
- Improved error handling
- Added internationalization support

### 2024-03-20
- Added performance monitoring
- Updated dependencies
- Enhanced user experience 