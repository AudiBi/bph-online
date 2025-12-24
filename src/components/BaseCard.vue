<template>
  <section
    class="bg-white rounded-xl border border-gray-100 shadow-sm
           p-4 sm:p-6 space-y-4"
  >
    <!-- Header -->
    <header
      v-if="hasHeader"
      class="flex items-start justify-between gap-4"
    >
      <div>
        <h3 v-if="title" class="text-lg font-semibold text-gray-900">
          {{ title }}
        </h3>
        <p v-if="subtitle" class="text-sm text-muted">
          {{ subtitle }}
        </p>
      </div>

      <!-- Actions slot -->
      <div v-if="$slots.actions">
        <slot name="actions" />
      </div>
    </header>

    <!-- Divider -->
    <hr v-if="divider" class="border-gray-100" />

    <!-- Content -->
    <div>
      <slot />
    </div>

    <!-- Footer -->
    <footer
      v-if="$slots.footer"
      class="pt-4 border-t border-gray-100"
    >
      <slot name="footer" />
    </footer>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  title?: string
  subtitle?: string
  divider?: boolean
}>()

const hasHeader = computed(() => !!props.title || !!props.subtitle)
</script>
