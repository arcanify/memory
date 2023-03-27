import { ref, Ref } from 'vue'
// import axios from 'axios'
import { User, Card } from '@/types'
import { db } from '@/firebase'
import { collection, addDoc, doc, getDoc } from 'firebase/firestore'

interface UseApiClient {
  user: Ref<User | null>
  card: Ref<Card | null>
  createUser: (user: string) => void
  getUser: () => Promise<User | null>
  getCard: () => Promise<Card | null>
}

export const useApiClient = (): UseApiClient => {
  const user = ref<User | null>(null)
  const card = ref<Card | null>(null)

  const createUser = (username: string): void => {
    addDoc(collection(db, 'user'), {
      username,
    })
    console.log(`User ${username} created`)
  }

  const getUser = async (): Promise<User | null> => {
    const docRef = doc(db, 'user', 'ZT3M02YeS43ha9ZXhCc2')
    const docSnapshot = await getDoc(docRef)
    user.value = docSnapshot.data() as User
    console.log(user.value)
    return user.value
  }

  const getCard = async (): Promise<Card | null> => {
    const docRef = doc(db, 'card', 'WCkOGebRM668mTGz9mbH')
    const docSnapshot = await getDoc(docRef)
    card.value = docSnapshot.data() as Card
    console.log(card.value)
    return card.value
  }

  return {
    user,
    card,
    createUser,
    getUser,
    getCard,
  }
}
