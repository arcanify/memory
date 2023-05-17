<script lang="ts" setup>
import { ref } from 'vue'
import { useApiClient } from '@/composables/useApiClient'
import { useLobby } from '@/composables/useLobby'

const { createUser } = useApiClient()
const { lobby } = useLobby()

const username = ref<string>('')
</script>

<template>
  <div class="container flex flex-col gap-16 items-center mt-44 w-full px-4">
    <img
      class="max-w-[200px] w-8/12"
      src="@/assets/logo.png"
    >
    <form
      class="relative flex flex-col gap-4 max-w-xs w-full"
      @submit.prevent="createUser(username)"
    >
      <input
        id="username_input"
        v-model="username"
        class="block rounded px-2.5 pb-2.5 pt-5 w-full text-sm border border-black appearance-none focus:outline-none focus:ring-0 focus:border-[var(--main)] peer"
        type="text"
        placeholder=" "
        required
        pattern=".*\S+.*"
      >
      <label
        for="username_input"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-[var(--main)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {{ $t('username') }}
      </label>
      <button
        class="h-14 bg-[var(--main)] text-white rounded"
        type="submit"
      >
        {{ lobby ? $t('joinLobby') : $t('startGame') }}
      </button>
    </form>
  </div>
</template>
