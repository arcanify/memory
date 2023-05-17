import { Category, Views, Collections, Card } from '@/types'
import { useRouter } from 'vue-router'
import { db } from '@/firebase'
import { collection,where, query, getDocs } from 'firebase/firestore'
import { useUsers } from '@/composables/useUsers'
import { useCards } from '@/composables/useCards'
import { useLobby } from '@/composables/useLobby'

interface UseApiClient {
  createUser: (user: string) => Promise<void>
  getCategoryCards: (categoryKey: string) => Promise<void>
  getAllCategories: () => Promise<Category[] | null>
}

const { setUser } = useUsers()
const { setCards } = useCards()

export const useApiClient = (): UseApiClient => {
  const router = useRouter()
  const { lobby, joinLobby } = useLobby()

  const createUser = async (username: string): Promise<void> => {      
    if(!lobby.value) {
      setUser({username})
      router.push({
        name: Views.SELECT_CATEGORY,
      })
    } else {
      joinLobby(lobby.value.ID, username)
      setUser({username})
      router.push({
        name: Views.LOBBY,
        params: {
          id: lobby.value.ID
        }
      })
    }
  }

  const getCategoryCards = async (categoryKey: string): Promise<void> => {
    const q = query(collection(db, Collections.CARD), where('categoryKey', '==', categoryKey))
    const querySnapshot = await getDocs(q)
    const cards: Card[] = []
    
    querySnapshot.forEach((doc) => {
      cards.push(doc.data() as Card)
    })
    setCards(cards)
  }

  const getAllCategories = async (): Promise<Category[] | null> => {
    const querySnapshot = await getDocs(collection(db, Collections.CATEGORY))
    return querySnapshot.docs.map((doc) => doc.data() as Category)
  }

  return {
    createUser,
    getCategoryCards,
    getAllCategories
  }
}
