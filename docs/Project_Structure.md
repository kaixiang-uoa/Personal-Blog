# Project Structure Overview

This document provides a comprehensive overview of the Personal-Blog project structure, including the three main components: Front-end (user-facing blog), Admin Panel (content management), and Back-end (API services).

## Project Root Structure

```
Personal-Blog/
├── Front-end/                    # User-facing blog interface
├── admin-panel/                  # Content management system
├── Back-end/                     # API server and database
├── docs/                         # Project documentation
├── .github/                      # GitHub workflows and templates
├── .gitignore                    # Git ignore rules
└── README.md                     # Project overview
```

## 1. Front-end (User Blog Interface)

**Technology Stack:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS, PrismJS

### Directory Structure
```
Front-end/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── [locale]/             # Internationalized routes
│   │   │   ├── page.tsx          # Home page
│   │   │   ├── about/            # About page
│   │   │   ├── article/          # Article detail pages
│   │   │   │   └── [slug]/
│   │   │   └── contact/          # Contact page
│   │   ├── api/                  # API routes
│   │   ├── globals.css           # Global styles with PrismJS theme
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Default page
│   ├── components/               # Reusable UI components
│   │   ├── common/               # Common components (SEO, ErrorBoundary)
│   │   ├── features/             # Feature-specific components
│   │   │   ├── article/          # Article-related components
│   │   │   └── filter/           # Filter and search components
│   │   ├── layout/               # Layout components (Navbar)
│   │   └── ui/                   # Base UI components (shadcn/ui)
│   ├── contexts/                 # React contexts
│   │   ├── QueryClientContext.tsx
│   │   ├── SettingsContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/                    # Custom React hooks
│   ├── i18n/                     # Internationalization
│   ├── lib/                      # Utility libraries
│   ├── services/                 # API service layer
│   ├── types/                    # TypeScript type definitions
│   └── utils/                    # Utility functions
├── messages/                     # i18n message files
├── public/                       # Static assets
├── tailwind.config.ts            # Tailwind CSS configuration
├── next.config.ts                # Next.js configuration
└── package.json                  # Dependencies and scripts
```

### Key Features
- **Internationalization:** Multi-language support with Next-Intl
- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **Code Highlighting:** PrismJS integration for syntax highlighting
- **SEO Optimized:** Server-side rendering and meta tags
- **Theme Support:** Dark/light mode toggle

## 2. Admin Panel (Content Management System)

**Technology Stack:** Next.js 14, React, TypeScript, Tiptap (Rich Text Editor), Tailwind CSS

### Directory Structure
```
admin-panel/
├── app/
│   ├── (admin)/                  # Admin route group
│   │   ├── dashboard/            # Admin dashboard
│   │   ├── posts/                # Post management
│   │   │   ├── new/              # Create new post
│   │   │   ├── [id]/             # Edit specific post
│   │   │   │   ├── edit/         # Edit post form
│   │   │   │   └── preview/      # Post preview
│   │   │   └── page.tsx          # Posts list
│   │   ├── categories/           # Category management
│   │   ├── media/                # Media management
│   │   └── settings/             # Site settings
│   ├── login/                    # Admin authentication
│   ├── register/                 # Admin registration
│   ├── forgot-password/          # Password recovery
│   ├── globals.css               # Global styles with Tiptap
│   ├── layout.tsx                # Root layout
│   └── providers.tsx             # Context providers
├── components/
│   ├── posts/                    # Post-related components
│   │   ├── editor/               # Rich text editor components
│   │   │   ├── PostEditor.tsx    # Main editor component
│   │   │   ├── EditorToolbar.tsx # Editor toolbar
│   │   │   ├── ImagePopover.tsx  # Image upload popover
│   │   │   └── LinkPopover.tsx   # Link insertion popover
│   │   ├── CategorySelector.tsx  # Category selection
│   │   ├── TagSelector.tsx       # Tag selection
│   │   └── FeaturedImageUploader.tsx
│   ├── settings/                 # Settings components
│   ├── layouts/                  # Layout components
│   │   ├── auth-layout.tsx       # Authentication layout
│   │   └── main-layout.tsx       # Main admin layout
│   ├── navigation/               # Navigation components
│   │   ├── header.tsx            # Admin header
│   │   └── sidebar.tsx           # Admin sidebar
│   └── ui/                       # Base UI components
├── contexts/                     # React contexts
│   ├── auth-context.tsx          # Authentication context
│   ├── keep-alive-context.tsx    # Keep-alive service context
│   └── LocaleContext.tsx         # Localization context
├── hooks/                        # Custom React hooks
├── lib/                          # Utility libraries
│   ├── api.ts                    # API client
│   ├── services/                 # Service layer
│   ├── utils.ts                  # Utility functions
│   └── validators/               # Form validation schemas
├── types/                        # TypeScript type definitions
├── tailwind.config.js            # Tailwind CSS configuration
└── package.json                  # Dependencies and scripts
```

### Key Features
- **Rich Text Editor:** Tiptap-based editor with code blocks, images, links
- **Content Management:** Full CRUD operations for posts, categories, tags
- **Media Management:** Image upload and management
- **Site Settings:** Configurable site settings and appearance
- **Authentication:** Secure admin login and session management

## 3. Back-end (API Server)

**Technology Stack:** Node.js, Express.js, MongoDB, Mongoose, JWT Authentication

### Directory Structure
```
Back-end/
├── src/
│   ├── app.js                    # Express app configuration
│   ├── server.js                 # Server entry point
│   ├── config/                   # Configuration files
│   │   ├── db.js                 # Database configuration
│   │   ├── logger.js             # Logging configuration
│   │   ├── s3.js                 # S3 storage configuration
│   │   └── swagger.js            # API documentation
│   ├── controllers/              # Request handlers
│   │   ├── authController.js     # Authentication logic
│   │   ├── postController.js     # Post management
│   │   ├── categoryController.js # Category management
│   │   ├── tagController.js      # Tag management
│   │   ├── mediaController.js    # Media upload/management
│   │   ├── settingController.js  # Settings management
│   │   └── keepAliveController.js # Keep-alive service
│   ├── models/                   # Mongoose models
│   │   ├── Post.js               # Post schema
│   │   ├── User.js               # User schema
│   │   ├── Category.js           # Category schema
│   │   ├── Tag.js                # Tag schema
│   │   ├── Media.js              # Media schema
│   │   └── Setting.js            # Settings schema
│   ├── routers/                  # API route definitions
│   │   ├── authRouters.js        # Authentication routes
│   │   ├── postRouters.js        # Post management routes
│   │   ├── categoryRouters.js    # Category routes
│   │   ├── tagRouters.js         # Tag routes
│   │   ├── mediaRouters.js       # Media routes
│   │   └── settingRouters.js     # Settings routes
│   ├── middleware/               # Express middleware
│   │   ├── authMiddleware.js     # JWT authentication
│   │   ├── errorMiddleware.js    # Error handling
│   │   ├── validationMiddleware.js # Request validation
│   │   └── securityMiddleware.js # Security headers
│   ├── services/                 # Business logic services
│   │   └── keepAlive/            # Keep-alive service
│   ├── utils/                    # Utility functions
│   │   ├── responseHandler.js    # API response formatting
│   │   ├── paginationHelper.js   # Pagination utilities
│   │   ├── fileNaming.js         # File naming utilities
│   │   └── i18n.js               # Internationalization
│   ├── test/                     # Test files
│   │   ├── api/                  # API integration tests
│   │   └── unit/                 # Unit tests
│   └── scripts/                  # Database scripts
│       ├── initSettings.js       # Initialize default settings
│       └── ensureIndexes.js      # Database index creation
├── uploads/                      # File upload directory
├── logs/                         # Application logs
├── coverage/                     # Test coverage reports
├── jest.config.js                # Jest testing configuration
└── package.json                  # Dependencies and scripts
```

### Key Features
- **RESTful API:** Complete CRUD operations for all entities
- **Authentication:** JWT-based authentication with role-based access
- **File Upload:** Secure file upload with validation
- **Database:** MongoDB with Mongoose ODM
- **Testing:** Comprehensive test suite with Jest
- **Keep-alive Service:** Automated service to prevent server sleep
- **Internationalization:** Multi-language API support

## Development Workflow

### 1. Local Development Setup
```bash
# Install dependencies for all three components
cd Front-end && npm install
cd ../admin-panel && npm install  
cd ../Back-end && npm install

# Start development servers
# Terminal 1: Back-end API
cd Back-end && npm run dev

# Terminal 2: Admin Panel
cd admin-panel && npm run dev

# Terminal 3: Front-end Blog
cd Front-end && npm run dev
```

### 2. Environment Configuration
- **Front-end:** Configure API endpoints and i18n settings
- **Admin Panel:** Set API base URL and authentication settings
- **Back-end:** Configure database connection, JWT secrets, and file storage

### 3. Deployment
- **Front-end:** Deploy to Vercel or similar static hosting
- **Admin Panel:** Deploy to Vercel or similar platform
- **Back-end:** Deploy to Render, Railway, or similar Node.js hosting

## Architecture Benefits

1. **Separation of Concerns:** Clear separation between user interface, content management, and API services
2. **Scalability:** Each component can be scaled independently
3. **Maintainability:** Modular structure makes code easy to maintain and extend
4. **Technology Flexibility:** Each component can use the most appropriate technology stack
5. **Security:** Isolated admin panel with proper authentication and authorization

This architecture provides a robust foundation for a personal blog system that can grow and evolve over time while maintaining code quality and developer experience.
