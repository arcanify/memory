<script lang="ts" setup>
import { Card, Players, Views } from '@/types'
import TopBar from '@/components/TopBar.vue'
import GameCard from '@/components/GameCard.vue'
import { useCategories } from '@/composables/useCategories'
import { useLobby } from '@/composables/useLobby'
import { delay } from '@/helpers'
import { useGame } from '@/composables/useGame'
import { FLIP_CARD_OPTIONS } from '@/constants'
import { useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'

const { selectedPairsOption } = useCategories()
const { lobby, removeLobby, listenLobby } = useLobby()
const router = useRouter()
const { flipCard, setActiveCard, setActivePlayer } = useGame(lobby.value?.ID)

const retriveUser = localStorage.getItem('user') as string
const user = JSON.parse(retriveUser)
const players = lobby.value?.players as Players

onBeforeMount(() => {
  if (!lobby.value) return
  listenLobby(lobby.value.ID)
})

const endGame = async (): Promise<void> => {
  localStorage.clear()
  lobby.value = null
  router.push({
    name: Views.HOME,
  })
}

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
    // TO DO points adding

    //
    // Remove lobby at the end
    if (lobby.value.isGameFinished) {
      await delay(1000)
      removeLobby(lobby.value.ID)
    }
  } else {
    // change players - to refactor
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
  <div v-if="lobby" class="container flex flex-col text-center items-center">
    <div v-if="lobby?.isGameFinished">
      <p>GAME OVER</p>
      <button class="w-14 h-14 bg-[var(--main)] text-white rounded" @click="endGame">Home</button>
    </div>
    <h1 class="text-3xl font-bold p-8 text-[var(--main)]">
      {{ lobby.category }}
    </h1>
    <h2>{{ selectedPairsOption }} {{ $t('pairs') }}</h2>
    <top-bar />
    <div class="grid grid-cols-4 gap-6 mt-8">
      <game-card
        v-for="(card, index) in lobby.cards"
        :key="index"
        :card="card"
        @click="clickCard(card, index)"
      />
    </div>
  </div>
</template>
