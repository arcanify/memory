import { ref, Ref } from 'vue'
import { Card, Pair } from '@/types'

interface UseCards {
  cards: Ref<Card[]>
  shuffledAllCards: Ref<Card[]>
  pairs: Ref<Pair[]>
  swappedCard: Ref<string | null>
  swappedPairs: Ref<string[]>
  setSwappedCard: (value: string) => void
  completePairedCards: (value: string) => void
  setCards: (value: Card[]) => void
  setPairs: (allCards: Card[]) => void
}

const cards = ref<Card[]>([])
const shuffledAllCards = ref<Card[]>([])
const pairs = ref<Pair[]>([])
const swappedCard = ref<string | null>(null)
const swappedPairs = ref<string[]>([])

export const useCards = (): UseCards => {
  
  const setSwappedCard = (value: string): void => {
    swappedCard.value = value
  }

  const completePairedCards = (value: string): void => {
    swappedPairs.value.push(value)
  }

  const setPairs = (allCards: Card[]): void => {
    allCards.forEach((card) => {
      pairs.value.push({ card1: card, card2: card })
    })
  }

  const setCards = (value: Card[]): void => {
    cards.value = value
  }

  return {
    cards,
    shuffledAllCards,
    pairs,
    setPairs,
    setCards,
    swappedCard,
    swappedPairs,
    setSwappedCard,
    completePairedCards
  }
}
