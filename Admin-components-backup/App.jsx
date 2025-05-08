import { useAppContext } from "./context/AppContext"
import Layout from "./components/Layout"
import DashboardPage from "./pages/DashboardPage"
import ContentManagementPage from "./pages/ContentManagementPage"
import CategoriesPage from "./pages/CategoriesPage"
import TagsPage from "./pages/TagsPage"
import MediaPage from "./pages/MediaPage"
import SettingsPage from "./pages/SettingsPage"
import ArticleEditorPage from "./pages/ArticleEditorPage"
import { AppProvider } from "./context/AppContext"
import LoginPage from "./pages/auth/LoginPage"

function AppContent() {
  const { activePage, isAuthenticated, isLoading } = useAppContext()

  // 如果正在加载，显示加载状态
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // 如果未登录，直接返回LoginPage，不使用Layout布局
  if (!isAuthenticated) {
    return <LoginPage />
  }

  // 根据当前活动页面渲染对应的组件
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />
      case "content":
        return <ContentManagementPage />
      case "categories":
        return <CategoriesPage />
      case "tags":
        return <TagsPage />
      case "media":
        return <MediaPage />
      case "settings":
        return <SettingsPage />
      case "articleEditor":
        return <ArticleEditorPage />
      default:
        return <DashboardPage />
    }
  }

  return <Layout>{renderPage()}</Layout>
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
