"use client"

import { createContext, useContext, useReducer, useCallback, ReactNode } from "react"
import { Media, MediaFormData } from "@/types/media"
import { MediaState, MediaAction, MediaContextType } from "@/types/store"
import { mediaService } from "@/lib/services"

// Initial state
const initialState: MediaState = {
  media: [],
  currentMedia: null,
  loading: false,
  error: null,
  filters: {
    searchQuery: "",
    mimeType: "",
    postId: "",
    sortField: "createdAt",
    sortDirection: "desc",
  },
  uploadProgress: 0,
}

// Reducer function
function mediaReducer(state: MediaState, action: MediaAction): MediaState {
  switch (action.type) {
    case "SET_MEDIA":
      return { ...state, media: action.payload }
    case "SET_CURRENT_MEDIA":
      return { ...state, currentMedia: action.payload }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      }
    case "SET_UPLOAD_PROGRESS":
      return { ...state, uploadProgress: action.payload }
    case "ADD_MEDIA":
      return { ...state, media: [...state.media, action.payload] }
    case "UPDATE_MEDIA":
      return {
        ...state,
        media: state.media.map((media) =>
          media._id === action.payload._id ? action.payload : media
        ),
      }
    case "DELETE_MEDIA":
      return {
        ...state,
        media: state.media.filter((media) => media._id !== action.payload),
      }
    default:
      return state
  }
}

// Create context
const MediaContext = createContext<MediaContextType | undefined>(undefined)

// Provider component
export function MediaProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(mediaReducer, initialState)

  // Fetch all media
  const fetchMedia = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      const response = await mediaService.getAll(state.filters)
      if (!response.data) {
        throw new Error("No data received from server")
      }

      dispatch({ type: "SET_MEDIA", payload: response.data })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to fetch media",
      })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [state.filters])

  // Upload media
  const uploadMedia = useCallback(async (data: MediaFormData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })
      dispatch({ type: "SET_UPLOAD_PROGRESS", payload: 0 })

      const formData = new FormData()
      formData.append("file", data.file)
      if (data.alt) formData.append("alt", data.alt)
      if (data.description) formData.append("description", data.description)

      const response = await mediaService.upload(formData, (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        dispatch({ type: "SET_UPLOAD_PROGRESS", payload: progress })
      })

      if (!response.data) {
        throw new Error("No data received from server")
      }

      dispatch({ type: "ADD_MEDIA", payload: response.data })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to upload media",
      })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
      dispatch({ type: "SET_UPLOAD_PROGRESS", payload: 0 })
    }
  }, [])

  // Update media
  const updateMedia = useCallback(async (id: string, data: Partial<MediaFormData>) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      const response = await mediaService.update(id, data)
      if (!response.data) {
        throw new Error("No data received from server")
      }

      dispatch({ type: "UPDATE_MEDIA", payload: response.data })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to update media",
      })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  // Delete media
  const deleteMedia = useCallback(async (id: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })

      await mediaService.delete(id)
      dispatch({ type: "DELETE_MEDIA", payload: id })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to delete media",
      })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  // Set filters
  const setFilters = useCallback((filters: Partial<MediaState["filters"]>) => {
    dispatch({ type: "SET_FILTERS", payload: filters })
  }, [])

  const value = {
    state,
    fetchMedia,
    uploadMedia,
    updateMedia,
    deleteMedia,
    setFilters,
  }

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
}

// Custom hook
export function useMedia() {
  const context = useContext(MediaContext)
  if (context === undefined) {
    throw new Error("useMedia must be used within a MediaProvider")
  }
  return context
} 