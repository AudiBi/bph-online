<template>
  <BaseCard title="Tickets de support">
    <table class="w-full text-sm border">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2 text-left">Ticket</th>
          <th class="px-4 py-2 text-left">Statut</th>
          <th class="px-4 py-2 text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in tickets" :key="t.id" class="border-b hover:bg-gray-50">
          <td class="px-4 py-2">{{ t.title }}</td>
          <td class="px-4 py-2">{{ t.status }}</td>
          <td class="px-4 py-2">{{ t.date }}</td>
        </tr>
      </tbody>
    </table>

    <RouterLink to="/support/tickets/new" class="btn-primary mt-3 w-full text-center">Créer un nouveau ticket</RouterLink>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Ticket { id: number; title: string; status: string; date: string }

const tickets = ref<Ticket[]>([
  { id: 1, title: "Problème de virement", status: "Ouvert", date: "18 Déc 2025" },
  { id: 2, title: "Erreur carte", status: "En cours", date: "17 Déc 2025" }
])
</script>
