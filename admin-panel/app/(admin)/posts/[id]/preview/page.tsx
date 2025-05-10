"use client"
import { use } from "react";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Calendar, User, Tag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ApiService from "@/lib/api-service"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { PostData, PostParams } from "@/types/post"
import { TagType } from "@/types/tags"



export default function PreviewPostPage({ params }: { params: any}) {
  const resolvedParams = use(params) as PostParams;
  const id = resolvedParams?.id;
  const router = useRouter()
  const [post, setPost] = useState<PostData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentLang, setCurrentLang] = useState('en')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await ApiService.posts.getById(id, currentLang)
        // 确保文章数据包含所有必要的字段
        if (response?.data?.post) {
          // 确保常用字段有默认值
          const processedPost = {
            ...response.data.post,
            tags: response.data.post.tags || [],
            categories: response.data.post.categories || [],
            excerpt: response.data.post.excerpt || '',
            content: response.data.post.content || '',
          };
          setPost(processedPost);
        } else {
          console.error("Invalid post data structure:", response);
        }
      } catch (error) {
        console.error("Failed to fetch post", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [id, currentLang])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <Button asChild>
          <Link href="/posts">Back to Posts</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/posts/${id}/edit`}>
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
          {post.category && (
            <Badge variant="secondary" className="mr-2">
              {post.category}
            </Badge>
          )}
          {Array.isArray(post.tags) && post.tags.length > 0 && post.tags.map((tag: string | TagType) => (
            <Badge key={typeof tag === 'object' ? tag._id || tag.name : tag} variant="outline" className="mr-2">
              <Tag className="w-3 h-3 mr-1" />
              {typeof tag === 'object' ? tag.name : tag}
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