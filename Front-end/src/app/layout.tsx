import type React from 'react';
import './globals.css';
import type { Metadata } from 'next/types';
import { Inter } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SettingsProvider } from '@/contexts/SettingsContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ReactQueryProvider } from '@/contexts/QueryClientContext';
import { SEOHead } from '@/app/components/SEOHead';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Modern Blog',
  description: 'A trendy blog for web development enthusiasts',
};

// theme initialization script - prevent theme flickering
const themeScript = `
(function() {
  try {
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
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#0a0a0a';
      document.body.style.backgroundColor = '#0a0a0a';
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    document.documentElement.classList.add('theme-init');
    setTimeout(() => {
      document.documentElement.classList.remove('theme-init');
    }, 500);
  } catch (e) {
    console.error('Theme initialization error:', e);
  }
})();
`;

export default function RootLayout({ children }:{ children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={inter.className}>
        <SettingsProvider>
          <ThemeProvider>
            <ReactQueryProvider>
              <SEOHead />
              {children}
              <SpeedInsights />
            </ReactQueryProvider>
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
