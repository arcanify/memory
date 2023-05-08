<script lang="ts" setup>
import { Card } from '@/types'
import TopBar from '@/components/TopBar.vue'
import GameCard from '@/components/GameCard.vue'
import { useCategories } from '@/composables/useCategories'
import { useCards } from '@/composables/useCards'
import { useLobby } from '@/composables/useLobby'
import { delay } from '@/helpers'

const { selectedPairsOption } = useCategories()
const {
  shuffledAllCards,
  activeCard,
  setActiveCard,
} = useCards()
const { lobby } = useLobby()

const clickCard = async (card: Card, index: number): Promise<void> => {
  if (card.isFlipped) return

  shuffledAllCards.value[index].isFlipped = true

  if (!activeCard.value) {
    setActiveCard(card)
    return
  }

  if (activeCard.value.pairingKey === card.pairingKey) {
    // TODO
    // Save pair in live db
  } else {
    const oldIndex = shuffledAllCards.value.findIndex(
      (el) => el.id === activeCard.value?.id
    )
    await delay(1000)
    shuffledAllCards.value[oldIndex].isFlipped = false
    shuffledAllCards.value[index].isFlipped = false
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
        v-for="(card, index) in shuffledAllCards"
        :key="index"
        :card="card"
        @click="clickCard(card, index)"
      />
    </div>
  </div>
</template>
