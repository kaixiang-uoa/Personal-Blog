# Personal Blog System 🏗️

A modern, full-stack blog system built with cutting-edge technologies, featuring SEO optimization, internationalization, and real-time performance monitoring.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Personal Blog System is a comprehensive three-tier architecture solution that provides:

- **Frontend**: Modern user-facing blog interface with SEO optimization
- **Admin Panel**: Content management system with rich text editing
- **Backend**: RESTful API services with authentication and file management

### Key Highlights

- 🌍 **Internationalization**: Bilingual support (English/Chinese)
- 🎯 **SEO Optimized**: Meta tags, structured data, sitemap generation
- 📊 **Performance Monitoring**: Google Analytics 4 + Vercel Speed Insights
- 🔒 **Security**: JWT authentication, input validation, CORS protection
- 📱 **Responsive Design**: Mobile-first approach
- ⚡ **High Performance**: SSR/SSG rendering, image optimization

## 🏗️ Architecture

### Three-Tier Design

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │  Admin Panel    │    │    Backend      │
│   (Vercel)      │    │   (Vercel)      │    │   (Render)      │
│                 │    │                 │    │                 │
│ • Next.js 15    │    │ • Next.js 15    │    │ • Node.js 18+   │
│ • React 19      │    │ • React 18      │    │ • Express.js    │
│ • TypeScript    │    │ • Tiptap Editor │    │ • MongoDB       │
│ • Tailwind CSS  │    │ • Zod Validation│    │ • JWT Auth      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  MongoDB Atlas  │
                    │   (Database)    │
                    └─────────────────┘
```

## ✨ Features

### Frontend Features
- **SEO Optimization**: Meta tags, structured data, sitemap generation
- **Internationalization**: Next-Intl for English/Chinese support
- **Performance Monitoring**: Google Analytics 4 integration
- **Responsive Design**: Mobile-first, adaptive layouts
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Accessibility**: ARIA labels, keyboard navigation

### Admin Panel Features
- **Rich Text Editor**: Tiptap with advanced formatting
- **Media Management**: File upload and organization
- **Settings Management**: Dynamic configuration
- **Authentication**: JWT-based secure login
- **Form Validation**: Zod schema validation
- **Real-time Preview**: Live content preview

### Backend Features
- **RESTful API**: Standardized API endpoints
- **Authentication**: JWT token management
- **File Upload**: Secure file handling with Multer
- **Database Management**: MongoDB with Mongoose ODM
- **Error Handling**: Comprehensive error management
- **Validation**: Input sanitization and validation

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3.3
- **UI Library**: React 19.1.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: Next-Intl
- **State Management**: React Query (TanStack Query)
- **Icons**: Lucide React

### Admin Panel
- **Framework**: Next.js 15.5.3
- **UI Library**: React 18
- **Rich Text Editor**: Tiptap
- **Form Validation**: Zod + React Hook Form
- **UI Components**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **File Upload**: Multer
- **Validation**: Joi
- **CORS**: Express CORS middleware

### Deployment & Infrastructure
- **Frontend & Admin**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas
- **CDN**: Vercel Edge Network
- **Monitoring**: Google Analytics 4 + Vercel Speed Insights

## 📁 Project Structure

```
Personal-Blog/
├── Front-end/                 # User-facing blog interface
│   ├── src/
│   │   ├── app/              # Next.js App Router
│   │   ├── components/       # React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript definitions
│   │   └── utils/           # Utility functions
│   └── public/              # Static assets
├── admin-panel/              # Content management system
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utilities and services
│   └── types/              # TypeScript definitions
├── Back-end/                # API server
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routers/        # API routes
│   │   └── utils/          # Utility functions
│   └── public/             # Static files
├── documentation/          # Project documentation
└── docs-site/              # GitHub Pages showcase
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB Atlas account
- Vercel account (for frontend deployment)
- Render account (for backend deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/kaixiang-uoa/Personal-Blog.git
   cd Personal-Blog
   ```

2. **Backend Setup**
   ```bash
   cd Back-end
   npm install
   cp env.example .env
   # Configure your .env file with MongoDB URI and JWT secret
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd Front-end
   npm install
   cp .env.example .env.local
   # Configure your .env.local file with API URL
   npm run dev
   ```

4. **Admin Panel Setup**
   ```bash
   cd admin-panel
   npm install
   cp .env.example .env.local
   # Configure your .env.local file with API URL
   npm run dev
   ```

### Environment Variables

#### Backend (.env)
```env
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
PORT=3002
NODE_ENV=development
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3002/api/v1
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
```

#### Admin Panel (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3002/api/v1
```

## 🌐 Deployment

### Backend (Render)
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set root directory to `Front-end`
3. Configure environment variables
4. Deploy

### Admin Panel (Vercel)
1. Create a new Vercel project
2. Set root directory to `admin-panel`
3. Configure environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Set up database access
3. Configure network access
4. Get connection string

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout

### Posts Endpoints
- `GET /api/v1/posts` - Get all posts
- `GET /api/v1/posts/:id` - Get single post
- `POST /api/v1/posts` - Create new post
- `PUT /api/v1/posts/:id` - Update post
- `DELETE /api/v1/posts/:id` - Delete post

### Categories Endpoints
- `GET /api/v1/categories` - Get all categories
- `POST /api/v1/categories` - Create category
- `PUT /api/v1/categories/:id` - Update category
- `DELETE /api/v1/categories/:id` - Delete category

### Media Endpoints
- `POST /api/v1/media/upload` - Upload file
- `GET /api/v1/media` - Get all media
- `DELETE /api/v1/media/:id` - Delete media

For detailed API documentation, see [docs/api/README.md](docs/api/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Vercel](https://vercel.com/) - Deployment platform
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Tiptap](https://tiptap.dev/) - Rich text editor

## 📞 Contact

- **GitHub**: [@kaixiang-uoa](https://github.com/kaixiang-uoa)
- **Project Link**: [https://github.com/kaixiang-uoa/Personal-Blog](https://github.com/kaixiang-uoa/Personal-Blog)

---

⭐ If you find this project helpful, please give it a star!
