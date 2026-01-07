<script setup lang="ts">

import BaseButton from "~/components/common/BaseButton.vue";
import TaskTitle from "~/components/tasks/TaskTitle.vue";
import StatusPicker from "~/components/common/StatusPicker.vue";
import {useTaskDetail} from "~~/composables/useTaskDetail";

definePageMeta({ middleware: ['task-id'] })


const route = useRoute()
const taskId = computed(() => String(route.params.id))
const {
  task, pending,
  title, status,
  savingTitle, savingStatus,
  updateTitle, updateStatus,
} = useTaskDetail(taskId)

</script>


<template>
  <div v-if="pending">Loading task with id: {{ task }}</div>
  <div v-else class="mt-3">
    <div class="grid grid-cols-3 items-center">
      <div>
        <NuxtLink :to="`/tasks/`">
          <BaseButton class="ml-2">Show all tasks</BaseButton>
        </NuxtLink>
      </div>

      <TaskTitle v-model="title" :saving="savingTitle" @save="(newTitle) => updateTitle(newTitle)" />
      <div class="flex justify-end">
        <StatusPicker
            v-if="task"
            v-model="status"
            :saving="savingStatus"
            @change="updateStatus"
        />
      </div>
    </div>
    <div class="mt-10 text-center text-gray-300">Some other task values (description, time, assignee etc.)</div>
  </div>
</template>
