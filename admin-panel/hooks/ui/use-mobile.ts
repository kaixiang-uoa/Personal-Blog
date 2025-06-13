"use client"

import { useState, useEffect } from 'react'

/**
 * Hook to detect if the current device is a mobile device based on screen width
 * @param breakpoint The screen width breakpoint to consider as mobile (default: 768px)
 * @returns boolean indicating if the device is mobile
 */
export function useMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    // 初始检查
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // 首次运行检查
    checkIfMobile()

    // 监听窗口大小变化
    window.addEventListener('resize', checkIfMobile)

    // 清理监听器
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [breakpoint])

  return isMobile
}

export default useMobile 