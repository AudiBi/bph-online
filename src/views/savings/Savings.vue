<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
      <div>
        <h1 class="text-2xl font-bold text-primary">Épargne</h1>
        <p class="text-sm text-muted">Gérez vos économies et objectifs</p>
      </div>
      <RouterLink to="/savings/goals/new" class="btn-primary">Nouvel objectif</RouterLink>
    </div>

    <!-- Résumé -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <BaseCard title="Solde total">
        <p class="text-2xl font-bold">{{ totalSavings.toLocaleString() }} HTG</p>
        <p class="text-xs text-muted">Tous comptes épargne</p>
      </BaseCard>

      <BaseCard title="Objectifs actifs">
        <p class="text-2xl font-bold">{{ goals.length }}</p>
        <p class="text-xs text-muted">En cours</p>
      </BaseCard>

      <BaseCard title="Dernier dépôt">
        <p class="text-lg font-semibold">+25 000 HTG</p>
        <p class="text-xs text-muted">02 Jan 2026</p>
      </BaseCard>

      <BaseCard title="Rendement estimé">
        <p class="text-lg font-semibold text-green-700">+6.2 %</p>
        <p class="text-xs text-muted">Annuel</p>
      </BaseCard>
    </section>

    <!-- Objectifs -->
    <BaseCard title="Objectifs d’épargne">
      <div class="space-y-4">
        <div
          v-for="goal in goals"
          :key="goal.id"
          class="border rounded-lg p-4"
        >
          <div class="flex justify-between items-center mb-2">
            <p class="font-medium">{{ goal.name }}</p>
            <span class="text-sm text-muted">
              {{ goal.current.toLocaleString() }} / {{ goal.target.toLocaleString() }} HTG
            </span>
          </div>

          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-primary h-2 rounded-full"
              :style="{ width: goal.progress + '%' }"
            />
          </div>

          <div class="flex justify-between text-xs text-muted mt-1">
            <span>{{ goal.progress }} %</span>
            <span>Échéance : {{ goal.deadline }}</span>
          </div>
        </div>
      </div>
    </BaseCard>

  </div>
</template>

<script setup lang="ts">
import BaseCard from "@/components/BaseCard.vue"
import { computed } from "vue"

interface Goal {
  id: number
  name: string
  current: number
  target: number
  progress: number
  deadline: string
}

const goals: Goal[] = [
  { id: 1, name: "Maison", current: 300000, target: 500000, progress: 60, deadline: "Déc 2026" },
  { id: 2, name: "Voyage", current: 120000, target: 200000, progress: 60, deadline: "Août 2026" }
]

const totalSavings = computed(() =>
  goals.reduce((sum, g) => sum + g.current, 0)
)
</script>
