import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Settings, 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';
import { Sidebar } from './ui/sidebar';

export function AppSidebar() {
  const location = useLocation();
  
  return (
    <Sidebar className="border-r bg-background">
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-2 p-4">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            管理菜单
          </h2>
          <nav className="grid gap-1 px-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all",
                  isActive ? "bg-accent text-accent-foreground" : "transparent"
                )
              }
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>仪表盘</span>
            </NavLink>
            
            <NavLink
              to="/content"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all",
                  isActive ? "bg-accent text-accent-foreground" : "transparent"
                )
              }
            >
              <FileText className="h-4 w-4" />
              <span>内容管理</span>
            </NavLink>
            
            <NavLink
              to="/media"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all",
                  isActive ? "bg-accent text-accent-foreground" : "transparent"
                )
              }
            >
              <Image className="h-4 w-4" />
              <span>媒体管理</span>
            </NavLink>
            
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all",
                  isActive ? "bg-accent text-accent-foreground" : "transparent"
                )
              }
            >
              <Settings className="h-4 w-4" />
              <span>系统设置</span>
            </NavLink>
          </nav>
        </div>
      </ScrollArea>
    </Sidebar>
  );
}
