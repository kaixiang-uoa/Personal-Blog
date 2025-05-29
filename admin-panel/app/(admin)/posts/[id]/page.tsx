"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import ApiService from "@/lib/api-service"
import { PostData } from "@/types/post"

export default function PostDetailPage() {
  const params = useParams()
  const [post, setPost] = useState<PostData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log('Fetching post with ID:', params.id)
        const response = await ApiService.posts.getById(params.id as string)
        console.log('Post response:', response)
        if (response?.data?.post) {
          setPost(response.data.post)
        } else {
          setError("Failed to load post data")
        }
      } catch (error: any) {
        console.error("Failed to fetch post:", error)
        setError(error.response?.data?.message || "Failed to load post")
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchPost()
    }
  }, [params.id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-red-500">{error}</h1>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  )
}
