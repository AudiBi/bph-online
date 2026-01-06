<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg w-full max-w-md p-6 relative">
      <button @click="$emit('close')" class="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
        ✖
      </button>

      <h2 class="text-lg font-bold mb-4">Commande de chéquier</h2>

      <form @submit.prevent="submitRequest" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Nom sur le compte</label>
          <input v-model="accountName" type="text" class="mt-1 w-full border rounded p-2" required />
        </div>

        <div>
          <label class="block text-sm font-medium">Nombre de chèques</label>
          <input v-model="numberOfCheques" type="number" class="mt-1 w-full border rounded p-2" required />
        </div>

        <button type="submit" class="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark">
          Soumettre
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const accountName = ref("")
const numberOfCheques = ref(25)

function submitRequest() {
  console.log("Commande de chéquier:", accountName.value, numberOfCheques.value)
  alert("Votre demande de chéquier a été envoyée !")
  // Ici vous pouvez appeler l'API réelle
}
</script>
