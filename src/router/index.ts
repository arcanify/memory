import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { Category, StorageKey, User } from '@/types'
import { useCategories } from '@/composables/useCategories'
import { useUsers } from '@/composables/useUsers'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((_, __, next) => {
  const { getItem } = useLocalStorage()
  const { setSelectedCategory } = useCategories()
  const { setUser } = useUsers()

  const storedCategory = getItem<Category>(StorageKey.CATEGORY)
  if (storedCategory) {
    setSelectedCategory(storedCategory)
  }

  const storedUser = getItem<User>(StorageKey.USER)
  if (storedUser) {
    setUser(storedUser)
  }
  next()
})

export default router
