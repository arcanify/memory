<script lang="ts" setup>
import { ref } from 'vue'
import { useApiClient } from '@/composables/useApiClient'
import { Category } from '@/types'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  id: string
}>()

const { getCategory } = useApiClient()

const category = ref<Category | null>(null)

getCategory(props.id).then((value) => {
  category.value = value
})
</script>

<template>
  <router-link to="/lobby">
    <div
      class="relative transition-all duration-200 cursor-pointer filter grayscale-[60%] hover:grayscale-0"
    >
      <img
        class="rounded-md object-cover h-48 w-96"
        :src="category?.image"
      >
      <span
        class="absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 text-2xl text-white font-medium"
      >
        {{ category?.category }}
      </span>
    </div>
  </router-link>
</template>
