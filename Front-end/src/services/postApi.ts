import { externalApi } from './api';
import type { PostsData, PostData, GetAllPostsParams } from '@/types';

export const postApi = {
  getAllPosts: async (params?: GetAllPostsParams): Promise<PostsData> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.tagSlug) queryParams.append('tagSlug', params.tagSlug);
    if (params?.categorySlug) queryParams.append('categorySlug', params.categorySlug);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.lang) queryParams.append('lang', params.lang);
    const queryString = queryParams.toString();
    const url = queryString ? `/posts?${queryString}` : '/posts';
    const data = await externalApi.get<PostsData>(url);
    return data;
  },

  getPostBySlug: async (slug: string): Promise<PostData> => {
    const data = await externalApi.get<PostData>(`/posts/slug/${slug}`);
    return data;
  },
};
