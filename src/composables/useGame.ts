import { rtdb } from '@/firebase'
import { Card } from '@/types'
import {
  child,
  ref as firebaseRef,
  update,
} from 'firebase/database'
import { ref } from 'vue'
import type { UseGameInterface } from '@/types'

const activeCard = ref<Card | null>(null)

export const useGame = (lobbyId: string | undefined): UseGameInterface => {

  const flipCard = (card: number, action: boolean): void => {
    update(child(firebaseRef(rtdb), `lobby/${lobbyId}/cards/${card}`), {
      isFlipped: action
    })
  }

  const setActiveCard = (card: Card | null): void => {
    update(child(firebaseRef(rtdb), `lobby/${lobbyId}`), {
      activeCard: card
    })
  }

  const setActivePlayer = (player: string): void => {
    update(child(firebaseRef(rtdb), `lobby/${lobbyId}`), {
      turn: player
    })
  }

  return {
    activeCard,
    flipCard,
    setActiveCard,
    setActivePlayer
  }
}
