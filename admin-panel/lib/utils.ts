import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { FieldItem } from "@/types"

// class name merge utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// url utility
export function ensureFullUrl(url: string | undefined | null): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `http://localhost:3001${url}`;
}

// date utility
export function formatDate(date: Date | string, locale?: string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale || 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(date: Date | string, locale?: string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString(locale || 'en-US');
}

export function formatDateTime(date: Date | string, locale?: string): string {
  return `${formatDate(date, locale)} ${formatTime(date, locale)}`;
}

// text formatting utility
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// debounce function
export function debounce<T extends (...args: any[]) => any>(
  fn: T, 
  ms: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      fn(...args);
      timeout = null;
    }, ms);
  };
}

// settings utility function
/**
 * clear empty values from settings data
 */
export function filterNonEmptyItems(items: FieldItem[] | undefined | null): FieldItem[] {
  if (!items) return [];
  return items.filter(item => {
    return Object.values(item).some(val => val && String(val).trim() !== '');
  });
}

/**
 * process about settings data, clean empty values
 */
export function processAboutData(values: any) {
  // handle nested objects that may be null or undefined
  const processedValues = {
    ...values,
    contact: values.contact || { email: '', phone: '', location: '' },
    skills: values.skills || [],
    education: values.education || [],
    experience: values.experience || [],
    projects: values.projects || [],
    social: values.social || { github: '', linkedin: '', twitter: '', website: '' }
  };

  // filter empty items in skills list
  if (processedValues.skills.length > 0) {
    processedValues.skills = processedValues.skills.filter((skill: string) => skill && skill.trim() !== '');
  }
  
  // apply filter to each field
  processedValues.education = filterNonEmptyItems(processedValues.education);
  processedValues.experience = filterNonEmptyItems(processedValues.experience);
  processedValues.projects = filterNonEmptyItems(processedValues.projects);

  // handle project tech list
  if (processedValues.projects?.length > 0) {
    processedValues.projects = processedValues.projects.map((project: any) => ({
      ...project,
      tech: project.tech ? project.tech.filter((t: string) => t && t.trim() !== '') : []
    }));
  }

  return processedValues;
}

/**
 * create a json file and trigger download
 */
export function downloadSettingsJSON(data: any, filename: string) {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * format about settings for api
 */
export function formatAboutSettingsForApi(values: any) {
  const processedValues = processAboutData(values);
  console.log('processed settings data:', processedValues);

  const formattedSettings = [
    { key: "about.intro", value: values.intro || '', group: 'about' },
    { key: "about.intro_zh", value: values.intro_zh || '', group: 'about' },
    { key: "about.contact", value: JSON.stringify(processedValues.contact), group: 'about' },
    { key: "about.skills", value: JSON.stringify(processedValues.skills), group: 'about' },
    { key: "about.education", value: JSON.stringify(processedValues.education), group: 'about' },
    { key: "about.experience", value: JSON.stringify(processedValues.experience), group: 'about' },
    { key: "about.projects", value: JSON.stringify(processedValues.projects), group: 'about' },
    { key: "about.social", value: JSON.stringify(processedValues.social), group: 'about' },
  ];

  return formattedSettings;
}
