"use client"

import { useEffect, useRef } from "react"
import { Calendar, Users, BarChart, FileText, Layers, PieChart, Tag } from "lucide-react"
import * as echarts from "echarts/core"
import { BarChart as EBarChart } from "echarts/charts"
import { TooltipComponent, GridComponent, LegendComponent } from "echarts/components"
import { CanvasRenderer } from "echarts/renderers"
import { useAppContext } from "../context/AppContext"

// 注册必要的组件
echarts.use([EBarChart, TooltipComponent, GridComponent, LegendComponent, CanvasRenderer])

// 模拟数据
const chartData = [
  { name: "1月", 总文章: 25, 分类: 8, 标签: 15, 媒体: 42 },
  { name: "2月", 总文章: 30, 分类: 10, 标签: 18, 媒体: 45 },
  { name: "3月", 总文章: 22, 分类: 7, 标签: 12, 媒体: 38 },
  { name: "4月", 总文章: 28, 分类: 9, 标签: 16, 媒体: 40 },
]

const recentArticles = [
  { id: 1, title: "如何优化网站性能", date: "2025-05-01", category: "技术" },
  { id: 2, title: "用户界面设计最佳实践", date: "2025-04-28", category: "设计" },
  { id: 3, title: "响应式布局技巧", date: "2025-04-25", category: "前端" },
]

const performanceData = [
  { name: "技术博客", 访问量: 1200, 互动量: 800, 分享量: 400 },
  { name: "设计案例", 访问量: 900, 互动量: 600, 分享量: 300 },
  { name: "教程", 访问量: 1500, 互动量: 1000, 分享量: 600 },
  { name: "新闻", 访问量: 800, 互动量: 400, 分享量: 200 },
]

const allRecentArticles = [
  { id: 1, title: "如何优化网站性能", date: "2025-05-01", category: "技术", author: "张三" },
  { id: 2, title: "用户界面设计最佳实践", date: "2025-04-28", category: "设计", author: "李四" },
  { id: 3, title: "响应式布局技巧", date: "2025-04-25", category: "前端", author: "王五" },
  { id: 4, title: "SEO优化指南", date: "2025-04-22", category: "营销", author: "赵六" },
  { id: 5, title: "JavaScript性能优化", date: "2025-04-20", category: "技术", author: "张三" },
  { id: 6, title: "色彩理论在UI设计中的应用", date: "2025-04-18", category: "设计", author: "李四" },
]

// ECharts图表组件
function BarChartComponent({ data, height }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    // 初始化图表
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current)

      // 配置图表选项
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["总文章", "分类", "标签", "媒体"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: data.map((item) => item.name),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "总文章",
            type: "bar",
            data: data.map((item) => item.总文章),
            color: "#8884d8",
          },
          {
            name: "分类",
            type: "bar",
            data: data.map((item) => item.分类),
            color: "#82ca9d",
          },
          {
            name: "标签",
            type: "bar",
            data: data.map((item) => item.标签),
            color: "#ffc658",
          },
          {
            name: "媒体",
            type: "bar",
            data: data.map((item) => item.媒体),
            color: "#ff8042",
          },
        ],
      }

      // 设置图表选项
      chartInstance.current.setOption(option)
    }

    // 清理函数
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose()
      }
    }
  }, [data])

  // 处理窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize()
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <div ref={chartRef} style={{ width: "100%", height: height || "300px" }}></div>
}

// 性能数据图表
function PerformanceChartComponent({ data, height }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current)

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["访问量", "互动量", "分享量"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: data.map((item) => item.name),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "访问量",
            type: "bar",
            data: data.map((item) => item.访问量),
            color: "#8884d8",
          },
          {
            name: "互动量",
            type: "bar",
            data: data.map((item) => item.互动量),
            color: "#82ca9d",
          },
          {
            name: "分享量",
            type: "bar",
            data: data.map((item) => item.分享量),
            color: "#ffc658",
          },
        ],
      }

      chartInstance.current.setOption(option)
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose()
      }
    }
  }, [data])

  useEffect(() => {
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize()
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <div ref={chartRef} style={{ width: "100%", height: height || "300px" }}></div>
}

export default function DashboardPage() {
  const { activeTab, setActiveTab } = useAppContext()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
          <button
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
              activeTab === "overview" ? "bg-white text-blue-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            概览
          </button>
          <button
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
              activeTab === "analytics" ? "bg-white text-blue-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            数据分析
          </button>
          <button
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
              activeTab === "recent" ? "bg-white text-blue-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("recent")}
          >
            最近文章
          </button>
        </div>

        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm flex items-center rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-gray-700">
            <Calendar className="mr-2 h-4 w-4" />
            <span>今日</span>
          </button>
          <button className="px-3 py-1 text-sm flex items-center rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-gray-700">
            <Users className="mr-2 h-4 w-4" />
            <span>全部用户</span>
          </button>
        </div>
      </div>

      {/* 概览标签页 */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* 统计卡片 - 使用网格布局 */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">总文章数</h3>
                  <FileText className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold">25</div>
                <p className="text-xs text-gray-500">较上月增长 20%</p>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">分类数量</h3>
                  <Layers className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-gray-500">较上月增长 25%</p>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">标签数量</h3>
                  <Tag className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-gray-500">较上月增长 10%</p>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">媒体文件</h3>
                  <FileText className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-gray-500">较上月增长 5%</p>
              </div>
            </div>
          </div>

          {/* 图表和最近文章并排显示 */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* 图表 */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">数据统计</h3>
                <p className="text-sm text-gray-500">过去4个月的内容增长趋势</p>
              </div>
              <div className="p-4">
                <div className="h-[300px]">
                  <BarChartComponent data={chartData} height="300px" />
                </div>
              </div>
            </div>

            {/* 最近文章 */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">最近文章</h3>
                <p className="text-sm text-gray-500">最近发布的文章列表</p>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {recentArticles.length > 0 ? (
                    recentArticles.map((article) => (
                      <div key={article.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <div className="font-medium">{article.title}</div>
                          <div className="text-sm text-gray-500">{article.category}</div>
                        </div>
                        <div className="text-sm text-gray-500">{article.date}</div>
                      </div>
                    ))
                  ) : (
                    <div className="flex h-[100px] items-center justify-center text-gray-500">暂无最近文章数据</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 数据分析标签页 */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">内容分布</h3>
                <p className="text-sm text-gray-500">按分类统计的内容分布</p>
              </div>
              <div className="p-4">
                <div className="h-[300px] flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-gray-400" />
                  <div className="ml-4">
                    <div className="text-lg font-medium">饼图将在这里显示</div>
                    <div className="text-sm text-gray-500">按分类统计的内容分布</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">访问趋势</h3>
                <p className="text-sm text-gray-500">过去30天的访问量趋势</p>
              </div>
              <div className="p-4">
                <div className="h-[300px] flex items-center justify-center">
                  <BarChart className="h-16 w-16 text-gray-400" />
                  <div className="ml-4">
                    <div className="text-lg font-medium">折线图将在这里显示</div>
                    <div className="text-sm text-gray-500">过去30天的访问量趋势</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">内容性能分析</h3>
                <p className="text-sm text-gray-500">各类内容的访问量和互动数据</p>
              </div>
              <div className="p-4">
                <div className="h-[300px]">
                  <PerformanceChartComponent data={performanceData} height="300px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 最近文章标签页 */}
      {activeTab === "recent" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">所有最近文章</h3>
              <p className="text-sm text-gray-500">按时间排序的最近文章列表</p>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {allRecentArticles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <div className="font-medium">{article.title}</div>
                      <div className="mt-1 flex items-center space-x-2">
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">{article.category}</span>
                        <span className="text-sm text-gray-500">作者: {article.author}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{article.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
