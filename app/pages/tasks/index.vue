<script setup lang="ts">
import type {TaskStatus} from "~~/types/types";
import { useTasks } from '~~/composables/useTasks'
import AddTask from "~/components/tasks/AddTask.vue";
import Task from "~/components/tasks/Task.vue";
import BaseButton from "~/components/common/BaseButton.vue";
import Filter from "~/components/filter/Filter.vue";
import Status from "~/components/common/Status.vue";

const activeStatus = ref<TaskStatus | null>(null)
const { tasks, pending, error, refresh, creating, createTask } = useTasks()

const filteredTasks = computed(() =>
    !activeStatus.value
        ? tasks.value
        : tasks.value?.filter(task => task.status === activeStatus.value)
)
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8 text-secondary">
      <h1 class="text-3xl font-bold text-center mb-8">Localazy Tasks</h1>
      <div class="flex flex-wrap justify-between mb-1">
        <BaseButton :disabled="pending" @click="refresh()">&#x21bb; Reload tasks</BaseButton>
        <Filter :active-filter="activeStatus"
                @toggleFilterItem="activeStatus = $event"/>
      </div>

      <div v-if="pending">Loading tasks...</div>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <ul v-else>
        <li>
          <AddTask :submitting="creating" @submit="createTask" />
        </li>
        <template v-if="filteredTasks?.length">
        <li v-for="task in filteredTasks" :key="task.id" class="w-max">
          <NuxtLink :to="`/tasks/${task.id}`">
            <Task :task="task"/>
          </NuxtLink>
        </li>
          </template>
        <template v-else>
          <div class="flex items-center gap-2 text-gray-500">
            No tasks
            <template v-if="activeStatus">
              in state <Status :status="activeStatus" size="sm" />
            </template>
          </div>
        </template>

      </ul>

    </div>
  </div>
</template>

