<template>
  <BaseCard title="Nouveau ticket">
    <form @submit.prevent="submitTicket" class="space-y-6">
      
      <!-- Sujet -->
      <div>
        <label for="subject" class="block text-sm font-medium mb-1">Sujet</label>
        <input
          id="subject"
          type="text"
          v-model="ticket.subject"
          placeholder="Entrez le sujet de votre ticket"
          class="input-text w-full"
          required
        />
      </div>

      <!-- Catégorie -->
      <div>
        <label for="category" class="block text-sm font-medium mb-1">Catégorie</label>
        <select
          id="category"
          v-model="ticket.category"
          class="input-text w-full"
          required
        >
          <option disabled value="">Sélectionnez une catégorie</option>
          <option>Technique</option>
          <option>Facturation</option>
          <option>Support général</option>
        </select>
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-sm font-medium mb-1">Description</label>
        <textarea
          id="description"
          v-model="ticket.description"
          placeholder="Décrivez votre problème ou question"
          class="input-text w-full h-32 resize-none"
          required
        ></textarea>
      </div>

      <!-- Pièce jointe -->
      <div>
        <label class="block text-sm font-medium mb-1">Pièce jointe (optionnel)</label>
        <input type="file" @change="handleFile" class="w-full" />
        <p v-if="ticket.fileName" class="text-xs text-muted mt-1">
          Fichier sélectionné : {{ ticket.fileName }}
        </p>
      </div>

      <!-- Bouton -->
      <button type="submit" class="btn-primary w-full">
        Créer le ticket
      </button>

    </form>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref } from "vue"

interface Ticket {
  subject: string
  category: string
  description: string
  file?: File
  fileName?: string
}

const ticket = ref<Ticket>({
  subject: "",
  category: "",
  description: ""
})

const handleFile = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    ticket.value.file = target.files[0]
    ticket.value.fileName = target.files[0].name
  }
}

const submitTicket = () => {
  // Ici tu appelles ton API pour créer le ticket
  console.log("Ticket soumis", ticket.value)
  alert("Votre ticket a été créé avec succès !")

  // Reset formulaire
  ticket.value = { subject: "", category: "", description: "" }
}
</script>

<style scoped>
.input-text {
  @apply border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-primary/50 w-full;
}
.btn-primary {
  @apply bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-primary-dark transition;
}
</style>
