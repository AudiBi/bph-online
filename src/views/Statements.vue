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
      </div>
    </div>

    <!-- Filtres de relevés -->
    <BaseCard title="Filtres">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex gap-2 items-center">
          <label class="text-sm text-muted">Du :</label>
          <input type="date" v-model="filterStart" class="input-text" />
          <label class="text-sm text-muted">Au :</label>
          <input type="date" v-model="filterEnd" class="input-text" />
        </div>
        <div class="flex gap-2">
          <button @click="exportCSV" class="btn-secondary">Exporter CSV</button>
          <button @click="exportPDF" class="btn-secondary">Exporter PDF</button>
        </div>
      </div>
    </BaseCard>

    <!-- Table desktop -->
    <BaseCard title="Relevés">
      <table class="w-full text-sm hidden lg:table">
        <thead class="border-b text-left text-muted">
          <tr>
            <th class="py-2">Date</th>
            <th>Description</th>
            <th>Montant</th>
            <th>Solde</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="statement in filteredStatements"
            :key="statement.id"
            class="border-b last:border-b-0"
          >
            <td class="py-2">{{ statement.date }}</td>
            <td>{{ statement.description }}</td>
            <td :class="statement.amount >= 0 ? 'text-green-700' : 'text-red-600'">
              {{ statement.amount.toLocaleString() }}
            </td>
            <td>{{ statement.balance.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile card view -->
      <div class="lg:hidden space-y-4 mt-4">
        <BaseCard
          v-for="statement in filteredStatements"
          :key="statement.id"
          :title="statement.date"
        >
          <p class="text-sm font-medium">{{ statement.description }}</p>
          <p :class="statement.amount >= 0 ? 'text-green-700' : 'text-red-600'">
            Montant: {{ statement.amount.toLocaleString() }}
          </p>
          <p>Solde: {{ statement.balance.toLocaleString() }}</p>
        </BaseCard>
      </div>
    </BaseCard>

  </div>
</template>


<script setup lang="ts">
import { ref, computed } from "vue"
import BaseCard from "@/components/BaseCard.vue"

interface Statement {
  id: number
  date: string
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

// Exemple relevés
const statements: Statement[] = [
  { id: 1, date: "2026-01-01", description: "Virement entrant", amount: 50000, balance: 870000 },
  { id: 2, date: "2026-01-02", description: "Paiement facture électricité", amount: -10000, balance: 860000 },
  { id: 3, date: "2026-01-03", description: "Virement vers épargne", amount: -50000, balance: 810000 }
]

const filterStart = ref<string>("")
const filterEnd = ref<string>("")

const filteredStatements = computed(() => {
  return statements.filter(s => {
    const afterStart = filterStart.value ? s.date >= filterStart.value : true
    const beforeEnd = filterEnd.value ? s.date <= filterEnd.value : true
    return afterStart && beforeEnd
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
