<script lang="ts" setup>
import { Card } from '@/types'
import TopBar from '@/components/TopBar.vue'
import GameCard from '@/components/GameCard.vue'
import { useCategories } from '@/composables/useCategories'
import { useLobby } from '@/composables/useLobby'
import { delay } from '@/helpers'
import { useGame } from '@/composables/useGame'
import { FLIP_CARD_OPTIONS } from '@/constants'

const { selectedPairsOption } = useCategories()
const { lobby } = useLobby()
const { flipCard, setActiveCard, setActivePlayer } = useGame(lobby.value?.ID)

const retriveUser  = localStorage.getItem('user') as string
const user = JSON.parse(retriveUser)
const users = lobby.value?.players

const clickCard = async (card: Card, index: number): Promise<void> => {
  if (!lobby.value) return
  if (user.username !== lobby.value.turn) return
  if (!users) return
  if (card.isFlipped) return

  flipCard(index, FLIP_CARD_OPTIONS.flip)

  if (!lobby.value.activeCard) {
    setActiveCard(card)
    return
  }

  if (lobby.value.activeCard.pairingKey === card.pairingKey) {
    // TODO
    // Save pair in live db
  } else {
    // change players - to refactor
    setActivePlayer(user.username === users[0] ? users[1] : users[0])
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
  <div
    v-if="lobby"
    class="container flex flex-col text-center items-center"
  >
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
