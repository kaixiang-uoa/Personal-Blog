import { FieldValues } from "react-hook-form";
import { z } from "zod";

export interface I18nString {
  zh: string;
  en: string;
}

export interface ComboboxSelectProps<T> {
  items: T[];
  selectedItems: T[];
  onSelect: (item: T) => void;
  onCreate?: (name: string) => Promise<T>;
  multiple?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  label?: string;
  disabled?: boolean;
  width?: number | string;
  className?: string;
  getItemLabel: (item: T) => string | I18nString;
  getItemValue: (item: T) => string;
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "checkbox";
  placeholder?: string;
  isI18n?: boolean;  // 是否支持多语言
  options?: { label: string; value: string }[];
}

export interface EntityFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  defaultValues?: any;
  schema: z.ZodType<any>;
  onSubmit: (values: any) => Promise<void>;
  fields: FormField[];
  loading?: boolean;
  submitText?: string;
}
