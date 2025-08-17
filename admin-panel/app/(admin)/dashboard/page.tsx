"use client";

import {
  BookOpen,
  Edit3,
  Eye,
  FileText,
  Bookmark,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/data-display/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/data-display/card";
import { Skeleton } from "@/components/ui/data-display/skeleton";
import { Button } from "@/components/ui/inputs/button";
import { useAuth } from "@/contexts/auth-context";
import { useDashboardPosts } from "@/hooks/usePosts";
import { useCategories } from "@/hooks/useTaxonomies";
import { DashboardData } from "@/types";
import { PostStatus } from "@/types/posts";

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth();

  // Use custom hooks to fetch data
  const {
    posts,
    total: postCount,
    loading: postsLoading,
  } = useDashboardPosts();
  const { categories, loading: categoriesLoading } = useCategories();

  // Calculate dashboard data
  const viewCount = posts.reduce((sum, post) => sum + (post.viewCount || 0), 0);
  const categoryCount = categories.length;

  const recentPosts: DashboardData["recentPosts"] = posts.map(post => ({
    id: post._id,
    title: post.title,
    publishDate: post.publishedAt,
    status: post.status,
    viewCount: post.viewCount || 0,
  }));

  const loading = postsLoading || categoriesLoading;

  // Return early if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          {user ? `Welcome back, ${user.username}` : "Welcome back"}
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
            {loading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="text-2xl font-bold">{postCount}</div>
            )}
            {/* 
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              Up 12% from last month
            </p>
            */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-20" />
            ) : (
              <div className="text-2xl font-bold">{viewCount}</div>
            )}
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
              <div className="text-2xl font-bold">{categoryCount}</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent posts */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Published Posts</CardTitle>
          <CardDescription>
            View recently published and draft posts
          </CardDescription>
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
              {recentPosts.map(post => (
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
                      <Link href={`/posts/${post.id}/preview`}>
                        {post.title}
                      </Link>
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
  );
}
