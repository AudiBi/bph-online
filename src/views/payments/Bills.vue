<template>
  <div class="max-w-4xl mx-auto space-y-6">

    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-primary">Paiement de factures</h1>
      <p class="text-sm text-muted">
        Effectuez vos paiements et suivez l’avancement en temps réel.
      </p>
    </div>

    <!-- Composant de paiement de factures -->
    <BillPayment @bill-success="addProcess" />

    <!-- Timeline des paiements -->
    <BaseCard title="Suivi d’avancement des paiements">
      <div v-if="processes.length === 0" class="text-sm text-muted">
        Aucun paiement en cours.
      </div>

      <div
        v-for="process in processes"
        :key="process.id"
        class="border rounded-lg p-4 mb-4"
      >
        <!-- En-tête -->
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <p class="font-semibold">{{ process.type }}</p>
            <p class="text-xs text-muted">Démarré le {{ process.date }}</p>
          </div>

          <span
            class="badge"
            :class="badgeClass(process.progress)"
          >
            {{ process.statusMessage }}
          </span>
        </div>

        <!-- Barre de progression -->
        <div class="mt-3">
          <div class="w-full bg-gray-200 h-2 rounded">
            <div
              class="bg-primary h-2 rounded transition-all"
              :style="{ width: process.progress + '%' }"
              role="progressbar"
              :aria-valuenow="process.progress"
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
          <p class="text-xs text-muted mt-1">
            Avancement : {{ process.progress }} %
          </p>
        </div>
      </div>
    </BaseCard>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import BaseCard from "@/components/BaseCard.vue"
import BillPayment from "@/components/BillPayment.vue"

interface Process {
  id: string
  type: string
  progress: number
  statusMessage: string
  date: string
}

const processes = ref<Process[]>([])

/**
 * Ajouter un paiement à la timeline
 */
function addProcess(details: { provider: string, amount: number, reference: string }) {
  const now = new Date()
  processes.value.push({
    id: "bill-" + Date.now(),
    type: "Paiement facture",
    progress: 100,
    statusMessage: `Paiement de ${details.amount} HTG pour ${details.provider} (Réf: ${details.reference})`,
    date: now.toLocaleString()
  })
}

/**
 * Classe du badge selon l’avancement
 */
function badgeClass(progress: number) {
  if (progress === 100) return "badge-success"
  if (progress > 0) return "badge-warning"
  return "badge-muted"
}
</script>

<style scoped>
.badge-success {
  background-color: #22c55e;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
}
.badge-warning {
  background-color: #facc15;
  color: black;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
}
.badge-muted {
  background-color: #e5e7eb;
  color: black;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
}
</style>
