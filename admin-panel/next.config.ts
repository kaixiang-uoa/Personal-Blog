import type { NextConfig } from "next";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

/**
 * Next.js configuration
 *
 * Optimize build, performance, and loading speed
 */
const nextConfig: NextConfig = {
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/api/v1/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
    ],
    // Improve image loading performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60,
    // 允许未优化的图片
    unoptimized: process.env.NODE_ENV === "development",
  },

  // Enable React strict mode to help find potential issues
  reactStrictMode: true,

  // Configure API proxy to avoid CORS issues in development
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_API_URL
          ? `${process.env.NEXT_PUBLIC_API_URL}/:path*`
          : "http://localhost:3001/api/v1/:path*",
      },
    ];
  },

  // Enable webpack analysis plugin to help analyze the build
  // 使用 ANALYZE=true yarn build 命令查看分析结果
  webpack: (config, { dev, isServer }) => {
    // Add analysis plugin (only when using ANALYZE environment variable)
    if (process.env.ANALYZE === "true") {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "server",
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        }),
      );
    }

    // Optimize for production environment
    if (!dev) {
      // Enable module concatenation to improve code reuse
      config.optimization.concatenateModules = true;

      // Enable scope hoisting to reduce function call overhead
      config.optimization.usedExports = true;
      config.optimization.providedExports = true;

      // Disable unnecessary compression to improve build speed
      if (config.optimization.minimizer) {
        // Use type assertion to avoid TypeScript errors
        config.optimization.minimizer.forEach((minimizer: any) => {
          if (
            minimizer.constructor &&
            minimizer.constructor.name === "TerserPlugin"
          ) {
            if (
              minimizer.options &&
              minimizer.options.terserOptions &&
              minimizer.options.terserOptions.compress
            ) {
              minimizer.options.terserOptions.compress.drop_console = false; // Keep console for debugging
              minimizer.options.terserOptions.compress.pure_funcs = [
                "console.debug",
              ]; // But remove console.debug
            }
          }
        });
      }
    }

    return config;
  },

  // Configure incremental static regeneration (ISR)
  experimental: {
    // Enable application optimization (ISR)
    optimizePackageImports: [
      "@radix-ui/react-icons",
      "lucide-react",
      "date-fns",
      "@tanstack/react-table",
    ],
  },

  // Enable detailed compilation information
  typescript: {
    // Ignore type errors in development to speed up server startup
    ignoreBuildErrors: process.env.NODE_ENV === "development",
  },

  // Disable source maps in production to reduce build size
  productionBrowserSourceMaps: false,

  // Compress HTML output
  compress: true,

  // Remove X-Powered-By header for enhanced security
  poweredByHeader: false,

  // Configure CORS policy
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
      ],
    },
  ],
};

export default nextConfig;
