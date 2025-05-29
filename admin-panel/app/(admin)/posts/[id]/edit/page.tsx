"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import PostEditor from "@/components/post-editor"
import { PostParams, PostData } from "@/types/post"
import { usePost } from "@/lib/store/post-context"
import { useCategory } from "@/lib/store/category-context"
import { useTag } from "@/lib/store/tag-context"

export default function EditPostPage({ params }: { params: PostParams }) {
  const { state: postState, fetchPost, updatePost } = usePost()
  const { state: categoryState, fetchCategories } = useCategory()
  const { state: tagState, fetchTags } = useTag()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  useEffect(() => {
    if (params.id) {
      fetchPost(params.id)
    }
  }, [params.id, fetchPost])

  const handleSubmit = async (data: PostData) => {
    if (!data.title) {
      toast({
        title: "Title Required",
        description: "Please enter a title for your post",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await updatePost(params.id, {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.categoryData[0]?._id || "",
        tags: data.displayTags,
        status: data.status,
        featured: data.featured,
        featuredImage: data.featuredImage
      })

      toast({
        title: "Success",
        description: "Post updated successfully",
      })
      router.push("/posts")
    } catch (error) {
      console.error("Failed to update post:", error)
      toast({
        title: "Update Failed",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (postState.loading) {
    return <div>Loading...</div>
  }

  if (!postState.currentPost) {
    return <div>Post not found</div>
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <PostEditor
        post={postState.currentPost}
        categories={categoryState.categories}
        tags={tagState.tags}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  )
} 