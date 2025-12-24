<template>
  <div class="space-y-6">

    <!-- Header compte -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <div>
        <h1 class="text-2xl font-bold text-primary">{{ account.name }}</h1>
        <p class="text-sm text-muted">{{ account.number }}</p>
      </div>
      <div class="flex gap-4 items-center mt-2 md:mt-0">
        <p class="text-lg font-semibold">
          {{ account.balance.toLocaleString() }} {{ account.currency }}
        </p>
        <RouterLink
          to="/transfers"
          class="btn-primary px-4 py-2"
        >
          Nouveau virement
        </RouterLink>
      </div>
    </div>

    <!-- Statut et info -->
    <BaseCard title="Informations">
      <div class="flex flex-col sm:flex-row sm:justify-between gap-4">
        <p><span class="font-semibold">Statut :</span> 
          <span :class="account.status === 'Active' ? 'text-green-700' : 'text-gray-600'">
            {{ account.status }}
          </span>
        </p>
        <p><span class="font-semibold">Devise :</span> {{ account.currency }}</p>
        <p><span class="font-semibold">Type :</span> {{ account.type }}</p>
      </div>
    </BaseCard>

    <!-- Filtre transactions -->
    <BaseCard title="Historique des transactions">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div class="flex gap-2 items-center">
          <label class="text-sm text-muted">Filtrer par :</label>
          <select v-model="filterType" class="input-select">
            <option value="">Tous</option>
            <option value="credit">Crédit</option>
            <option value="debit">Débit</option>
          </select>
          <input type="date" v-model="filterDate" class="input-text" />
        </div>
        <div class="flex gap-2">
          <button @click="exportCSV" class="btn-secondary">Exporter CSV</button>
          <button @click="exportPDF" class="btn-secondary">Exporter PDF</button>
        </div>
      </div>

      <!-- Table desktop -->
      <table class="w-full text-sm hidden lg:table">
        <thead class="border-b text-left text-muted">
          <tr>
            <th class="py-2">Date</th>
            <th>Type</th>
            <th>Description</th>
            <th>Montant</th>
            <th>Solde</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="tx in filteredTransactions"
            :key="tx.id"
            class="border-b last:border-b-0"
          >
            <td class="py-2">{{ tx.date }}</td>
            <td>{{ tx.type }}</td>
            <td>{{ tx.description }}</td>
            <td :class="tx.type === 'credit' ? 'text-green-700' : 'text-red-600'">
              {{ tx.amount.toLocaleString() }}
            </td>
            <td>{{ tx.balance.toLocaleString() }}</td>
            <td class="text-right space-x-2">
              <button class="btn-secondary">Voir</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile card view -->
      <div class="lg:hidden space-y-4">
        <BaseCard
          v-for="tx in filteredTransactions"
          :key="tx.id"
          :title="tx.type.toUpperCase() + ' - ' + tx.amount.toLocaleString()"
        >
          <p class="text-xs text-muted">{{ tx.date }}</p>
          <p>{{ tx.description }}</p>
          <p>Solde: {{ tx.balance.toLocaleString() }}</p>
          <button class="btn-secondary mt-2 w-full">Voir</button>
        </BaseCard>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import BaseCard from "@/components/BaseCard.vue"

interface Transaction {
  id: number
  date: string
  type: "credit" | "debit"
  description: string
  amount: number
  balance: number
}

interface Account {
  id: number
  name: string
  number: string
  balance: number
  currency: string
  status: "Active" | "Inactive"
  type: string
}

const account: Account = {
  id: 1,
  name: "Compte courant",
  number: "HTG-00123456",
  balance: 820000,
  currency: "HTG",
  status: "Active",
  type: "Courant"
}

// Exemple transactions
const transactions: Transaction[] = [
  { id: 1, date: "2026-01-02", type: "debit", description: "Paiement facture électricité", amount: 10000, balance: 810000 },
  { id: 2, date: "2026-01-03", type: "credit", description: "Salaire janvier", amount: 250000, balance: 1060000 },
  { id: 3, date: "2026-01-04", type: "debit", description: "Virement vers épargne", amount: 50000, balance: 1010000 }
]

const filterType = ref<string>("")
const filterDate = ref<string>("")

const filteredTransactions = computed(() => {
  return transactions.filter(tx => {
    const matchesType = filterType.value ? tx.type === filterType.value : true
    const matchesDate = filterDate.value ? tx.date === filterDate.value : true
    return matchesType && matchesDate
  })
})

// Export CSV / PDF simulé
const exportCSV = () => {
  alert("Export CSV simulé")
}

const exportPDF = () => {
  alert("Export PDF simulé")
}
</script>
