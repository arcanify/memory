import { ref, Ref } from 'vue'
import { Card } from '@/types'
import { doubleCards } from '@/helpers/doubleCards'

interface UseCards {
  cards: Ref<Card[]>
  shuffledCards: Ref<Card[]>
  setCards: (value: Card[]) => void
}

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
