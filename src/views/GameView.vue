<script lang="ts" setup>
import { Score } from '@/types'
import { ref } from 'vue'
import TopBar from '@/components/TopBar.vue'
import GameCard from '@/components/GameCard.vue'
import { useCategories } from '@/composables/useCategories'
import { useUsers } from '@/composables/useUsers'
import { useCards } from '@/composables/useCards'

const { users } = useUsers()

users.value.opponent = {username: "test"}

const { shuffledAllCards } = useCards()
const {
  selectedCategory,
  selectedPairsOption,
} = useCategories()

const score = ref<Score>({
  scoreUser: 0,
  scoreOpponent: 0,
})

const clickCard = (key: string, event: Event): void => {
  console.log(key)
  const card = event.currentTarget as HTMLElement
  
  if(card.classList.contains('active')) {
    card.classList.remove('active')
    card.querySelector('.card__side--back')?.classList.remove('flip-back')
    card.querySelector('.card__side--front')?.classList.remove('flip-front')
  }
  else {
    card.classList.add('active')
    card.querySelector('.card__side--back')?.classList.add('flip-back')
    card.querySelector('.card__side--front')?.classList.add('flip-front')
  }
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
        @click="clickCard(card.pairingKey, $event)"
      />
    </div>
  </div>
</template>
