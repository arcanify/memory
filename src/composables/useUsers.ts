import { ref, Ref } from 'vue'
import { GameUsers, StorageKey, User } from '@/types'
import { useLocalStorage } from '@/composables/useLocalStorage'

interface UseUsers {
  users: Ref<GameUsers | null>
  currentUser: Ref<User | null>
  opponentUser: Ref<User | null>
  setUser: (username: User) => void;
}

const currentUser = ref<User | null>(null)
const opponentUser = ref<User | null>(null) 

export const useUsers = (): UseUsers => {
  const { setItem } = useLocalStorage()
  
  const users = ref<GameUsers | null>({
    user: currentUser.value,
    opponent: opponentUser.value,
  })

  const setUser = (username: User): void => {
    currentUser.value = username
    setItem<User>(StorageKey.USER, currentUser.value)
  }

  return {
    users,
    currentUser,
    opponentUser,
    setUser
  }
}
