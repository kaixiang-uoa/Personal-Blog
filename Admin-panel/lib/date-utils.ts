// 日期处理工具函数

/**
 * 格式化日期为 YYYY-MM-DD 格式
 */
export function formatDate(date: string | Date): string {
  if (!date) return ""

  const d = typeof date === "string" ? new Date(date) : date

  return d.toISOString().split("T")[0]
}

/**
 * 格式化日期时间为 YYYY-MM-DD HH:MM 格式
 */
export function formatDateTime(date: string | Date): string {
  if (!date) return ""

  const d = typeof date === "string" ? new Date(date) : date

  return `${formatDate(d)} ${d.toTimeString().slice(0, 5)}`
}

/**
 * 格式化为相对时间（例如：3小时前，1天前等）
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
    return `${years}年前`
  } else if (months > 0) {
    return `${months}个月前`
  } else if (days > 0) {
    return `${days}天前`
  } else if (hours > 0) {
    return `${hours}小时前`
  } else if (minutes > 0) {
    return `${minutes}分钟前`
  } else {
    return "刚刚"
  }
}

/**
 * 获取日期范围（例如：本周、本月、上个月等）
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
    const day = now.getDay() || 7 // 如果是周日，getDay() 返回 0，我们将其转换为 7
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
