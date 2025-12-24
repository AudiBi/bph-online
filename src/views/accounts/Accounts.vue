<template>
  <div class="space-y-6">

    <!-- Titre de la page -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <h1 class="text-2xl font-bold text-primary">Mes comptes</h1>
      <span class="text-sm text-muted">Tous vos comptes actifs</span>
    </div>

    <!-- Résumé comptes -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <BaseCard title="Solde total">
        <p class="text-2xl font-bold text-primary">
          HTG {{ totalBalance.toLocaleString() }}
        </p>
        <p class="text-xs text-muted">Tous comptes confondus</p>
      </BaseCard>

      <BaseCard title="Comptes actifs">
        <p class="text-2xl font-bold">{{ accounts.length }}</p>
        <p class="text-xs text-muted">En cours d’utilisation</p>
      </BaseCard>

      <BaseCard title="Compte principal">
        <p class="font-semibold">{{ mainAccount?.name ?? 'N/A' }}</p>
        <p class="text-xs text-muted">
          {{ mainAccount?.balance.toLocaleString() ?? 0 }} HTG
        </p>
      </BaseCard>

      <BaseCard title="Dernière opération">
        <p class="text-sm">Virement sortant</p>
        <p class="text-xs text-muted">02 Jan 2026</p>
      </BaseCard>
    </section>

    <!-- Liste des comptes -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- Mobile / Card view -->
      <div class="lg:hidden space-y-4">
        <BaseCard
          v-for="account in accounts"
          :key="account.id"
          :title="account.name" 
        >
          <div class="flex justify-between items-start">
            <div>
              <p class="font-medium">{{ account.name }}</p>
              <p class="text-xs text-muted">{{ account.number }}</p>
            </div>
            <span
              class="text-xs px-2 py-1 rounded-full"
              :class="account.status === 'Active'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-200 text-gray-600'"
            >
              {{ account.status }}
            </span>
          </div>

          <div class="mt-4">
            <p class="text-lg font-semibold">
              {{ account.balance.toLocaleString() }} {{ account.currency }}
            </p>
            <p class="text-xs text-muted">Solde disponible</p>
          </div>

          <div class="mt-4 flex gap-2">
            <RouterLink
              :to="`/accounts/${account.id}`"
              class="btn-primary w-full"
            >
              Détails
            </RouterLink>
            <RouterLink
              :to="`/accounts/${account.id}/transactions`"
              class="btn-secondary"
            >
              Voir l'historique
          </RouterLink>
          <RouterLink
            :to="`/accounts/${account.id}/statements`"
            class="btn-secondary"
          >
            Relevés
          </RouterLink>
            <RouterLink
              to="/transfers"
              class="btn-secondary w-full"
            >
              Virement
            </RouterLink>
          </div>
        </BaseCard>
      </div>

      <!-- Desktop / Table view -->
      <BaseCard title="Tous les comptes" class="hidden lg:block lg:col-span-2">
        <table class="w-full text-sm">
          <thead class="text-left border-b text-muted">
            <tr>
              <th class="py-3">Compte</th>
              <th>Numéro</th>
              <th>Solde</th>
              <th>Devise</th>
              <th>Statut</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="account in accounts"
              :key="account.id"
              class="border-b last:border-b-0"
            >
              <td class="py-3 font-medium">{{ account.name }}</td>
              <td class="text-muted">{{ account.number }}</td>
              <td class="font-semibold">{{ account.balance.toLocaleString() }}</td>
              <td>{{ account.currency }}</td>
              <td>
                <span
                  class="text-xs px-2 py-1 rounded-full"
                  :class="account.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'"
                >
                  {{ account.status }}
                </span>
              </td>
              <td class="text-right space-x-2">
                <RouterLink
                  :to="`/accounts/${account.id}`"
                  class="btn-secondary"
                >
                  Détails
                </RouterLink>
                <RouterLink
                  :to="`/accounts/${account.id}/transactions`"
                  class="btn-secondary"
                >
                  Voir l'historique
                </RouterLink>
                <RouterLink
                  :to="`/accounts/${account.id}/statements`"
                  class="btn-secondary"
                >
                  Relevés
                </RouterLink>

                <RouterLink
                  to="/transfers"
                  class="btn-primary"
                >
                  Virement
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </BaseCard>

    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import BaseCard from "@/components/BaseCard.vue"

interface Account {
  id: number
  name: string
  number: string
  balance: number
  currency: string
  status: "Active" | "Inactive"
}

const accounts: Account[] = [
  { id: 1, name: "Compte courant", number: "HTG-00123456", balance: 820000, currency: "HTG", status: "Active" },
  { id: 2, name: "Compte épargne", number: "HTG-00987654", balance: 430000, currency: "HTG", status: "Active" },
  { id: 3, name: "Compte USD", number: "USD-00445566", balance: 3200, currency: "USD", status: "Inactive" }
]

// Total balance
const totalBalance = computed(() =>
  accounts.reduce((sum, acc) => sum + acc.balance, 0)
)

// Compte principal
const mainAccount = accounts[0]
</script>
