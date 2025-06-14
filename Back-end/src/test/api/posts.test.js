/**
 * Posts API Integration Tests
 *
 * These tests verify the functionality of the posts API endpoints
 */

import request from "supertest";
import mongoose from "mongoose";
import { jest } from "@jest/globals";
import app from "../../app.js";
import Post from "../../models/Post.js";

describe("Posts API", () => {
  // Connect to test database before tests
  beforeAll(async () => {
    // Use a test database
    const dbUri =
      process.env.TEST_MONGODB_URI || "mongodb://localhost:27017/blog-test";
    await mongoose.connect(dbUri);
  });

  // Disconnect after all tests
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  // Clear the database between tests
  beforeEach(async () => {
    await Post.deleteMany({});
  });

  describe("GET /api/v1/posts", () => {
    it("should return an empty array when no posts exist", async () => {
      const res = await request(app)
        .get("/api/v1/posts")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.posts).toBeInstanceOf(Array);
      expect(res.body.data.posts.length).toBe(0);
      expect(res.body.data.total).toBe(0);
    });

    it("should return posts with pagination", async () => {
      // Create test posts
      await Post.create([
        {
          title: "Test Post 1",
          slug: "test-post-1",
          status: "published",
          author: new mongoose.Types.ObjectId(),
          content: "Test content 1",
        },
        {
          title: "Test Post 2",
          slug: "test-post-2",
          status: "published",
          author: new mongoose.Types.ObjectId(),
          content: "Test content 2",
        },
      ]);

      const res = await request(app)
        .get("/api/v1/posts")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.posts).toBeInstanceOf(Array);
      expect(res.body.data.posts.length).toBe(2);
      expect(res.body.data.total).toBe(2);
      expect(res.body.data.totalPages).toBe(1);
      expect(res.body.data.currentPage).toBe(1);
    });

    it("should accept pagination parameters", async () => {
      // Create test posts
      const testPosts = Array(12)
        .fill(0)
        .map((_, i) => ({
          title: `Test Post ${i + 1}`,
          slug: `test-post-${i + 1}`,
          status: "published",
          author: new mongoose.Types.ObjectId(),
          content: `Test content ${i + 1}`,
          publishedAt: new Date(2023, 0, i + 1), // Different dates for sorting
        }));

      await Post.create(testPosts);

      const res = await request(app)
        .get("/api/v1/posts?page=2&limit=5")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.posts).toBeInstanceOf(Array);
      expect(res.body.data.posts.length).toBe(5);
      expect(res.body.data.total).toBe(12);
      expect(res.body.data.totalPages).toBe(3);
      expect(res.body.data.currentPage).toBe(2);
    });

    it("should support sorting options", async () => {
      // Create test posts with different dates
      await Post.create([
        {
          title: "Oldest Post",
          slug: "oldest-post",
          status: "published",
          author: new mongoose.Types.ObjectId(),
          content: "Old content",
          publishedAt: new Date(2022, 0, 1),
        },
        {
          title: "Newest Post",
          slug: "newest-post",
          status: "published",
          author: new mongoose.Types.ObjectId(),
          content: "New content",
          publishedAt: new Date(2023, 0, 1),
        },
      ]);

      // Test default sorting (newest first)
      const res1 = await request(app).get("/api/v1/posts").expect(200);

      expect(res1.body.data.posts[0].title).toBe("Newest Post");

      // Test explicit sorting (oldest first)
      const res2 = await request(app)
        .get("/api/v1/posts?sort=publishedAt-asc")
        .expect(200);

      expect(res2.body.data.posts[0].title).toBe("Oldest Post");

      // Test named sorting parameter (oldest)
      const res3 = await request(app)
        .get("/api/v1/posts?sort=oldest")
        .expect(200);

      expect(res3.body.data.posts[0].title).toBe("Oldest Post");
    });

    it("should filter by tag slug", async () => {
      // This is a simplified test - in a real test you'd create tags and link them
      // For now we'll just verify the API accepts the parameter without error
      const res = await request(app)
        .get("/api/v1/posts?tagSlug=test-tag")
        .expect(200);

      expect(res.body.success).toBe(true);
    });

    it("should filter by category slug", async () => {
      // This is a simplified test - in a real test you'd create categories and link them
      const res = await request(app)
        .get("/api/v1/posts?categorySlug=test-category")
        .expect(200);

      expect(res.body.success).toBe(true);
    });
  });

  describe("GET /api/v1/posts/slug/:slug", () => {
    it("should return a post by slug", async () => {
      // Create a test post
      const testPost = await Post.create({
        title: "Test Post",
        slug: "test-post",
        status: "published",
        author: new mongoose.Types.ObjectId(),
        content: "Test content",
      });

      const res = await request(app)
        .get("/api/v1/posts/slug/test-post")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.post).toBeDefined();
      expect(res.body.data.post.title).toBe("Test Post");
      expect(res.body.data.post.slug).toBe("test-post");
    });

    it("should return 404 for non-existent slug", async () => {
      const res = await request(app)
        .get("/api/v1/posts/slug/non-existent")
        .expect("Content-Type", /json/)
        .expect(404);

      expect(res.body.success).toBe(false);
      expect(res.body.error).toBeDefined();
    });
  });
});
