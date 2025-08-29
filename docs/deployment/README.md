# Deployment Guide

This document provides comprehensive deployment instructions for all three components of the Personal-Blog system: Front-end, Admin Panel, and Back-end.

## Overview

The Personal-Blog system consists of three independent components that can be deployed separately:

- **Front-end**: Next.js 15.3.3 user-facing blog (Vercel)
- **Admin Panel**: Next.js 15.2.4 content management system (Vercel)
- **Back-end**: Node.js 18+ API server (Render/Railway)

## Prerequisites

### System Requirements
- Node.js 18+ (for local development)
- MongoDB 6+ (database)
- Git (version control)
- npm or pnpm (package manager)

### Accounts Required
- [Vercel](https://vercel.com) - Front-end and Admin Panel hosting
- [Render](https://render.com) or [Railway](https://railway.app) - Back-end hosting
- [MongoDB Atlas](https://mongodb.com/atlas) - Database hosting
- [GitHub](https://github.com) - Code repository

## Environment Configuration

### 1. Front-end Environment Variables

Create `.env.local` in the `Front-end/` directory:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api/v1

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-frontend-domain.com
NEXT_PUBLIC_SITE_NAME=Your Blog Name
NEXT_PUBLIC_SITE_DESCRIPTION=Your blog description
```

### 2. Admin Panel Environment Variables

Create `.env.local` in the `admin-panel/` directory:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api/v1

# Authentication
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-admin-domain.com
```

### 3. Back-end Environment Variables

Create `.env` in the `Back-end/` directory:

```bash
# Server Configuration
PORT=3002
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# File Upload (S3)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Keep-alive Service
HEALTH_CHECK_URL=https://your-backend-domain.com/api/v1/health
KEEP_ALIVE_INTERVAL=*/5 * * * *

# CORS
ALLOWED_ORIGINS=https://your-frontend-domain.com,https://your-admin-domain.com
```

## Deployment Steps

### 1. Back-end Deployment (Render)

#### Step 1: Prepare Back-end
```bash
cd Back-end

# Install dependencies
npm install

# Build (if needed)
npm run build

# Test locally
npm test
```

#### Step 2: Deploy to Render
1. Connect your GitHub repository to Render
2. Create a new **Web Service**
3. Configure the service:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
   - **Node Version**: 18.x

#### Step 3: Configure Environment Variables
Add all back-end environment variables in Render dashboard.

#### Step 4: Database Setup
```bash
# Run database initialization scripts
npm run db:ensure-indexes
npm run init-about
```

### 2. Front-end Deployment (Vercel)

#### Step 1: Prepare Front-end
```bash
cd Front-end

# Install dependencies
npm install

# Build locally to test
npm run build

# Test locally
npm run dev
```

#### Step 2: Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `Front-end`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

#### Step 3: Configure Environment Variables
Add all front-end environment variables in Vercel dashboard.

#### Step 4: Custom Domain (Optional)
1. Add custom domain in Vercel dashboard
2. Configure DNS records
3. Enable HTTPS

### 3. Admin Panel Deployment (Vercel)

#### Step 1: Prepare Admin Panel
```bash
cd admin-panel

# Install dependencies
npm install

# Build locally to test
npm run build

# Test locally
npm run dev
```

#### Step 2: Deploy to Vercel
1. Create a new Vercel project
2. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `admin-panel`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

#### Step 3: Configure Environment Variables
Add all admin panel environment variables in Vercel dashboard.

## Database Setup

### MongoDB Atlas Configuration

1. **Create Cluster**
   - Choose M0 (Free) or higher tier
   - Select region closest to your users
   - Configure network access (0.0.0.0/0 for development)

2. **Create Database User**
   - Username and password for application
   - Grant read/write permissions

3. **Get Connection String**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/blog?retryWrites=true&w=majority
   ```

4. **Initialize Database**
   ```bash
   # Run from Back-end directory
   npm run db:ensure-indexes
   npm run init-about
   ```

## Domain Configuration

### 1. Custom Domains Setup

#### Front-end Domain
```bash
# Vercel Configuration
Domain: blog.yourdomain.com
SSL: Automatic (Vercel handles this)
```

#### Admin Panel Domain
```bash
# Vercel Configuration
Domain: admin.yourdomain.com
SSL: Automatic (Vercel handles this)
```

#### Back-end Domain
```bash
# Render Configuration
Domain: api.yourdomain.com
SSL: Automatic (Render handles this)
```

### 2. DNS Configuration

Add these records to your domain provider:

```
Type    Name    Value
A       blog    [Vercel IP]
A       admin   [Vercel IP]
CNAME   api     [Render URL]
```

## SSL/TLS Configuration

### Automatic SSL (Recommended)
- **Vercel**: Automatic SSL certificates
- **Render**: Automatic SSL certificates
- **MongoDB Atlas**: SSL enabled by default

### Manual SSL (If needed)
```bash
# Generate SSL certificate
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Configure in your hosting provider
```

## Monitoring and Maintenance

### 1. Health Checks

#### Back-end Health Endpoint
```bash
GET https://your-backend-domain.com/api/v1/health
```

Expected response:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-12-19T10:30:00.000Z",
    "uptime": 3600,
    "database": "connected"
  }
}
```

#### Front-end Health Check
```bash
# Check if front-end is accessible
curl -I https://your-frontend-domain.com
```

### 2. Logging

#### Back-end Logs
- **Render**: View logs in dashboard
- **Local**: Check `logs/` directory
- **Winston**: Structured logging

#### Front-end Logs
- **Vercel**: Function logs in dashboard
- **Browser**: Console logs for debugging

### 3. Performance Monitoring

#### Vercel Analytics
- Automatic performance monitoring
- Core Web Vitals tracking
- Real user monitoring

#### Google Analytics
- Page views tracking
- User behavior analysis
- Conversion tracking

## Security Configuration

### 1. CORS Setup

Configure CORS in back-end:

```javascript
// Back-end/src/app.js
app.use(cors({
  origin: [
    'https://your-frontend-domain.com',
    'https://your-admin-domain.com'
  ],
  credentials: true
}));
```

### 2. Rate Limiting

```javascript
// Back-end middleware
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', apiLimiter);
```

### 3. Security Headers

```javascript
// Back-end/src/app.js
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "https://www.googletagmanager.com"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

## Backup and Recovery

### 1. Database Backup

#### MongoDB Atlas Backup
- Automatic daily backups
- Point-in-time recovery
- Export to JSON/BSON

#### Manual Backup
```bash
# Export database
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/blog"

# Import database
mongorestore --uri="mongodb+srv://username:password@cluster.mongodb.net/blog" dump/
```

### 2. File Backup

#### Media Files
- S3 bucket versioning
- Cross-region replication
- Lifecycle policies

#### Code Backup
- Git repository
- GitHub Actions for CI/CD
- Automated deployments

## Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Check Node.js version
node --version

# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### 2. Database Connection Issues
```bash
# Test MongoDB connection
mongosh "mongodb+srv://username:password@cluster.mongodb.net/blog"

# Check network access
# Ensure IP is whitelisted in MongoDB Atlas
```

#### 3. Environment Variables
```bash
# Verify environment variables
echo $NEXT_PUBLIC_API_URL
echo $MONGODB_URI

# Check in hosting dashboard
# Vercel/Render environment variables
```

#### 4. CORS Errors
```bash
# Check CORS configuration
# Verify allowed origins
# Test with curl
curl -H "Origin: https://your-frontend-domain.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://your-backend-domain.com/api/v1/posts
```

### Performance Issues

#### 1. Slow Loading
- Check image optimization
- Enable compression
- Use CDN for static assets
- Optimize database queries

#### 2. High Memory Usage
- Monitor Node.js memory usage
- Implement connection pooling
- Use streaming for large files
- Optimize bundle size

## CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Render
        uses: johnbeynon/render-deploy-action@v1
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./Front-end
```

## Cost Optimization

### 1. Hosting Costs

#### Vercel (Front-end & Admin Panel)
- **Hobby Plan**: Free (limited)
- **Pro Plan**: $20/month
- **Enterprise**: Custom pricing

#### Render (Back-end)
- **Free Tier**: Limited
- **Starter**: $7/month
- **Standard**: $25/month

#### MongoDB Atlas
- **M0 (Free)**: 512MB storage
- **M2**: $9/month
- **M5**: $25/month

### 2. Optimization Tips

- Use free tiers for development
- Implement caching strategies
- Optimize images and assets
- Monitor usage and scale accordingly

## Support and Maintenance

### 1. Regular Maintenance

#### Weekly
- Check application logs
- Monitor performance metrics
- Review security updates

#### Monthly
- Update dependencies
- Review and optimize queries
- Backup verification
- Security audit

#### Quarterly
- Performance review
- Cost analysis
- Feature planning
- Infrastructure review

### 2. Emergency Procedures

#### Service Outage
1. Check health endpoints
2. Review recent deployments
3. Check hosting provider status
4. Rollback if necessary

#### Data Loss
1. Stop all services
2. Restore from backup
3. Verify data integrity
4. Resume services

## Conclusion

This deployment guide covers all aspects of deploying the Personal-Blog system. Follow the steps carefully and ensure all environment variables are properly configured. Regular monitoring and maintenance will ensure optimal performance and reliability.

For additional support, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Next.js Documentation](https://nextjs.org/docs)
