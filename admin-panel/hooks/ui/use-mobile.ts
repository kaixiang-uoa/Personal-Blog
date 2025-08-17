"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect if the current device is a mobile device based on screen width
 * @param breakpoint The screen width breakpoint to consider as mobile (default: 768px)
 * @returns boolean indicating if the device is mobile
 */
export function useMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Initial check
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // First run check
    checkIfMobile();

    // Listen for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup listener
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [breakpoint]);

  return isMobile;
}

export default useMobile;
