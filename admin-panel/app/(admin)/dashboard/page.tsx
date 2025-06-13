"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/data-display/card"
import { Activity, BookOpen, Edit3, Eye, FileText, MessageSquare, Bookmark, PlusCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/inputs/button"
import Link from "next/link"
import { Skeleton } from "@/components/ui/data-display/skeleton"
import { apiService } from "@/lib/api"
import { DashboardData } from "@/types/index"
import { PostQueryParams, PostStatus } from "@/types/posts"
import { Badge } from "@/components/ui/data-display/badge"

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<DashboardData | null>(null)

  // Fetch dashboard data
  useEffect(() => {
    // Don't fetch data if not authenticated
    if (!isAuthenticated) return;
    
    async function fetchDashboardData() {
      try {
        setLoading(true);
        
        // Use existing API endpoints to build dashboard data
        let postCount = 0;
        let viewCount = 0;
        let commentCount = 0; // Default to 0 for now
        let categoryCount = 0;
        let recentPosts: DashboardData['recentPosts'] = [];
        
        try {
          // Get posts data from API
          const params: PostQueryParams = {
            limit: 10,
            allStatus: true
          }
          const postsResponse = await apiService.getPosts(params);
          // Check if we have valid data
          if (postsResponse && postsResponse.data) {
            const postsData = postsResponse.data;
            postCount = postsData.total || 0;
            
            // Calculate total view count from posts
            if (postsData.posts && Array.isArray(postsData.posts)) {
              viewCount = postsData.posts.reduce((sum: number, post: any) => {
                return sum + (post.viewCount || 0);
              }, 0);
              
              // Format recent posts for display
              recentPosts = postsData.posts.map((post: any) => ({
                id: post._id,
                title: post.title,
                publishDate: post.publishedAt,
                status: post.status,
                viewCount: post.viewCount || 0
              }));
            }
          }
        } catch (error) {
          console.log("Posts API error:", error);
        }
        
        try {
          // Get categories count
          const categoriesResponse = await apiService.getCategories();
          
          // Check if we have valid data
          if (categoriesResponse && categoriesResponse.data) {
            const categoriesData = categoriesResponse.data;
            categoryCount = categoriesData.total || 
                           (categoriesData.categories && Array.isArray(categoriesData.categories) 
                            ? categoriesData.categories.length 
                            : 0);
          }
        } catch (error) {
          console.log("Categories API error:", error);
        }
        
        // Comments functionality is not implemented yet
        // This is commented out for future expansion when comments API is available
        /*
        try {
          // Attempt to get comment count if API endpoint exists
          const commentsResponse = await apiService.get('/comments', { limit: 1 });
          
          // Check if we have valid data
          if (commentsResponse && commentsResponse.data) {
            commentCount = commentsResponse.data.total || 0;
          }
        } catch (error) {
          console.log("Comments API not implemented yet:", error);
        }
        */
        
        // Set the dashboard data with values from API
        setData({
          postCount,
          viewCount,
          commentCount,
          categoryCount,
          recentPosts
        });
      } catch (error) {
        console.error("Error building dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [isAuthenticated])

  // Return early if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          {user ? `Welcome back, ${user.username}` : 'Welcome back'}
        </h2>
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
                <div
                  key={post.id}
                  className="flex items-center justify-between py-2 border-b last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    {post.status === PostStatus.PUBLISHED ? (
                      <BookOpen className="h-4 w-4 text-blue-500" />
                    ) : (
                      <Edit3 className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="font-medium hover:underline">
                      <Link href={`/posts/${post.id}`}>{post.title}</Link>
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center text-sm text-muted-foreground">
                      <Eye className="mr-1 h-4 w-4" />
                      {post.viewCount || 0}
                    </span>
                    <span>
                      {post.status === PostStatus.PUBLISHED ? (
                        <Badge variant="default">Published</Badge>
                      ) : (
                        <Badge variant="outline">Draft</Badge>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance charts can be added later after basic functionality is stable */}
    </div>
  )
}
