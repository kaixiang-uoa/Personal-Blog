import { useAppContext } from "./context/AppContext"
import Layout from "./components/Layout"
import DashboardPage from "./pages/DashboardPage"
import ContentManagementPage from "./pages/ContentManagementPage"
import CategoriesPage from "./pages/CategoriesPage"
import TagsPage from "./pages/TagsPage"
import MediaPage from "./pages/MediaPage"
import SettingsPage from "./pages/SettingsPage"
import { AppProvider } from "./context/AppContext"
import ProtectedRoute from "./components/ProtectedRoute"

function AppContent() {
  const { activePage } = useAppContext()

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
      default:
        return <DashboardPage />
    }
  }

  return <Layout>{renderPage()}</Layout>
}

export default function App() {
  return (
    <AppProvider>
      <ProtectedRoute>
        <AppContent />
      </ProtectedRoute>
    </AppProvider>
  )
}
