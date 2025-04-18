import * as React from "react"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import { NavLink } from "react-router"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"

import {
  LayoutDashboard,
  FileText,
  ImageIcon,
  Settings2 as SettingsIcon,
  MessageSquare,
  Users,
  Code,
  HelpCircle,
  BookOpen,
  Command
} from "lucide-react";

const data = {
  user: {
    name: "Admin User",
    email: "admin@example.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      items: [],
    },
    {
      title: "Content Management",
      url: "/content",
      icon: FileText,
      items: [
        {
          title: "All Posts",
          url: "/content",
        },
        {
          title: "Categories & Tags",
          url: "/content/categories",
        },
        {
          title: "Pages",
          url: "/content/pages",
        },
      ],
    },
    {
      title: "Media Management",
      url: "/media",
      icon: ImageIcon,
      items: [
        {
          title: "All Media",
          url: "/media",
        },
        {
          title: "Images",
          url: "/media/images",
        },
        {
          title: "Videos",
          url: "/media/videos",
        },
        {
          title: "Documents",
          url: "/media/documents",
        },
      ],
    },
    {
      title: "System Settings",
      url: "/settings",
      icon: SettingsIcon,
      items: [
        {
          title: "General",
          url: "/settings",
        },
        {
          title: "Appearance",
          url: "/settings/appearance",
        },
        {
          title: "Email",
          url: "/settings/email",
        },
        {
          title: "Security",
          url: "/settings/security",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Help Center",
      url: "/help",
      icon: HelpCircle,
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: BookOpen,
    },
  ],
  projects: [
    {
      name: "Comments",
      url: "/comments",
      icon: MessageSquare,
    },
    {
      name: "User Management",
      url: "/users",
      icon: Users,
    },
    {
      name: "Theme Editor",
      url: "/theme",
      icon: Code,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <NavLink to="/">
                <div
                  className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
