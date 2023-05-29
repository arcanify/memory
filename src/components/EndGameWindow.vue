<script lang="ts" setup>
import { useLobby } from '@/composables/useLobby'
import { Views } from '@/types'
import { Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { delay } from '@/helpers'

const { lobby, isLobbyReady } = useLobby()
const router = useRouter()

const result = ref<string | null>(null)

const endGame = async (): Promise<void> => {
  localStorage.clear()
  lobby.value = null
  isLobbyReady.value = false
  router.push({
    name: Views.HOME,
  })
}

const resultCheck = async(): Promise<Ref<string | null>> => {
  const overlay = document.querySelector('.overlay')
  overlay?.classList.remove('hidden')

  await delay(10)

  if (lobby.value && lobby.value.score.player1 !== lobby.value.score.player2) {
    result.value =
      lobby.value.score.player1 > lobby.value.score.player2
        ? (lobby.value.players.player1)
        : (lobby.value.players.player2)
  } else {
    result.value = 'draw'
  }
  return result
}
resultCheck()
</script>

<template>
  <div
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-1/2 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(50%)] max-h-full"
  >
    <div class="relative w-full max-h-full">
      <div class="relative bg-white rounded-lg shadow">
        <div
          class="flex flex-col items-center justify-between gap-4 p-4 border-b rounded-t"
        >
          <h2
            v-if="lobby"
            class="text-2xl font-bold p-2 text-[var(--main)]"
          >
            {{ result === 'draw' ? $t('draw') : $t('winner') }}
          </h2>
          <h3
            v-if="result !== 'draw'"
            class="text-4xl font-bold p-4 text-[var(--main)]"
          >
            {{ result }}
          </h3>
          <h4 class="text-xl font-medium p-2">
            {{ lobby?.score.player1 }} : {{ lobby?.score.player2 }}
          </h4>
          <button
            class="w-28 h-14 bg-[var(--main)] text-white rounded"
            @click="endGame"
          >
            {{ $t('home') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
