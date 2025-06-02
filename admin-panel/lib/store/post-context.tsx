"use client"

import { createContext, useContext, useReducer, useCallback, ReactNode } from "react"
import { PostFormData } from "@/types/post"
import { PostState, PostAction, PostContextType } from "@/types/store"
import { postService } from "@/lib/services"
import { extractPostFormData } from "@/lib/utils/extractPostFormData"

// Post Context
// 该文件用于管理全局的 Post（文章）相关状态，包括获取、创建、更新、删除文章等操作。
// 通过 React Context + useReducer 实现全局状态管理，配合自定义的 postService 进行数据请求。
// 主要导出 PostProvider（用于包裹应用）和 usePost（用于在组件中访问和操作文章状态）。
// This file manages global post state (fetch, create, update, delete) using React Context + useReducer.
// It provides PostProvider and usePost for use in components.
//
// 业务数据结构转换由 extractPostFormData 工具函数负责，service 层只返回原始数据。
// Business data mapping is handled by extractPostFormData, service only returns raw data.

// Initial state
const initialState: PostState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  filters: {
    searchQuery: "",
    statusFilter: "all",
    sortField: "publishDate",
    sortDirection: "desc",
  },
}

// Reducer function
function postReducer(state: PostState, action: PostAction): PostState {
  switch (action.type) {
    case "SET_POSTS":
      return { ...state, posts: action.payload }
    case "SET_CURRENT_POST":
      return { ...state, currentPost: action.payload }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      }
    case "ADD_POST":
      return { ...state, posts: [...state.posts, action.payload] }
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      }
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      }
    default:
      return state
  }
}

// Create context
const PostContext = createContext<PostContextType | undefined>(undefined)

// Provider component
export function PostProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(postReducer, initialState)

  // Fetch all posts
  const fetchPosts = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      const response = await postService.getAll({
        search: state.filters.searchQuery,
        status: state.filters.statusFilter,
        sortField: state.filters.sortField,
        sortDirection: state.filters.sortDirection,
      })

      if (!response.data) {
        throw new Error("No data received from server")
      }

      dispatch({ type: "SET_POSTS", payload: response.data })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to fetch posts",
      })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [state.filters])

  // Fetch single post
  const fetchPost = useCallback(async (id: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      const response = await postService.getById(id)
      if (!response.data) {
        throw new Error("No data received from server")
      }

      const post = (response.data as any).post || response.data;
      const postData = extractPostFormData(post);

      dispatch({ type: "SET_CURRENT_POST", payload: postData })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to fetch post",
      })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  // Create post
  const createPost = useCallback(async (data: PostFormData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      const response = await postService.create(data)
      if (!response.data) {
        throw new Error("No data received from server")
      }
      dispatch({ type: "ADD_POST", payload: response.data })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to create post",
      })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  // Update post
  const updatePost = useCallback(async (id: string, data: PostFormData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      const response = await postService.update(id, data)
      if (!response.data) {
        throw new Error("No data received from server")
      }
      dispatch({ type: "UPDATE_POST", payload: response.data })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to update post",
      })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  // Delete post
  const deletePost = useCallback(async (id: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      await postService.delete(id)
      dispatch({ type: "DELETE_POST", payload: id })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to delete post",
      })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  // Set filters
  const setFilters = useCallback((filters: Partial<PostState["filters"]>) => {
    dispatch({ type: "SET_FILTERS", payload: filters })
  }, [])

  const value = {
    state,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    setFilters,
  }

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}

// Custom hook
export function usePost() {
  const context = useContext(PostContext)
  if (context === undefined) {
    throw new Error("usePost must be used within a PostProvider")
  }
  return context
} 