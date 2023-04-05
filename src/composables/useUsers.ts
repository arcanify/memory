import { ref, Ref } from 'vue'
import { GameUsers, User } from '@/types'

interface UseUsers {
  users: Ref<GameUsers | null>
  currentUser: Ref<User | null>
  opponentUser: Ref<User | null>
}

const currentUser = ref<User | null>(null)
const opponentUser = ref<User | null>(null) 
const users = ref<GameUsers | null>({
  user: currentUser.value,
  opponent: opponentUser.value,
})

export const useUsers = (): UseUsers => {
  return {
    users,
    currentUser,
    opponentUser
  }
}
