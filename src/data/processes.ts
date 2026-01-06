import { ref } from "vue"

/* =========================
   Types
========================= */
export type ProcessType =
  | "Ouverture de compte courant"
  | "Demande de crédit - Consommation"
  | "Demande de crédit - Hypothécaire"
  | "Demande de crédit - Commercial"

export interface Process {
  id: number
  type: ProcessType
  date: string
  progress: number
  statusMessage: string
}

/* =========================
   Données réactives
========================= */
export const processes = ref<Process[]>([])

let nextProcessId = 1

/* =========================
   Étapes par type de processus
========================= */
export const processSteps: Record<ProcessType, string[]> = {
  "Ouverture de compte courant": [
    "Demande reçue",
    "Vérification des informations",
    "Validation conformité",
    "Compte créé"
  ],
  "Demande de crédit - Consommation": [
    "Demande reçue",
    "Analyse financière",
    "Décision de crédit",
    "Crédit accordé"
  ],
  "Demande de crédit - Hypothécaire": [
    "Demande reçue",
    "Analyse financière",
    "Évaluation du bien",
    "Décision de crédit",
    "Crédit accordé"
  ],
  "Demande de crédit - Commercial": [
    "Demande reçue",
    "Analyse financière",
    "Étude du dossier",
    "Décision de crédit",
    "Crédit accordé"
  ]
}

/* =========================
   Fonctions métier
========================= */
export function addProcess(type: ProcessType): Process {
  const steps = processSteps[type]

  const process: Process = {
    id: nextProcessId++,
    type,
    date: new Date().toLocaleDateString("fr-HT"),
    progress: 0,
    statusMessage: steps[0] || "Demande reçue" // TOUJOURS une string valide
  }

  processes.value.push(process)
  return process
}

export function advanceProcess(id: number): void {
  const process = processes.value.find(p => p.id === id)
  if (!process) return

  const steps = processSteps[process.type]
  const currentIndex = steps.indexOf(process.statusMessage)

  if (currentIndex < steps.length - 1) {
    const nextIndex = currentIndex + 1
    process.statusMessage = steps[nextIndex] || process.statusMessage
    process.progress = Math.round((nextIndex / (steps.length - 1)) * 100)
  } else {
    process.progress = 100
  }
}

/* =========================
   Simulation automatique
========================= */
export function simulateProcess(id: number, interval = 1500): void {
  const process = processes.value.find(p => p.id === id)
  if (!process) return

  const steps = processSteps[process.type]
  let index = steps.indexOf(process.statusMessage)

  const timer = setInterval(() => {
    if (index < steps.length - 1) {
      index++
      process.statusMessage = steps[index] || process.statusMessage
      process.progress = Math.round((index / (steps.length - 1)) * 100)
    } else {
      clearInterval(timer)
      process.progress = 100
    }
  }, interval)
}
