import { ref } from 'vue'
import { Card } from '@/types'
import { doubleCards } from '@/helpers'
import type { UseCards } from '@/types'

const cards = ref<Card[]>([])
const shuffledCards = ref<Card[]>([])

export const useCards = (): UseCards => {
  
  const setCards = (value: Card[]): void => {
    cards.value = doubleCards(value)
  }

  return {
    cards,
    shuffledCards,
    setCards,
  }
}
