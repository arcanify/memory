<script lang="ts" setup>
import { useCategories } from '@/composables/useCategories'
import { useUsers } from '@/composables/useUsers'
import { User } from '@/types'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const tmpUser = ref<User>({ username: 'kowalski' })

const { opponentUser } = useUsers()
const {selectedCategory} = useCategories()

const setOpponent = (username: User): void => {
  opponentUser.value = username
}

const chooseGame = (opponent: User): void => {
  setOpponent(opponent)
}
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
    <h2 class="text-medium font-bold text-[var(--main)]">
      {{ selectedCategory?.category }}
    </h2>
    <div>
      <p>Game vs 'kowalski' 4 pairs</p>
      <router-link to="/game/4">
        <button class="w-7/8 h-14 bg-[var(--main)] text-white rounded" @click="chooseGame(tmpUser)">
          Click
        </button>
      </router-link>
    </div>
    <div>
      <p>Game vs 'kowalski' 8 pairs</p>
      <router-link to="/game/8">
        <button class="w-7/8 h-14 bg-[var(--main)] text-white rounded" @click="chooseGame(tmpUser)">
          Click
        </button>
      </router-link>
    </div>
  </div>
</template>
