"use client"

import { createContext, useContext, useReducer, useCallback, ReactNode } from "react"
import { Category, CategoryFormData, CategoryApiData } from "@/types/category"
import { CategoryState, CategoryAction, CategoryContextType } from "@/types/store"
import { categoryService } from "@/lib/services"

// Initial state
const initialState: CategoryState = {
  categories: [],
  currentCategory: null,
  loading: false,
  error: null,
  filters: {
    searchQuery: "",
    sortField: "name",
    sortDirection: "asc",
  },
}

// Reducer function
function categoryReducer(state: CategoryState, action: CategoryAction): CategoryState {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload }
    case "SET_CURRENT_CATEGORY":
      return { ...state, currentCategory: action.payload }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      }
    case "ADD_CATEGORY":
      return { ...state, categories: [...state.categories, action.payload] }
    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        ),
      }
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((category) => category._id !== action.payload),
      }
    default:
      return state
  }
}

// Create context
const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

// Provider component
export function CategoryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(categoryReducer, initialState)

  // Fetch all categories
  const fetchCategories = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      const response = await categoryService.getAll({
        searchQuery: state.filters.searchQuery,
        sortField: state.filters.sortField,
        sortDirection: state.filters.sortDirection,
      })
      
      if (!response.data) {
        throw new Error("No data received from server")
      }

      // 处理API返回的嵌套结构
      const categoriesData = Array.isArray(response.data) 
        ? response.data 
        : (response.data as any).categories || [];
      
      dispatch({ type: "SET_CATEGORIES", payload: categoriesData })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to fetch categories",
      })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [state.filters])

  // Fetch single category
  const fetchCategory = useCallback(async (id: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      const response = await categoryService.getById(id)
      if (!response.data) {
        throw new Error("No data received from server")
      }

      dispatch({ type: "SET_CURRENT_CATEGORY", payload: response.data })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to fetch category",
      })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  // Create category
  const createCategory = useCallback(async (data: CategoryFormData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      const apiData: CategoryApiData = {
        name: data.name.en,
        name_zh: data.name.zh,
        name_en: data.name.en,
        slug: data.slug,
        description: data.description?.en || '',
        description_zh: data.description?.zh || '',
        description_en: data.description?.en || '',
      };

      const response = await categoryService.create(apiData)
      if (!response.data) {
        throw new Error("No data received from server")
      }
      dispatch({ type: "ADD_CATEGORY", payload: response.data.category })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to create category",
      })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  // Update category
  const updateCategory = useCallback(async (id: string, data: CategoryFormData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      // 转换为API需要的结构
      const apiData: CategoryApiData = {
        name: data.name.en,
        name_zh: data.name.zh,
        name_en: data.name.en,
        slug: data.slug,
        description: data.description?.en || '',
        description_zh: data.description?.zh || '',
        description_en: data.description?.en || '',
      };

      const response = await categoryService.update(id, apiData)
      if (!response.data) {
        throw new Error("No data received from server")
      }
      // 确保使用 response.data.category
      dispatch({ type: "UPDATE_CATEGORY", payload: response.data })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to update category",
      })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  // Delete category
  const deleteCategory = useCallback(async (id: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      await categoryService.delete(id)
      dispatch({ type: "DELETE_CATEGORY", payload: id })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to delete category",
      })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  // Set filters
  const setFilters = useCallback((filters: Partial<CategoryState["filters"]>) => {
    dispatch({ type: "SET_FILTERS", payload: filters })
  }, [])

  const value = {
    state,
    fetchCategories,
    fetchCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    setFilters,
  }

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>
}

// Custom hook
export function useCategory() {
  const context = useContext(CategoryContext)
  if (context === undefined) {
    throw new Error("useCategory must be used within a CategoryProvider")
  }
  return context
} 