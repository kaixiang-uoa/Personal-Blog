// Common form validation schemas

import { z } from "zod"

// Common text input validation
export const textInputSchema = z.object({
  required: z.string().min(1, { message: "This field is required" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[a-z]/, { message: "Password must include lowercase letters" })
    .regex(/[A-Z]/, { message: "Password must include uppercase letters" })
    .regex(/[0-9]/, { message: "Password must include numbers" }),
  url: z.string().url({ message: "Please enter a valid URL" }),
  slug: z
    .string()
    .min(2, { message: "Slug must be at least 2 characters" })
    .regex(/^[a-z0-9-]+$/, { message: "Slug can only contain lowercase letters, numbers, and hyphens" }),
})

// Post form validation schema
export const postFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  slug: z
    .string()
    .min(2, { message: "Slug must be at least 2 characters" })
    .regex(/^[a-z0-9-]+$/, { message: "Slug can only contain lowercase letters, numbers, and hyphens" }),
  content: z.string().min(10, { message: "Content must be at least 10 characters" }),
  excerpt: z.string().optional(),
  category: z.string().min(1, { message: "Please select a category" }),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "published"]),
  publishDate: z.string().optional(),
  featuredImage: z.string().optional(),
})

// User form validation schema
export const userFormSchema = z
  .object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    role: z.enum(["admin", "editor", "author"]),
    displayName: z.string().min(2, { message: "Display name must be at least 2 characters" }),
    bio: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// Category form validation schema
export const categoryFormSchema = z.object({
  name: z.string().min(2, { message: "Category name must be at least 2 characters" }),
  slug: z
    .string()
    .min(2, { message: "Category slug must be at least 2 characters" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens",
    }),
  description: z.string().optional(),
})

// Tag form validation schema
export const tagFormSchema = z.object({
  name: z.string().min(2, { message: "Tag name must be at least 2 characters" }),
  slug: z
    .string()
    .min(2, { message: "Tag slug must be at least 2 characters" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens",
    }),
})

// Login form validation schema
export const loginFormSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().default(false),
})
