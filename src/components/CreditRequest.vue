<template>
  <BaseCard title="Demande de crédit">
    <form @submit.prevent="submitCreditRequest" class="space-y-4">
      <div>
        <label>Montant</label>
        <input type="number" v-model.number="form.amount" class="input-text" />
      </div>
      <div>
        <label>Type de crédit</label>
        <select v-model="form.type" class="input-select">
          <option value="Consommation">Consommation</option>
          <option value="Hypothécaire">Hypothécaire</option>
          <option value="Commercial">Commercial</option>
        </select>
      </div>
      <button type="submit" class="btn-primary w-full">Soumettre</button>
    </form>

    <!-- Suivi des processus -->
    <div v-if="processes.length" class="mt-6 space-y-2">
      <h3 class="font-medium">Suivi d’avancement</h3>
      <div v-for="process in processes" :key="process.id" class="border-b py-2">
        <div class="flex justify-between">
          <p>{{ process.type }} - {{ process.date }}</p>
          <p class="text-sm text-muted">{{ process.statusMessage }}</p>
        </div>
        <div class="w-full bg-gray-200 h-2 rounded mt-1">
          <div
            class="bg-primary h-2 rounded"
            :style="{ width: process.progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { processes, addProcess, advanceProcess } from "@/data/processes"

const form = ref({
  amount: 0,
  type: "Consommation" as "Consommation" | "Hypothécaire" | "Commercial"
})

const submitCreditRequest = () => {
  if (form.value.amount <= 0) {
    alert("Veuillez saisir un montant valide.")
    return
  }

  const processType = `Demande de crédit - ${form.value.type}` as const
  const newProcess = addProcess(processType)
  advanceProcess(newProcess.id)

  alert("Demande de crédit envoyée ! Vous pouvez suivre son avancement ci-dessous.")
  form.value = { amount: 0, type: "Consommation" }
}
</script>
