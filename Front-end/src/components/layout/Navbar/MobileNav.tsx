'use client';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

/**
 * mobile nav menu component
 * contains hamburger menu button and collapsible menu panel
 */
export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('nav');
  
  return (
    <>
      {/* mobile menu button */}
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
            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* mobile menu panel */} 
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