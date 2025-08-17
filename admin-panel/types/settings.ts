import { z } from "zod";

import {
  generalFormSchema,
  postsFormSchema,
  appearanceFormSchema,
  aboutFormSchema,
  advancedFormSchema,
} from "@/lib/validators/settings-schemas";

// Raw API response types
export interface RawSettingValue {
  key: string;
  value: string;
  group: string;
  description?: string;
}

export interface SettingsResponse {
  [key: string]: string | null;
}

// Processed settings types
export interface Settings {
  general?: {
    siteName: string;
    siteDescription: string;
    siteUrl: string;
    logo: string;
    favicon: string;
    metaKeywords: string;
  };
  posts?: {
    postsPerPage: number;
  };
  appearance?: {
    homeBanner: string;
    aboutBanner: string;
    contactBanner: string;
    homeBannerMobile: string;
    aboutBannerMobile: string;
    contactBannerMobile: string;
  };
  about?: {
    intro: string;
    intro_zh: string;
    contact: {
      email: string;
      phone: string;
      location: string;
    };
    skills: string[];
    education: any[];
    experience: any[];
    projects: any[];
    social: {
      github: string;
      linkedin: string;
      twitter: string;
      website: string;
    };
  };
  // system?: {
  //   // Future system settings will be added here
  // };
}

export interface AboutSettings {
  intro: string;
  intro_zh: string;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  skills: string[];
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    description: string;
  }>;
  experience: Array<{
    position: string;
    company: string;
    period: string;
    description: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    link: string;
    tech: string[];
  }>;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
  };
}

export interface FieldItem {
  [key: string]: any;
}

export interface AboutFormData {
  intro?: string;
  intro_zh?: string;
  contact?: AboutSettings["contact"];
  skills?: AboutSettings["skills"];
  education?: AboutSettings["education"];
  experience?: AboutSettings["experience"];
  projects?: AboutSettings["projects"];
  social?: AboutSettings["social"];
}

export interface Setting {
  _id: string;
  key: string;
  value: any;
  group: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SettingFormData {
  key: string;
  value: any;
  group: string;
  description?: string;
}

// Form Props Interfaces
export interface BaseSettingsFormProps {
  loading: boolean;
  isSaving: boolean;
}

export interface GeneralSettingsFormProps extends BaseSettingsFormProps {
  defaultValues: z.infer<typeof generalFormSchema>;
  onSubmit: (values: z.infer<typeof generalFormSchema>) => Promise<void>;
}

export interface PostsSettingsFormProps extends BaseSettingsFormProps {
  defaultValues: z.infer<typeof postsFormSchema>;
  onSubmit: (values: z.infer<typeof postsFormSchema>) => Promise<void>;
}

export interface AppearanceSettingsFormProps extends BaseSettingsFormProps {
  defaultValues: z.infer<typeof appearanceFormSchema>;
  onSubmit: (values: z.infer<typeof appearanceFormSchema>) => Promise<void>;
}

export interface AboutSettingsFormProps extends BaseSettingsFormProps {
  defaultValues: AboutFormData;
  onSubmit: (values: AboutFormData) => Promise<void>;
}

export interface BannerImageSelectorProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
}

// About form section props
export interface AboutFormSectionProps {
  form: any; // Will be properly typed when we implement proper form typing
  loading?: boolean;
}

// Individual item component props
export interface AboutEducationItemProps {
  form: any;
  index: number;
  onRemove: (index: number) => void;
}

export interface AboutExperienceItemProps {
  form: any;
  index: number;
  onRemove: (index: number) => void;
}

export interface AboutProjectItemProps {
  form: any;
  index: number;
  onRemove: (index: number) => void;
}
