import { StorageKey } from '@/types'
import type { UseLocalStorage } from '@/types'

export const useLocalStorage = (): UseLocalStorage => {
  const setItem = <T>(key: StorageKey, data: T): void => {
    localStorage.setItem(key, JSON.stringify(data))
  }

  const getItem = <T>(key: StorageKey): T | null => {
    const storedToken = localStorage.getItem(key)
    if (!storedToken) return null
    return JSON.parse(storedToken) as T
  }

  return {
    setItem,
    getItem
  }
}
