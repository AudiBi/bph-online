<template>
  <div class="max-w-4xl mx-auto space-y-8 p-4">

    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-primary mb-2">Autres opérations bancaires</h1>
      <p class="text-sm text-muted">
        Gérez vos services complémentaires : chéquier, change, crypto et certificats
      </p>
    </div>

    <!-- Module OtherOperations -->
    <OtherOperations />

  </div>
</template>

<script setup lang="ts">
import OtherOperations from "@/components/OtherOperations.vue"
</script>

<style scoped>
/* Styles spécifiques si nécessaire */
</style>
