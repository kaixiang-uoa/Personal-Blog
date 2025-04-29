'use client';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('common');
  
  return (
    <p className="text-gray-300">
      {t('aboutContent')}
    </p> 
  );
} 