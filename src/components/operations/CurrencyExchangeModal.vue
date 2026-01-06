<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg w-full max-w-md p-6 relative">
      <button @click="$emit('close')" class="absolute top-3 right-3 text-gray-500 hover:text-gray-800">✖</button>

      <h2 class="text-lg font-bold mb-4">Opérations de change</h2>

      <form @submit.prevent="submitExchange" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Devise de départ</label>
          <select v-model="fromCurrency" class="mt-1 w-full border rounded p-2" required>
            <option value="">Sélectionnez</option>
            <option v-for="c in currencies" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium">Devise cible</label>
          <select v-model="toCurrency" class="mt-1 w-full border rounded p-2" required>
            <option value="">Sélectionnez</option>
            <option v-for="c in currencies" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium">Montant</label>
          <input v-model.number="amount" type="number" min="1" class="mt-1 w-full border rounded p-2" required />
        </div>

        <button type="submit" class="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark">
          Convertir
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const fromCurrency = ref("")
const toCurrency = ref("")
const amount = ref<number | null>(null)

const currencies = ["USD", "HTG", "EUR", "CAD"]

function submitExchange() {
  if (!fromCurrency.value || !toCurrency.value || !amount.value || amount.value <= 0) {
    alert("Veuillez remplir tous les champs correctement.")
    return
  }
  console.log("Conversion:", amount.value, fromCurrency.value, "→", toCurrency.value)
  alert(`Conversion simulée: ${amount.value} ${fromCurrency.value} → ${toCurrency.value}`)
}
</script>
