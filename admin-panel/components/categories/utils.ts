import { Category, Tag } from "@/types";

/**
 * Display name logic for categories and tags
 */
export const displayName = (item: Category | Tag) => {
  if (!item) return "";
  return item.name_en || item.name || item.name_zh || "";
};

/**
 * Get post count from category or tag
 */
export const getPostCount = (item: Category | Tag) => {
  return item.postCount || 0;
};

/**
 * Convert Category to form defaultValues structure
 */
export const getCategoryDefaultValues = (category: Category | null) => {
  if (!category) {
    return {
      name: { zh: "", en: "" },
      slug: "",
      description: { zh: "", en: "" },
    };
  }
  return {
    name: {
      zh: category.name_zh || "",
      en: category.name_en || "",
    },
    slug: category.slug || "",
    description: {
      zh: category.description_zh || category.description || "",
      en: category.description_en || category.description || "",
    },
  };
};

/**
 * Convert Tag to form defaultValues structure
 */
export const getTagDefaultValues = (tag: Tag | null) => {
  if (!tag) {
    return {
      name: { zh: "", en: "" },
      slug: "",
    };
  }
  return {
    name: {
      zh: tag.name_zh || tag.name || "",
      en: tag.name_en || tag.name || "",
    },
    slug: tag.slug || "",
  };
};

/**
 * Filter categories based on search query
 */
export const filterCategories = (
  categories: Category[],
  searchQuery: string
) => {
  return categories.filter(
    category =>
      (category.name?.toLowerCase() ?? "").includes(
        searchQuery.toLowerCase()
      ) ||
      (category.name_en?.toLowerCase() ?? "").includes(
        searchQuery.toLowerCase()
      ) ||
      (category.name_zh?.toLowerCase() ?? "").includes(
        searchQuery.toLowerCase()
      ) ||
      (category.slug?.toLowerCase() ?? "").includes(searchQuery.toLowerCase())
  );
};

/**
 * Filter tags based on search query
 */
export const filterTags = (tags: Tag[], searchQuery: string) => {
  return tags.filter(
    tag =>
      (tag.name?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()) ||
      (tag.name_en?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()) ||
      (tag.name_zh?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()) ||
      (tag.slug?.toLowerCase() ?? "").includes(searchQuery.toLowerCase())
  );
};
