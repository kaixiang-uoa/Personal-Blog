"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { postService } from "@/lib/services/post-service"
import { PostData } from "@/types/post"

export default function PostDetailPage() {
  const params = useParams()
  const [post, setPost] = useState<PostData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        console.log('Fetching post with ID:', params.id)
        const response = await postService.getById(params.id as string)
        console.log('Post response:', response)
        if (response?.data) {
          setPost(response.data as PostData)
        }
      } catch (error) {
        console.error('Error fetching post:', error)
        setError('Failed to load post')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchPost()
    }
  }, [params.id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
      <div>{post.content}</div>
    </div>
  )
}
