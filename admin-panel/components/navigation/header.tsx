"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Menu, Search, User } from "lucide-react"
import { Button } from "@/components/ui/inputs/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/navigation/dropdown-menu"
import { Input } from "@/components/ui/inputs/input"
import { apiService } from "@/lib/api"
import { useToast } from "@/hooks/ui/use-toast"

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const pathname = usePathname()
  const [pageTitle, setPageTitle] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  // Set page title based on path
  useEffect(() => {
    const pathMap: Record<string, string> = {
      "/dashboard": "Dashboard",
      "/posts": "Post Management",
      "/categories": "Categories & Tags",
      "/media": "Media Library",
      "/settings": "System Settings",
    }

    setPageTitle(pathMap[pathname] || "")
  }, [pathname])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleLogout = async () => {
    try {
      await apiService.logout()
      toast({
        title: "Logout Success",
        description: "You have successfully logged out",
      })
      
      // clearing redirect after login
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('redirectAfterLogin');
      }
      
      // using replace instead of push to prevent user from going back to login state
      router.replace("/login")
    } catch (error) {
      console.error("Logout failed:", error)
      toast({
        title: "Logout failed",
        description: "Error occurred while logging out, please try again",
        variant: "destructive",
      })
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <h1 className="text-lg font-semibold md:text-xl">{pageTitle}</h1>

      <div className="relative ml-auto hidden md:flex w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search content..." className="w-full pl-8" />
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Account Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
