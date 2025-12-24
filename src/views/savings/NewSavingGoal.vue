<template>
  <div class="space-y-6 max-w-4xl mx-auto">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-primary">Nouvel objectif d’épargne</h1>
        <p class="text-sm text-muted">
          Planifiez et atteignez vos objectifs financiers
        </p>
      </div>

      <RouterLink
        to="/savings"
        class="btn-secondary"
      >
        ← Retour à l’épargne
      </RouterLink>
    </div>

    <!-- Formulaire -->
    <BaseCard title="Détails de l’objectif">
      <form class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <!-- Nom -->
        <div class="md:col-span-2">
          <label class="label">Nom de l’objectif</label>
          <input
            v-model="form.name"
            type="text"
            class="input-text"
            placeholder="Ex: Achat maison, Voyage..."
          />
        </div>

        <!-- Montant cible -->
        <div>
          <label class="label">Montant cible (HTG)</label>
          <input
            v-model.number="form.target"
            type="number"
            min="0"
            class="input-text"
          />
        </div>

        <!-- Montant initial -->
        <div>
          <label class="label">Montant initial (optionnel)</label>
          <input
            v-model.number="form.initial"
            type="number"
            min="0"
            class="input-text"
          />
        </div>

        <!-- Date cible -->
        <div>
          <label class="label">Date cible</label>
          <input
            v-model="form.deadline"
            type="date"
            class="input-text"
          />
        </div>

        <!-- Fréquence -->
        <div>
          <label class="label">Alimentation automatique</label>
          <select v-model="form.frequency" class="input-select">
            <option value="">Aucune</option>
            <option value="weekly">Hebdomadaire</option>
            <option value="monthly">Mensuelle</option>
          </select>
        </div>

        <!-- Compte source -->
        <div class="md:col-span-2">
          <label class="label">Compte source</label>
          <select v-model="form.account" class="input-select">
            <option disabled value="">Sélectionnez un compte</option>
            <option
              v-for="acc in accounts"
              :key="acc.id"
              :value="acc.id"
            >
              {{ acc.name }} – {{ acc.balance.toLocaleString() }} {{ acc.currency }}
            </option>
          </select>
        </div>

      </form>
    </BaseCard>

    <!-- Résumé -->
    <BaseCard title="Résumé de l’objectif">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div>
          <p class="text-muted">Objectif</p>
          <p class="font-semibold">{{ form.target.toLocaleString() }} HTG</p>
        </div>

        <div>
          <p class="text-muted">Montant initial</p>
          <p class="font-semibold">
            {{ form.initial ? form.initial.toLocaleString() : "0" }} HTG
          </p>
        </div>

        <div>
          <p class="text-muted">Fréquence</p>
          <p class="font-semibold">
            {{ frequencyLabel || "Aucune" }}
          </p>
        </div>
      </div>
    </BaseCard>

    <!-- Actions -->
    <div class="flex flex-col sm:flex-row gap-3 justify-end">
      <button class="btn-secondary" @click="reset">
        Annuler
      </button>
      <button class="btn-primary" @click="submit">
        Créer l’objectif
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue"
import BaseCard from "@/components/BaseCard.vue"

const form = reactive({
  name: "",
  target: 0,
  initial: 0,
  deadline: "",
  frequency: "",
  account: ""
})

const accounts = [
  { id: 1, name: "Compte courant", balance: 820000, currency: "HTG" },
  { id: 2, name: "Épargne", balance: 430000, currency: "HTG" }
]

const frequencyLabel = computed(() => {
  if (form.frequency === "weekly") return "Hebdomadaire"
  if (form.frequency === "monthly") return "Mensuelle"
  return ""
})

const reset = () => {
  Object.assign(form, {
    name: "",
    target: 0,
    initial: 0,
    deadline: "",
    frequency: "",
    account: ""
  })
}

const submit = () => {
  if (!form.name || !form.target || !form.account) {
    alert("Veuillez compléter les champs obligatoires")
    return
  }

  alert("Objectif d’épargne créé avec succès")
}
</script>
