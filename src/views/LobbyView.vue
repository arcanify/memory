<script lang="ts" setup>
import { useCategories } from '@/composables/useCategories'
import { GAME_PAIRS_OPTIONS } from '@/constants'
import { onBeforeMount } from 'vue'
import { useApiClient } from '../composables/useApiClient'
import { useCards } from '@/composables/useCards'
import { useRoute, useRouter } from 'vue-router'
import { useUsers } from '@/composables/useUsers'
import { useLobby } from '@/composables/useLobby'
import { shuffleArray } from '@/helpers'
import { Views } from '@/types'

const { selectedCategory, setSelectedPairsOption } = useCategories()
const { getCategoryCards } = useApiClient()
const { cards, pairs, setPairs } = useCards()
const { currentUser } = useUsers()
const { lobby, isLobbyReady, startLobby, getLobby, listenLobby } = useLobby()
const route = useRoute()
const router = useRouter()

const pairsOptions = Object.values(GAME_PAIRS_OPTIONS)

onBeforeMount(async () => {
  const routeId = route.params.id as string
  await getLobby(routeId)
  listenLobby(routeId)
  
  // Jeśli lobby już istnieje to
  if (lobby.value) {
    // Jeśli lobby nie jest gotowe to przekieruj użytkownika, jeśli jest to póki co nic
    if (!isLobbyReady.value) {
      router.push({
        name: Views.HOME,
      })
    }
  } else {
    if (!selectedCategory.value) return
    if (!cards.value) return
    if (currentUser.value === null) return

    await getCategoryCards(selectedCategory.value.key)
    setPairs(cards.value)
    shuffleArray(pairs.value)

    startLobby(routeId, currentUser.value.username, selectedCategory.value.name)
  }
})
</script>

<template>
  <div
    v-if="lobby"
    class="container flex flex-col text-center gap-16 items-center mt-44 w-full"
  >
    <img
      class="w-5/8"
      src="@/assets/logo.png"
    >
    <h1 class="text-3xl font-bold p-8 text-[var(--main)]">
      {{ $t('lobby') }}
    </h1>
    <button
      v-if="isLobbyReady"
      class="w-14 h-14 bg-[var(--main)] text-white rounded"
    >
      Ready
    </button>
    <p>
      {{ lobby.players }}
    </p>
    <h2 class="text-medium font-bold text-[var(--main)]">
      {{ lobby.category }}
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
