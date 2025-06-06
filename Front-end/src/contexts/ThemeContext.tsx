'use client';

import React, { useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useSetting } from './SettingsContext';

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // getting theme setting from the ContextSettings
  const themeSetting = useSetting<string>('appearance.theme', 'light');
  
  // validate and convert theme value to valid options (only accept light or dark)
  const validTheme = (themeSetting === 'dark') ? 'dark' : 'light';
  
  // check if in client environment
  const isClient = typeof window !== 'undefined';
  
  // only handle DOM operations during initialization, let next-themes handle the rest
  useEffect(() => {
    if (isClient) {
      // manually set initial class, ensure dark mode is applied correctly before client rendering
      // this can prevent theme flickering
      if (validTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [validTheme, isClient]);
  
  // using validTheme directly
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={validTheme}
      enableSystem={false}
      themes={['light', 'dark']}
      disableTransitionOnChange={false}
      storageKey="blog-theme"
    >
      {children}
    </NextThemesProvider>
  );
}

// export convenient hooks
export { useTheme } from 'next-themes'; 