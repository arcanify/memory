import { ref, Ref } from 'vue'
import { User, Category, Views, Collections } from '@/types'
import { useRouter } from 'vue-router'
import { db } from '@/firebase'
import { collection,where, query, addDoc, doc, getDoc, getDocs } from 'firebase/firestore'
import { useUsers } from './useUsers'

interface UseApiClient {
  user: Ref<User | null>
  category: Ref<Category | null>
  categories: Ref<Category[] | null>
  createUser: (user: string) => Promise<void>
  getUser: (username: string) => Promise<User | null>
  getCategory: (id: string) => Promise<Category | null>
  getAllCategories: () => Promise<Category[] | null>
}

const { currentUser } = useUsers()

const setUser = (username: User): void => {
  currentUser.value = username
}

export const useApiClient = (): UseApiClient => {
  const user = ref<User | null>(null)
  const category = ref<Category | null>(null)
  const categories = ref<Category[] | null>([])
  const router = useRouter()

  const createUser = async (username: string): Promise<void> => {
    addDoc(collection(db, Collections.USER), {
      username,
    })
    const current = await getUser(username) as User
    setUser(current)
    router.push({
      name: Views.SELECT_GAME,
    })
  }

  // const getUser = async (): Promise<User | null> => {
  //   const docRef = doc(db, Collections.USER, 'ZT3M02YeS43ha9ZXhCc2')
  //   const docSnapshot = await getDoc(docRef)
  //   user.value = docSnapshot.data() as User
  //   console.log(user.value)
  //   return user.value
  // }

  const getUser = async (username: string): Promise<User | null> => {
    const q = query(collection(db, Collections.USER), where('username', '==', username))
    const querySnapshot = await getDocs(q)
    
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data())
      user.value = doc.data() as User
    })
    console.log(user)
    return user.value
  }

  const getCategory = async (id: string): Promise<Category | null> => {
    const docRef = doc(db, Collections.CATEGORY, id)
    const docSnapshot = await getDoc(docRef)
    category.value = docSnapshot.data() as Category
    return category.value
  }

  const getAllCategories = async (): Promise<Category[] | null> => {
    const querySnapshot = await getDocs(collection(db, Collections.CATEGORY))
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Category
      categories.value?.push(data)
    })
    return categories.value
  }

  return {
    user,
    category,
    categories,
    createUser,
    getUser,
    getCategory,
    getAllCategories
  }
}
