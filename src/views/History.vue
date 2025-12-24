<template>
  <section>
    <h2>Historique des transactions</h2>
    <table class="history-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Montant</th>
          <th>Devise</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tx in transactions" :key="tx.id">
          <td>{{ tx.date }}</td>
          <td>{{ tx.type }}</td>
          <td>{{ tx.amount }}</td>
          <td>{{ tx.currency }}</td>
          <td>{{ tx.status }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue"

type Transaction = {
  id: number
  date: string
  type: string
  amount: number
  currency: string
  status: string
}

export default defineComponent({
  name: "History",
  data() {
    return {
      transactions: [
        { id: 1, date: "2025-09-10", type: "Virement", amount: 5000, currency: "HTG", status: "Succès" },
        { id: 2, date: "2025-09-08", type: "Paiement", amount: 2000, currency: "HTG", status: "En attente" },
        { id: 3, date: "2025-09-05", type: "Retrait", amount: 100, currency: "USD", status: "Succès" }
      ] as Transaction[]
    }
  }
})
</script>

<style scoped>
.history-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.history-table th,
.history-table td {
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  text-align: left;
}

.history-table th {
  background-color: #003366;
  color: white;
}
</style>
