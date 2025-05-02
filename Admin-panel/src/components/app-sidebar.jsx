import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Settings, 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  return (
    <div className="py-4">
      <nav className="space-y-1 px-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
              isActive 
                ? "bg-zinc-800 text-white" 
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
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
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
              isActive 
                ? "bg-zinc-800 text-white" 
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
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
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
              isActive 
                ? "bg-zinc-800 text-white" 
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
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
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
              isActive 
                ? "bg-zinc-800 text-white" 
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            )
          }
        >
          <Settings className="h-4 w-4" />
          <span>系统设置</span>
        </NavLink>
      </nav>
    </div>
  );
}

// 删除 SidebarProvider 组件
