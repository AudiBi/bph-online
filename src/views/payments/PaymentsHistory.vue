<template>
  <div class="max-w-5xl mx-auto space-y-6 py-6">

    <!-- Header -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-800">Historique des paiements</h1>
      <p class="text-sm text-gray-500 mt-1">
        Consultez et filtrez vos paiements par carte, factures ou recharges.
      </p>
    </div>

    <!-- Filtres -->
    <div class="flex flex-col sm:flex-row sm:justify-between gap-4">
      <select v-model="filterType" class="input-select w-full sm:w-1/3">
        <option value="">-- Tous les types --</option>
        <option value="Paiement facture">Paiement facture</option>
        <option value="Paiement par carte">Paiement par carte</option>
        <option value="Recharge mobile">Recharge mobile</option>
      </select>

      <input
        type="text"
        v-model="searchText"
        placeholder="Rechercher par montant, référence ou numéro"
        class="input-text w-full sm:w-2/3"
      />
    </div>

    <!-- Timeline filtrée -->
    <BaseCard title="Opérations effectuées">
      <div v-if="filteredHistory.length === 0" class="text-sm text-gray-400">
        Aucun paiement correspondant aux critères.
      </div>

      <ul v-else class="space-y-4">
        <li
          v-for="entry in filteredHistory"
          :key="entry.id"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
        >
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <p class="font-semibold text-gray-700">{{ entry.type }}</p>
              <p class="text-xs text-gray-500">{{ entry.date }}</p>
            </div>
            <span
              class="px-3 py-1 rounded-full text-xs font-medium"
              :class="badgeClass(entry.type)"
            >
              {{ entry.description }}
            </span>
          </div>
        </li>
      </ul>
    </BaseCard>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import BaseCard from "@/components/BaseCard.vue"

interface PaymentHistory {
  id: string
  type: string
  description: string
  date: string
}

const history = ref<PaymentHistory[]>([
  { id: '1', type: 'Paiement facture', description: 'EDH 1500 HTG (Réf: F123)', date: '2025-12-29 10:15' },
  { id: '2', type: 'Recharge mobile', description: '500 HTG pour 50912345678 (MTN)', date: '2025-12-28 14:30' },
  { id: '3', type: 'Paiement par carte', description: '1200 HTG avec carte John Doe', date: '2025-12-27 09:45' }
])

const filterType = ref<string>("")
const searchText = ref<string>("")

// Filtrer et rechercher dans l’historique
const filteredHistory = computed(() => {
  return history.value.filter(entry => {
    const matchesType = filterType.value ? entry.type === filterType.value : true
    const matchesText = searchText.value
      ? entry.description.toLowerCase().includes(searchText.value.toLowerCase())
      : true
    return matchesType && matchesText
  })
})

function badgeClass(type: string) {
  switch (type) {
    case 'Paiement facture': return 'bg-blue-500 text-white'
    case 'Recharge mobile': return 'bg-green-500 text-white'
    case 'Paiement par carte': return 'bg-yellow-400 text-gray-800'
    default: return 'bg-gray-300 text-gray-700'
  }
}
</script>
