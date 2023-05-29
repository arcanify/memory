import { ref } from 'vue'
import { StorageKey, User } from '@/types'
import { useLocalStorage } from '@/composables/useLocalStorage'
import type { UseUsers } from '@/types'

const user = ref<User | null>(null)

export const useUsers = (): UseUsers => {
  const { setItem } = useLocalStorage()

  const setUser = (username: User): void => {
    user.value = username
    setItem<User>(StorageKey.USER, user.value)
  }

  return {
    user,
    setUser
  }
}
