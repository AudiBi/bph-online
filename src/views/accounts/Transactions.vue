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
          {{ formatCurrency(account.balance, account.currency) }}
        </p>
        <RouterLink
          to="/transfers"
          class="btn-primary px-4 py-2"
        >
          Nouveau virement
        </RouterLink>
      </div>
    </div>

    <!-- Informations compte -->
    <BaseCard title="Informations">
      <div class="flex flex-col sm:flex-row sm:justify-between gap-4">
        <p>
          <span class="font-semibold">Statut :</span>
          <span :class="statusClasses(account.status)">{{ account.status }}</span>
        </p>
        <p><span class="font-semibold">Devise :</span> {{ account.currency }}</p>
        <p><span class="font-semibold">Type :</span> {{ account.type }}</p>
      </div>
    </BaseCard>

    <!-- Filtres & export -->
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

      <!-- Totaux -->
      <div class="flex flex-wrap gap-4 mb-4">
        <BaseCard title="Total Crédit" class="flex-1">
          <p class="text-green-700 font-semibold">{{ formatCurrency(totalCredit, account.currency) }}</p>
        </BaseCard>
        <BaseCard title="Total Débit" class="flex-1">
          <p class="text-red-600 font-semibold">{{ formatCurrency(totalDebit, account.currency) }}</p>
        </BaseCard>
        <BaseCard title="Solde final" class="flex-1">
          <p class="font-semibold">{{ formatCurrency(filteredBalance, account.currency) }}</p>
        </BaseCard>
      </div>

      <!-- Table desktop -->
      <div class="overflow-x-auto hidden lg:block">
        <table class="w-full text-sm border-collapse">
          <thead class="border-b text-left text-muted">
            <tr>
              <th class="py-2 px-3">Date</th>
              <th>Type</th>
              <th>Description</th>
              <th>Montant</th>
              <th>Solde</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tx in paginatedTransactions" :key="tx.id" class="border-b last:border-b-0 hover:bg-gray-50">
              <td class="py-2 px-3">{{ formatDate(tx.date) }}</td>
              <td :class="amountClasses(tx.type)">{{ tx.type === 'credit' ? 'Crédit' : 'Débit' }}</td>
              <td>{{ tx.description }}</td>
              <td class="font-semibold">{{ formatCurrency(tx.amount, account.currency) }}</td>
              <td>{{ formatCurrency(tx.balance, account.currency) }}</td>
              <td class="text-right">
                <button class="btn-secondary" @click="selectTransaction(tx)">Voir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile card view -->
      <div class="lg:hidden space-y-4">
        <BaseCard
          v-for="tx in paginatedTransactions"
          :key="tx.id"
          :title="tx.type === 'credit' ? 'Crédit' : 'Débit'"
        >
          <p class="text-xs text-muted">{{ formatDate(tx.date) }}</p>
          <p class="font-medium">{{ tx.description }}</p>
          <p class="mt-1 font-semibold">{{ formatCurrency(tx.amount, account.currency) }}</p>
          <p class="text-xs text-muted">Solde: {{ formatCurrency(tx.balance, account.currency) }}</p>
          <button class="btn-secondary mt-2 w-full" @click="selectTransaction(tx)">Voir</button>
        </BaseCard>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center gap-2 mt-4">
        <button
          class="btn-secondary px-3 py-1"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Précédent
        </button>
        <span class="px-3 py-1">{{ currentPage }} / {{ totalPages }}</span>
        <button
          class="btn-secondary px-3 py-1"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Suivant
        </button>
      </div>

    </BaseCard>

    <!-- Modal transaction -->
    <div v-if="selectedTransaction" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div class="bg-white rounded-lg p-6 w-11/12 max-w-md relative">
        <button class="absolute top-2 right-2 text-gray-500" @click="selectedTransaction = null">✖</button>
        <h2 class="text-xl font-bold mb-2">{{ selectedTransaction.type === 'credit' ? 'Crédit' : 'Débit' }}</h2>
        <p><span class="font-semibold">Date:</span> {{ formatDate(selectedTransaction.date) }}</p>
        <p><span class="font-semibold">Description:</span> {{ selectedTransaction.description }}</p>
        <p><span class="font-semibold">Montant:</span> {{ formatCurrency(selectedTransaction.amount, account.currency) }}</p>
        <p><span class="font-semibold">Solde après transaction:</span> {{ formatCurrency(selectedTransaction.balance, account.currency) }}</p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
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

// Récupération ID compte
const route = useRoute()
const accountId = Number(route.params.id)

// Exemple compte
const account: Account = {
  id: accountId,
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
  { id: 3, date: "2026-01-04", type: "debit", description: "Virement vers épargne", amount: 50000, balance: 1010000 },
  { id: 4, date: "2026-01-05", type: "debit", description: "Paiement eau", amount: 5000, balance: 1005000 },
  { id: 5, date: "2026-01-06", type: "credit", description: "Prime", amount: 50000, balance: 1055000 },
  // ajouter plus si besoin pour tester pagination
]

const filterType = ref<string>("")
const filterDate = ref<string>("")
const currentPage = ref(1)
const pageSize = 3
const selectedTransaction = ref<Transaction | null>(null)

const filteredTransactions = computed(() => {
  return transactions.filter(tx => {
    const matchesType = filterType.value ? tx.type === filterType.value : true
    const matchesDate = filterDate.value ? tx.date === filterDate.value : true
    return matchesType && matchesDate
  })
})

const totalPages = computed(() => Math.ceil(filteredTransactions.value.length / pageSize))
const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredTransactions.value.slice(start, start + pageSize)
})

// Totaux
const totalCredit = computed(() =>
  filteredTransactions.value.filter(tx => tx.type === "credit").reduce((sum, tx) => sum + tx.amount, 0)
)
const totalDebit = computed(() =>
  filteredTransactions.value.filter(tx => tx.type === "debit").reduce((sum, tx) => sum + tx.amount, 0)
)
const filteredBalance = computed(() =>
  account.balance + totalCredit.value - totalDebit.value
)

// Classes utilitaires
const statusClasses = (status: string) => status === "Active" ? "text-green-700" : "text-gray-600"
const amountClasses = (type: string) => type === "credit" ? "text-green-700" : "text-red-600"

// Formatage
const formatCurrency = (amount: number, currency: string) =>
  amount.toLocaleString("fr-HT", { style: "currency", currency })
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("fr-HT", { day: "2-digit", month: "short", year: "numeric" })

// Actions
const selectTransaction = (tx: Transaction) => selectedTransaction.value = tx
const exportCSV = () => alert("Export CSV simulé")
const exportPDF = () => alert("Export PDF simulé")
</script>
