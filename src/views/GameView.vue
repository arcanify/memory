<script lang="ts" setup>
import { Score } from '@/types'
import { ComponentPublicInstance, ref } from 'vue'
import TopBar from '@/components/TopBar.vue'
import GameCard from '@/components/GameCard.vue'
import { useCategories } from '@/composables/useCategories'
import { useUsers } from '@/composables/useUsers'
import { useCards } from '@/composables/useCards'
import { CARD_SIDE_OPTIONS } from '@/constants'

const { users } = useUsers()

users.value.opponent = { username: 'test' }

const {
  shuffledAllCards,
  swappedCard,
  setSwappedCard,
  completePairedCards,
} = useCards()

const { selectedCategory, selectedPairsOption } = useCategories()

const score = ref<Score>({
  scoreUser: 0,
  scoreOpponent: 0,
})

const swappedCardEl = ref<HTMLElement | null>(null)
const allCardsRefs = ref<ComponentPublicInstance[] | null>(null)

// Ten delay, który ty chyba probowałeś użyć jak robiliśmy live coding
const delay = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms))

const clickCard = async (key: string, index: number): Promise<void> => {
  if (!allCardsRefs.value) return

  const card = allCardsRefs.value[index].$el as HTMLElement

  // Zabezpiecza przed zaliczeniem gdy klikniemy dwa razy tą samą kartę
  if(card === swappedCardEl.value) return

  // Karta obraca się zawsze na start, niezależnie czy jest dobrze czy źle
  card.children[CARD_SIDE_OPTIONS.front].classList.add('flip-front')
  card.children[CARD_SIDE_OPTIONS.back].classList.add('flip-back')

  if (!swappedCardEl.value) {
    swappedCardEl.value = card
  }

  if (swappedCard.value === key) {
    card.classList.add('completed')
    swappedCardEl.value.classList.add('completed')
    completePairedCards(key)

    swappedCardEl.value = null
    swappedCard.value = null
  } else if (swappedCard.value && swappedCard.value !== key) {
    // Delay dlatego że bez niego klasy dodane w 43 linii są od razu usuwane
    // i druga karta się nie obraca, z delayem wygląda to naturalnie
    await delay(1000)
    card.children[CARD_SIDE_OPTIONS.front].classList.remove('flip-front')
    card.children[CARD_SIDE_OPTIONS.back].classList.remove('flip-back')
    swappedCardEl.value.children[CARD_SIDE_OPTIONS.front].classList.remove(
      'flip-front'
    )
    swappedCardEl.value.children[CARD_SIDE_OPTIONS.back].classList.remove(
      'flip-back'
    )

    swappedCardEl.value = null
    swappedCard.value = null
  } else {
    setSwappedCard(key)
  }
}
</script>

<template>
  <div class="container flex flex-col text-center items-center">
    <h1 class="text-3xl font-bold p-8 text-[var(--main)]">
      {{ selectedCategory?.name }}
    </h1>
    <h2>{{ selectedPairsOption }} pairs</h2>
    <top-bar
      :category="selectedCategory"
      :users="users"
      :score="score"
    />
    <div class="grid grid-cols-4 gap-6 mt-8">
      <game-card
        v-for="(card, index) in shuffledAllCards"
        :id="card.pairingKey"
        :key="index"
        ref="allCardsRefs"
        :card="card"
        @click="clickCard(card.pairingKey, index)"
      />
    </div>
  </div>
</template>
