import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import { AdminProvider } from './contexts/AdminProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ContentManagement from './pages/ContentManagement';
import MediaManagement from './pages/MediaManagement';
import SystemSettings from './pages/SystemSettings';
import MainLayout from './layout/MainLayout';
import './App.css';
// 从 ui/sidebar 导入 SidebarProvider，而不是从 app-sidebar
import { SidebarProvider } from './components/ui/sidebar';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AdminProvider>
          <SidebarProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              
              {/* 受保护的路由 */}
              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/content" element={<ContentManagement />} />
                  <Route path="/media" element={<MediaManagement />} />
                  <Route path="/settings" element={<SystemSettings />} />
                </Route>
              </Route>
              
              {/* 默认重定向到仪表盘 */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </SidebarProvider>
        </AdminProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
