<script lang="ts" setup>
import { Card, Pair, Score } from '@/types'
import { ref } from 'vue'
import TopBar from '@/components/TopBar.vue'
import GameCard from '@/components/GameCard.vue'
import { useCategories } from '@/composables/useCategories'
import { useUsers } from '@/composables/useUsers'

const { users } = useUsers()
const { selectedCategory, selectedPairsOption } = useCategories()

const selectedCategoryCards = ref([
  {
    categoryKey: 'witcher',
    pairingKey: 'geralt',
    image: 'https://assets.reedpopcdn.com/geralt_witcher.jpg/BROK/thumbnail/1200x1200/quality/100/geralt_witcher.jpg',
  },
  {
    categoryKey: 'witcher',
    pairingKey: 'ciri',
    image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2019/10/Witcher-Ciri-5.jpg',
  }
])

const score = ref<Score>({
  scoreUser: 0,
  scoreOpponent: 0,
})

const clickCard = (): void => {
  console.log('clicked')
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
        v-for="(card, index) in selectedCategoryCards"
        :key="index"
        :card="card"
        @click="clickCard"
      />
    </div>
  </div>
</template>
