import { useAppContext } from "../context/AppContext"

export default function Header() {
  const { activePage, activeTab, setActiveTab } = useAppContext()

  // 页面标题映射
  const pageTitles = {
    dashboard: "仪表盘",
    content: "内容管理",
    categories: "分类管理",
    tags: "标签管理",
    media: "媒体管理",
    settings: "系统设置",
  }

  // 仪表盘页面的标签页
  const dashboardTabs = [
    { id: "overview", title: "概览" },
    { id: "analytics", title: "数据分析" },
    { id: "recent", title: "最近文章" },
  ]

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">{pageTitles[activePage]}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索..."
            className="h-9 w-64 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium">登录</button>
      </div>
    </header>
  )
}
