import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { postApi } from '@/services/postApi';
import type { GetAllPostsParams, PostsData } from '@/types';

/**
 * Hook for fetching articles using React Query
 *
 * @param params - Query parameters for fetching articles
 * @param options - Additional React Query options
 * @returns Query result containing articles data, loading state, and error information
 */
export function useArticles(
  params: GetAllPostsParams,
  options?: Omit<UseQueryOptions<PostsData, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<PostsData, Error>({
    queryKey: ['articles', params],
    queryFn: async () => {
      try {
        return await postApi.getAllPosts(params);
      } catch (error) {
        // convert error to a more descriptive error object
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Failed to fetch articles. Please try again later.');
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2, // retry 2 times if failed
    // allow to pass in additional query options
    ...options,
  });
}
