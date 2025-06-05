import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '@/services/categoryApi';
import { tagApi } from '@/services/tagApi';

/**
 * Hook for fetching categories using React Query
 */
export function useCategories(lang: string) {
  return useQuery({
    queryKey: ['categories', lang],
    queryFn: () => categoryApi.getAllCategories({ lang }),
    staleTime: 1000 * 60 * 10, // 10 minutes - categories don't change often
  });
}

/**
 * Hook for fetching tags using React Query
 */
export function useTags(lang: string) {
  return useQuery({
    queryKey: ['tags', lang],
    queryFn: () => tagApi.getAllTags({ lang }),
    staleTime: 1000 * 60 * 10, // 10 minutes - tags don't change often
  });
} 