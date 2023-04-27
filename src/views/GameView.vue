<script lang="ts" setup>
import { Card, Score } from '@/types'
import { ref } from 'vue'
import TopBar from '@/components/TopBar.vue'
import GameCard from '@/components/GameCard.vue'
import { useCategories } from '@/composables/useCategories'
import { useUsers } from '@/composables/useUsers'
import { useCards } from '@/composables/useCards'
import { delay } from '@/helpers'

const { users } = useUsers()
const { selectedCategory, selectedPairsOption } = useCategories()
const {
  shuffledAllCards,
  activeCard,
  setActiveCard,
} = useCards()

users.value.opponent = { username: 'test' }
const score = ref<Score>({
  scoreUser: 0,
  scoreOpponent: 0,
})

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
  <div class="container flex flex-col text-center items-center">
    <h1 class="text-3xl font-bold p-8 text-[var(--main)]">
      {{ selectedCategory?.name }}
    </h1>
    <h2>{{ selectedPairsOption }} pairs</h2>
    <top-bar :category="selectedCategory" :users="users" :score="score" />
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
