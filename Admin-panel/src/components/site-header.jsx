import { SidebarIcon } from "lucide-react"

import { SearchForm } from "./search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { useSidebar } from "./ui/sidebar"
import React from 'react';
import { useAuth } from '../contexts/auth-utils';

export function SiteHeader() {
  const { currentUser, logout, isGuestMode } = useAuth();
  const { open: isOpen, toggleSidebar } = useSidebar();
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center px-4">
        <Button 
          className="h-8 w-8 mr-4" 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="ml-auto flex items-center gap-4">
          <SearchForm className="hidden md:flex" />
          
          {isGuestMode && (
            <div className="rounded-md bg-yellow-100 px-3 py-1 text-sm text-yellow-800">
              访客模式：所有操作仅临时有效，退出后将不保存
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
