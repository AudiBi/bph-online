<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg w-full max-w-md p-6 relative">
      <button @click="$emit('close')" class="absolute top-3 right-3 text-gray-500 hover:text-gray-800">✖</button>

      <h2 class="text-lg font-bold mb-4">Certificats bancaires</h2>

      <form @submit.prevent="submitCertificate" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Type de certificat</label>
          <select v-model="certificateType" class="mt-1 w-full border rounded p-2" required>
            <option value="">Sélectionnez</option>
            <option value="balance">Solde</option>
            <option value="ownership">Propriété de compte</option>
            <option value="income">Revenu / salaire</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium">Nom sur le compte</label>
          <input v-model="accountName" type="text" class="mt-1 w-full border rounded p-2" required />
        </div>

        <button type="submit" class="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark">
          Demander
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const certificateType = ref("")
const accountName = ref("")

function submitCertificate() {
  if (!certificateType.value || !accountName.value) {
    alert("Veuillez remplir tous les champs correctement.")
    return
  }
  console.log("Demande certificat:", certificateType.value, accountName.value)
  alert(`Votre demande de certificat (${certificateType.value}) a été envoyée !`)
}
</script>
