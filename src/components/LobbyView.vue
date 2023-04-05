<script lang="ts" setup>
import { useUsers } from '@/composables/useUsers'
import { User } from '@/types'
import { RouterLink } from 'vue-router'

const { opponentUser } = useUsers()

const setOpponent = (username: User):void => {
  opponentUser.value = username
}

// const chooseGame = (opponent: User): void => {
//   setOpponent(opponent)
// }
</script>

<template>
  <div
    class="container flex flex-col text-center gap-16 items-center mt-44 w-full"
  >
    <img
      class="w-5/8"
      src="@/assets/logo.png"
    >
    <h1 class="text-3xl font-bold p-8 text-[var(--main)]">
      Lobby
    </h1>
    <router-link to="/game">
      <!-- <button @click="chooseGame(User)">
        Click
      </button> -->
    </router-link>
  </div>
</template>
