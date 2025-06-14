import { toast } from "@/hooks/ui/use-toast";

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const ALLOWED_FILE_TYPES = {
  "image/jpeg": ".jpg, .jpeg",
  "image/png": ".png",
  "image/gif": ".gif",
  "application/pdf": ".pdf",
} as const;

export type AllowedFileType = keyof typeof ALLOWED_FILE_TYPES;

export interface ValidationResult {
  isValid: boolean;
  error?: {
    title: string;
    description: string;
  };
}

export const validateFile = (file: File): ValidationResult => {
  // 大小验证
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: {
        title: "File too large",
        description: `${file.name} exceeds the 10MB limit`,
      },
    };
  }

  // 类型验证
  if (!Object.keys(ALLOWED_FILE_TYPES).includes(file.type)) {
    const allowedExtensions = Object.values(ALLOWED_FILE_TYPES).join(", ");
    return {
      isValid: false,
      error: {
        title: "Invalid file type",
        description: `Only ${allowedExtensions} files are allowed`,
      },
    };
  }

  return { isValid: true };
};

export const validateFiles = (files: FileList | File[]): ValidationResult => {
  for (let i = 0; i < files.length; i++) {
    const result = validateFile(files[i]);
    if (!result.isValid) {
      return result;
    }
  }
  return { isValid: true };
};

export const showValidationError = (error: {
  title: string;
  description: string;
}) => {
  toast({
    title: error.title,
    description: error.description,
    variant: "destructive",
  });
};
