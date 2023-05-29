<script lang="ts" setup>
import type { CategoryCard } from '@/types'

defineProps<CategoryCard>()
</script>

<template>
  <div
    class="relative transition-all duration-200 cursor-pointer filter grayscale-[60%] hover:grayscale-0"
  >
    <img
      class="rounded-md object-cover h-48 w-96"
      :src="category.image"
    >
    <span
      class="absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 text-2xl text-white font-medium"
    >
      {{ category.name }}
    </span>
  </div>
</template>
