<template>
  <BaseCard title="Recharge mobile">
    <form class="space-y-4" @submit.prevent="submitRecharge">

      <!-- Opérateur -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Opérateur</label>
        <select v-model="mobile.operator" class="input-select w-full" :disabled="loading">
          <option value="" disabled>-- Sélectionnez --</option>
          <option value="MTN">MTN</option>
          <option value="Digicel">Digicel</option>
        </select>
      </div>

      <!-- Numéro de téléphone -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
        <input
          type="tel"
          v-model="mobile.number"
          placeholder="509 XXX XXXX"
          class="input-text w-full"
          :disabled="loading"
        />
      </div>

      <!-- Montant -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Montant</label>
        <input
          type="number"
          v-model.number="mobile.amount"
          placeholder="0.00"
          class="input-text w-full"
          min="1"
          :disabled="loading"
        />
      </div>

      <!-- Bouton -->
      <button
        type="submit"
        class="btn-primary w-full"
        :disabled="loading"
      >
        {{ loading ? "Traitement..." : "Recharger" }}
      </button>

    </form>

    <!-- Feedback -->
    <div
      v-if="status.message"
      class="mt-3 text-sm font-semibold transition-colors duration-300"
      :class="status.success ? 'text-green-500' : 'text-red-500'"
    >
      {{ status.message }}
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import BaseCard from "@/components/BaseCard.vue"

interface MobileRecharge {
  operator: string
  number: string
  amount: number
}

// Formulaire réactif
const mobile = reactive<MobileRecharge>({
  operator: "",
  number: "",
  amount: 0
})

// Loading & feedback
const loading = ref(false)
const status = reactive({ message: "", success: false })

// Émission d'événements vers le parent
const emit = defineEmits<{
  (e: 'recharge-success', payload: { operator: string, number: string, amount: number }): void
}>()

// Regex pour numéro haïtien valide
const phoneRegex = /^509\d{8}$/

/**
 * Soumettre la recharge
 */
const submitRecharge = async () => {
  // Validation
  if (!mobile.operator || !mobile.number || mobile.amount <= 0) {
    status.message = "Veuillez remplir tous les champs correctement"
    status.success = false
    return
  }

  if (!phoneRegex.test(mobile.number)) {
    status.message = "Numéro de téléphone invalide (ex : 509XXXXXXXX)"
    status.success = false
    return
  }

  loading.value = true
  status.message = ""

  try {
    // Simulation appel API / iPaaS
    await new Promise(resolve => setTimeout(resolve, 1500))

    const success = Math.random() > 0.05 // 95% de chance de succès pour la démo
    if (!success) throw new Error("Échec de la recharge, veuillez réessayer")

    // Succès
    status.message = `Recharge de ${mobile.amount} HTG effectuée pour ${mobile.number} (${mobile.operator})`
    status.success = true

    // Émettre l’événement vers le parent
    emit('recharge-success', { ...mobile })

    // Réinitialiser formulaire
    mobile.operator = ""
    mobile.number = ""
    mobile.amount = 0

  } catch (error) {
    status.message = (error as Error).message
    status.success = false
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
.btn-primary:hover {
  background-color: #2563eb;
}
</style>
