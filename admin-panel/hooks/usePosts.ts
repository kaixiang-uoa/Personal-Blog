import { useApiData } from "./useApiData";
import { Post, PostQueryParams, PostStatus } from "@/types/posts";
import { PostsData, UsePostsOptions, UsePostsReturn } from "@/types/hooks";

export function usePosts({
  status = PostStatus.ALL,
  limit = 10,
  page = 1,
  search,
  sort = "publishedAt-desc", // Use backend supported format
  dependencies = [],
}: UsePostsOptions = {}): UsePostsReturn {
  const params: PostQueryParams = {
    allStatus: status === PostStatus.ALL,
    ...(status !== PostStatus.ALL && { status }),
    limit,
    page,
    ...(search && { search }),
    sort,
  };

  const { data, loading, error, refetch } = useApiData<PostsData>({
    endpoint: "/posts",
    params: params as Record<string, unknown>,
    dependencies: [status, limit, page, search, sort, ...dependencies],
    toastMessage: "Failed to load posts",
  });

  return {
    posts: data?.posts || [],
    total: data?.total || 0,
    loading,
    error,
    refetch,
  };
}

// Hook for fetching single post
export function usePost(postId: string) {
  const { data, loading, error, refetch } = useApiData<{ post: Post }>({
    endpoint: `/posts/${postId}`,
    dependencies: [postId],
    toastMessage: "Failed to load post",
  });

  return {
    post: data?.post || null,
    loading,
    error,
    refetch,
  };
}

// Hook for fetching dashboard posts data
export function useDashboardPosts() {
  const { data, loading, error, refetch } = useApiData<PostsData>({
    endpoint: "/posts",
    params: {
      limit: 10,
      allStatus: true,
      sort: "publishedAt-desc", // Use backend supported format
    } as Record<string, unknown>,
    toastMessage: "Failed to load dashboard posts",
  });

  return {
    posts: data?.posts || [],
    total: data?.total || 0,
    loading,
    error,
    refetch,
  };
}
