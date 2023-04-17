<script lang="ts" setup>
import { Card } from '@/types'

interface Props {
  card: Card
}

defineProps<Props>()
</script>

<template>
  <div class="card relative w-20 h-20">
    <div
      class="card__side card__side--front absolute top-0 left-0 w-full h-full transition-all duration-700 cursor-pointer rounded-2xl overflow-hidden bg-cover bg-center"
      :style="{
        backgroundImage: `url(${card.backImage})`,
      }"
    />
    <div
      class="card__side card__side--back absolute top-0 left-0 w-full h-full transition-all duration-700 cursor-pointer rounded-2xl overflow-hidden bg-cover bg-center"
      :style="{
        backgroundImage: `url(${card.frontImage})`,
      }"
    />
  </div>
</template>

<style lang="scss" scoped>
.card {
  &__side {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    
    &--back {
      transform: rotateY(180deg);
    }
  }
}
.flip-front {
  transform: rotateY(-180deg);
}
.flip-back {
  transform: rotateY(0);
}
</style>
