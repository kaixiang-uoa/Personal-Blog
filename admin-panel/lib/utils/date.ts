/**
 * Date utility functions for handling date formatting and manipulation
 */

/**
 * Format date to YYYY-MM-DD format
 * @param date - Date string or Date object
 * @returns Formatted date string
 */
export function formatDate(date: string | Date): string {
  if (!date) return ""

  const d = typeof date === "string" ? new Date(date) : date
  return d.toISOString().split("T")[0]
}

/**
 * Format datetime to YYYY-MM-DD HH:MM format
 * @param date - Date string or Date object
 * @returns Formatted datetime string
 */
export function formatDateTime(date: string | Date): string {
  if (!date) return ""

  const d = typeof date === "string" ? new Date(date) : date
  return `${formatDate(d)} ${d.toTimeString().slice(0, 5)}`
}

/**
 * Format to relative time (e.g., 3 hours ago, 1 day ago, etc.)
 * @param date - Date string or Date object
 * @returns Relative time string
 */
export function formatRelativeTime(date: string | Date): string {
  if (!date) return ""

  const d = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0) {
    return `${years} years ago`
  } else if (months > 0) {
    return `${months} months ago`
  } else if (days > 0) {
    return `${days} days ago`
  } else if (hours > 0) {
    return `${hours} hours ago`
  } else if (minutes > 0) {
    return `${minutes} minutes ago`
  } else {
    return "just now"
  }
}

/**
 * Get date range (e.g., this week, this month, last month, etc.)
 * @param range - Date range type
 * @returns Object containing start and end dates
 */
export function getDateRange(range: "today" | "yesterday" | "thisWeek" | "lastWeek" | "thisMonth" | "lastMonth"): {
  start: Date
  end: Date
} {
  const now = new Date()
  const start = new Date()
  const end = new Date()

  if (range === "today") {
    start.setHours(0, 0, 0, 0)
    end.setHours(23, 59, 59, 999)
  } else if (range === "yesterday") {
    start.setDate(now.getDate() - 1)
    start.setHours(0, 0, 0, 0)
    end.setDate(now.getDate() - 1)
    end.setHours(23, 59, 59, 999)
  } else if (range === "thisWeek") {
    const day = now.getDay() || 7 // If Sunday, getDay() returns 0, we convert it to 7
    start.setDate(now.getDate() - day + 1)
    start.setHours(0, 0, 0, 0)
    end.setHours(23, 59, 59, 999)
  } else if (range === "lastWeek") {
    const day = now.getDay() || 7
    start.setDate(now.getDate() - day - 6)
    start.setHours(0, 0, 0, 0)
    end.setDate(now.getDate() - day)
    end.setHours(23, 59, 59, 999)
  } else if (range === "thisMonth") {
    start.setDate(1)
    start.setHours(0, 0, 0, 0)
    end.setMonth(now.getMonth() + 1, 0)
    end.setHours(23, 59, 59, 999)
  } else if (range === "lastMonth") {
    start.setMonth(now.getMonth() - 1, 1)
    start.setHours(0, 0, 0, 0)
    end.setDate(0)
    end.setHours(23, 59, 59, 999)
  }

  return { start, end }
} 