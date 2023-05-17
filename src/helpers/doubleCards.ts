import { Card } from '@/types'

export const doubleCards = (value: Card[]): Card[] => {
  const singleCardsArray = value
  const doubledCardsArray = singleCardsArray.concat(singleCardsArray)
  return doubledCardsArray
}