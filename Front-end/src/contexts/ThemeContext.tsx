'use client';

import React, { useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useSetting } from './SettingsContext';

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // getting theme setting from the ContextSettings
  const themeSetting = useSetting<string>('appearance.theme', 'light');
  
  // state tracking, ensure correct application
  const [theme, setTheme] = useState<string>('light');
  
  // check if in client environment
  const isClient = typeof window !== 'undefined';
  
  // use API set theme to initialize
  useEffect(() => {
    if (isClient) {
      // only accept light or dark, if system then default to light
      const validTheme = (themeSetting === 'dark') ? 'dark' : 'light';
      setTheme(validTheme);
      
      // manually set class name, ensure dark mode is applied correctly
      if (validTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [themeSetting, isClient]);
  
  // use Next-Themes provided ThemeProvider
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={theme}
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