<template>
  <label
    class="flex items-center justify-between gap-4 cursor-pointer select-none"
  >
    <!-- Label -->
    <div class="flex flex-col">
      <span class="font-medium text-gray-900">
        {{ label }}
      </span>
      <span v-if="description" class="text-sm text-muted">
        {{ description }}
      </span>
    </div>

    <!-- Switch -->
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      @click="toggle"
      class="relative inline-flex h-6 w-11 items-center rounded-full
             transition-colors duration-200 focus:outline-none
             focus:ring-2 focus:ring-primary/40"
      :class="modelValue ? 'bg-primary' : 'bg-gray-300'"
    >
      <span
        class="inline-block h-4 w-4 transform rounded-full bg-white
               transition-transform duration-200"
        :class="modelValue ? 'translate-x-6' : 'translate-x-1'"
      />
    </button>
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  label: string
  description?: string
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void
}>()

const toggle = () => {
  emit("update:modelValue", !props.modelValue)
}
</script>
