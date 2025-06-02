"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { postService } from "@/lib/services/post-service"
import { ApiPost } from "@/types/post"
import { ChevronLeft, Calendar, User, Tag, Bookmark } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PostPreviewPage() {
  const params = useParams()
  const [post, setPost] = useState<ApiPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        const id = params.id as string
        const response = await postService.getById(id, 'en')
        console.log('response', response.data.post)
        if (response.data) {
          setPost(response.data.post)
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/posts/${params.id}/edit`}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Edit
          </Link>
        </Button>
      </div>

      <article className="prose prose-slate dark:prose-invert max-w-none">
        {post.featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          {post.author && (
            <div className="flex items-center gap-2">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.username}
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <User className="w-4 h-4" />
              )}
              <span>{post.author.username}</span>
            </div>
          )}
          
          {post.createdAt && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.createdAt}>
                {new Date(post.createdAt).toLocaleDateString()}
              </time>
            </div>
          )}
        </div>

        {post.excerpt && (
          <div className="text-lg text-muted-foreground mb-8">
            {post.excerpt}
          </div>
        )}

        <div className="mb-8 space-y-4">
          {post.categories && post.categories.length > 0 && (
            <div className="border-b pb-3">
              <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                <Bookmark className="h-4 w-4" />
                <h3 className="text-sm font-medium">Category</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Badge key={category._id} variant="secondary">
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {post.tags && post.tags.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                <Tag className="h-4 w-4" />
                <h3 className="text-sm font-medium">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag._id} variant="outline">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div 
          className="prose prose-slate dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  )
} 