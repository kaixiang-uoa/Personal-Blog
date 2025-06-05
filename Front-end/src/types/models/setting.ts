/**
 * setting item interface definition
 */
export interface SettingItem {
  key: string;
  value: any;
  group?: string;
}

/**
 * setting data type
 * can be object or array
 */
export type Settings = Record<string, any> | SettingItem[]; 

export interface AboutData {
  intro: string;
  contact: any;
  skills: string[];
  education: any[];
  experience: any[];
  projects: any[];
  social: any;
}