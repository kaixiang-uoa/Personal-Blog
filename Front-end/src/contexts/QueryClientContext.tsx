'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, ReactNode } from 'react';

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  // create a new QueryClient for each component instance
  // this is the best practice for Next.js App Router, to avoid sharing state between server and client components
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // default configuration
        staleTime: 1000 * 60 * 5, // data will not be refetched within 5 minutes
        refetchOnWindowFocus: false, // data will not be refetched when window is focused
        retry: 1, // retry 1 time if request fails
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
} 