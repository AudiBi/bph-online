<template>
  <BaseCard title="Ouverture de compte">
    <form @submit.prevent="submitAccountOpening" class="space-y-4">
      <div>
        <label>Nom complet</label>
        <input type="text" v-model="form.fullName" class="input-text" />
      </div>
      <div>
        <label>Email</label>
        <input type="email" v-model="form.email" class="input-text" />
      </div>
      <div>
        <label>Téléphone</label>
        <input type="tel" v-model="form.phone" class="input-text" />
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

const form = ref({ fullName: "", email: "", phone: "" })

const submitAccountOpening = () => {
  if (!form.value.fullName || !form.value.email) {
    alert("Veuillez remplir tous les champs obligatoires.")
    return
  }

  const newProcess = addProcess("Ouverture de compte courant")
  advanceProcess(newProcess.id)

  alert("Demande envoyée ! Vous pouvez suivre son avancement ci-dessous.")
  form.value = { fullName: "", email: "", phone: "" }
}
</script>
