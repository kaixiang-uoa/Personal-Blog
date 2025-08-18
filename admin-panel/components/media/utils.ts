// Media utility functions

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api/v1";

// Helper function to get full url
export const getFullUrl = (path: string): string => {
  // If it's a complete URL (including http or https), return directly
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // If it's an S3 URL (contains .amazonaws.com), return directly
  if (path.includes(".amazonaws.com")) {
    return path;
  }

  // Normalize path
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // Use base origin (strip trailing /api/v1 if present)
  const origin = API_BASE_URL.replace(/\/?api\/v1$/, "");

  // If incoming path已经是完整api路径，直接拼接
  if (normalizedPath.startsWith("/api/")) {
    return `${origin}${normalizedPath}`;
  }

  // Default media uploads prefix
  return `${origin}/api/v1/media/uploads${normalizedPath}`;
};

// Helper function to format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// Test if url is accessible
export const testUrl = async (url: string) => {
  try {
    // If it's an S3 URL, return success directly
    if (url.includes(".amazonaws.com")) {
      return {
        status: 200,
        ok: true,
        contentType: "image/*",
        url,
      };
    }

    // Try to access the image
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");

    // If it's a JSON response, read error information
    if (contentType?.includes("application/json")) {
      const errorData = await response.json();
      return {
        status: response.status,
        ok: response.ok,
        contentType,
        url,
        errorData,
        headers: Object.fromEntries(response.headers.entries()),
      };
    }

    return {
      status: response.status,
      ok: response.ok,
      contentType,
      url,
      headers: Object.fromEntries(response.headers.entries()),
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
      url,
    };
  }
};
