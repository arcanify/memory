import { ref, Ref } from 'vue'
import { Category, StorageKey } from '@/types'
import { useLocalStorage } from '@/composables/useLocalStorage'

interface UseCategories {
  categories: Ref<Category[] | null>
  selectedCategory: Ref<Category | null>
  setSelectedCategory: (category: Category) => void
}

const categories = ref<Category[] | null>(null)
const selectedCategory = ref<Category | null>(null)

export const useCategories = (): UseCategories => {
  const { setItem } = useLocalStorage()

  const setSelectedCategory = (category: Category): void => {
    selectedCategory.value = category
    setItem<Category>(StorageKey.CATEGORY, selectedCategory.value)
  }

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
  }
}
