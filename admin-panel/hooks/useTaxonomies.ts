import { useApiData } from "./useApiData";
import { Category, Tag } from "@/types";
import { UseTaxonomiesReturn } from "@/types/hooks";

export function useTaxonomies(): UseTaxonomiesReturn {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useApiData<{ categories: Category[] }>({
    endpoint: "/categories",
    showToast: false,
  });

  const {
    data: tagsData,
    loading: tagsLoading,
    error: tagsError,
    refetch: refetchTags,
  } = useApiData<{ tags: Tag[] }>({
    endpoint: "/tags",
    showToast: false,
  });

  const refetch = async () => {
    await Promise.all([refetchCategories(), refetchTags()]);
  };

  return {
    categories: categoriesData?.categories || [],
    tags: tagsData?.tags || [],
    loading: categoriesLoading || tagsLoading,
    error: categoriesError || tagsError,
    refetch,
  };
}

// Hook for fetching categories only
export function useCategories() {
  const { data, loading, error, refetch } = useApiData<{
    categories: Category[];
  }>({
    endpoint: "/categories",
    toastMessage: "Failed to load categories",
  });

  return {
    categories: data?.categories || [],
    loading,
    error,
    refetch,
  };
}

// Hook for fetching tags only
export function useTags() {
  const { data, loading, error, refetch } = useApiData<{ tags: Tag[] }>({
    endpoint: "/tags",
    toastMessage: "Failed to load tags",
  });

  return {
    tags: data?.tags || [],
    loading,
    error,
    refetch,
  };
}
