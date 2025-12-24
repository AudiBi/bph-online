<template>
  <BaseCard title="Virement international">
    <form class="space-y-6" @submit.prevent="submitTransfer">
      
      <!-- Bénéficiaire -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Bénéficiaire</label>
        <select v-model="transfer.beneficiaryId" class="input-select w-full">
          <option value="" disabled>-- Sélectionnez un bénéficiaire --</option>
          <option v-for="b in internationalBeneficiaries" :key="b.id" :value="b.id">
            {{ b.name }} - {{ b.bank }}
          </option>
        </select>
      </div>

      <!-- Montant et devise -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Montant</label>
          <input
            type="number"
            v-model.number="transfer.amount"
            placeholder="0.00"
            class="input-text w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Devise</label>
          <select v-model="transfer.currency" class="input-select w-full">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="HTG">HTG</option>
            <!-- Ajouter d'autres devises selon besoin -->
          </select>
        </div>
      </div>

      <!-- Référence et description -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Référence</label>
        <input
          type="text"
          v-model="transfer.reference"
          placeholder="Ex: Facture 123"
          class="input-text w-full"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Motif / Description</label>
        <textarea
          v-model="transfer.description"
          rows="3"
          class="input-text w-full"
        ></textarea>
      </div>

      <!-- Bouton de soumission -->
      <button
        type="submit"
        class="btn-primary w-full py-2"
      >
        Effectuer le virement
      </button>
    </form>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from "@/components/BaseCard.vue"
import { reactive } from "vue"

interface Beneficiary {
  id: number
  name: string
  bank: string
  account: string
  currency: string
}

interface Transfer {
  beneficiaryId: number | null
  amount: number
  currency: string
  reference: string
  description: string
}

// Exemple bénéficiaires internationaux
const internationalBeneficiaries: Beneficiary[] = [
  { id: 1, name: "John Doe", bank: "Bank of America", account: "US123456789", currency: "USD" },
  { id: 2, name: "Marie Curie", bank: "BNP Paribas", account: "FR987654321", currency: "EUR" },
  { id: 3, name: "Ali Khan", bank: "HSBC London", account: "GB11223344", currency: "GBP" }
]

const transfer = reactive<Transfer>({
  beneficiaryId: null,
  amount: 0,
  currency: "USD",
  reference: "",
  description: ""
})

// Soumission du formulaire
const submitTransfer = () => {
  if (!transfer.beneficiaryId || transfer.amount <= 0) {
    alert("Veuillez remplir tous les champs obligatoires correctement.")
    return
  }
  alert(`Virement de ${transfer.amount} ${transfer.currency} vers le bénéficiaire sélectionné effectué !`)
}
</script>

<style scoped>
.input-text {
  @apply border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-primary focus:border-primary w-full;
}

.input-select {
  @apply border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-primary focus:border-primary w-full;
}
</style>
