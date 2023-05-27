import { rtdb } from '@/firebase'
import {
  child,
  get,
  ref as firebaseRef,
  set,
  update,
  onValue,
  remove,
  increment
} from 'firebase/database'
import { Ref, ref } from 'vue'
import { Card, Lobby } from '@/types'

interface UseLobby {
  lobby: Ref<Lobby | null>
  isLobbyReady: Ref<boolean>
  listenLobby: (lobbyId: string) => void
  getLobby: (lobbyId: string) => Promise<Lobby | null>
  startLobby: (lobbyId: string, creator: string, category: string, cards: Card[], activeCard: null) => void
  joinLobby: (lobbyId: string, guest: string) => void
  removeLobby: (lobbyId: string) => void
  addPoint: (lobbyId: string, player: string) => void
}

const lobby = ref<Lobby | null>(null)
const isLobbyReady = ref<boolean>(false)

export const useLobby = (): UseLobby => {
  const listenLobby = (lobbyId: string): void => {
    const lobbyRef = firebaseRef(rtdb, `lobby/${lobbyId}`)
    onValue(lobbyRef, (snapshot) => {
      const data = snapshot.val() as Lobby
      
      if(!data) return
      lobby.value = data

      if (data.players.player1 && data.players.player2) {
        isLobbyReady.value = true
      }
    })

    const cardsRef = firebaseRef(rtdb, `lobby/${lobbyId}/cards`)
    onValue(cardsRef, (snapshot) => {
      const cards = ref<Card[]>([])
      cards.value = snapshot.val() as Card[]

      if(!cards.value) return
      
      const cardsStates = [] as boolean[]
      const isFlipped = (cardFlipState: boolean): boolean => {
        return cardFlipState
      }

      cards.value.forEach(card => {
        cardsStates.push(card.isFlipped)
      })

      update(child(firebaseRef(rtdb), `lobby/${lobbyId}`), {
        isGameFinished: cardsStates.every(isFlipped)
      })
    })
  }

  const getLobby = async (lobbyId: string): Promise<Lobby | null> => {
    await get(child(firebaseRef(rtdb), `lobby/${lobbyId}`))
      .then((snapshot) => {
        if (!snapshot.exists()) {
          lobby.value = null
        } else {
          lobby.value = snapshot.val()
        }
      })
      .catch((error) => {
        console.error(error)
      })

    return lobby.value
  }

  const startLobby = (
    lobbyId: string,
    creator: string,
    category: string,
    cards: Card[],
    activeCard: null
  ): void => {
    set(firebaseRef(rtdb, `lobby/${lobbyId}`), {
      ID: lobbyId,
      category,
      players: {player1: creator},
      score: { player1: 0, player2: 0 },
      cards,
      activeCard,
      turn: creator,
      isGameFinished: false
    })
  }

  const joinLobby = (lobbyId: string, guest: string): void => {
    update(child(firebaseRef(rtdb), `lobby/${lobbyId}/players`), {
      player2: guest,
    })
  }

  const removeLobby = (lobbyId: string): void => {
    remove(child(firebaseRef(rtdb), `lobby/${lobbyId}`))
  }

  const addPoint = (lobbyId: string, player: string): void => {
    if(!lobby.value) return
    if(player === lobby.value.players.player1) {
        console.log('git')
        update(child(firebaseRef(rtdb), `lobby/${lobbyId}/score`), {
          player1: increment(1),
        })
      } else {
        console.log('git')
        update(child(firebaseRef(rtdb), `lobby/${lobbyId}/score`), {
          player2: increment(1),
        })
      }
  }

  return {
    lobby,
    isLobbyReady,
    listenLobby,
    getLobby,
    startLobby,
    joinLobby,
    removeLobby,
    addPoint
  }
}
