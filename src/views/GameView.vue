<script lang="ts" setup>
import { Card, Score } from '@/types'
import { ref } from 'vue'
import TopBar from '@/components/TopBar.vue'
import GameCard from '@/components/GameCard.vue'
import { useCategories } from '@/composables/useCategories'
import { useUsers } from '@/composables/useUsers'
import { useCards } from '@/composables/useCards'

const { users } = useUsers()

users.value.opponent = { username: 'test' }

const {
  shuffledAllCards,
  activeCard,
  setActiveCard,
  // completePairedCards,
} = useCards()

console.log(shuffledAllCards.value)

const { selectedCategory, selectedPairsOption } = useCategories()

const score = ref<Score>({
  scoreUser: 0,
  scoreOpponent: 0,
})

const delay = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms))

const clickCard = async (card: Card, index: number): Promise<void> => {
  if(card.id === activeCard.value?.id) return

  shuffledAllCards.value[index].isFlipped = true

  if (!activeCard.value) {
    setActiveCard(card)
    return
  }

  if (activeCard.value.pairingKey === card.pairingKey) {
    // TODO
    // Save PAIR
    // Disable next click on this card
    // ...
  } else {
    const oldIndex = shuffledAllCards.value.findIndex((el) => el.id === activeCard.value?.id)
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
    <top-bar
      :category="selectedCategory"
      :users="users"
      :score="score"
    />
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
