import { useQuery } from '@tanstack/react-query';
import { postApi } from '@/services/postApi';

/**
 * Hook for fetching a single article by slug using React Query
 */
export function useArticle(slug: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: () => postApi.getPostBySlug(slug),
    enabled, // 允许控制查询是否启用
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
} 