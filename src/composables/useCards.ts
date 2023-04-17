import { ref, Ref } from 'vue'
import { Card, Pair } from '@/types'

interface UseCards {
  cards: Ref<Card[]>
  shuffledAllCards: Ref<Card[]>
  pairs: Ref<Pair[]>
  setCards: (value: Card[]) => void
  setPairs: (allCards: Card[]) => void
}

const cards = ref<Card[]>([])
const shuffledAllCards = ref<Card[]>([])
const pairs = ref<Pair[]>([])

export const useCards = (): UseCards => {
  const setCards = (value: Card[]): void => {
    cards.value = value
  }

  const setPairs = (allCards: Card[]): void => {
    allCards.forEach((card) => {
      pairs.value.push({ card1: card, card2: card })
    })
  }

  return {
    cards,
    shuffledAllCards,
    pairs,
    setPairs,
    setCards,
  }
}
