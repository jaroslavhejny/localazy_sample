<script setup lang="ts">
import {type Size, TASK_STATUSES, type TaskStatus} from "~~/types/types";

const props = withDefaults(defineProps<{
  status?: TaskStatus;
  size?: Size
}>(), {
  status: TASK_STATUSES[0],
  size: 'sm'
})

const STATUS_CLASSES: Record<TaskStatus, string> = {
  todo: 'bg-gray-300 text-gray-800',
  'in-progress': 'bg-yellow-300 text-yellow-800',
  done: 'bg-green-300 text-green-800',
}

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
}

const classes = computed(() => [
  'relative inline-flex items-center rounded-full group font-medium',
  STATUS_CLASSES[props.status],
  SIZE_CLASSES[props.size],
])

</script>

<template>
  <div :class="classes">
    <slot>{{ status }}</slot>
  </div>
</template>

<style scoped>

</style>