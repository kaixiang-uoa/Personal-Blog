"use client";

import { Toaster } from "@/components/ui/feedback/toaster";
import { KeepAliveProvider } from "@/contexts/keep-alive-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <KeepAliveProvider>
      {children}
      <Toaster />
    </KeepAliveProvider>
  );
}
