"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth/AuthContext"
import MainLayout from "@/components/layouts/main-layout"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  
  // 验证登录状态
  useEffect(() => {
    if (!isAuthenticated) {
      // 记住用户想要访问的页面，登录后可以重定向回来
      sessionStorage.setItem('redirectAfterLogin', pathname);
      router.replace("/login")
    }
  }, [isAuthenticated, router, pathname])
  
  // 如果未认证，不渲染内容
  if (!isAuthenticated) {
    return null
  }
  
  return <MainLayout>{children}</MainLayout>
}
