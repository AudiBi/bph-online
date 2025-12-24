<template>
  <button
    class="group flex flex-col items-center justify-center gap-2 p-4 rounded-lg border
           hover:bg-bph-primary transition text-sm font-medium"
  >
    <!-- L'icône suit le hover -->
    <component
      :is="icon"
      class="w-6 h-6 text-bph-primary group-hover:text-white transition-colors"
    />
    <span class="group-hover:text-white text-gray-700">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  icon: any
}>()
</script>
