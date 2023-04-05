<script lang="ts" setup>
import { GameUsers, Score, Category } from '@/types'

defineProps<{
  category: Category | null,
  users: GameUsers | null,
  score: Score
}>()
</script>

<template>
  <div
    class="container rounded flex justify-between gap-16 text-xl items-center py-2 px-4 w-11/12 drop-shadow-md shadow-xl"
  >
    <p class="flex-wrap">
      {{ users?.user?.username }}
    </p>
    <p class="text-2xl font-medium">
      {{ score.scoreUser }} : {{ score.scoreOpponent }}
    </p>
    <p class="flex-wrap">
      {{ users?.opponent?.username }}
    </p>
  </div>
</template>
