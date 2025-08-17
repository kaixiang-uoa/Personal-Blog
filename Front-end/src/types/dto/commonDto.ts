export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  data: null;
  originalError?: import('axios').AxiosError;
}

export interface PaginationData {
  total: number;
  totalPages: number;
  currentPage: number;
  limit?: number;
}

export interface GetFallbackRouteParams {
  lang?: string;
}
