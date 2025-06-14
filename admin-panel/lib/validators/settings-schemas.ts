import { z } from "zod";

// general settings validation schema
export const generalFormSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  siteDescription: z.string(),
  siteUrl: z.string().url("Please enter a valid URL"),
  logo: z.string(),
  favicon: z.string(),
  metaKeywords: z.string(),
});

// posts settings validation schema
export const postsFormSchema = z.object({
  postsPerPage: z.number().min(1).max(100),
});

// appearance settings validation schema
export const appearanceFormSchema = z.object({
  homeBanner: z.string(),
  aboutBanner: z.string(),
  contactBanner: z.string(),
  homeBannerMobile: z.string(),
  aboutBannerMobile: z.string(),
  contactBannerMobile: z.string(),
});

//advanced settings validation schema
export const advancedFormSchema = z.object({
  cacheTimeout: z.number().min(0),
  apiKey: z.string(),
  debugMode: z.boolean(),
});

// about settings validation schema
export const aboutFormSchema = z.object({
  intro: z.string().or(z.literal("")).optional(),
  intro_zh: z.string().or(z.literal("")).optional(),

  contact: z
    .object({
      email: z
        .string()
        .email("Please enter a valid email address")
        .or(z.literal(""))
        .optional(),
      phone: z.string().or(z.literal("")).optional(),
      location: z.string().or(z.literal("")).optional(),
    })
    .optional(),

  skills: z.array(z.string()).optional(),

  education: z
    .array(
      z.object({
        degree: z.string().or(z.literal("")).optional(),
        institution: z.string().or(z.literal("")).optional(),
        year: z.string().or(z.literal("")).optional(),
        description: z.string().or(z.literal("")).optional(),
      }),
    )
    .optional(),

  experience: z
    .array(
      z.object({
        position: z.string().or(z.literal("")).optional(),
        company: z.string().or(z.literal("")).optional(),
        period: z.string().or(z.literal("")).optional(),
        description: z.string().or(z.literal("")).optional(),
      }),
    )
    .optional(),

  projects: z
    .array(
      z.object({
        name: z.string().or(z.literal("")).optional(),
        description: z.string().or(z.literal("")).optional(),
        link: z
          .string()
          .url("Please enter a valid URL")
          .or(z.literal(""))
          .optional(),
        tech: z.array(z.string()).optional(),
      }),
    )
    .optional(),

  social: z
    .object({
      github: z
        .string()
        .url("Please enter a valid GitHub URL")
        .or(z.literal(""))
        .optional(),
      linkedin: z
        .string()
        .url("Please enter a valid LinkedIn URL")
        .or(z.literal(""))
        .optional(),
      twitter: z
        .string()
        .url("Please enter a valid Twitter URL")
        .or(z.literal(""))
        .optional(),
      website: z
        .string()
        .url("Please enter a valid website URL")
        .or(z.literal(""))
        .optional(),
    })
    .optional(),
});
