'use client';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

/**
 * Mobile Navigation Component
 * 
 * A responsive mobile navigation menu that includes a hamburger menu button and a collapsible menu panel.
 * The menu supports internationalization and provides smooth transitions between states.
 * 
 * @component
 * @example
 * ```tsx
 * <MobileNav />
 * ```
 * 
 * @returns {JSX.Element} A mobile navigation component with toggle functionality
 */
export default function MobileNav() {
  // State to control the visibility of the mobile menu
  const [isOpen, setIsOpen] = useState(false);
  // Get translations for navigation items
  const t = useTranslations('nav');
  
  return (
    <>
      {/* Hamburger menu button with toggle functionality */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="flex items-center justify-center p-2 rounded-md text-foreground"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? (
            // Close icon (X) when menu is open
            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon (≡) when menu is closed
            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Collapsible menu panel with navigation links */} 
      <div 
        id="mobile-menu"
        className={`${isOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-background shadow-lg md:hidden z-50`}
      >
        <div className="px-4 py-2 space-y-2">
          <Link 
            href="/" 
            className="text-foreground hover:bg-muted block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            {t('home')}
          </Link>
          <Link 
            href="/about" 
            className="text-foreground hover:bg-muted block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            {t('about')}
          </Link>
          <Link 
            href="/contact" 
            className="text-foreground hover:bg-muted block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            {t('contact')}
          </Link>
        </div>
      </div>
    </>
  );
} 