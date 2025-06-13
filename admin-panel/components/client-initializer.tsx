"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/ui/use-toast";

/**
 * This component initializes client-side services
 * It should be included in the client layout component
 */
export function ClientInitializer() {
  const { toast } = useToast();

  useEffect(() => {
    // Initialize client services
    console.log("Client services initialized");
    
    // Display welcome toast on initial load
    if (typeof window !== 'undefined') {
      const isFirstLoad = !sessionStorage.getItem('initialized');
      if (isFirstLoad) {
        sessionStorage.setItem('initialized', 'true');
        // Show welcome toast
        setTimeout(() => {
          toast({
            title: "System Ready",
            description: "Welcome to Blog Management System",
            variant: "default",
          });
        }, 1000);
      }
    }
  }, [toast]);

  // This component doesn't render anything
  return null;
} 