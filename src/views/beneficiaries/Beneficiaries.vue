<template>
  <div class="space-y-6">
  <!-- Header -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
      <div>
        <h1 class="text-2xl font-bold text-primary">Bénéficiaires</h1>
        <p class="text-sm text-muted">Gérez la liste de vos bénéficiaires pour effectuer des virements en toute simplicité</p>
      </div>
      <RouterLink to="/beneficiaries/new" class="btn-primary">Ajouter un bénéficiaire</RouterLink>
    </div>
  <BaseCard title="Bénéficiaires">
    <!-- Table desktop -->
    <table class="hidden lg:table w-full text-sm">
      <thead class="border-b text-left text-muted">
        <tr>
          <th class="px-4 py-2">Nom</th>
          <th class="px-4 py-2">Numéro / IBAN</th>
          <th class="px-4 py-2">Banque</th>
          <th class="px-4 py-2 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in beneficiaries" :key="b.id" class="border-b last:border-b-0">
          <td class="px-4 py-2">{{ b.name }}</td>
          <td class="px-4 py-2">{{ b.account }}</td>
          <td class="px-4 py-2">{{ b.bank }}</td>
          <td class="px-4 py-2 text-right">
            <RouterLink :to="`/transfers/local`" class="btn-secondary">Virement</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Mobile / Card view -->
    <div class="lg:hidden space-y-4 mt-4">
      <BaseCard v-for="b in beneficiaries" :key="b.id" :title="b.name">
        <p>Compte: {{ b.account }}</p>
        <p>Banque: {{ b.bank }}</p>
        <RouterLink :to="`/transfers/local`" class="btn-secondary mt-2 w-full">Virement</RouterLink>
      </BaseCard>
    </div>
  </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseCard from "@/components/BaseCard.vue"
import { RouterLink } from "vue-router"

interface Beneficiary {
  id: number
  name: string
  account: string
  bank: string
}

const beneficiaries: Beneficiary[] = [
  { id: 1, name: "Jean Dupont", account: "HTG-00123456", bank: "BPH" },
  { id: 2, name: "Marie Toussaint", account: "HTG-00987654", bank: "BPH" },
  { id: 3, name: "John Doe", account: "USD-00445566", bank: "Bank International" }
]
</script>
