import { onBeforeMount, ref, Ref } from 'vue'
import { useApiClient } from '@/composables/useApiClient'
import { Category, StorageKey, Views } from '@/types'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@/composables/useLocalStorage'

interface UseCategories {
  categories: Ref<Category[] | null>
  selectedCategory: Ref<Category | null>
  selectedPairsOption: Ref<number | null>
  setSelectedCategory: (category: Category) => void
  setSelectedPairsOption: (pairsOption: number) => void
}

const categories = ref<Category[] | null>(null)
const selectedCategory = ref<Category | null>(null)
const selectedPairsOption = ref<number | null>(null)

export const useCategories = (): UseCategories => {
  const router = useRouter()
  const { getAllCategories } = useApiClient()
  const { setItem } = useLocalStorage()
  
  onBeforeMount(async () => {
    categories.value = await getAllCategories()
  })

  const setSelectedCategory = (category: Category): void => {
    selectedCategory.value = category
    setItem<Category>(StorageKey.CATEGORY, selectedCategory.value)
  }

  const setSelectedPairsOption = (pairsOption: number): void => {
    selectedPairsOption.value = pairsOption
    router.push({
      name: Views.GAME,
    })
  }

  return {
    categories,
    selectedCategory,
    selectedPairsOption,
    setSelectedCategory,
    setSelectedPairsOption
  }
}
