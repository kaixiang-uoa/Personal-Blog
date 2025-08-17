import type { TagsData } from '@/types';
import { externalApi } from './api';
import type { GetFallbackRouteParams } from '@/types';

export const tagApi = {
  getAllTags: async (params?: GetFallbackRouteParams): Promise<TagsData> => {
    const queryParams = new URLSearchParams();
    if (params?.lang) queryParams.append('lang', params.lang);
    const queryString = queryParams.toString();
    const url = queryString ? `/tags?${queryString}` : '/tags';
    const data = await externalApi.get<TagsData>(url);
    return data;
  },
};
