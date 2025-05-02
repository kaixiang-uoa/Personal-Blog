import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppSidebar } from '../components/app-sidebar';
import { SiteHeader } from '../components/site-header';
import { useSidebar } from '../components/ui/sidebar';
import { cn } from '@/lib/utils';

const MainLayout = () => {
  const location = useLocation();
  const { open: isOpen } = useSidebar();
  
  // 简化解决方案：监听路由变化，强制刷新组件
  useEffect(() => {
    // 这里可以添加数据重新加载的逻辑
    const refreshData = () => {
      // 如果有需要重新加载的数据，可以在这里处理
    };
    
    refreshData();
    
    // 监听 popstate 事件（浏览器前进/后退按钮触发）
    const handlePopState = () => {
      refreshData();
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location.pathname]);
  
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex flex-1">
        {/* 侧边栏 */}
        <div 
          className={cn(
            "sidebar h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out",
            isOpen ? "w-64" : "w-0 -translate-x-full"
          )}
          style={{
            overflow: 'hidden',
            boxShadow: isOpen ? '2px 0 5px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          <AppSidebar />
        </div>
        
        {/* 主内容区域 */}
        <main 
          className={cn(
            "flex-1 overflow-auto transition-all duration-300 ease-in-out",
            isOpen ? "ml-0" : "ml-0 w-full"
          )}
        >
          <Outlet key={location.key || location.pathname} />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
