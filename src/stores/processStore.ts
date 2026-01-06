// src/stores/processStore.ts
import { ref } from "vue"

// Liste des processus
export const processes = ref<Array<{ id: number; type: string; status: string }>>([])

// ID automatique
let nextProcessId = 1

// Fonction pour ajouter un nouveau processus
export const addProcess = (type: string, status: string = "En cours") => {
  const newProcess = {
    id: nextProcessId++,
    type,
    status
  }
  processes.value.push(newProcess)
  return newProcess
}

// Optionnel : fonction pour mettre à jour le statut
export const updateProcessStatus = (id: number, newStatus: string) => {
  const process = processes.value.find(p => p.id === id)
  if (process) process.status = newStatus
}
