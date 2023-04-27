import { ref, Ref } from 'vue'
import { Card, Pair } from '@/types'

interface UseCards {
  cards: Ref<Card[]>
  pairs: Ref<Pair[]>
  shuffledAllCards: Ref<Card[]>
  activeCard: Ref<Card | null>
  setCards: (value: Card[]) => void
  setPairs: (allCards: Card[]) => void
  setActiveCard: (card: Card | null) => void
}

const cards = ref<Card[]>([])
const pairs = ref<Pair[]>([])
const shuffledAllCards = ref<Card[]>([])
const activeCard = ref<Card | null>(null)

export const useCards = (): UseCards => {
  
  const setCards = (value: Card[]): void => {
    cards.value = value
  }

  const setPairs = (allCards: Card[]): void => {
    allCards.forEach((card) => {
      pairs.value.push({ card1: card, card2: card })
    })
  }

  const setActiveCard = (card: Card | null): void => {
    activeCard.value = card
  }

  return {
    cards,
    pairs,
    shuffledAllCards,
    activeCard,
    setCards,
    setPairs,
    setActiveCard,
  }
}
