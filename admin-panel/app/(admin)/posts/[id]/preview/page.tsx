"use client";

import {
  ChevronLeft,
  Calendar,
  User as UserIcon,
  Tag,
  Bookmark,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/data-display/badge";
import { Button } from "@/components/ui/inputs/button";
import { apiService } from "@/lib/api";
import { PopulatedPost } from "@/types";

export default function PostPreviewPage() {
  const params = useParams();
  const [post, setPost] = useState<PopulatedPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const id = params.id as string;
        const response = await apiService.getPostById(id);
        if (response.data) {
          setPost(response.data.post);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  // Author info
  const author = post?.author;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/posts">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Posts
          </Link>
        </Button>
      </div>

      <article className="prose prose-slate dark:prose-invert max-w-none">
        {post.featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden relative h-96">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          {author && (
            <div className="flex items-center gap-2">
              {author.avatar ? (
                <Image
                  src={author.avatar}
                  alt={author.username}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <UserIcon className="w-4 h-4" />
              )}
              <span>{author.username}</span>
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
          {Array.isArray(post.categories) && post.categories.length > 0 && (
            <div className="border-b pb-3">
              <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                <Bookmark className="h-4 w-4" />
                <h3 className="text-sm font-medium">Category</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.categories.map(category => (
                  <Badge key={category._id} variant="secondary">
                    {category.name_en ||
                      category.name ||
                      category.name_zh ||
                      ""}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {Array.isArray(post.tags) && post.tags.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                <Tag className="h-4 w-4" />
                <h3 className="text-sm font-medium">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag._id} variant="outline">
                    {tag.name_en || tag.name || tag.name_zh || ""}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          className="prose prose-slate dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </article>
    </div>
  );
}
