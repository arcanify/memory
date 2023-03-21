import { ref, Ref } from 'vue'
// import axios from 'axios'
import { User, Card } from '@/types'
import { db } from '@/firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'

interface UseApiClient {
  user: Ref<User | null>
  card: Ref<Card | null>
  getUser: () => User | null;
  createUser: (user: string) => void;
  getCard: () => Card | null;
}

export const useApiClient = (): UseApiClient => {

  const user = ref<User | null>(null)
  const card = ref<Card | null>(null)

  const getUser = async(): Promise<User | null> => {
    
    const querySnapshot = await getDocs(collection(db, 'user'))
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data())
    })

    // const user = {
    //   username: 'user'
    // }
    return user.value
  }

  const createUser = (user: string): void => {
    addDoc(collection(db, 'user'), {
      username: user,
    })
  }


  const getCard = (): Card | null => {
    console.log(card)
    return card.value
  }

  return {
    user,
    card,
    createUser,
    getUser,
    getCard
  }
}