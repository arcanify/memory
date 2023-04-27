import { ref, Ref } from 'vue'
import { Card, Pair } from '@/types'

interface UseCards {
  cards: Ref<Card[]>
  shuffledAllCards: Ref<Card[]>
  pairs: Ref<Pair[]>
  activeCard: Ref<Card | null>
  // swappedCard: Ref<string | null>
  swappedPairs: Ref<string[]>
  setActiveCard: (card: Card | null) => void
  completePairedCards: (value: string) => void
  setCards: (value: Card[]) => void
  setPairs: (allCards: Card[]) => void
}

const cards = ref<Card[]>([])
const shuffledAllCards = ref<Card[]>([])
const pairs = ref<Pair[]>([])
const activeCard = ref<Card | null>(null)
const swappedPairs = ref<string[]>([])

export const useCards = (): UseCards => {
  
  const setActiveCard = (card: Card | null): void => {
    activeCard.value = card
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
    activeCard,
    swappedPairs,
    setActiveCard,
    completePairedCards
  }
}
