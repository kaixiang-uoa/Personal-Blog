// 设置数据类型
export interface Settings {
  general: {
    siteName: string
    siteDescription: string
    siteUrl: string
    logo: string
    favicon: string
    metaKeywords: string
  }
  posts: {
    postsPerPage: number
    defaultCategory: string
    showAuthor: boolean
    enableComments: boolean
    moderateComments: boolean
    excerptLength: number
  }
  appearance: {
    theme: "light" | "dark" | "system"
    accentColor: string
    fontFamily: string
    enableRTL: boolean
    showSidebar: boolean
  }
  advanced: {
    cacheTimeout: number
    apiKey: string
    debugMode: boolean
  }
  about: {
    intro: string
    intro_zh: string
    contact: string
    skills: string
    education: string
    experience: string
    projects: string
    social: string
  }
}

// 表单项类型
export interface FieldItem {
  [key: string]: any;
}

// 表单相关类型
export interface AboutFormData {
  intro?: string
  intro_zh?: string
  contact?: {
    email: string
    phone: string
    location: string
  } | null
  skills?: string[] | null
  education?: Array<{
    degree: string
    institution: string
    year: string
    description: string
  }> | null
  experience?: Array<{
    position: string
    company: string
    period: string
    description: string
  }> | null
  projects?: Array<{
    name: string
    description: string
    link: string
    tech?: string[] | null
  }> | null
  social?: {
    github: string
    linkedin: string
    twitter: string
    website: string
  } | null
} 