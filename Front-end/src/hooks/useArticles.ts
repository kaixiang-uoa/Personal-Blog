import { useQuery } from '@tanstack/react-query';
import { postApi } from '@/services/postApi';
import type { GetAllPostsParams } from '@/types';

/**
 * Hook for fetching articles using React Query
 */
export function useArticles(params: GetAllPostsParams) {
  return useQuery({
    queryKey: ['articles', params],
    queryFn: () => postApi.getAllPosts(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
} 