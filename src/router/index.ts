import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { Category, StorageKey } from '@/types'
import { useCategories } from '@/composables/useCategories'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((_, __, next) => {
  const { getItem } = useLocalStorage()
  const { setSelectedCategory } = useCategories()
  const storedCategory = getItem<Category>(StorageKey.CATEGORY)
  if (storedCategory) {
    setSelectedCategory(storedCategory)
  }
  next()
})

export default router
