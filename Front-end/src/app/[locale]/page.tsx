'use client';

import { ErrorBoundary } from '@/components';
import HomePage from '@/components/features/home/HomePage';

/**
 * Home Page Component
 *
 * The main homepage that wraps the HomePage component with error boundary
 *
 * @component
 * @returns {JSX.Element} The homepage with error handling
 */
export default function Home() {
  return (
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  );
}
