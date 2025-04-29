import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  // 验证语言环境
  if (!locales.includes(locale)) {
    notFound();
  }
  
  return (
    <html lang={locale}>
      <body>
        {children}
      </body>
    </html>
  );
}
