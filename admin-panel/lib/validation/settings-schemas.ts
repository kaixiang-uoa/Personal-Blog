import { z } from "zod"

// 通用设置验证模式
export const generalFormSchema = z.object({
  siteName: z.string().min(1, { message: "Site name cannot be empty" }),
  siteDescription: z.string(),
  siteUrl: z.string().url({ message: "Please enter a valid URL" }),
  logo: z.string(),
  favicon: z.string(),
  metaKeywords: z.string(),
})

// 文章设置验证模式
export const postsFormSchema = z.object({
  postsPerPage: z.number().int().min(1).max(100),
  defaultCategory: z.string(),
  showAuthor: z.boolean(),
  enableComments: z.boolean(),
  moderateComments: z.boolean(),
  excerptLength: z.number().int().min(10).max(1000),
})

// 外观设置验证模式
export const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  accentColor: z.string(),
  fontFamily: z.string(),
  enableRTL: z.boolean(),
  showSidebar: z.boolean(),
})

// 高级设置验证模式
export const advancedFormSchema = z.object({
  cacheTimeout: z.number().int().min(0),
  apiKey: z.string(),
  debugMode: z.boolean(),
})

// 关于页面设置验证模式
export const aboutFormSchema = z.object({
  intro: z.string().optional(),
  intro_zh: z.string().optional(),
  contact: z.object({
    email: z.string().email("请输入有效的邮箱地址").optional().or(z.literal('')),
    phone: z.string().optional().or(z.literal('')),
    location: z.string().optional().or(z.literal(''))
  }).optional().nullable(),
  skills: z.array(z.string().optional().or(z.literal(''))).optional().nullable(),
  education: z.array(z.object({
    degree: z.string().optional().or(z.literal('')),
    institution: z.string().optional().or(z.literal('')),
    year: z.string().optional().or(z.literal('')),
    description: z.string().optional().or(z.literal(''))
  })).optional().nullable(),
  experience: z.array(z.object({
    position: z.string().optional().or(z.literal('')),
    company: z.string().optional().or(z.literal('')),
    period: z.string().optional().or(z.literal('')),
    description: z.string().optional().or(z.literal(''))
  })).optional().nullable(),
  projects: z.array(z.object({
    name: z.string().optional().or(z.literal('')),
    description: z.string().optional().or(z.literal('')),
    link: z.string().optional().or(z.literal('')),
    tech: z.array(z.string().optional().or(z.literal(''))).optional().nullable()
  })).optional().nullable(),
  social: z.object({
    github: z.string().optional().or(z.literal('')),
    linkedin: z.string().optional().or(z.literal('')),
    twitter: z.string().optional().or(z.literal('')),
    website: z.string().optional().or(z.literal(''))
  }).optional().nullable()
}) 