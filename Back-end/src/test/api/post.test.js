/**
 * post API test
 */

import { request, createUserAndGetToken } from '../setup.js';
import { generatePostData } from '../testUtils.js';
import mongoose from 'mongoose';

describe('Post API', () => {
  let token;
  let userId;
  
  beforeAll(async () => {
    // create test user and get token
    const auth = await createUserAndGetToken();
    token = auth.token;
    userId = auth.userId;
  });
  
  describe('POST /api/v1/posts', () => {
    it('should create a new post', async () => {
      const postData = generatePostData({ author: userId });
      
      const response = await request
        .post('/api/v1/posts')
        .set('Authorization', `Bearer ${token}`)
        .send(postData);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('post');
      expect(response.body.post).toHaveProperty('title', postData.title);
      expect(response.body.post).toHaveProperty('content', postData.content);
      expect(response.body.post).toHaveProperty('author');
    });
    
    it('should return 400 if required fields are missing', async () => {
      const response = await request
        .post('/api/v1/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'published' }); // missing title and content
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
    });
    
    it('should return 401 if not authenticated', async () => {
      const postData = generatePostData();
      
      const response = await request
        .post('/api/v1/posts')
        .send(postData);
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('success', false);
    });
  });
  
  describe('GET /api/v1/posts', () => {
    beforeEach(async () => {
      // create several test posts
      for (let i = 0; i < 3; i++) {
        await request
          .post('/api/v1/posts')
          .set('Authorization', `Bearer ${token}`)
          .send(generatePostData({ author: userId }));
      }
    });
    
    it('should get a list of posts', async () => {
      const response = await request.get('/api/v1/posts');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('posts');
      expect(Array.isArray(response.body.posts)).toBe(true);
      expect(response.body.posts.length).toBeGreaterThan(0);
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('totalPages');
      expect(response.body).toHaveProperty('currentPage');
    });
    
    it('should paginate posts correctly', async () => {
      const response = await request.get('/api/v1/posts?page=1&limit=2');
      
      expect(response.status).toBe(200);
      expect(response.body.posts.length).toBeLessThanOrEqual(2);
      expect(response.body).toHaveProperty('currentPage', 1);
    });
    
    it('should filter posts by status', async () => {
      // create a draft post
      await request
        .post('/api/v1/posts')
        .set('Authorization', `Bearer ${token}`)
        .send(generatePostData({ 
          author: userId,
          status: 'draft'
        }));
      
      // query published posts
      const publishedResponse = await request.get('/api/v1/posts?status=published');
      expect(publishedResponse.status).toBe(200);
      
      // all published posts should have status published
      publishedResponse.body.posts.forEach(post => {
        expect(post.status).toBe('published');
      });
      
      // query draft post (requires authentication)
      const draftResponse = await request
        .get('/api/v1/posts?status=draft')
        .set('Authorization', `Bearer ${token}`);
      
      expect(draftResponse.status).toBe(200);
      
      // confirm draft post is found
      expect(draftResponse.body.posts.some(post => post.status === 'draft')).toBe(true);
    });
  });
  
  describe('GET /api/v1/posts/:id', () => {
    let postId;
    
    beforeEach(async () => {
      // create a test post
      const postData = generatePostData({ author: userId });
      const response = await request
        .post('/api/v1/posts')
        .set('Authorization', `Bearer ${token}`)
        .send(postData);
      
      postId = response.body.post._id;
    });
    
    it('should get a post by ID', async () => {
      const response = await request.get(`/api/v1/posts/${postId}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('post');
      expect(response.body.post).toHaveProperty('_id', postId);
    });
    
    it('should return 404 if post not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request.get(`/api/v1/posts/${fakeId}`);
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('success', false);
    });
  });
}); 