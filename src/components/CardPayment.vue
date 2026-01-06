<template>
  <BaseCard title="Paiement par carte">
    <form @submit.prevent="submitPayment" class="space-y-4">

      <!-- Sélection de la carte -->
      <div>
        <label class="block text-sm font-medium">Carte</label>
        <select v-model="payment.cardId" class="input" :disabled="loading || cards.length === 0">
          <option v-for="card in cards" :key="card.id" :value="card.id">
            {{ card.maskedNumber }} ({{ card.expiry }})
          </option>
        </select>
      </div>

      <!-- Montant -->
      <div>
        <label class="block text-sm font-medium">Montant</label>
        <input
          type="number"
          v-model.number="payment.amount"
          class="input"
          placeholder="HTG"
          min="1"
          required
          :disabled="loading"
        />
      </div>

      <!-- Devise -->
      <div>
        <label class="block text-sm font-medium">Devise</label>
        <select v-model="payment.currency" class="input" :disabled="loading">
          <option value="HTG">HTG</option>
          <option value="USD">USD</option>
        </select>
      </div>

      <!-- Bouton de paiement -->
      <button type="submit" class="btn btn-primary w-full" :disabled="loading || cards.length === 0">
        {{ loading ? 'Traitement...' : 'Payer' }}
      </button>

    </form>

    <!-- Statut du paiement -->
    <div v-if="status.message" class="mt-4 text-sm">
      <span :class="statusClass">{{ status.message }}</span>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue"
import BaseCard from "@/components/BaseCard.vue"

interface Card {
  id: string
  maskedNumber: string
  expiry: string
}

interface CardPayment {
  cardId: string
  amount: number
  currency: "HTG" | "USD"
}

// Exemple de cartes (peut provenir d'une API)
const cards: Card[] = [
  { id: "c1", maskedNumber: "**** **** **** 1234", expiry: "12/25" },
  { id: "c2", maskedNumber: "**** **** **** 5678", expiry: "11/24" },
]

// Valeur par défaut sécurisée
const defaultCardId = cards[0]?.id ?? ""

// Formulaire réactif
const payment = reactive<CardPayment>({
  cardId: defaultCardId,
  amount: 0,
  currency: "HTG",
})

const loading = ref(false)
const status = reactive({ message: "", success: false })

// Classe CSS pour le statut
const statusClass = computed(() => (status.success ? "text-green-500" : "text-red-500"))

// Soumission du paiement
async function submitPayment() {
  if (!payment.amount || payment.amount <= 0) {
    status.message = "Montant invalide"
    status.success = false
    return
  }

  if (!cards.find(c => c.id === payment.cardId)) {
    status.message = "Carte invalide"
    status.success = false
    return
  }

  loading.value = true
  status.message = ""

  try {
    // Simulation API
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Succès aléatoire pour la démo
    const success = Math.random() > 0.1
    if (success) {
      status.message = `Paiement de ${payment.amount} ${payment.currency} effectué !`
      status.success = true

      // Réinitialisation du formulaire
      payment.amount = 0
      payment.cardId = defaultCardId
      payment.currency = "HTG"
    } else {
      status.message = "Échec du paiement, veuillez réessayer"
      status.success = false
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid #d1d5db;
  padding: 0.5rem;
  border-radius: 0.375rem;
}
.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: bold;
}
.btn-primary {
  background-color: #3b82f6;
  color: white;
}
.btn-primary:hover {
  background-color: #2563eb;
}
</style>
