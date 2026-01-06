<template>
  <BaseCard title="Payer une facture">
    <form class="space-y-4" @submit.prevent="submitBill">

      <!-- Fournisseur -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Fournisseur</label>
        <select v-model="bill.provider" class="input-select w-full">
          <option value="" disabled>-- Sélectionnez --</option>
          <option value="EDH">EDH</option>
          <option value="MTN">MTN</option>
          <option value="Digicel">Digicel</option>
        </select>
      </div>

      <!-- Montant -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Montant</label>
        <input
          type="number"
          v-model.number="bill.amount"
          placeholder="0.00"
          class="input-text w-full"
          min="1"
        />
      </div>

      <!-- Référence -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Référence</label>
        <input
          type="text"
          v-model="bill.reference"
          placeholder="Ex: Facture 123"
          class="input-text w-full"
        />
      </div>

      <!-- Bouton -->
      <button
        type="submit"
        class="btn-primary w-full"
        :disabled="loading"
      >
        {{ loading ? "Traitement..." : "Payer" }}
      </button>

    </form>

    <!-- Feedback -->
    <div v-if="status.message" class="mt-3 text-sm" :class="status.success ? 'text-green-500' : 'text-red-500'">
      {{ status.message }}
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue"
import BaseCard from "@/components/BaseCard.vue"

interface Bill {
  provider: string
  amount: number
  reference: string
}

// Formulaire réactif
const bill = reactive<Bill>({
  provider: "",
  amount: 0,
  reference: ""
})

// Loading & feedback
const loading = ref(false)
const status = reactive({ message: "", success: false })

// Émission d'événements vers le parent
const emit = defineEmits<{
  (e: 'bill-success', payload: { provider: string, amount: number, reference: string }): void
}>()

/**
 * Soumettre le paiement de facture
 */
const submitBill = async () => {
  if (!bill.provider || bill.amount <= 0 || !bill.reference) {
    status.message = "Veuillez remplir tous les champs correctement"
    status.success = false
    return
  }

  loading.value = true
  status.message = ""

  try {
    // Simulation appel API
    await new Promise(resolve => setTimeout(resolve, 1500))

    const success = Math.random() > 0.05 // 95% de chance de succès pour démo
    if (success) {
      status.message = `Paiement de ${bill.amount} HTG effectué pour ${bill.provider} (Réf: ${bill.reference})`
      status.success = true

      // Émettre événement vers parent
      emit('bill-success', {
        provider: bill.provider,
        amount: bill.amount,
        reference: bill.reference
      })

      // Réinitialiser formulaire
      bill.provider = ""
      bill.amount = 0
      bill.reference = ""
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
.input-text, .input-select {
  width: 100%;
  border: 1px solid #d1d5db;
  padding: 0.5rem;
  border-radius: 0.375rem;
}
.btn-primary {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: bold;
  background-color: #3b82f6;
  color: white;
}
</style>
