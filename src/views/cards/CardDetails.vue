<template>
  <div class="space-y-6 p-4">

    <!-- Header Carte -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <div>
        <h1 class="text-2xl font-bold text-primary">{{ card.name }}</h1>
        <p class="text-sm text-muted">Numéro: {{ card.number }}</p>
      </div>
      <div class="flex gap-4 items-center mt-2 md:mt-0">
        <p class="text-lg font-semibold">
          {{ card.balance.toLocaleString() }} {{ card.currency }}
        </p>
        <RouterLink
          :to="`/cards/${card.id}/security`"
          class="btn-primary px-4 py-2"
        >
          Sécurité
        </RouterLink>
      </div>
    </div>

    <!-- Détails Carte -->
    <BaseCard title="Informations de la carte">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p><span class="font-semibold">Type :</span> {{ card.type }}</p>
        <p><span class="font-semibold">Statut :</span>
          <span :class="card.status === 'Active' ? 'text-green-700' : 'text-red-600'">
            {{ card.status }}
          </span>
        </p>
        <p><span class="font-semibold">Date d'expiration :</span> {{ card.expiry }}</p>
        <p><span class="font-semibold">Banque émettrice :</span> {{ card.bank }}</p>
      </div>
    </BaseCard>

    <!-- Transactions Carte -->
    <BaseCard title="Historique des transactions">
      <table class="w-full text-sm hidden lg:table">
        <thead class="border-b text-left text-muted">
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Montant</th>
            <th>Solde</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tx in card.transactions" :key="tx.id" class="border-b last:border-b-0">
            <td>{{ tx.date }}</td>
            <td>{{ tx.description }}</td>
            <td :class="tx.type === 'credit' ? 'text-green-700' : 'text-red-600'">
              {{ tx.amount.toLocaleString() }}
            </td>
            <td>{{ tx.balance.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile -->
      <div class="lg:hidden space-y-4">
        <BaseCard v-for="tx in card.transactions" :key="tx.id"
                  :title="tx.type.toUpperCase() + ' - ' + tx.amount.toLocaleString()">
          <p class="text-xs text-muted">{{ tx.date }}</p>
          <p>{{ tx.description }}</p>
          <p>Solde: {{ tx.balance.toLocaleString() }}</p>
        </BaseCard>
      </div>
    </BaseCard>

  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import BaseCard from "@/components/BaseCard.vue"

interface Transaction {
  id: number
  date: string
  type: "credit" | "debit"
  description: string
  amount: number
  balance: number
}

interface CardDetail {
  id: number
  name: string
  number: string
  type: string
  status: "Active" | "Inactive"
  expiry: string
  bank: string
  balance: number
  currency: string
  transactions: Transaction[]
}

// Récupération de l'ID depuis la route
const route = useRoute()
const router = useRouter()
const cardId = Number(route.params.id)

// Exemple de cartes (à remplacer par API réelle)
const cards: CardDetail[] = [
  {
    id: 1,
    name: "Visa Gold",
    number: "4111 1111 1111 1111",
    type: "Crédit",
    status: "Active",
    expiry: "12/26",
    bank: "BPH Banque",
    balance: 500000,
    currency: "HTG",
    transactions: [
      { id: 1, date: "2026-01-05", type: "debit", description: "Supermarché", amount: 20000, balance: 480000 },
      { id: 2, date: "2026-01-10", type: "credit", description: "Remboursement", amount: 10000, balance: 490000 }
    ]
  }
]

// Chercher la carte
const foundCard = cards.find(c => c.id === cardId)
if (!foundCard) {
  router.replace("/cards")
  throw new Error("Carte introuvable")
}

// On utilise reactive pour éviter les warnings TypeScript
const card = reactive(foundCard)
</script>
