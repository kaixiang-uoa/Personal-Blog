/**
 * Post Service Test Suite
 */
import { postService } from '../post-service';
import { apiClient } from '../api-client';
import { PostStatus } from '@/types/post.types';

// Mock API client
jest.mock('../api-client', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('Post Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should fetch all posts and return paginated results', async () => {
      // Mock successful response
      const mockResponse = {
        success: true,
        message: 'Posts retrieved successfully',
        data: {
          posts: [
            { id: '1', title: 'Post 1' },
            { id: '2', title: 'Post 2' },
          ],
          total: 2,
          currentPage: 1,
          totalPages: 1,
        },
      };

      // Setup mock
      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      // Call the service
      const result = await postService.getAll({ page: 1 });

      // Assertions
      expect(apiClient.get).toHaveBeenCalledWith('/posts', { params: { page: 1 } });
      expect(result).toEqual({
        success: true,
        message: 'Posts retrieved successfully',
        data: [
          { id: '1', title: 'Post 1' },
          { id: '2', title: 'Post 2' },
        ],
        pagination: {
          total: 2,
          page: 1,
          limit: 20,
          pages: 1,
        },
      });
    });

    it('should handle errors when fetching posts', async () => {
      // Mock error
      const mockError = new Error('Network error');
      (apiClient.get as jest.Mock).mockRejectedValue(mockError);

      // Call service and expect it to throw
      await expect(postService.getAll()).rejects.toThrow('Network error');
      expect(apiClient.get).toHaveBeenCalledWith('/posts', { params: undefined });
    });
  });

  describe('getById', () => {
    it('should fetch a post by id', async () => {
      // Mock successful response
      const mockResponse = {
        data: {
          id: '1',
          title: 'Post 1',
          content: 'Content 1',
        },
      };

      // Setup mock
      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      // Call the service
      const result = await postService.getById('1');

      // Assertions
      expect(apiClient.get).toHaveBeenCalledWith('/posts/1', { params: { lang: 'en' } });
      expect(result).toEqual({
        success: true,
        data: {
          id: '1',
          title: 'Post 1',
          content: 'Content 1',
        },
      });
    });
  });

  describe('create', () => {
    it('should create a new post', async () => {
      // Mock successful response
      const mockResponse = {
        success: true,
        data: {
          id: '1',
          title: 'New Post',
          content: 'New Content',
          status: 'draft',
          featured: false,
        },
      };

      // Setup mock
      (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);

      // Post data with required fields
      const postData = {
        title: 'New Post',
        content: 'New Content',
        status: PostStatus.DRAFT,
        featured: false,
      };

      // Call the service
      const result = await postService.create(postData);

      // Assertions
      expect(apiClient.post).toHaveBeenCalledWith('/posts', postData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should update an existing post', async () => {
      // Mock successful response
      const mockResponse = {
        success: true,
        data: {
          id: '1',
          title: 'Updated Post',
          content: 'Updated Content',
          status: 'published',
          featured: true,
        },
      };

      // Setup mock
      (apiClient.put as jest.Mock).mockResolvedValue(mockResponse);

      // Post data with required fields
      const postData = {
        title: 'Updated Post',
        content: 'Updated Content',
        status: PostStatus.PUBLISHED,
        featured: true,
      };

      // Call the service
      const result = await postService.update('1', postData);

      // Assertions
      expect(apiClient.put).toHaveBeenCalledWith('/posts/1', postData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('delete', () => {
    it('should delete a post', async () => {
      // Mock successful response
      const mockResponse = {
        success: true,
      };

      // Setup mock
      (apiClient.delete as jest.Mock).mockResolvedValue(mockResponse);

      // Call the service
      const result = await postService.delete('1');

      // Assertions
      expect(apiClient.delete).toHaveBeenCalledWith('/posts/1');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getDashboardStats', () => {
    it('should return dashboard statistics', async () => {
      // Mock successful responses
      const mockPostsResponse = {
        data: {
          total: 10,
        },
      };
      
      const mockCategoriesResponse = {
        data: {
          total: 5,
        },
      };

      // Setup mocks for both API calls
      (apiClient.get as jest.Mock)
        .mockResolvedValueOnce(mockPostsResponse)
        .mockResolvedValueOnce(mockCategoriesResponse);

      // Call the service
      const result = await postService.getDashboardStats();

      // Assertions
      expect(apiClient.get).toHaveBeenCalledTimes(2);
      expect(apiClient.get).toHaveBeenCalledWith('/posts?limit=1&count=true');
      expect(apiClient.get).toHaveBeenCalledWith('/categories?limit=1&count=true');
      
      expect(result).toEqual({
        success: true,
        data: {
          postCount: 10,
          categoryCount: 5,
          viewCount: 0,
        },
      });
    });

    it('should handle errors when fetching dashboard stats', async () => {
      // Mock error
      const mockError = new Error('Network error');
      (apiClient.get as jest.Mock).mockRejectedValue(mockError);

      // Call the service
      const result = await postService.getDashboardStats();

      // Should return default values on error
      expect(result).toEqual({
        success: false,
        message: 'Network error',
        data: {
          postCount: 0,
          categoryCount: 0,
          viewCount: 0,
        },
      });
    });
  });
}); 