<script setup lang="ts">
import {type Size} from "~~/types/types";

const props = withDefaults(defineProps<{
  color?: string;
  size?: Size
}>(), {
  size: 'md'
})

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
}

const classes = computed(() => [
  `text-${props.color}-800`,
  SIZE_CLASSES[props.size],
])
</script>

<template>
  <button :class="classes">
    <slot/>
  </button>
</template>

<style scoped>

</style>