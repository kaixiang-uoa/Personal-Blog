"use client";
import axios, { AxiosError } from "axios";
import type {
  PostApiResponse,
  PostsApiResponse,
  CategoriesApiResponse,
  TagsApiResponse,
  ApiErrorResponse,
} from "./interface";

// --- API Base URL ---
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// --- Axios Instance ---
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get current language from URL path
const getCurrentLanguage = (): string => {
  if (typeof window !== "undefined") {
    const pathSegments = window.location.pathname.split("/");
    if (pathSegments.length > 1 && (pathSegments[1] === "en" || pathSegments[1] === "zh")) {
      return pathSegments[1];
    }
  }
  return "zh"; // default language
};

// --- Request Interceptor: Attach language to each request ---
api.interceptors.request.use(
  (config) => {
    const lang = getCurrentLanguage();
    config.params = config.params || {};
    config.params.lang = lang;
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response Interceptor: Normalize response structure ---
api.interceptors.response.use(
  (response) => {
    const data = response.data;

    if (data && typeof data === "object" && "success" in data) {
      return data;
    }

    if (data && data.posts) {
      return {
        success: true,
        data: {
          posts: data.posts,
          total: data.total || 0,
          totalPages: data.totalPages || 1,
          currentPage: data.currentPage || 1,
        },
        message: "Data fetched successfully",
      };
    }

    if (data && (data.post || data.tag || data.category)) {
      return {
        success: true,
        data: data,
        message: "Data fetched successfully",
      };
    }

    if (Array.isArray(data)) {
      return {
        success: true,
        data: { items: data },
        message: "Data fetched successfully",
      };
    }

    return {
      success: true,
      data: data,
      message: "Operation successful",
    };
  },
  (error: AxiosError): Promise<ApiErrorResponse> => {
    console.error("API Request Error:", error);

    const errorResponse: ApiErrorResponse = {
      success: false,
      data: null,
      message: "Service temporarily unavailable",
      originalError: error,
    };

    if (error.response?.data && typeof error.response.data === "object") {
      const responseData = error.response.data as Record<string, unknown>;
      if (typeof responseData.message === "string") {
        errorResponse.message = responseData.message;
      }
    }

    if (error.response?.status) {
      const statusCode = error.response.status;
      if (statusCode === 404) {
        errorResponse.message = "Resource not found";
      } else if (statusCode === 401) {
        errorResponse.message = "Unauthorized access";
      } else if (statusCode === 403) {
        errorResponse.message = "Forbidden operation";
      } else if (statusCode >= 500) {
        errorResponse.message = "Server error. Please try again later.";
      }
    }

    return Promise.reject(errorResponse);
  }
);

// Posts API
export const postApi = {
  getAllPosts: async (
    page = 1,
    limit = 10,
    tag = "",
    category = "",
    search = "",
    sort = "",
    lang = ""
  ): Promise<PostsApiResponse> => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (tag) params.append("tagSlug", tag);
    if (category) params.append("categorySlug", category);
    if (search) params.append("search", search);
    if (sort) params.append("sort", sort);
    if (lang) params.append("lang", lang);

    const response = await api.get<PostsApiResponse>(`/posts?${params.toString()}`);
    return response.data;
  },

  getPostBySlug: async (slug: string, lang = ""): Promise<PostApiResponse> => {
    const params = new URLSearchParams();
    if (lang) params.append("lang", lang);
    const queryString = params.toString() ? `?${params.toString()}` : "";

    const response = await api.get<PostApiResponse>(
      `/posts/slug/${encodeURIComponent(slug)}${queryString}`
    );
    return response.data;
  },
};

// Categories API
export const categoryApi = {
  getAllCategories: async (lang = ""): Promise<CategoriesApiResponse> => {
    const params = new URLSearchParams();
    if (lang) params.append("lang", lang);
    const queryString = params.toString() ? `?${params.toString()}` : "";

    const response = await api.get<CategoriesApiResponse>(`/categories${queryString}`);
    return response.data;
  },
};

// Tags API
export const tagApi = {
  getAllTags: async (lang = ""): Promise<TagsApiResponse> => {
    const params = new URLSearchParams();
    if (lang) params.append("lang", lang);
    const queryString = params.toString() ? `?${params.toString()}` : "";

    const response = await api.get<TagsApiResponse>(`/tags${queryString}`);
    return response.data;
  },
};
