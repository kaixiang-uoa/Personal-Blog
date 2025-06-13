/**
 * Form validation schemas for the admin panel
 * Contains all form validation rules using Zod
 */

import { z } from "zod"

// ===== Common Input Validation =====
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

// ===== Content Management Validation =====
export const postFormSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  tagObjects: z.any().optional(),
  status: z.enum(["draft", "published", "archived"]),
  publishDate: z.string().optional(),
  featuredImage: z.string().optional(),
}).refine(data => {
  // only validate required fields in published state
  if (data.status === "published") {
    const hasTitleAndContent = !!data.title && !!data.content;
    return hasTitleAndContent;
  }
  return true;
}, {
  message: "Published posts require title and content",
  path: ["status"]
});

export const categoryFormSchema = z.object({
  name: z.object({
    zh: z.string().min(2, { message: "Category name (Chinese) must be at least 2 characters" }),
    en: z.string().min(2, { message: "Category name (English) must be at least 2 characters" })
  }),
  slug: z
    .string()
    .min(2, { message: "Category slug must be at least 2 characters" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens",
    }),
  description: z.object({
    zh: z.string().optional(),
    en: z.string().optional()
  }).optional(),
})

export const tagFormSchema = z.object({
  name: z.object({
    zh: z.string().min(2, { message: "Tag name (Chinese) must be at least 2 characters" }),
    en: z.string().min(2, { message: "Tag name (English) must be at least 2 characters" })
  }),
  slug: z
    .string()
    .min(2, { message: "Tag slug must be at least 2 characters" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens",
    }),
})

// ===== User Management Validation =====
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

export const loginFormSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().default(false),
})

// ===== Type Exports =====
export type TextInputSchema = z.infer<typeof textInputSchema>
export type PostFormSchema = z.infer<typeof postFormSchema>
export type UserFormSchema = z.infer<typeof userFormSchema>
export type CategoryFormSchema = z.infer<typeof categoryFormSchema>
export type TagFormSchema = z.infer<typeof tagFormSchema>
export type LoginFormSchema = z.infer<typeof loginFormSchema>
