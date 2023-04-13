import { StorageKey } from '@/types'

interface UseLocalStorage {
  setItem: (key: StorageKey, data: any) => void
  getItem: <T>(key: StorageKey) => T | null
}

export const useLocalStorage = (): UseLocalStorage => {
  const setItem = (key: StorageKey, data: any): void => {
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
