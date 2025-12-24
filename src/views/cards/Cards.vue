<template>
  <BaseCard title="Liste des cartes">
    <!-- Desktop Table -->
    <table class="hidden lg:table w-full text-sm">
      <thead>
        <tr>
          <th>Nom carte</th>
          <th>Numéro</th>
          <th>Type</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="card in cards" :key="card.id" class="border-b">
          <td>{{ card.name }}</td>
          <td>{{ card.number }}</td>
          <td>{{ card.type }}</td>
          <td class="text-right space-x-2">
            <RouterLink :to="`/cards/${card.id}`" class="btn-secondary">Détails</RouterLink>
            <RouterLink :to="`/cards/${card.id}/security`" class="btn-primary">Sécurité</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Mobile Cards -->
    <div class="lg:hidden space-y-4 mt-4">
      <BaseCard v-for="card in cards" :key="card.id" :title="card.name">
        <p>Numéro: {{ card.number }}</p>
        <p>Type: {{ card.type }}</p>
        <div class="mt-2 flex gap-2">
          <RouterLink :to="`/cards/${card.id}`" class="btn-secondary w-full">Détails</RouterLink>
          <RouterLink :to="`/cards/${card.id}/security`" class="btn-primary w-full">Sécurité</RouterLink>
        </div>
      </BaseCard>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from "@/components/BaseCard.vue";

interface Card {
  id: number;
  name: string;
  number: string;
  type: string;
}

const cards: Card[] = [
  { id: 1, name: "Visa Platinum", number: "**** **** **** 1234", type: "Crédit" },
  { id: 2, name: "MasterCard Gold", number: "**** **** **** 5678", type: "Débit" },
  { id: 3, name: "Visa Electron", number: "**** **** **** 9876", type: "Prépayée" }
];
</script>
