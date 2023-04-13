import { ref, Ref } from 'vue'
import { Card, Pair } from '@/types'

interface UseCards {
  cards: Ref<Card[] | null>
  pairs: Ref<Pair[]>
  setCards: (value: Card[]) => void
  setPairs: (allCards: Card[]) => void
}

const pairs = ref<Pair[]>([])
const cards = ref<Card[] | null>(null)

export const useCards = (): UseCards => {
  const setCards = (value: Card[]): void => {
    cards.value = value
  }

  const setPairs = (allCards: Card[]): void => {
    allCards.forEach((card) => {
      const pair = { card1: card, card2: card }
      pairs.value.push(pair)
    })
  }

  return {
    cards,
    pairs,
    setPairs,
    setCards,
  }
}
