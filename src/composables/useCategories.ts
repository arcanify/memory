import { onBeforeMount, ref, Ref } from 'vue'
import { useApiClient } from '@/composables/useApiClient'
import { Category, Views } from '@/types'
import { useRouter } from 'vue-router'

interface UseCategories {
  categories: Ref<Category[] | null>
  selectedCategory: Ref<Category | null>
  selectedPairsOption: Ref<number | null>
  setSelectedPairsOption: (pairsOption: number) => void
}

const categories = ref<Category[] | null>(null)
const selectedCategory = ref<Category | null>(null)
const selectedPairsOption = ref<number | null>(null)

export const useCategories = (): UseCategories => {
  const router = useRouter()
  const { getAllCategories } = useApiClient()
  
  onBeforeMount(async () => {
    categories.value = await getAllCategories()
  })


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
    setSelectedPairsOption
  }
}
