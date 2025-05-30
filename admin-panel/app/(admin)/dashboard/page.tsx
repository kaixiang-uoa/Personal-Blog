"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, BookOpen, Edit3, Eye, FileText, MessageSquare, Bookmark, PlusCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { postService } from "@/lib/services/post-service"
import { categoryService } from "@/lib/services/category-service"
import { DashboardData, DashboardStats, PostResponse, CategoryResponse } from "@/types/common"
import { Post } from "@/types/post"

export default function DashboardPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  // 验证登录状态
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login")
    }
  }, [isAuthenticated, router])
  
  // 如果未认证，不渲染内容
  if (!isAuthenticated) {
    return null
  }

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true)
        
        // Get data
        const statsResponse = await postService.getDashboardStats()
        const statsData = statsResponse.data as DashboardStats || { 
          postCount: 0, 
          viewCount: 0, 
          commentCount: 0, 
          categoryCount: 0 
        }

        // Try to get post data, use mock data if it fails
        let postsData: Post[] = []
        try {
          const response = await postService.getAll({ limit: 5, sort: 'createdAt:desc' })
          // Correctly extract posts array from API response
          if (response?.success && response.data) {
            const postResponse = response.data as unknown as PostResponse
            postsData = postResponse.posts
          }
        } catch (error) {
          console.warn('Failed to fetch recent posts, using mock data', error)
          postsData = [
            {
              _id: "1",
              title: "React 18 New Features and Performance Optimization Best Practices",
              publishDate: "2023-04-15",
              status: "published",
              viewCount: 1245,
              slug: "react-18-features",
              excerpt: "Learn about React 18's new features",
              content: "",
              category: "",
              tags: [],
              featured: false,
              featuredImage: "",
              createdAt: "2023-04-15",
              updatedAt: "2023-04-15"
            },
            {
              _id: "2",
              title: "Perfect Deployment Process with NextJS and Vercel",
              publishDate: "2023-04-10",
              status: "published",
              viewCount: 986,
              slug: "nextjs-vercel-deployment",
              excerpt: "Guide to deploying NextJS apps",
              content: "",
              category: "",
              tags: [],
              featured: false,
              featuredImage: "",
              createdAt: "2023-04-10",
              updatedAt: "2023-04-10"
            },
            {
              _id: "3",
              title: "Advanced Tailwind CSS Techniques",
              publishDate: "2023-04-05",
              status: "draft",
              viewCount: 0,
              slug: "advanced-tailwind",
              excerpt: "Master Tailwind CSS",
              content: "",
              category: "",
              tags: [],
              featured: false,
              featuredImage: "",
              createdAt: "2023-04-05",
              updatedAt: "2023-04-05"
            }
          ]
        }

        // Try to get category data, use statsData if it already contains it
        let categoriesCount = statsData.categoryCount || 0
        if (!categoriesCount) {
          try {
            const response = await categoryService.getAll()
            if (response?.success && response.data) {
              const categoryResponse = response.data as unknown as CategoryResponse
              categoriesCount = categoryResponse.count
            }
          } catch (error) {
            console.warn('Failed to fetch category data', error)
          }
        }
        
        // Build dashboard data
        const dashboardData: DashboardData = {
          postCount: statsData.postCount || 0,
          viewCount: statsData.viewCount || 0,
          commentCount: statsData.commentCount || 0,
          categoryCount: categoriesCount,
          recentPosts: Array.isArray(postsData) ? postsData.map((post) => ({
            id: post._id,
            title: post.title,
            publishDate: post.publishDate || post.createdAt || new Date().toISOString(),
            status: post.status,
            viewCount: post.viewCount || 0
          })) : []
        }

        setData(dashboardData)
      } catch (error) {
        console.error("Failed to fetch dashboard data", error)
        
        // Use fallback data on error
        setData({
          postCount: 0,
          viewCount: 0,
          commentCount: 0,
          categoryCount: 0,
          recentPosts: []
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, Admin</h2>
        <div className="mt-2 sm:mt-0">
          <Button asChild>
            <Link href="/posts/new" className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              New Post
            </Link>
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-7 w-16" /> : <div className="text-2xl font-bold">{data?.postCount}</div>}
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              Up 12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-7 w-20" /> : <div className="text-2xl font-bold">{data?.viewCount}</div>}
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              Up 18% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
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
              Up 8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
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
              No change from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent posts */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Published Posts</CardTitle>
          <CardDescription>View recently published and draft posts</CardDescription>
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
                      <span className="text-sm px-2 py-1 rounded-md bg-muted text-muted-foreground">Draft</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* TODO: Add dashboard performance charts */}
    </div>
  )
}
