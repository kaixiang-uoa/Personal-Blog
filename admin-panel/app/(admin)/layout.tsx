"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

import { ClientInitializer } from "@/components/client-initializer";
import MainLayout from "@/components/layouts/main-layout";
import { Skeleton } from "@/components/ui/data-display/skeleton";
import { useAuth } from "@/contexts/auth-context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading } = useAuth();

  // Validate login status only after loading is complete
  useEffect(() => {
    // Only redirect if not authenticated AND loading is complete
    if (!isAuthenticated && !loading) {
      // Remember the user's desired page, redirect back after login
      sessionStorage.setItem("redirectAfterLogin", pathname);
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router, pathname]);

  // Show loading state while authentication is being checked
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="space-y-4 w-[300px]">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    );
  }

  // If not authenticated and not loading, do not render content
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <MainLayout>{children}</MainLayout>
      <ClientInitializer />
    </>
  );
}
