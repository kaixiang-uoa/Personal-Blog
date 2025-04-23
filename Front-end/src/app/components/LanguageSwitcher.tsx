"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Get the path without the locale prefix
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    
    // Create the new path with the new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    // Navigate to the new path
    router.push(newPath);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => switchLocale('zh')}
        className={`px-2 py-1 text-sm rounded-md ${
          locale === 'zh' 
            ? 'bg-cyan-600 text-white' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        中文
      </button>
      <button
        onClick={() => switchLocale('en')}
        className={`px-2 py-1 text-sm rounded-md ${
          locale === 'en' 
            ? 'bg-cyan-600 text-white' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        English
      </button>
    </div>
  );
}