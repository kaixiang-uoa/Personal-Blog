# Google Analytics Setup Guide

This guide explains how to set up Google Analytics 4 (GA4) for the blog.

## Prerequisites

1. A Google Analytics 4 property
2. A GA4 Measurement ID (format: G-XXXXXXXXXX)

## Setup Steps

### 1. Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Follow the setup wizard to create a new GA4 property
4. Note down your Measurement ID (G-XXXXXXXXXX)

### 2. Configure Environment Variables

Create a `.env.local` file in the Front-end directory:

```bash
# Google Analytics Configuration
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1

# Other Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID.

### 3. Production Deployment

For production deployment, set the environment variable in your hosting platform:

- **Vercel**: Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the Environment Variables section
- **Netlify**: Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the Environment Variables section
- **Other platforms**: Add the environment variable according to your platform's documentation

## Features

The Google Analytics integration includes:

### Automatic Tracking
- Page views
- Performance metrics (Core Web Vitals)
- Page load times

### Custom Events
- Article views
- Search events
- Filter usage (categories/tags)
- Performance metrics

### Performance Monitoring
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Page load times

## Usage

The analytics are automatically initialized when the app loads. You can also manually track events:

```typescript
import { trackEvent, trackArticleView, trackSearch } from '@/lib/analytics';

// Track custom events
trackEvent('button_click', 'engagement', 'subscribe_button');

// Track article views
trackArticleView('My Article Title', 'my-article-slug');

// Track search
trackSearch('react tutorial', 15);
```

## Privacy Considerations

- Analytics only run when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
- No personal data is collected
- All tracking respects user privacy settings
- Consider adding a cookie consent banner for GDPR compliance

## Testing

1. Set up the environment variable
2. Open browser developer tools
3. Check the Network tab for requests to `googletagmanager.com`
4. Verify events in your GA4 dashboard

## Troubleshooting

### Analytics not working
- Check that `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
- Verify the Measurement ID format (G-XXXXXXXXXX)
- Check browser console for errors
- Ensure no ad blockers are interfering

### Events not showing in GA4
- Events may take up to 24 hours to appear in reports
- Check Real-Time reports for immediate feedback
- Verify the GA4 property is set up correctly
