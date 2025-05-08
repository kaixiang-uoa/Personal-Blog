"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, BookOpen, Edit3, Eye, FileText, MessageSquare, Bookmark, PlusCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

// 仪表盘数据类型
interface DashboardData {
  postCount: number
  viewCount: number
  commentCount: number
  categoryCount: number
  recentPosts: {
    id: string
    title: string
    publishDate: string
    status: "published" | "draft"
    viewCount: number
  }[]
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // 模拟API调用
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // 这里应该替换为真实的API调用
        // const response = await axios.get('/api/v1/dashboard')

        // 模拟数据
        const mockData: DashboardData = {
          postCount: 48,
          viewCount: 12458,
          commentCount: 324,
          categoryCount: 12,
          recentPosts: [
            {
              id: "1",
              title: "React 18新特性与性能优化最佳实践",
              publishDate: "2023-04-15",
              status: "published",
              viewCount: 1245,
            },
            {
              id: "2",
              title: "NextJS与Vercel的完美部署流程",
              publishDate: "2023-04-10",
              status: "published",
              viewCount: 986,
            },
            {
              id: "3",
              title: "Tailwind CSS的高级使用技巧",
              publishDate: "2023-04-05",
              status: "draft",
              viewCount: 0,
            },
            {
              id: "4",
              title: "现代Web开发的状态管理解决方案",
              publishDate: "2023-03-28",
              status: "published",
              viewCount: 742,
            },
            {
              id: "5",
              title: "TypeScript高级类型与实战案例分析",
              publishDate: "2023-03-20",
              status: "published",
              viewCount: 568,
            },
          ],
        }

        setData(mockData)
      } catch (error) {
        console.error("Failed to fetch dashboard data", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">欢迎回来，管理员</h2>
        <div className="mt-2 sm:mt-0">
          <Button asChild>
            <Link href="/posts/new" className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              新建文章
            </Link>
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">文章总数</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-7 w-16" /> : <div className="text-2xl font-bold">{data?.postCount}</div>}
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              较上月增长 12%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总浏览量</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-7 w-20" /> : <div className="text-2xl font-bold">{data?.viewCount}</div>}
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              较上月增长 18%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">评论数</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-12" />
            ) : (
              <div className="text-2xl font-bold">{data?.commentCount}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              较上月增长 8%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">分类数</CardTitle>
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-10" />
            ) : (
              <div className="text-2xl font-bold">{data?.categoryCount}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              <Activity className="inline h-3 w-3 mr-1" />
              较上月无变化
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 最近文章 */}
      <Card>
        <CardHeader>
          <CardTitle>最近发布的文章</CardTitle>
          <CardDescription>查看最近发布和草稿中的文章内容</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-5 w-20" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {data?.recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {post.status === "published" ? (
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Edit3 className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="font-medium hover:underline">
                      <Link href={`/posts/${post.id}`}>{post.title}</Link>
                    </span>
                  </div>
                  <div className="flex items-center">
                    {post.status === "published" ? (
                      <span className="flex items-center text-sm text-muted-foreground">
                        <Eye className="mr-1 h-3 w-3" />
                        {post.viewCount}
                      </span>
                    ) : (
                      <span className="text-sm px-2 py-1 rounded-md bg-muted text-muted-foreground">草稿</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* TODO: 添加仪表盘性能图表 */}
    </div>
  )
}
