<template>
  <BaseCard title="Suivi d’avancement des processus">
    <form @submit.prevent="startProcess" class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Type de processus</label>
        <select v-model="processType" class="input-select w-full">
          <option value="Ouverture de compte">Ouverture de compte</option>
          <option value="Demande de crédit">Demande de crédit</option>
          <option value="Virement spécial">Virement spécial</option>
        </select>
      </div>
      <button type="submit" class="btn-primary w-full">Lancer le processus</button>
    </form>

    <div v-if="processes.length" class="mt-4">
      <h3 class="font-medium">Processus en cours</h3>
      <ul class="space-y-2">
        <li v-for="p in processes" :key="p.id" class="bg-gray-50 p-2 rounded text-sm">
          {{ p.type }} - {{ p.status }}
          <button @click="finishProcess(p.id)" class="ml-2 text-green-600 hover:underline">Terminé</button>
        </li>
      </ul>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref } from "vue"
import BaseCard from "@/components/BaseCard.vue"
import { processes, addProcess, updateProcessStatus } from "@/stores/processStore"

const processType = ref("Ouverture de compte")

const startProcess = () => {
  addProcess(processType.value)
}

const finishProcess = (id: number) => {
  updateProcessStatus(id, "Terminé")
}
</script>
