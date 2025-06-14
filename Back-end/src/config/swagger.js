import swaggerJsdoc from "swagger-jsdoc";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Basic swagger configuration
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Personal Blog API",
      version: "1.0.0",
      description: "API documentation for Personal Blog application",
      contact: {
        name: "Admin",
        email: "admin@example.com",
      },
    },
    servers: [
      {
        url: "/api/v1",
        description: "API Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Error message",
            },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string",
                    example: "email",
                  },
                  message: {
                    type: "string",
                    example: "Must be a valid email address",
                  },
                  value: {
                    type: "string",
                    example: "invalid-email",
                  },
                },
              },
            },
          },
        },
        Post: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "5f8d0d55b54764421b7156c5",
            },
            title: {
              type: "string",
              example: "My First Blog Post",
            },
            slug: {
              type: "string",
              example: "my-first-blog-post",
            },
            excerpt: {
              type: "string",
              example: "This is a short excerpt of the blog post",
            },
            content: {
              type: "string",
              example: "This is the full content of the blog post...",
            },
            status: {
              type: "string",
              enum: ["draft", "published", "archived"],
              example: "published",
            },
            author: {
              type: "string",
              example: "5f8d0d55b54764421b7156c5",
            },
            categories: {
              type: "array",
              items: {
                type: "string",
                example: "5f8d0d55b54764421b7156c5",
              },
            },
            tags: {
              type: "array",
              items: {
                type: "string",
                example: "5f8d0d55b54764421b7156c5",
              },
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2020-10-19T10:15:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2020-10-19T10:15:00Z",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "5f8d0d55b54764421b7156c5",
            },
            username: {
              type: "string",
              example: "johndoe",
            },
            email: {
              type: "string",
              example: "john.doe@example.com",
            },
            role: {
              type: "string",
              enum: ["user", "author", "admin"],
              example: "author",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2020-10-19T10:15:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2020-10-19T10:15:00Z",
            },
          },
        },
      },
    },
  },
  apis: [
    path.join(__dirname, "../routers/*.js"),
    path.join(__dirname, "../controllers/*.js"),
  ],
};

const specs = swaggerJsdoc(options);

export default specs;
