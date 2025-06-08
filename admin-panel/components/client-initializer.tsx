"use client";

import { useEffect } from "react";
import { auditLogService } from '@/lib/services/audit-log-service';

/**
 * This component initializes client-side services
 * It should be included in the client layout component
 */
export function ClientInitializer() {
  useEffect(() => {
    // Initialize audit log service
    auditLogService.init();
  }, []);

  // This component doesn't render anything
  return null;
} 