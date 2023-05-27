import { Card } from '@/types'

export const doubleCards = (value: Card[]): Card[] => {
  const doubledCardsArray = [...value, ...value]
  return doubledCardsArray
}