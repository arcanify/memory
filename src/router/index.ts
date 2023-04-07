import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useCategories } from '@/composables/useCategories'
import { useUsers } from '@/composables/useUsers'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(() => {
    const { users,currentUser,opponentUser } = useUsers()
    const { selectedCategory } = useCategories()
    console.log(users.value)
    console.log(currentUser.value)
    console.log(opponentUser.value)
    console.log(selectedCategory.value)
})
export default router