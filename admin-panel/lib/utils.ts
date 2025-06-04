import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 确保URL使用完整的后端域名
export function ensureFullUrl(url: string | undefined | null): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `http://localhost:3001${url}`;
}
