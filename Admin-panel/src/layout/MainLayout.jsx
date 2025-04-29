import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppSidebar } from '../components/app-sidebar';
import { SiteHeader } from '../components/site-header';
import { SidebarProvider } from '../components/ui/sidebar';

const MainLayout = () => {
  const location = useLocation();
  
  // 简化解决方案：监听路由变化，强制刷新组件
  useEffect(() => {
    console.log('路由变化:', location.pathname);
    
    // 这里可以添加数据重新加载的逻辑
    const refreshData = () => {
      // 如果有需要重新加载的数据，可以在这里处理
      console.log('重新加载数据');
    };
    
    refreshData();
    
    // 监听 popstate 事件（浏览器前进/后退按钮触发）
    const handlePopState = () => {
      console.log('检测到浏览器前进/后退操作');
      refreshData();
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location.pathname]);
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 overflow-auto">
            {/* 使用 key 强制 Outlet 在路由变化时重新渲染 */}
            <Outlet key={location.key || location.pathname} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
