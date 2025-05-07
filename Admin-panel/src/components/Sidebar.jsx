"use client"

import { FileText, Home, Layers, Tag, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { useAppContext } from "../context/AppContext"

export default function Sidebar() {
  const { activePage, setActivePage, showSidebar, setShowSidebar } = useAppContext()

  // 导航菜单项
  const menuItems = [
    { id: "dashboard", title: "仪表盘", icon: Home },
    { id: "content", title: "内容管理", icon: FileText },
    { id: "categories", title: "分类管理", icon: Layers },
    { id: "tags", title: "标签管理", icon: Tag },
    { id: "media", title: "媒体管理", icon: FileText },
    { id: "settings", title: "系统设置", icon: Settings },
  ]

  return (
    <aside className={`${showSidebar ? "w-64" : "w-20"} border-r bg-white transition-all duration-300 ease-in-out`}>
      <div className="flex h-16 items-center justify-between border-b px-4">
        <h2 className={`text-lg font-semibold ${!showSidebar && "hidden"}`}>个人用户管理</h2>
        <button className="p-2 rounded-md hover:bg-gray-100 text-gray-700" onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>
      <nav className="space-y-1 p-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center justify-start p-2 rounded-md hover:bg-gray-100 ${
              activePage === item.id ? "bg-blue-50 text-blue-700" : "text-gray-700"
            }`}
            onClick={() => setActivePage(item.id)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {showSidebar && <span>{item.title}</span>}
          </button>
        ))}
      </nav>
    </aside>
  )
}
