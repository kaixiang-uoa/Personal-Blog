import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { locales } from '@/i18n/config';

const inter = Inter({ subsets: ['latin'] });

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();
  type LocaleType = typeof locales[number];
  if (!locales.includes(locale as LocaleType)) notFound();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
