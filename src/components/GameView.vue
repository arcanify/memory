<script lang="ts" setup>
import { Score } from '@/types'
import { ref } from 'vue'
import TopBar from './TopBar.vue'
import { useCategories } from '@/composables/useCategories'
import { useUsers } from '@/composables/useUsers'

const { users } = useUsers()
const { selectedCategory } = useCategories()

const score =  ref<Score>({
  scoreUser: 0,
  scoreOpponent: 0
})
</script>

<template>
  <div
    class="container flex flex-col text-center items-center"
  >
    <h1 class="text-3xl font-bold p-8 text-[var(--main)]">
      {{ selectedCategory?.category }}
    </h1>
    <TopBar
      :category="selectedCategory"
      :users="users"
      :score="score"
    />
    <main class="grid grid-cols-4 gap-6 mt-8">
      <div class="rounded w-16 h-16 bg-red-600">
        1
      </div>
      <div class="rounded w-16 h-16 bg-blue-600">
        2
      </div>
      <div class="rounded w-16 h-16 bg-green-600">
        3
      </div>
      <div class="rounded w-16 h-16 bg-yellow-600">
        4
      </div>
      <div class="rounded w-16 h-16 bg-red-600">
        5
      </div>
      <div class="rounded w-16 h-16 bg-blue-600">
        6
      </div>
      <div class="rounded w-16 h-16 bg-green-600">
        7
      </div>
      <div class="rounded w-16 h-16 bg-yellow-600">
        8
      </div>
    </main>
  </div>
</template>
