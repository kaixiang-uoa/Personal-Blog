'use client';

import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  enableSystem = true,
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
}) {
  const { getSetting } = useSettings();
  const savedTheme = getSetting('appearance.theme', defaultTheme) as Theme;
  
  const [theme, setTheme] = useState<Theme>(savedTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  
  // 确保客户端渲染
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // 从系统获取主题
    const getSystemTheme = () => {
      if (!window.matchMedia) return 'light';
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    
    // 应用主题到 body 而不是 html
    const applyTheme = (newTheme: Theme) => {
      let resolvedTheme: 'light' | 'dark' = newTheme as 'light' | 'dark';
      
      if (newTheme === 'system' && enableSystem) {
        resolvedTheme = getSystemTheme();
      }
      
      setResolvedTheme(resolvedTheme);
      
      // 将主题应用到 body 标签而不是 html
      if (resolvedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
      } else {
        document.body.setAttribute('data-theme', 'light');
      }
    };
    
    applyTheme(theme);
    
    // 监听系统主题变化
    if (enableSystem) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        if (theme === 'system') {
          applyTheme('system');
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme, enableSystem]);
  
  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
    },
    resolvedTheme,
  };
  
  // 避免 SSR 问题
  if (!mounted) {
    return <>{children}</>;
  }
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
