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
};

// export final configuration, apply next-intl plugin
export default withNextIntl(nextConfig);
