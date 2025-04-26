"use client";
import * as React from "react";
import { PanelLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import {
  TooltipProvider,
} from "./tooltip";
import { 
  SidebarContext, 
  useSidebar,
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_KEYBOARD_SHORTCUT
} from "./sidebar-utils";
import { useIsMobile } from "@/hooks/use-mobile";

// -------------------- Components --------------------
function SidebarProvider({ children, defaultIsOpen = true }) {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen);
  const [openMobile, setOpenMobile] = React.useState(false);
  const isMobile = useIsMobile();

  // 使用 useCallback 包装 toggleSidebar 函数
  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((prev) => !prev);
    } else {
      setIsOpen((prev) => !prev);
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${!isOpen}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    }
  }, [isMobile, isOpen]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === SIDEBAR_KEYBOARD_SHORTCUT) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state = isOpen ? "expanded" : "collapsed";

  // 修复 useMemo 中的依赖项
  const value = React.useMemo(() => ({
    state,
    isOpen,
    setIsOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  }), [state, isOpen, isMobile, openMobile, toggleSidebar]);

  return (
    <SidebarContext.Provider value={value}>
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </SidebarContext.Provider>
  );
}

function Sidebar({ className, children, ...props }) {
  return (
    <aside className={cn("h-full", className)} {...props}>
      {children}
    </aside>
  );
}

function SidebarTrigger({ className, onClick, ...props }) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(e) => {
        onClick?.(e);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

function SidebarContent({ className, ...props }) {
  return <div className={cn("flex flex-1 flex-col overflow-auto", className)} {...props} />;
}

function SidebarHeader({ className, ...props }) {
  return <div className={cn("flex p-4", className)} {...props} />;
}

function SidebarFooter({ className, ...props }) {
  return <div className={cn("flex p-4 mt-auto", className)} {...props} />;
}

function SidebarSeparator({ className, ...props }) {
  return <Separator className={cn("mx-2 my-4", className)} {...props} />;
}

function SidebarInput({ className, ...props }) {
  return <Input className={cn("h-8 w-full", className)} {...props} />;
}

// 导出组件
export {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarInput,
};

// 将 useSidebar 和常量移到单独的文件中
// 创建新文件 sidebar-utils.js 并导出这些内容
