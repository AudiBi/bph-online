<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
      <div>
        <h1 class="text-2xl font-bold text-primary">Investissements</h1>
        <p class="text-sm text-muted">Suivez vos placements financiers</p>
      </div>
      <button class="btn-primary">Nouvel investissement</button>
    </div>

    <!-- Résumé -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <BaseCard title="Valeur totale">
        <p class="text-2xl font-bold">{{ totalValue.toLocaleString() }} HTG</p>
        <p class="text-xs text-muted">Portefeuille</p>
      </BaseCard>

      <BaseCard title="Performance">
        <p class="text-2xl font-bold text-green-700">+{{ performance }} %</p>
        <p class="text-xs text-muted">Global</p>
      </BaseCard>

      <BaseCard title="Actifs">
        <p class="text-2xl font-bold">{{ investments.length }}</p>
        <p class="text-xs text-muted">Placements actifs</p>
      </BaseCard>

      <BaseCard title="Dernière opération">
        <p class="text-sm">Achat obligations</p>
        <p class="text-xs text-muted">05 Jan 2026</p>
      </BaseCard>
    </section>

    <!-- Liste investissements -->
    <BaseCard title="Portefeuille">
      <!-- Desktop -->
      <table class="hidden lg:table w-full text-sm">
        <thead class="border-b text-muted text-left">
          <tr>
            <th>Actif</th>
            <th>Type</th>
            <th>Valeur</th>
            <th>Rendement</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="inv in investments" :key="inv.id" class="border-b">
            <td>{{ inv.name }}</td>
            <td>{{ inv.type }}</td>
            <td>{{ inv.value.toLocaleString() }} HTG</td>
            <td :class="inv.return > 0 ? 'text-green-700' : 'text-red-600'">
              {{ inv.return }} %
            </td>
            <td class="text-right">
              <button class="btn-secondary">Détails</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile -->
      <div class="lg:hidden space-y-4">
        <BaseCard
          v-for="inv in investments"
          :key="inv.id"
          :title="inv.name"
        >
          <p>Type : {{ inv.type }}</p>
          <p>Valeur : {{ inv.value.toLocaleString() }} HTG</p>
          <p :class="inv.return > 0 ? 'text-green-700' : 'text-red-600'">
            Rendement : {{ inv.return }} %
          </p>
          <button class="btn-secondary w-full mt-2">Détails</button>
        </BaseCard>
      </div>
    </BaseCard>

  </div>
</template>

<script setup lang="ts">
import BaseCard from "@/components/BaseCard.vue"
import { computed } from "vue"

interface Investment {
  id: number
  name: string
  type: string
  value: number
  return: number
}

const investments: Investment[] = [
  { id: 1, name: "Obligations État", type: "Obligation", value: 300000, return: 5.2 },
  { id: 2, name: "Actions BPH", type: "Action", value: 200000, return: 8.7 }
]

const totalValue = computed(() =>
  investments.reduce((sum, i) => sum + i.value, 0)
)

const performance = computed(() =>
  (investments.reduce((sum, i) => sum + i.return, 0) / investments.length).toFixed(1)
)
</script>
