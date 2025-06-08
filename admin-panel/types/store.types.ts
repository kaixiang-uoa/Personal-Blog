/**
 * This file contains type definitions specifically for state management (Context/Redux).
 * 
 * Design Philosophy:
 * 1. Separation of Concerns:
 *    - Entity types (Post, Category, etc.) are defined in their respective files
 *    - State management types (State, Action, Context) are defined here
 * 
 * 2. Benefits:
 *    - Clear distinction between data structure and state management
 *    - Easier to maintain and refactor state management logic
 *    - Better type reusability across different parts of the application
 * 
 * 3. Structure:
 *    - Each entity has its own State, Action, and ContextType interfaces
 *    - State: Defines the shape of the state object
 *    - Action: Defines all possible actions for the reducer
 *    - ContextType: Defines the interface for the context provider
 */

import { Post, PostData, PostFormData } from "./post"
import { Category, CategoryFormData } from "./category"
import { Tag, TagFormData } from "./tags"
import { Media, MediaFormData } from "./media"

// Post Context Types
export interface PostState {
  posts: Post[]
  currentPost: PostData | null
  loading: boolean
  error: string | null
  filters: {
    searchQuery: string
    statusFilter: string
    sortField: keyof Post | "publishDate"
    sortDirection: "asc" | "desc"
  }
}

export type PostAction =
  | { type: "SET_POSTS"; payload: Post[] }
  | { type: "SET_CURRENT_POST"; payload: PostData | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_FILTERS"; payload: Partial<PostState["filters"]> }
  | { type: "ADD_POST"; payload: Post }
  | { type: "UPDATE_POST"; payload: Post }
  | { type: "DELETE_POST"; payload: string }

export interface PostContextType {
  state: PostState
  fetchPosts: () => Promise<void>
  fetchPost: (id: string) => Promise<void>
  createPost: (data: PostFormData) => Promise<void>
  updatePost: (id: string, data: PostFormData) => Promise<void>
  deletePost: (id: string) => Promise<void>
  setFilters: (filters: Partial<PostState["filters"]>) => void
}

// Category Context Types
export interface CategoryState {
  categories: Category[]
  currentCategory: Category | null
  loading: boolean
  error: string | null
  filters: {
    searchQuery: string
    sortField: keyof Category
    sortDirection: "asc" | "desc"
  }
}

export type CategoryAction =
  | { type: "SET_CATEGORIES"; payload: Category[] }
  | { type: "SET_CURRENT_CATEGORY"; payload: Category | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_FILTERS"; payload: Partial<CategoryState["filters"]> }
  | { type: "ADD_CATEGORY"; payload: Category }
  | { type: "UPDATE_CATEGORY"; payload: Category }
  | { type: "DELETE_CATEGORY"; payload: string }

export interface CategoryContextType {
  state: CategoryState
  fetchCategories: () => Promise<void>
  fetchCategory: (id: string) => Promise<void>
  createCategory: (data: CategoryFormData) => Promise<void>
  updateCategory: (id: string, data: CategoryFormData) => Promise<void>
  deleteCategory: (id: string) => Promise<void>
  setFilters: (filters: Partial<CategoryState["filters"]>) => void
}

// Tag Context Types
export interface TagState {
  tags: Tag[]
  currentTag: Tag | null
  loading: boolean
  error: string | null
  filters: {
    searchQuery: string
    sortField: keyof Tag
    sortDirection: "asc" | "desc"
  }
}

export type TagAction =
  | { type: "SET_TAGS"; payload: Tag[] }
  | { type: "SET_CURRENT_TAG"; payload: Tag | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_FILTERS"; payload: Partial<TagState["filters"]> }
  | { type: "ADD_TAG"; payload: Tag }
  | { type: "UPDATE_TAG"; payload: Tag }
  | { type: "DELETE_TAG"; payload: string }

export interface TagContextType {
  state: TagState
  fetchTags: () => Promise<void>
  createTag: (data: TagFormData) => Promise<void>
  updateTag: (id: string, data: TagFormData) => Promise<void>
  deleteTag: (id: string) => Promise<void>
  setFilters: (filters: Partial<TagState["filters"]>) => void
}

// Media Context Types
export interface MediaState {
  media: Media[]
  currentMedia: Media | null
  loading: boolean
  error: string | null
  filters: {
    searchQuery: string
    mimeType: string
    postId: string
    sortField: keyof Media
    sortDirection: "asc" | "desc"
  }
  uploadProgress: number
}

export type MediaAction =
  | { type: "SET_MEDIA"; payload: Media[] }
  | { type: "SET_CURRENT_MEDIA"; payload: Media | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_FILTERS"; payload: Partial<MediaState["filters"]> }
  | { type: "SET_UPLOAD_PROGRESS"; payload: number }
  | { type: "ADD_MEDIA"; payload: Media }
  | { type: "UPDATE_MEDIA"; payload: Media }
  | { type: "DELETE_MEDIA"; payload: string }

export interface MediaContextType {
  state: MediaState
  fetchMedia: () => Promise<void>
  uploadMedia: (data: MediaFormData) => Promise<void>
  updateMedia: (id: string, data: Partial<MediaFormData>) => Promise<void>
  deleteMedia: (id: string) => Promise<void>
  setFilters: (filters: Partial<MediaState["filters"]>) => void
} 