"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, LayoutDashboard, FileText, BookmarkPlus, ImageIcon, Settings, LogOut } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname()
  const isMobile = useMobile()

  const items = [
    {
      title: "仪表盘",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "文章管理",
      href: "/posts",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      title: "分类和标签",
      href: "/categories",
      icon: <BookmarkPlus className="w-5 h-5" />,
    },
    {
      title: "媒体库",
      href: "/media",
      icon: <ImageIcon className="w-5 h-5" />,
    },
    {
      title: "系统设置",
      href: "/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ]

  const handleLogout = () => {
    // 处理登出逻辑
    console.log("Logging out...")
  }

  return (
    <>
      {/* 移动端背景遮罩 */}
      {isMobile && open && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}

      {/* 侧边栏 */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out",
          isMobile ? (open ? "translate-x-0" : "-translate-x-full") : "translate-x-0 relative",
        )}
      >
        {isMobile && (
          <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">关闭侧边栏</span>
          </Button>
        )}

        <div className="flex h-14 items-center border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="font-bold text-primary-foreground">B</span>
            </div>
            <span className="font-bold text-xl">博客管理</span>
          </Link>
        </div>

        <ScrollArea className="flex flex-col flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent/50 hover:text-accent-foreground",
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </ScrollArea>

        <div className="border-t p-3">
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            登出系统
          </Button>
        </div>
      </aside>
    </>
  )
}
