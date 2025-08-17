'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSetting } from '@/contexts/SettingsContext';
import { AboutData, ContactInfo, SocialLinks } from '@/types/models';

/**
 * Footer Component
 *
 * A simplified footer component that displays copyright information and basic links.
 * Avoids hydration issues by using static content.
 *
 * @component
 * @example
 * ```tsx
 * <Footer />
 * ```
 *
 * @returns {JSX.Element} The footer component
 */
export function Footer() {
  const [aboutData, setAboutData] = useState<AboutData>({
    intro: '',
    contact: {} as ContactInfo,
    skills: [],
    education: [],
    experience: [],
    projects: [],
    social: {} as SocialLinks,
  });
  const [isClient, setIsClient] = useState(false);
  const currentYear = new Date().getFullYear();

  // Get about data from settings
  const socialLinks = useSetting('about.social', '{}');

  useEffect(() => {
    setIsClient(true);
    try {
      const parsedSocial = JSON.parse(socialLinks);
      setAboutData(prev => ({
        ...prev,
        social: parsedSocial,
      }));
    } catch (error) {
      console.error('Error parsing social links:', error);
    }
  }, [socialLinks]);

  return (
    <footer className="mt-auto py-6 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Copyright bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} KX Zhang. All rights reserved.
          </p>

          {/* Additional links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
            {isClient && aboutData.social.github ? (
              <a
                href={aboutData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            ) : (
              <Link href="/about" className="hover:text-foreground transition-colors">
                GitHub
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
