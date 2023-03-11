<script setup lang="ts">
import i18n from '@/i18n'
const { t } = i18n.global

const msg = t('hello')
</script>

<template>
  <h1 class="text-3xl font-bold underline bg-red-300">
    {{ msg }}
  </h1>
</template>

<style scoped></style>
