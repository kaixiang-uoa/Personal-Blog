import { externalApi } from './api';
import type { CategoriesData, GetFallbackRouteParams } from '@/types';

export const categoryApi = {
  getAllCategories: async (params?: GetFallbackRouteParams): Promise<CategoriesData> => {
    const queryParams = new URLSearchParams();
    if (params?.lang) queryParams.append('lang', params.lang);
    const queryString = queryParams.toString();
    const url = queryString ? `/categories?${queryString}` : '/categories';
    const data = await externalApi.get<CategoriesData>(url);
    return data;
  },
};
