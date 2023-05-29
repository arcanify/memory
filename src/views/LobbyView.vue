<script lang="ts" setup>
import { useCategories } from '@/composables/useCategories'
import { onBeforeMount } from 'vue'
import { useApiClient } from '@/composables/useApiClient'
import { useCards } from '@/composables/useCards'
import { useRoute, useRouter } from 'vue-router'
import { useUsers } from '@/composables/useUsers'
import { useLobby } from '@/composables/useLobby'
import { shuffleCards } from '@/helpers'
import { Views } from '@/types'

const { selectedCategory } = useCategories()
const { getCategoryCards } = useApiClient()
const { cards, shuffledCards } = useCards()
const { user } = useUsers()
const { lobby, isLobbyReady, startLobby, getLobby, listenLobby } = useLobby()
const route = useRoute()
const router = useRouter()

const startGame = (): void => {
  router.push({
    name: Views.GAME,
  })
}

onBeforeMount(async () => {
  const routeId = route.params.id as string
  await getLobby(routeId)
  listenLobby(routeId)

  if (lobby.value) {
    if (!isLobbyReady.value) {
      router.push({
        name: Views.HOME,
      })
    }
  } else {
    if (!selectedCategory.value) return
    if (!cards.value) return
    if (user.value === null) return

    await getCategoryCards(selectedCategory.value.key)
    shuffleCards(cards.value)

    startLobby(
      routeId,
      user.value.username,
      selectedCategory.value.name,
      shuffledCards.value,
      null
    )
  }
})
</script>

<template>
  <div
    v-if="lobby"
    class="container flex flex-col text-center gap-8 items-center mt-44 w-full px-4"
  >
    <img
      class="max-w-[200px] w-8/12"
      src="@/assets/logo.png"
    >
    <h1 class="text-3xl font-bold p-8 text-[var(--main)]">
      {{ $t('lobby') }}
    </h1>
    <h2 class="text-medium font-bold text-[var(--main)]">
      {{ lobby.category }}
    </h2>
    <p v-if="!isLobbyReady">
      {{ $t('lobbyShareInstruction') }}
    </p>
    <p v-if="isLobbyReady">
      {{ $t('player') }} "{{ lobby.players.player2 }}" {{ $t('joinedLobbyInfo') }}
    </p>
    <div class="flex gap-4">
      <button
        v-if="isLobbyReady"
        class="w-28 h-14 bg-[var(--main)] text-white rounded"
        @click="startGame"
      >
        {{ $t('startGame') }}
      </button>
    </div>
  </div>
</template>
