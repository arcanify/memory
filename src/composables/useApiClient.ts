import { User, Category, Views, Collections, Card } from '@/types'
import { useRouter } from 'vue-router'
import { db } from '@/firebase'
import { collection,where, query, addDoc, getDocs } from 'firebase/firestore'
import { useUsers } from './useUsers'
import { useCards } from './useCards'

interface UseApiClient {
  createUser: (user: string) => Promise<void>
  getCategoryCards: (categoryKey: string) => Promise<void>
  getAllCategories: () => Promise<Category[] | null>
}

const { setUser } = useUsers()
const { setCards } = useCards()

export const useApiClient = (): UseApiClient => {
  const router = useRouter()

  const createUser = async (username: string): Promise<void> => {
    addDoc(collection(db, Collections.USER), {
      username,
    })
    const q = query(collection(db, Collections.USER), where('username', '==', username))
    const querySnapshot = await getDocs(q)
    
    querySnapshot.forEach((doc) => {
      setUser(doc.data() as User)
    })
    router.push({
      name: Views.SELECT_CATEGORY,
    })
  }

  const getCategoryCards = async (categoryKey: string): Promise<void> => {
    const q = query(collection(db, Collections.CARD), where('categoryKey', '==', categoryKey))
    const querySnapshot = await getDocs(q)
    const tmpCards: Card[] = []
    console.log(querySnapshot)
    
    querySnapshot.forEach((doc) => {
      tmpCards.push(doc.data() as Card)
    })
    setCards(tmpCards)
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
