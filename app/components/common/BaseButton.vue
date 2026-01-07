<script setup lang="ts">

</script>

<template>
  <button
      class="inline-flex items-center gap-2
    rounded-md px-1 py-0.5 text-sm
    bg-gray-100 text-gray-800
    hover:bg-gray-200
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
  >
    <slot/>
  </button>
</template>

<style scoped>

</style>