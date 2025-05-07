import { useAppContext } from "../context/AppContext"
import Sidebar from "./Sidebar"
import Header from "./Header"

export default function Layout({ children }) {
  const { showSidebar } = useAppContext()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主内容区 */}
      <main className="flex-1 overflow-auto">
        {/* 头部 */}
        <Header />

        {/* 内容区域 */}
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  )
}
