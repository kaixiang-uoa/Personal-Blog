// 创建新文件存放常量、上下文和工具函数
import * as React from "react";

// 创建 Sidebar 上下文
export const SidebarContext = React.createContext({
  isMobile: false,
  isOpen: false,
  setIsOpen: () => {},
});

// 创建 useSidebar hook
export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}