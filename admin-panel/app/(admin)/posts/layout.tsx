"use client"

import { PostProvider } from "@/lib/store/post-context"
import { CategoryProvider } from "@/lib/store/category-context"
import { TagProvider } from "@/lib/store/tag-context"

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <PostProvider>
      <CategoryProvider>
        <TagProvider>
          {children}
        </TagProvider>
      </CategoryProvider>
    </PostProvider>
  )
} 