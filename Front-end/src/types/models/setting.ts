/**
 * Contact information interface
 */
export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  location?: string;
}

/**
 * Education item interface
 */
export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

/**
 * Experience item interface
 */
export interface ExperienceItem {
  position: string;
  company: string;
  period: string;
  description?: string;
}

/**
 * Project item interface
 */
export interface ProjectItem {
  name: string;
  description: string;
  link?: string;
  tech: string[];
}

/**
 * Social media links interface
 */
export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
}

/**
 * setting item interface definition
 */
export interface SettingItem {
  key: string;
  value: string | number | boolean | object | null;
  group?: string;
}

/**
 * setting data type
 * can be object or array
 */
export type Settings = Record<string, string | number | boolean | object | null> | SettingItem[];

export interface AboutData {
  intro: string;
  contact: ContactInfo;
  skills: string[];
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  social: SocialLinks;
}
