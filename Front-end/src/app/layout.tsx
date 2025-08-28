import type React from 'react';
import './globals.css';
import type { Metadata } from 'next/types';
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ReactQueryProvider } from '@/contexts/QueryClientContext';
import { SEOHead, PerformanceMonitor } from '@/components/common';
import { AnalyticsListener } from '@/components/common/AnalyticsListener';
// Performance optimization utilities are used in the inline script
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Modern Blog',
  description: 'A trendy blog for web development enthusiasts',
};

// theme initialization script - prevent theme flickering
const themeScript = `
(function() {
  try {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        initializeTheme();
      });
    } else {
      initializeTheme();
    }
    
    function initializeTheme() {
      const root = document.documentElement;
      if (!root) {
        console.warn('Document root element not found');
        return;
      }
      
      let storedTheme = localStorage.getItem('blog-theme');
      
      if (storedTheme) {
        try {
          storedTheme = JSON.parse(storedTheme);
        } catch (e) {
          storedTheme = 'light';
        }
      }
      
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = storedTheme || (prefersDark ? 'dark' : 'light');
      
      if (defaultTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      
      root.classList.add('theme-init');
      setTimeout(() => {
        if (root) {
          root.classList.remove('theme-init');
        }
      }, 500);
    }
  } catch (e) {
    console.error('Theme initialization error:', e);
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Performance optimization - add resource hints */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined') {
                  // Add preconnect links for critical domains
                  const domains = [
                    'https://fonts.googleapis.com',
                    'https://fonts.gstatic.com',
                    'https://www.googletagmanager.com',
                    'https://www.google-analytics.com',
                    'https://va.vercel-scripts.com'
                  ];
                  domains.forEach(domain => {
                    const link = document.createElement('link');
                    link.rel = 'preconnect';
                    link.href = domain;
                    link.crossOrigin = 'anonymous';
                    document.head.appendChild(link);
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <SettingsProvider>
          <ThemeProvider>
            <ReactQueryProvider>
              <AnalyticsListener />
              <SEOHead />
              <PerformanceMonitor />
              {children}
              <SpeedInsights />
            </ReactQueryProvider>
          </ThemeProvider>
        </SettingsProvider>

        {/* Google Analytics Scripts */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', { 
                  send_page_view: false 
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
