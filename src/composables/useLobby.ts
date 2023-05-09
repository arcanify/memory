import { rtdb } from '@/firebase'
import {
  child,
  get,
  ref as firebaseRef,
  set,
  update,
  onValue,
} from 'firebase/database'
import { Ref, ref } from 'vue'
import { Lobby } from '@/types'

interface UseLobby {
  lobby: Ref<Lobby | null>
  isLobbyReady: Ref<boolean>
  listenLobby: (lobbyId: string) => void
  getLobby: (lobbyId: string) => Promise<Lobby | null>
  startLobby: (lobbyId: string, creator: string, category: string) => void
  joinLobby: (lobbyId: string, guest: string) => void
}

const lobby = ref<Lobby | null>(null)
const isLobbyReady = ref<boolean>(false)

export const useLobby = (): UseLobby => {
  const listenLobby = (lobbyId: string): void => {
    const playersRef = firebaseRef(rtdb, `lobby/${lobbyId}`)
    onValue(playersRef, (snapshot) => {
      const data = snapshot.val() as Lobby
      lobby.value = data

      if (data && data.players.length === 2) {
        isLobbyReady.value = true
      }
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
    category: string
  ): void => {
    set(firebaseRef(rtdb, `lobby/${lobbyId}`), {
      ID: lobbyId,
      category,
      players: [creator],
      score: { player1: 0, player2: 0 },
    })
  }

  const joinLobby = (lobbyId: string, guest: string): void => {
    update(child(firebaseRef(rtdb), `lobby/${lobbyId}/players`), {
      1: guest,
    })
  }

  return {
    lobby,
    isLobbyReady,
    listenLobby,
    getLobby,
    startLobby,
    joinLobby,
  }
}
