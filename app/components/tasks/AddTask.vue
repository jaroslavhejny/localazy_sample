<script setup lang="ts">
import { TASK_STATUSES, type TaskStatus } from '~~/types/types'

const props = defineProps<{ submitting?: boolean }>()

const emit = defineEmits<{
  (e: 'submit', payload: { title: string; status: TaskStatus }): void
}>()

const taskName = ref('')

const disabled = computed(() => !taskName.value.trim().length || props.submitting)

function submitNewTask() {
  const title = taskName.value.trim()
  if (!title || props.submitting) return

  emit('submit', { title, status: TASK_STATUSES[0] })
  taskName.value = ''
}
</script>

<template>
  <div class="my-1 flex items-center gap-2">
    <input
        placeholder="Add new task"
        type="text"
        v-model="taskName"
        :disabled="submitting"
        class="rounded-md border px-2 py-1"
        @keydown.enter.prevent="submitNewTask"
    />

    <button
        class="text-green-800 w-6 bg-green-100 rounded-md border hover:bg-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="disabled"
        @click="submitNewTask"
    >
      +
    </button>
  </div>
</template>
