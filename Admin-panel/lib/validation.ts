// 通用表单验证模式

import { z } from "zod"

// 通用的文字输入验证
export const textInputSchema = z.object({
  required: z.string().min(1, { message: "此字段不能为空" }),
  name: z.string().min(2, { message: "名称至少需要2个字符" }),
  title: z.string().min(5, { message: "标题至少需要5个字符" }),
  description: z.string().optional(),
  email: z.string().email({ message: "请输入有效的电子邮件地址" }),
  password: z
    .string()
    .min(8, { message: "密码至少需要8个字符" })
    .regex(/[a-z]/, { message: "密码需要包含小写字母" })
    .regex(/[A-Z]/, { message: "密码需要包含大写字母" })
    .regex(/[0-9]/, { message: "密码需要包含数字" }),
  url: z.string().url({ message: "请输入有效的URL" }),
  slug: z
    .string()
    .min(2, { message: "别名至少需要2个字符" })
    .regex(/^[a-z0-9-]+$/, { message: "别名只能包含小写字母、数字和连字符" }),
})

// 文章表单验证模式
export const postFormSchema = z.object({
  title: z.string().min(5, { message: "标题至少需要5个字符" }),
  slug: z
    .string()
    .min(2, { message: "别名至少需要2个字符" })
    .regex(/^[a-z0-9-]+$/, { message: "别名只能包含小写字母、数字和连字符" }),
  content: z.string().min(10, { message: "内容至少需要10个字符" }),
  excerpt: z.string().optional(),
  category: z.string().min(1, { message: "请选择分类" }),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "published"]),
  publishDate: z.string().optional(),
  featuredImage: z.string().optional(),
})

// 用户表单验证模式
export const userFormSchema = z
  .object({
    username: z.string().min(3, { message: "用户名至少需要3个字符" }),
    email: z.string().email({ message: "请输入有效的电子邮件地址" }),
    password: z.string().min(8, { message: "密码至少需要8个字符" }),
    confirmPassword: z.string(),
    role: z.enum(["admin", "editor", "author"]),
    displayName: z.string().min(2, { message: "显示名称至少需要2个字符" }),
    bio: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不匹配",
    path: ["confirmPassword"],
  })

// 分类表单验证模式
export const categoryFormSchema = z.object({
  name: z.string().min(2, { message: "分类名称不能少于2个字符" }),
  slug: z
    .string()
    .min(2, { message: "分类别名不能少于2个字符" })
    .regex(/^[a-z0-9-]+$/, {
      message: "别名只能包含小写字母、数字和连字符",
    }),
  description: z.string().optional(),
})

// 标签表单验证模式
export const tagFormSchema = z.object({
  name: z.string().min(2, { message: "标签名称不能少于2个字符" }),
  slug: z
    .string()
    .min(2, { message: "标签别名不能少于2个字符" })
    .regex(/^[a-z0-9-]+$/, {
      message: "别名只能包含小写字母、数字和连字符",
    }),
})

// 登录表单验证模式
export const loginFormSchema = z.object({
  username: z.string().min(3, { message: "用户名不能少于3个字符" }),
  password: z.string().min(6, { message: "密码不能少于6个字符" }),
  rememberMe: z.boolean().default(false),
})
