<script lang="ts" setup>
import { Score } from '@/types'
import { ref } from 'vue'
import TopBar from '@/components/TopBar.vue'
import { useCategories } from '@/composables/useCategories'
import { useUsers } from '@/composables/useUsers'

const { users } = useUsers()
const { selectedCategory, selectedPairsOption } = useCategories()

// const cards = [
//   '1',
//   '2',
//   '3',
//   '4',
//   '5',
//   '6',
//   '7',
//   '8',
//   '9',
//   '10',
//   '11',
//   '12',
//   '13',
//   '14',
//   '15',
//   '16',
// ]

// onMounted(() => {
//   const ul = document.querySelector('ul')

//   for (let i = 0; i <= selectedPairsOption * 2 - 1; i++) {
//     const li = document.createElement('li')
//     li.innerHTML = cards[i]
//     li.classList.add('rounded', 'w-16', 'h-16', 'bg-red-600')

//     ul?.appendChild(li)
//   }
// })

const score = ref<Score>({
  scoreUser: 0,
  scoreOpponent: 0,
})
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
    <ul class="grid grid-cols-4 gap-6 mt-8" />
  </div>
</template>
