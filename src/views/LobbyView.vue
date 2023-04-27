<script lang="ts" setup>
import { useCategories } from '@/composables/useCategories'
import { GAME_PAIRS_OPTIONS } from '@/constants'
import { onBeforeMount } from 'vue'
import { useApiClient } from '../composables/useApiClient'
import { Pair } from '@/types'
import { useCards } from '@/composables/useCards'

const { selectedCategory, setSelectedPairsOption } = useCategories()
const { getCategoryCards } = useApiClient()
const { cards, shuffledAllCards, pairs, setPairs } = useCards()

const pairsOptions = Object.values(GAME_PAIRS_OPTIONS)

const shuffleArray = (allPairs: Pair[]): void => {
  allPairs.forEach((pair) => {
    shuffledAllCards.value.push(pair.card1, pair.card2)
  })

  for(let i = 0; i < shuffledAllCards.value.length; i++) {   
    shuffledAllCards.value[i] = {
      ...shuffledAllCards.value[i],
      id: crypto.randomUUID()
    }
  }
  
  for (let i = shuffledAllCards.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = shuffledAllCards.value[i]
    shuffledAllCards.value[i] = shuffledAllCards.value[j]
    shuffledAllCards.value[j] = tmp
  }
}

// Musi być async await bo bez tego nie zdąża zaciągnąć
// z Firebase kart i w drugim if-ie zwróci returna
onBeforeMount(async() => {
  if (!selectedCategory.value) return
  if (!cards.value) return

  await getCategoryCards(selectedCategory.value.key)
  setPairs(cards.value)
  shuffleArray(pairs.value)
})
</script>

<template>
  <div
    class="container flex flex-col text-center gap-16 items-center mt-44 w-full"
  >
    <img
      class="w-5/8"
      src="@/assets/logo.png"
    >
    <h1 class="text-3xl font-bold p-8 text-[var(--main)]">
      {{ $t('lobby') }}
    </h1>
    <h2 class="text-medium font-bold text-[var(--main)]">
      {{ selectedCategory?.name }}
    </h2>
    <div class="flex gap-4">
      <button
        v-for="(option, index) in pairsOptions"
        :key="index"
        class="w-14 h-14 bg-[var(--main)] text-white rounded"
        @click="setSelectedPairsOption(option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>
