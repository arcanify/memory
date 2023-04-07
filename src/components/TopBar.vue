<script lang="ts" setup>
import { GameUsers, Score, Category } from '@/types'

interface Props {
  category: Category | null,
  users: GameUsers | null,
  score: Score
}

defineProps<Props>()
</script>

<template>
  <div
    v-if="users"
    class="container rounded flex justify-between text-xl items-center py-2 px-4 w-11/12 drop-shadow-md shadow-xl"
  >
    <p
      v-if="users.user"
      class="flex-1"
    >
      {{ users.user.username }}
    </p>
    <p class="text-2xl font-medium flex-1">
      {{ score.scoreUser }} : {{ score.scoreOpponent }}
    </p>
    <p
      v-if="users.opponent"
      class="flex-1"
    >
      {{ users.opponent.username }}
    </p>
  </div>
</template>
