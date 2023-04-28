import { rtdb } from '@/firebase'
import { child, get, push, ref as firebaseRef, set, update } from 'firebase/database'
import { Ref, ref } from 'vue'
import { Lobby } from '@/types'

interface UseRtdb {
  // lobby: Ref<Lobby | null>
  getLobby: (lobbyId: string) => Promise<Lobby | null>
  startLobby: (lobbyId: string, creator: string) => void
  joinLobby: (lobbyId: string, guest: string) => void
}

const getLobby = async(lobbyId: string): Promise<Lobby | null> => {
  const lobby = ref<Lobby | null>(null)
   await get(child(firebaseRef(rtdb), `lobby/${lobbyId}`)).then((snapshot) => {
    if (!snapshot.exists()) {
      lobby.value =  null
    } else {
      lobby.value = snapshot.val()
    } 
  }).catch((error) => {
    console.error(error)
  })

  console.log(lobby.value)
  
  return lobby.value
}

export const useRtdb = (): UseRtdb => {
  

  const startLobby = (lobbyId: string, creator: string): void => {
    set(firebaseRef(rtdb, `lobby/${lobbyId}`), {
      ID: lobbyId,
      players: [creator],
    })
  }

  const joinLobby = (lobbyId: string, guest: string): void => {
    update(child(firebaseRef(rtdb), `lobby/${lobbyId}/players`),{
      1: guest
    })
  }

  return {
    getLobby,
    startLobby,
    joinLobby
  }
}
