'use client';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

/**
 * desktop nav menu component
 * only show on medium and above screen sizes
 */
export default function DesktopNav() {
  const t = useTranslations('nav');
  
  return (
    <div className="hidden md:flex items-center gap-9">
      <Link href="/" className="text-foreground hover:text-primary text-sm font-medium leading-normal">
        {t('home')}
      </Link>
      <Link href="/about" className="text-foreground hover:text-primary text-sm font-medium leading-normal">
        {t('about')}
      </Link>
      <Link href="/contact" className="text-foreground hover:text-primary text-sm font-medium leading-normal">
        {t('contact')}
      </Link>
    </div>
  );
} 