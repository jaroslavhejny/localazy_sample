<script setup lang="ts">
import {TASK_STATUSES, type TaskStatus} from "~~/types/types";
import FilterItem from "~/components/filter/FilterItem.vue";

const props = defineProps<{
  activeFilter: TaskStatus | null
}>()

const filterItems = computed(() => {
  return TASK_STATUSES
})

const emit = defineEmits<{
  (event: "toggleFilterItem", status: TaskStatus | null): void
}>()

const onToggle = (filterItem: TaskStatus): void => {
  emit('toggleFilterItem',
      props.activeFilter === filterItem ? null : filterItem)
};
</script>

<template>
  <div class="flex items-center justify-center">
    <span class="mr-1">Filter tasks:</span>
    <FilterItem
        v-for="filterItem of filterItems"
        :key="filterItem"
        :filter-item="filterItem"
        :active="filterItem === activeFilter"
        @toggleFilterItem="onToggle"
    />
  </div>
</template>

<style scoped>

</style>