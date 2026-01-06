<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg w-full max-w-md p-6 relative">
      <button @click="$emit('close')" class="absolute top-3 right-3 text-gray-500 hover:text-gray-800">✖</button>

      <h2 class="text-lg font-bold mb-4">Transactions crypto</h2>

      <form @submit.prevent="submitCrypto" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Type de transaction</label>
          <select v-model="type" class="mt-1 w-full border rounded p-2" required>
            <option value="">Sélectionnez</option>
            <option value="buy">Acheter</option>
            <option value="sell">Vendre</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium">Cryptomonnaie</label>
          <select v-model="crypto" class="mt-1 w-full border rounded p-2" required>
            <option value="">Sélectionnez</option>
            <option v-for="c in cryptos" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium">Montant</label>
          <input v-model.number="amount" type="number" min="0.0001" step="0.0001" class="mt-1 w-full border rounded p-2" required />
        </div>

        <button type="submit" class="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark">
          Confirmer
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const type = ref("")
const crypto = ref("")
const amount = ref<number | null>(null)

const cryptos = ["BTC", "ETH", "USDT", "ADA"]

function submitCrypto() {
  if (!type.value || !crypto.value || !amount.value || amount.value <= 0) {
    alert("Veuillez remplir tous les champs correctement.")
    return
  }
  console.log("Transaction crypto:", type.value, amount.value, crypto.value)
  alert(`Transaction simulée: ${type.value} ${amount.value} ${crypto.value}`)
}
</script>
