import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import ErrorBoundary from '@/components/ErrorBoundary';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 使用 Promise.resolve() 来确保 params 被正确处理
  const locale = (await Promise.resolve(params)).locale;

  // 异步加载消息文件
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </NextIntlClientProvider>
  );
}
