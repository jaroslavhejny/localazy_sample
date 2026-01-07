<script setup lang="ts">
import type {TaskStatus} from "~~/types/types";
import Status from "~/components/common/Status.vue";

defineProps<{
  filterItem: TaskStatus;
  active: boolean
}>()

const emit = defineEmits<{
  (event: 'toggleFilterItem', filterItem: TaskStatus): void
}>()

</script>

<template>
  <Status :status="filterItem"
          class="px-1 cursor-pointer"
          @click="emit('toggleFilterItem', filterItem)"
  >
    <span v-if="active" class="px-0.5">&#10003;</span>
    {{ filterItem }}
  </Status>
</template>

<style scoped>

</style>