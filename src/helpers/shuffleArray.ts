import { useCards } from '@/composables/useCards'
import { Pair } from '@/types'

const { shuffledAllCards } = useCards()

export const shuffleArray = (allPairs: Pair[]): void => {
  allPairs.forEach((pair) => {
    shuffledAllCards.value.push(pair.card1, pair.card2)
  })

  for(let i = 0; i < shuffledAllCards.value.length; i++) {   
    shuffledAllCards.value[i] = {
      ...shuffledAllCards.value[i],
      id: crypto.randomUUID()
    }
  }
  
  for (let i = shuffledAllCards.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = shuffledAllCards.value[i]
    shuffledAllCards.value[i] = shuffledAllCards.value[j]
    shuffledAllCards.value[j] = tmp
  }
}