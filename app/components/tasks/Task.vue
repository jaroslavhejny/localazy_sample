<script setup lang="ts">
import type {Task} from "~~/types/types";
import Status from "~/components/common/Status.vue";

defineProps<{
  task: Task
}>()
</script>

<template>
  <div class="flex items-center gap-1">
    {{ task.title }}
    <Status :status="task.status"/>
  </div>
</template>

<style scoped>

</style>