<script lang="ts" setup>
import { GameUsers, Score } from '@/types'

const props = defineProps<{
  category: string,
  users: GameUsers,
  score: Score
}>()
</script>

<template>
  <div
    class="container flex flex-col text-center gap-16 items-center mt-44 w-full"
  >
    <h1 class="text-3xl font-bold p-8 text-[var(--main)]">
      {{ props }}
    </h1>
  </div>
</template>
