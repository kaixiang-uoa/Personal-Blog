/**
 * Post utility functions
 */

import type { Post, ApiPost } from '@/types/post.types';

/**
 * 定义ApiPost中tag的接口
 */
interface ApiTag {
  _id: string;
  name: string | { en: string; zh: string };
  slug: string;
}

/**
 * Extract post data for form structure
 * @param post Post data from API
 * @returns Formatted post data for form usage
 */
export function extractPostFormData(post: ApiPost) {
  return {
    ...post,
    categoryData: Array.isArray(post.categories) ? post.categories : [],
    originalTags: Array.isArray(post.tags) ? post.tags : [],
    displayTags: Array.isArray(post.tags) 
      ? post.tags.map((tag: ApiTag) => {
          if (typeof tag.name === 'object' && tag.name.en) {
            return tag.name.en;
          }
          return typeof tag.name === 'string' ? tag.name : '';
        }) 
      : [],
  };
}

/**
 * Format post data for display
 * @param post Post data
 * @returns Formatted post data for display
 */
export function formatPostForDisplay(post: Post) {
  return {
    ...post,
    displayDate: new Date(post.publishDate || post.createdAt).toLocaleDateString(),
    displayStatus: post.status.charAt(0).toUpperCase() + post.status.slice(1),
  };
} 