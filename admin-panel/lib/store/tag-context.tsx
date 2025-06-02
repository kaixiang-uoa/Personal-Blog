"use client"

import { createContext, useContext, useReducer, useCallback, ReactNode } from "react"
import { Tag, TagFormData } from "@/types/tags"
import { TagState, TagAction, TagContextType } from "@/types/store"
import { tagService } from "@/lib/services"

// Initial state
const initialState: TagState = {
  tags: [],
  currentTag: null,
  loading: false,
  error: null,
  filters: {
    searchQuery: "",
    sortField: "name",
    sortDirection: "asc",
  },
}

// Reducer function
function tagReducer(state: TagState, action: TagAction): TagState {
  switch (action.type) {
    case "SET_TAGS":
      return { ...state, tags: action.payload }
    case "SET_CURRENT_TAG":
      return { ...state, currentTag: action.payload }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      }
    case "ADD_TAG":
      return { ...state, tags: [...state.tags, action.payload] }
    case "UPDATE_TAG":
      return {
        ...state,
        tags: state.tags.map((tag) =>
          tag._id === action.payload._id ? action.payload : tag
        ),
      }
    case "DELETE_TAG":
      return {
        ...state,
        tags: state.tags.filter((tag) => tag._id !== action.payload),
      }
    default:
      return state
  }
}

// Create context
const TagContext = createContext<TagContextType | undefined>(undefined)

// Provider component
export function TagProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tagReducer, initialState)

  // Fetch all tags
  const fetchTags = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      const response = await tagService.getAll()
      if (!response.data) {
        throw new Error("No data received from server")
      }

      // 处理API返回的嵌套结构
      const tagsData = Array.isArray(response.data) 
        ? response.data 
        : (response.data as any).tags || [];
      
      dispatch({ type: "SET_TAGS", payload: tagsData })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to fetch tags",
      })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  // Create tag
  const createTag = useCallback(async (data: TagFormData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      // 转换为API需要的结构
      const apiData = {
        name: data.name.en,
        name_zh: data.name.zh,
        name_en: data.name.en,
        slug: data.slug
      };

      const response = await tagService.create(apiData)
      if (!response.data) {
        throw new Error("No data received from server")
      }
      // 从嵌套结构中提取tag对象
      const tag = (response.data as any).tag || response.data;
      dispatch({ type: "ADD_TAG", payload: tag })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to create tag",
      })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  // Update tag
  const updateTag = useCallback(async (id: string, data: TagFormData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      // 转换为API需要的结构
      const apiData = {
        name: data.name.en,
        name_zh: data.name.zh,
        name_en: data.name.en,
        slug: data.slug
      };

      const response = await tagService.update(id, apiData)
      if (!response.data) {
        throw new Error("No data received from server")
      }
      // 如果响应是嵌套结构，提取tag对象
      const tag = (response.data as any).tag || response.data;
      dispatch({ type: "UPDATE_TAG", payload: tag })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to update tag",
      })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  // Delete tag
  const deleteTag = useCallback(async (id: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      await tagService.delete(id)
      dispatch({ type: "DELETE_TAG", payload: id })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to delete tag",
      })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  // Set filters
  const setFilters = useCallback((filters: Partial<TagState["filters"]>) => {
    dispatch({ type: "SET_FILTERS", payload: filters })
  }, [])

  const value = {
    state,
    fetchTags,
    createTag,
    updateTag,
    deleteTag,
    setFilters,
  }

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>
}

// Custom hook
export function useTag() {
  const context = useContext(TagContext)
  if (context === undefined) {
    throw new Error("useTag must be used within a TagProvider")
  }
  return context
} 