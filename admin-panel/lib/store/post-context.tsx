"use client"

import { createContext, useContext, useReducer, useCallback, ReactNode } from "react"
import { Post, PostData, PostFormData } from "@/types/post"
import { PostState, PostAction, PostContextType } from "@/types/store"
import { postService } from "@/lib/services"

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

      // Convert Post to PostData
      const postData: PostData = {
        ...response.data,
        categoryData: [], // This will be populated by the API
        displayTags: response.data.tags,
        originalTags: [], // This will be populated by the API
      }

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