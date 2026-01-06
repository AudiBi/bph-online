<template>
  <div class="max-w-5xl mx-auto space-y-6">

    <Header
      title="Suivi de vos démarches"
      subtitle="Consultez l’état d’avancement de vos demandes bancaires"
    />

    <BaseCard title="Processus en cours">
      <div v-if="processes.length === 0" class="text-sm text-muted">
        Aucun processus actif pour le moment.
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
            />
          </div>
          <p class="text-xs text-muted mt-1">
            Avancement : {{ process.progress }} %
          </p>
        </div>

        <!-- Timeline -->
        <ul class="mt-4 text-sm space-y-1">
          <li
            v-for="(step, index) in processSteps[process.type]"
            :key="index"
            class="flex items-center gap-2"
          >
            <span v-if="indexStep(process, step) === 'done'" class="text-green-500 font-bold">✔</span>
            <span v-else-if="indexStep(process, step) === 'current'" class="text-yellow-500 font-bold">⏳</span>
            <span v-else class="text-gray-400">○</span>
            <span>{{ step }}</span>
          </li>
        </ul>
      </div>
    </BaseCard>

  </div>
</template>

<script setup lang="ts">
import BaseCard from "@/components/BaseCard.vue"
import { processes, processSteps, Process, simulateProcess } from "@/data/processes"

/**
 * Détermine l’état d’une étape pour la timeline
 */
function indexStep(process: Process, step: string): "done" | "current" | "pending" {
  const steps = processSteps[process.type]
  const currentIndex = steps.indexOf(process.statusMessage)
  const stepIndex = steps.indexOf(step)

  if (stepIndex < currentIndex) return "done"
  if (stepIndex === currentIndex) return "current"
  return "pending"
}

/**
 * Classe du badge selon l’avancement
 */
function badgeClass(progress: number) {
  if (progress === 100) return "badge-success"
  if (progress > 0) return "badge-warning"
  return "badge-muted"
}

/* =========================
   Optionnel : Simulation automatique pour démonstration
========================= */
processes.value.forEach(p => simulateProcess(p.id, 1500))
</script>
