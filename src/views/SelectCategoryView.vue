<script lang="ts" setup>
import { Category, Views } from '@/types'
import CategoryCard from '@/components/CategoryCard.vue'
import { useCategories } from '@/composables/useCategories'
import { useRouter } from 'vue-router'

const router = useRouter()
const { categories, selectedCategory } = useCategories()

const selectCategory = (category: Category): void => {
  selectedCategory.value = category
  router.push({
    name: Views.LOBBY,
  })
}
</script>

<template>
  <div
    class="container flex flex-col text-center gap-16 items-center mt-44 w-full"
  >
    <img
      class="w-5/8"
      src="@/assets/logo.png"
    >
    <div>
      <h1 class="text-3xl font-bold p-8 text-[var(--main)]">
        {{ $t('selectCategory') }}
      </h1>
      <div class="grid grid-cols-1 gap-4">
        <category-card
          v-for="(category, index) in categories"
          :key="index"
          :category="category"
          @click="selectCategory(category)"
        />
      </div>
    </div>
  </div>
</template>
