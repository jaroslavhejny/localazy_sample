<script setup lang="ts">
import {useError} from '#app'

const err = useError()

const info = computed(() => {
  const e: any = err.value
  return {
    statusCode: e?.statusCode,
    statusMessage: e?.statusMessage,
    data: e?.data,
    cause: e?.cause,
    message: e?.message,
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-6">
    <div class="max-w-xl w-full rounded-xl border p-6">
      <h1 class="text-2xl font-bold">{{ info.statusCode ?? 500 }}</h1>
      <p class="mt-2 text-gray-600">{{ info.statusMessage ?? 'Something went wrong' }}</p>

      <pre class="mt-4 text-xs bg-gray-100 p-3 rounded overflow-auto">
          {{ info }}
      </pre>

      <p v-if="info.data?.reason" class="mt-4">
        Reason: <b>{{ info.data.reason }}</b>
      </p>
      <p v-if="info.data?.taskId" class="mt-1">
        TaskId: <b>{{ info.data.taskId }}</b>
      </p>

    </div>
  </div>
</template>
