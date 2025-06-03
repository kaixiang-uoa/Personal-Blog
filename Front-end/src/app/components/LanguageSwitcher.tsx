'use client';

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

  // 当前语言文本展示
  const currentLanguageText = locale === 'en' ? 'EN' : '中文';

  return (
    <button
      onClick={() => switchLocale(locale === 'en' ? 'zh' : 'en')}
      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]"
    >
      <span className="truncate">{currentLanguageText}</span>
    </button>
  );
}
