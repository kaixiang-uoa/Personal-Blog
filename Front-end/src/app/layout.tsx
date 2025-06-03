import type React from 'react';
import './globals.css';
import type { Metadata } from 'next/types';
import { Inter } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SettingsProvider } from '@/contexts/SettingsContext';
import { SEOHead } from '@/app/components/SEOHead';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Modern Blog',
  description: 'A trendy blog for web development enthusiasts',
};

export default function RootLayout({ children }:{ children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SettingsProvider>
          <SEOHead />
          {children}
          <SpeedInsights />
        </SettingsProvider>
      </body>
    </html>
  );
}
