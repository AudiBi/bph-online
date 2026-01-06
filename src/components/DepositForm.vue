<template>
  <BaseCard title="Encaissement">
    <form class="space-y-4" @submit.prevent="submitDeposit">

      <!-- Type de dépôt -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Type de dépôt</label>
        <select v-model="deposit.type" class="input-select w-full">
          <option value="" disabled>-- Sélectionnez --</option>
          <option value="cheque">Chèque électronique</option>
          <option value="autre">Autres dépôts</option>
        </select>
      </div>

      <!-- Montant -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Montant</label>
        <input type="number" v-model.number="deposit.amount" placeholder="0.00" class="input-text w-full"/>
      </div>

      <!-- Chèque électronique -->
      <div v-if="deposit.type === 'cheque'">
        <label class="block text-sm font-medium text-gray-700">Télécharger le chèque</label>
        <input type="file" @change="handleFileUpload" class="input-file w-full"/>
        <p v-if="deposit.fileName" class="text-xs text-gray-500 mt-1">Fichier sélectionné: {{ deposit.fileName }}</p>
      </div>

      <!-- Description pour autres dépôts -->
      <div v-if="deposit.type === 'autre'">
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <input type="text" v-model="deposit.description" placeholder="Ex: Espèces, virement" class="input-text w-full"/>
      </div>

      <button type="submit" class="btn-primary w-full">Effectuer le dépôt</button>
    </form>
  </BaseCard>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import BaseCard from "@/components/BaseCard.vue"

interface Deposit {
  type: string
  amount: number
  description?: string
  file: File | undefined
  fileName?: string
}

const deposit = reactive<Deposit>({
  type: "",
  amount: 0,
  description: "",
  file: undefined,
  fileName: ""
})

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    deposit.file = target.files[0]
    deposit.fileName = target.files[0].name
  } else {
    deposit.file = undefined
    deposit.fileName = ""
  }
}

const submitDeposit = () => {
  if (!deposit.type || deposit.amount <= 0) {
    alert("Veuillez remplir tous les champs correctement")
    return
  }

  let message = `Dépôt de ${deposit.amount} HTG effectué`
  if (deposit.type === "cheque" && deposit.fileName) {
    message += ` (Chèque: ${deposit.fileName})`
  } else if (deposit.type === "autre" && deposit.description) {
    message += ` (${deposit.description})`
  }

  alert(message)

  // Réinitialiser le formulaire
  deposit.type = ""
  deposit.amount = 0
  deposit.description = ""
  deposit.file = undefined
  deposit.fileName = ""
}
</script>
