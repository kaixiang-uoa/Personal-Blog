"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { postService } from "@/lib/services/post-service"
import { PostData } from "@/types/post"
import { ChevronLeft, Calendar, User, Tag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { TagType } from "@/types/tags"

export default function PostPreviewPage() {
  const params = useParams()
  const [post, setPost] = useState<PostData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentLang, setCurrentLang] = useState('en')

  useEffect(() => {
    async function fetchPost() {
      try {
        const id = params.id as string
        const response = await postService.getById(id, currentLang)
        if (response.data) {
          setPost(response.data)
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
  }, [params.id, currentLang])

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
        <Select value={currentLang} onValueChange={setCurrentLang}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="zh">中文</SelectItem>
          </SelectContent>
        </Select>
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
                  alt={post.author.name}
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <User className="w-4 h-4" />
              )}
              <span>{post.author.name}</span>
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

        <div className="mb-8">
          {post.categoryData && post.categoryData.length > 0 && (
            <Badge variant="secondary" className="mr-2">
              {post.categoryData[0].name}
            </Badge>
          )}
          {post.displayTags && post.displayTags.length > 0 && post.displayTags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="mr-2">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>

        <div 
          className="prose prose-slate dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  )
} 