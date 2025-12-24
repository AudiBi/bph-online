<template>
  <BaseCard title="Historique des paiements">
    <table class="w-full text-sm hidden lg:table">
      <thead>
        <tr class="text-left text-muted border-b">
          <th>Date</th>
          <th>Type</th>
          <th>Destinataire / Opérateur</th>
          <th>Montant</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in payments" :key="p.id" class="border-b last:border-b-0">
          <td>{{ p.date }}</td>
          <td>{{ p.type }}</td>
          <td>{{ p.target }}</td>
          <td :class="p.type === 'Recharge' ? 'text-green-700' : 'text-blue-700'">{{ p.amount.toLocaleString() }}</td>
          <td class="text-right">
            <button class="btn-secondary">Voir</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Mobile card view -->
    <div class="lg:hidden space-y-4 mt-4">
      <BaseCard v-for="p in payments" :key="p.id" :title="p.type + ' - ' + p.amount.toLocaleString()">
        <p>Date: {{ p.date }}</p>
        <p>Destinataire / Opérateur: {{ p.target }}</p>
        <button class="btn-secondary mt-2 w-full">Voir</button>
      </BaseCard>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from "@/components/BaseCard.vue"

interface Payment {
  id: number
  date: string
  type: string
  target: string
  amount: number
}

const payments: Payment[] = [
  { id: 1, date: "2026-01-02", type: "Facture", target: "EDH", amount: 12000 },
  { id: 2, date: "2026-01-03", type: "Recharge", target: "MTN", amount: 5000 },
  { id: 3, date: "2026-01-04", type: "Facture", target: "Digicel", amount: 8000 }
]
</script>
