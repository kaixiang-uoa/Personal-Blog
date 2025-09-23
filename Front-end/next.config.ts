/**
 * Next.js configuration file
 * defines the project's build and runtime behavior, including internationalization, output format, build optimization, etc.
 * @see https://nextjs.org/docs/app/api-reference/next-config-js
 */
import createNextIntlPlugin from 'next-intl/plugin';

// initialize next-intl plugin, used to handle internationalization routing and content
// this plugin automatically handles internationalization routing and message loading
// @see https://next-intl-docs.vercel.app/docs/getting-started/app-router
const withNextIntl = createNextIntlPlugin();

/**
 * @type {import('next').NextConfig}
 * TypeScript type annotation, provides IDE auto-completion and type checking
 */
const nextConfig = {
  // set output to 'standalone' mode, optimize deployment volume and startup performance
  // especially suitable for containerized deployment environments like Docker or Vercel
  // @see https://nextjs.org/docs/pages/api-reference/next-config-js/output
  output: 'standalone',

  eslint: {
    // ignore ESLint errors during production build
    // note: this should only be used when there is a separate lint check step in the CI/CD process
    // or when using a temporary deployment
    // @see https://nextjs.org/docs/pages/api-reference/next-config-js/eslint
    ignoreDuringBuilds: true,
  },

  typescript: {
    // ignore TypeScript errors during production build
    // note: similar to ESLint settings, this should only be used in specific cases
    // the best practice is to fix all type errors, not ignore them
    // @see https://nextjs.org/docs/pages/api-reference/next-config-js/typescript
    ignoreBuildErrors: true,
  },

  // Security headers for Google Analytics and other services
  async headers() {
    return [
      // Long-term caching for static assets
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/_next/image',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://va.vercel-scripts.com http://localhost:3002 https://personal-blog-w2y9.onrender.com",
              "img-src 'self' data: https:",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },

  // Redirects for SEO optimization
  async redirects() {
    return [
      // Root to default locale with permanent 301 and single hop to canonical host
      {
        source: '/',
        destination: 'https://www.kxzhang.online/en',
        permanent: true,
      },
      // Force HTTP -> HTTPS and unify host to www (single rule)
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://www.kxzhang.online/:path*',
        permanent: true,
      },
      // Non-www to www redirect
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'kxzhang.online',
          },
        ],
        destination: 'https://www.kxzhang.online/:path*',
        permanent: true,
      },
    ];
  },

  // Image optimization configuration
  // allow external image domains for Next.js Image component
  // @see https://nextjs.org/docs/pages/api-reference/next-config-js/images
  images: {
    // allow external image domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'my-blog-media-storage.s3.ap-southeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.kxzhang.online',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
    // enable image optimization
    unoptimized: false,
    // enable WebP and AVIF formats
    formats: ['image/webp', 'image/avif'],
    // set default sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Performance optimization
  experimental: {
    // enable optimized package imports
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Compression and optimization
  compress: true,
  poweredByHeader: false,
};

// export final configuration, apply next-intl plugin
export default withNextIntl(nextConfig);
