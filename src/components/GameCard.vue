<script lang="ts" setup>
import { Card } from '@/types'

interface Props {
  card: Card
}

defineProps<Props>()
</script>

<template>
  <div
    class="relative transition-all duration-200 cursor-pointer"
  >
    <img
      class="rounded object-cover w-20 h-20"
      :src="card.image"
    >
  </div>
</template>
