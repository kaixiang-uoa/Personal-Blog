"use client"

import { Toaster } from "@/components/ui/feedback/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
} 