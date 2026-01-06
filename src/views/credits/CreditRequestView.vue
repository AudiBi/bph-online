<template>
  <div class="max-w-4xl mx-auto space-y-6">

    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-primary">Demande de crédit</h1>
      <p class="text-sm text-muted">
        Soumettez votre demande et suivez son avancement en temps réel
      </p>
    </div>

    <!-- Formulaire de demande -->
    <CreditRequest />

    <!-- Suivi des processus -->
    <BaseCard title="Suivi d’avancement">
      <div v-if="processes.length === 0" class="text-sm text-muted">
        Aucune demande en cours.
      </div>

      <div
        v-for="process in processes"
        :key="process.id"
        class="border-b py-3 last:border-b-0"
      >
        <div class="flex justify-between items-center">
          <p class="font-medium">
            {{ process.type }}
          </p>
          <span class="text-xs text-muted">
            {{ process.date }}
          </span>
        </div>

        <p class="text-sm text-muted mt-1">
          {{ process.statusMessage }}
        </p>

        <div class="w-full bg-gray-200 h-2 rounded mt-2">
          <div
            class="bg-primary h-2 rounded transition-all"
            :style="{ width: process.progress + '%' }"
          />
        </div>
      </div>
    </BaseCard>

  </div>
</template>

<script setup lang="ts">
import BaseCard from "@/components/BaseCard.vue"
import CreditRequest from "@/components/credits/CreditRequest.vue"
import { processes } from "@/data/processes"
</script>
