"use client"

import { useState, useEffect } from "react"

export function usePersistedState<T>(key: string, initialValue: T) {
  // Initialize state with value from localStorage or initialValue
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return initialValue
    }
  })

  // Update localStorage when state changes
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      window.localStorage.setItem(key, JSON.stringify(state))
    } catch (error) {
      console.error("Error writing to localStorage:", error)
    }
  }, [key, state])

  return [state, setState] as const
} 