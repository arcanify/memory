<script lang="ts" setup>
import { useLobby } from '@/composables/useLobby'

const { lobby } = useLobby()
</script>

<template>
  <div
    v-if="lobby"
    class="container rounded flex justify-between text-xl items-center py-2 px-4 w-11/12 drop-shadow-md shadow-xl"
  >
    <div
      class="w-6 h-6 bg-red-600 rounded-full"
      :class="[lobby.turn === lobby.players.player1 ? 'visible' : 'invisible']"
    />
    <p
      class="flex-1"
    >
      {{ lobby.players.player1 }}
    </p>
    <p class="text-2xl font-medium flex-1">
      {{ lobby.score.player1 }} : {{ lobby.score.player2 }}
    </p>
    <p
      class="flex-1"
    >
      {{ lobby.players.player2 }}
    </p>
    <div
      class="w-6 h-6 bg-red-600 rounded-full"
      :class="[lobby.turn === lobby.players.player2 ? 'visible' : 'invisible']"
    />
  </div>
</template>
