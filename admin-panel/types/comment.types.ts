/**
 * Comment model
 */
export interface Comment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  authorName: string;
  authorEmail?: string;
  authorAvatar?: string;
  createdAt: string;
  updatedAt: string;
  status: 'approved' | 'pending' | 'rejected';
  parentId?: string;
  replies?: Comment[];
}

/**
 * Comment form data
 */
export interface CommentFormData {
  content: string;
  postId: string;
  authorName?: string;
  authorEmail?: string;
  parentId?: string;
}

/**
 * Comment query parameters
 */
export interface CommentQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  sort?: string;
  search?: string;
}

/**
 * Comment list response
 */
export interface CommentListResponse {
  success: boolean;
  message?: string;
  data: {
    comments: Comment[];
    total: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
} 