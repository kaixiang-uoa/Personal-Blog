import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import ErrorBoundary from '@/app/components/ErrorBoundary';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // ✅ 改成 Promise
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params; // ✅ 解构 Promise

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error('Failed to load messages:', error);
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </NextIntlClientProvider>
  );
}
