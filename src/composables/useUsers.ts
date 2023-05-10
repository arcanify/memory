import { ref, Ref } from 'vue'
import { StorageKey, User } from '@/types'
import { useLocalStorage } from '@/composables/useLocalStorage'

interface UseUsers {
  user: Ref<User | null>
  setUser: (username: User) => void;
}

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
