<template>
  <div class="max-w-5xl mx-auto space-y-6 py-6">

    <!-- Header -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-800">Encaissements</h1>
      <p class="text-sm text-gray-500 mt-1">
        Déposez un chèque électronique ou autres dépôts et suivez l’historique.
      </p>
    </div>

    <!-- Formulaire de dépôt -->
    <DepositForm @deposit-success="addDeposit" />

    <!-- Timeline des dépôts -->
    <BaseCard title="Historique des encaissements">
      <div v-if="deposits.length === 0" class="text-sm text-gray-400">
        Aucun encaissement enregistré.
      </div>

      <ul v-else class="space-y-4">
        <li
          v-for="entry in deposits"
          :key="entry.id"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
        >
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <p class="font-semibold text-gray-700">{{ entry.typeLabel }}</p>
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
import { ref } from "vue"
import BaseCard from "@/components/BaseCard.vue"
import DepositForm from "@/components/DepositForm.vue"

interface DepositHistory {
  id: string
  type: "cheque" | "autre"
  typeLabel: string
  description: string
  date: string
}

const deposits = ref<DepositHistory[]>([])

/**
 * Ajouter un dépôt depuis le formulaire
 */
function addDeposit(details: { type: "cheque" | "autre"; description: string }) {
  const now = new Date()
  deposits.value.unshift({
    id: "deposit-" + Date.now(),
    type: details.type,
    typeLabel: details.type === "cheque" ? "Chèque électronique" : "Autres dépôts",
    description: details.description,
    date: now.toLocaleString()
  })
}

/**
 * Classe pour badge selon le type de dépôt
 */
function badgeClass(type: string) {
  switch (type) {
    case "cheque": return "bg-blue-500 text-white"
    case "autre": return "bg-green-500 text-white"
    default: return "bg-gray-300 text-gray-700"
  }
}
</script>
