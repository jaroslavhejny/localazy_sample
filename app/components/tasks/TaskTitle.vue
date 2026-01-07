<script setup lang="ts">

import IconButton from "~/components/common/IconButton.vue";

const titleClasses =
    'block text-3xl font-bold text-center leading-tight ' +
    'px-3 py-2 min-h-[3rem]'

const props = withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
  saving?: boolean
}>(), {
  placeholder: 'Enter new title',
  saving: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'save', value: string): void
}>()

const isEditing = ref(false)
const draft = ref(props.modelValue)
const inputRef = ref<HTMLInputElement | null>(null)

watch(() => props.modelValue, (v) => {
  if (!isEditing.value) draft.value = v
})

async function startEdit() {
  isEditing.value = true
  draft.value = props.modelValue
  await nextTick()
  inputRef.value?.focus()
  inputRef.value?.select()
}

function cancelEdit() {
  isEditing.value = false
  draft.value = props.modelValue
}

function saveEdit() {
  const value = draft.value
  if (!value) return

  emit('update:modelValue', value)
  emit('save', value)
  isEditing.value = false
}
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <h1 v-if="!isEditing" :class="[titleClasses, saving  && 'text-gray-200']">
      {{ modelValue }}
    </h1>

    <input
        v-else
        ref="inputRef"
        v-model="draft"
        :class="[
          titleClasses,
          'w-full max-w-md rounded-md border border-gray-300',
          'focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
        ]"
        :placeholder="placeholder"
        @keydown.enter.prevent="saveEdit"
        @keydown.esc.prevent="cancelEdit"
    />

      <IconButton
          v-if="!isEditing"
          color="green"
          size="lg"
          @click="startEdit"
          aria-label="Edit title"
      >
        &#x270E;
      </IconButton>

      <div v-else class="flex items-center gap-1">
        <IconButton color="green" size="lg" @click="saveEdit" aria-label="Save">
          &check;
        </IconButton>
        <IconButton color="red" size="lg" @click="cancelEdit" @mousedown.prevent aria-label="Cancel">
          &cross;
        </IconButton>
      </div>
  </div>
</template>
