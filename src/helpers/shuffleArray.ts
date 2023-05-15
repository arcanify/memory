import { useCards } from '@/composables/useCards'
import { Pair } from '@/types'

const { shuffledCards } = useCards()

export const shuffleArray = (allPairs: Pair[]): void => {
  allPairs.forEach((pair) => {
    shuffledCards.value.push(pair.card1, pair.card2)
  })

  for(let i = 0; i < shuffledCards.value.length; i++) {   
    shuffledCards.value[i] = {
      ...shuffledCards.value[i],
      id: crypto.randomUUID()
    }
  }
  
  for (let i = shuffledCards.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = shuffledCards.value[i]
    shuffledCards.value[i] = shuffledCards.value[j]
    shuffledCards.value[j] = tmp
  }
}