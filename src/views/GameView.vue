<script lang="ts" setup>
import { Card, Players } from '@/types'
import TopBar from '@/components/TopBar.vue'
import GameCard from '@/components/GameCard.vue'
import EndGameWindow from '@/components/EndGameWindow.vue'
import { useLobby } from '@/composables/useLobby'
import { delay } from '@/helpers'
import { useGame } from '@/composables/useGame'
import { FLIP_CARD_OPTIONS } from '@/constants'
import { onBeforeMount } from 'vue'

const { lobby, removeLobby, listenLobby, addPoint } = useLobby()
const { flipCard, setActiveCard, setActivePlayer } = useGame(lobby.value?.ID)

const retriveUser = localStorage.getItem('user') as string
const user = JSON.parse(retriveUser)
const players = lobby.value?.players as Players

onBeforeMount(() => {
  if (!lobby.value) return
  listenLobby(lobby.value.ID)
})

const clickCard = async (card: Card, index: number): Promise<void> => {
  if (!lobby.value) return
  if (user.username !== lobby.value.turn) return
  if (!players) return
  if (card.isFlipped) return

  flipCard(index, FLIP_CARD_OPTIONS.flip)

  if (!lobby.value.activeCard) {
    setActiveCard(card)
    return
  }

  if (lobby.value.activeCard.pairingKey === card.pairingKey) {
    addPoint(lobby.value.ID, lobby.value.turn)

    if (lobby.value.isGameFinished) {
      await delay(1000)
      removeLobby(lobby.value.ID)
    }
  } else {
    if (!players.player1 || !players.player2) return
    setActivePlayer(
      user.username === players.player1 ? players.player2 : players.player1
    )
    const oldIndex = lobby.value.cards.findIndex(
      (el) => el.id === lobby.value?.activeCard.id
    )
    await delay(1000)
    flipCard(oldIndex, FLIP_CARD_OPTIONS.unflip)
    flipCard(index, FLIP_CARD_OPTIONS.unflip)
  }
  setActiveCard(null)
}
</script>

<template>
  <div class="overlay hidden" />
  <div
    v-if="lobby"
    class="container flex flex-col text-center items-center"
  >
    <h1 class="text-3xl font-bold p-8 text-[var(--main)]">
      {{ lobby.category }}
    </h1>
    <top-bar />
    <div class="grid grid-cols-4 md:grid-cols-6 gap-4 md:gap-6 lg:gap-12 mt-8">
      <game-card
        v-for="(card, index) in lobby.cards"
        :key="index"
        :card="card"
        @click="clickCard(card, index)"
      />
    </div>
  </div>
  <Transition name="fade">
    <EndGameWindow v-if="lobby?.isGameFinished" />
  </Transition>
</template>

<style lang="scss">
.fade-enter-active {
  transition: opacity 1s ease-out;
}

.fade-enter-from {
  opacity: 0;
}

.hidden {
  display: none;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  z-index: 5;
}
</style>
