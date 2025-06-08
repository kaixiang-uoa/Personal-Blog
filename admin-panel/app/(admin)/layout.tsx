"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import MainLayout from "@/components/layouts/main-layout"
import { ClientInitializer } from "@/components/client-initializer"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  
  // Validate login status
  useEffect(() => {
    if (!isAuthenticated) {
      // Remember the user's desired page, redirect back after login
      sessionStorage.setItem('redirectAfterLogin', pathname);
      router.replace("/login")
    }
  }, [isAuthenticated, router, pathname])
  
  // If not authenticated, do not render content
  if (!isAuthenticated) {
    return null
  }
  
  return (
    <>
      <MainLayout>{children}</MainLayout>
      <ClientInitializer />
    </>
  )
}
