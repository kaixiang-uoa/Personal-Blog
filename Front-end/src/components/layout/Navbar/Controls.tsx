'use client';
import { ThemeToggle, LanguageSwitcher } from '@/components/ui';

/**
 * navbar control component
 * contains theme toggle and language switcher buttons
 */
export default function Controls() {
  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <LanguageSwitcher />
    </div>
  );
}
