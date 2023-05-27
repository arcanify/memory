import { ref } from 'vue'
import { StorageKey, User } from '@/types'
import { useLocalStorage } from '@/composables/useLocalStorage'
import type { UseUsersInterface } from '@/types'

const user = ref<User | null>(null)

export const useUsers = (): UseUsersInterface => {
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
