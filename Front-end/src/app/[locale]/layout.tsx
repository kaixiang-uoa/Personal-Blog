import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from '@/i18n/config';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

export default async function LocaleLayout(props: {
  children: React.ReactNode,
  params: { locale: string },
}){
  const messages = await getMessages();
  const { children, params } = props;
  const locale = params.locale;
  type LocaleType = (typeof locales)[number];
  if (!locales.includes(locale as LocaleType)) notFound();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}