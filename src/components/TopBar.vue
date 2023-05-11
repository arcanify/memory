<script lang="ts" setup>
import { useLobby } from '@/composables/useLobby'

const { lobby } = useLobby()
</script>

<template>
  <div
    v-if="lobby"
    class="container rounded flex justify-between text-xl items-center py-2 px-4 w-11/12 drop-shadow-md shadow-xl"
  >
    <p
      class="flex-1"
      :class="[lobby.turn === lobby.players[0] ? 'border-solid border-2 border-red-700' : '']"
    >
      {{ lobby.players[0] }}
    </p>
    <p class="text-2xl font-medium flex-1">
      {{ lobby.score.player1 }} : {{ lobby.score.player2 }}
    </p>
    <p
      class="flex-1"
      :class="[lobby.turn === lobby.players[1] ? 'border-solid border-2 border-red-700' : '']"
    >
      {{ lobby.players[1] }}
    </p>
  </div>
</template>
