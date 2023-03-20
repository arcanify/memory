<script lang="ts" setup>
import { ref } from 'vue'
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'

const getUser = async(): Promise<void> => {  
  const querySnapshot = await getDocs(collection(db, 'test'))
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data())
  })
}

const username = ref<string>('')
const handleStartGame = (user: string): string => {
  console.log(user)
  return user
}
</script>

<template>
  <div class="container flex flex-col gap-16 items-center mt-44 w-full">
    <img
      class="w-5/8"
      src="../assets/logo.png"
    >
    <form
      class="relative flex flex-col gap-4"
      @submit.prevent="handleStartGame(username)"
    >
      <input
        id="username_input"
        v-model="username"
        class="block rounded px-2.5 pb-2.5 pt-5 w-full text-sm border border-black appearance-none focus:outline-none focus:ring-0 focus:border-[var(--main)] peer"
        type="text"
        placeholder=" "
      >
      <label
        for="username_input"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-[var(--main)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
      >Username</label>
      <button
        class="w-7/8 h-14 bg-[var(--main)] text-white rounded"
        type="submit"
      >
        Start Game
      </button>
      <button
        class="w-7/8 h-14 bg-[var(--main)] text-white rounded"
        type="button" @click="getUser"
      >
        Test firebase
      </button>
    </form>
    <p>{{ username }}</p>
  </div>
</template>
