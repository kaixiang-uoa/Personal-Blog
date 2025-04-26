import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ContentManagement from './pages/ContentManagement';
import MediaManagement from './pages/MediaManagement';
import SystemSettings from './pages/SystemSettings';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AdminProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/content" element={<ContentManagement />} />
                <Route path="/media" element={<MediaManagement />} />
                <Route path="/settings" element={<SystemSettings />} />
              </Route>
            </Route>
            
            {/* 添加一个根路径的重定向 */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* 添加一个404页面的路由 */}
            <Route path="*" element={
              <div className="flex h-screen items-center justify-center flex-col">
                <h1 className="text-2xl font-bold">404 - 页面不存在</h1>
                <p className="mt-2">您访问的页面不存在或已被移除</p>
                <button 
                  onClick={() => window.history.back()} 
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  返回上一页
                </button>
              </div>
            } />
          </Routes>
        </AdminProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
