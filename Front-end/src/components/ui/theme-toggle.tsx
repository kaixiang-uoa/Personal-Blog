'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from './button';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure client-side rendering to prevent SSR hydration issues
  React.useEffect(() => {
    setMounted(true);
  }, [theme, resolvedTheme]);

  // Handle theme switching with manual class application to ensure proper styling
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);

    // Manually add/remove dark class to ensure styles are applied
    const htmlElement = document.documentElement;

    if (newTheme === 'dark') {
      htmlElement.classList.add('dark');
      // Directly set background color property
      htmlElement.style.backgroundColor = '#0a0a0a';
      document.body.style.backgroundColor = '#0a0a0a';
      localStorage.setItem('blog-theme', '"dark"');
    } else {
      htmlElement.classList.remove('dark');
      // Restore background color
      htmlElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
      localStorage.setItem('blog-theme', '"light"');
    }

    // Force repaint
    document.body.style.transition = 'background-color 0.5s ease';

    // Apply force refresh class
    document.body.classList.add('force-theme-change');

    // Delay removing transition styles to ensure changes are applied
    setTimeout(() => {
      document.body.style.transition = '';
      document.body.classList.remove('force-theme-change');
    }, 500);
  };

  // Simple theme toggle without dropdown menu
  const toggleTheme = () => {
    const newTheme = theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark';
    handleThemeChange(newTheme);
  };

  // If not mounted, render placeholder icon to avoid flickering
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className={cn('h-9 w-9', className)}>
        <SunIcon className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  // Simplified to single button direct toggle
  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className={cn('h-9 w-9', className)}>
      {isDark ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
      <span className="sr-only">Toggle theme (currently {isDark ? 'dark' : 'light'})</span>
    </Button>
  );
}
