<template>
  <div
    class="container flex flex-col text-center gap-16 items-center mt-44 w-full px-4"
  >
    <img
      class="max-w-[200px] w-8/12"
      src="@/assets/logo.png"
    >
    <h1 class="text-3xl font-bold p-8 text-[var(--main)]">
      {{ $t('notFound') }}
    </h1>
    <router-link to="/">
      <button
        class="w-28 h-14 bg-[var(--main)] text-white rounded"
      >
        {{ $t('home') }}
      </button>
    </router-link>
  </div>
</template>
