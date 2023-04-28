<script lang="ts" setup>
import { useCategories } from '@/composables/useCategories'
import { GAME_PAIRS_OPTIONS } from '@/constants'
import { onBeforeMount } from 'vue'
import { useApiClient } from '../composables/useApiClient'
import { useCards } from '@/composables/useCards'
import { useRoute } from 'vue-router'
import { useUsers } from '../composables/useUsers'
import { useRtdb } from '../composables/useRtdb'
import { shuffleArray } from '@/helpers'

const { selectedCategory, setSelectedPairsOption } = useCategories()
const { getCategoryCards } = useApiClient()
const { cards, pairs, setPairs } = useCards()
const {currentUser} = useUsers()
const {startLobby,getLobby,joinLobby} = useRtdb()
const route = useRoute()

const pairsOptions = Object.values(GAME_PAIRS_OPTIONS)

// Musi być async await bo bez tego nie zdąża zaciągnąć
// z Firebase kart i w drugim if-ie zwróci returna
onBeforeMount(async () => {
  const routeId = route.params.id as string
  const lobby = await getLobby(routeId)  
  
  // Jeśli lobby istnieje to dodaj użytkownika
  if(lobby) {
    joinLobby(routeId, 'guestUser')
  }
  // Jeśli lobby nie istnieje to je stwórz
  else { 
    if (!selectedCategory.value) return
    if (!cards.value) return
    if (currentUser.value === null) return
    
    await getCategoryCards(selectedCategory.value.key)
    setPairs(cards.value)
    shuffleArray(pairs.value)
    
    startLobby(routeId, currentUser.value.username)
  }

  // Jeśli obaj gracze są w lobby to start odliczania (log na teraz)
  const isLobbyReady = async(): Promise<void> => {
    if(lobby?.players.length === 2) {
      alert('READY')
    }
  }
  await isLobbyReady()

  // Działa po odświeżeniu lobby, trzeba zrobić jakiś watcher
})
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
      {{ $t('lobby') }}
    </h1>
    <h2 class="text-medium font-bold text-[var(--main)]">
      {{ selectedCategory?.name }}
    </h2>
    <div class="flex gap-4">
      <button
        v-for="(option, index) in pairsOptions"
        :key="index"
        class="w-14 h-14 bg-[var(--main)] text-white rounded"
        @click="setSelectedPairsOption(option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>
