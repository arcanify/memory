import { onBeforeMount, ref, Ref } from 'vue'
import { useApiClient } from '@/composables/useApiClient'
import { Category } from '@/types'

interface UseCategories {
  categories: Ref<Category[] | null>
  selectedCategory: Ref<Category | null>
}

const categories = ref<Category[] | null>(null)
const selectedCategory = ref<Category | null>(null) 

export const useCategories = (): UseCategories => {
  const { getAllCategories } = useApiClient()
  onBeforeMount(async () => {
    categories.value = await getAllCategories()
  })

  return {
    categories,
    selectedCategory,
  }
}
