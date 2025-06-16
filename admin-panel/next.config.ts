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
      {
        protocol: "https",
        hostname: "personal-blog-w2y9.onrender.com",
        pathname: "/api/v1/media/uploads/**",
      },
      {
        protocol: "https",
        hostname: "my-blog-media-storage.s3.ap-southeast-2.amazonaws.com",
        pathname: "/media/**",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60,
    unoptimized: process.env.NODE_ENV === "development",
  },

  reactStrictMode: true,

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

  webpack: (config, { dev, isServer }) => {
    if (process.env.ANALYZE === "true") {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "server",
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        }),
      );
    }

    if (!dev) {
      config.optimization.concatenateModules = true;
      config.optimization.usedExports = true;
      config.optimization.providedExports = true;

      if (config.optimization.minimizer) {
        config.optimization.minimizer.forEach((minimizer: any) => {
          if (
            minimizer.constructor?.name === "TerserPlugin" &&
            minimizer.options?.terserOptions?.compress
          ) {
            minimizer.options.terserOptions.compress.drop_console = false;
            minimizer.options.terserOptions.compress.pure_funcs = [
              "console.debug",
            ];
          }
        });
      }
    }

    return config;
  },

  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-icons",
      "lucide-react",
      "date-fns",
      "@tanstack/react-table",
    ],
  },

  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === "development",
  },


  eslint: {
    ignoreDuringBuilds: true,
  },

  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,

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
