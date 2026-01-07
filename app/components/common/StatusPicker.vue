<script setup lang="ts">
import { type TaskStatus, TASK_STATUSES } from '~~/types/types'
import Status from '~/components/common/Status.vue'

const props = withDefaults(defineProps<{
  modelValue: TaskStatus
  options?: TaskStatus[]
  saving?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}>(), {
  options: () => [...TASK_STATUSES],
  disabled: false,
  size: 'lg',
  saving: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: TaskStatus): void
  (e: 'change', value: TaskStatus): void
}>()

const open = ref(false)

function select(status: TaskStatus) {
  emit('update:modelValue', status)
  emit('change', status)
  open.value = false
}
</script>

<template>
  <div class="relative inline-flex">
    <button
        type="button"
        class="inline-flex"
        :disabled="disabled"
        @click="open = !open"
    >
      <Status :status="modelValue" :size="size">{{ saving ? 'Updating' : modelValue}}</Status>
    </button>

    <div
        v-if="open"
        class="absolute right-0 top-full mt-2 rounded-md border bg-white shadow p-2 z-10 w-max"
    >
      <button
          v-for="status in options"
          :key="status"
          type="button"
          class="block w-full text-left px-2 py-1 rounded hover:bg-gray-100"
          @click="select(status)"
      >
        <Status :status="status" size="sm" />
      </button>
    </div>
  </div>
</template>
