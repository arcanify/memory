<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import GameCard from './GameCard.vue'
import { useApiClient } from '@/composables/useApiClient'

const { getAllCategoriesIds, categories } = useApiClient()

onBeforeMount(async() => {
  await getAllCategoriesIds()
})
</script>

<template>
  <div class="container flex flex-col text-center gap-16 items-center mt-44 w-full">
    <img
      class="w-5/8"
      src="@/assets/logo.png"
    >
    <div>
      <h1 class="text-3xl font-bold p-8 text-[var(--main)]">
        Select game
      </h1>
      <ul class="grid grid-cols-1 gap-4">
        <li
          v-for="category in categories"
          :key="category"
        >
          <GameCard :id="category" />
        </li>
      </ul>
    </div>
  </div>
</template>
