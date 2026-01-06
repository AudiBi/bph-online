<template>
  <div class="max-w-4xl mx-auto space-y-6">

    <Header
      title="Simulation de crédit"
      subtitle="Estimez vos mensualités avant de faire une demande"
    />

    <BaseCard title="Paramètres du crédit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <!-- Type de crédit -->
        <div>
          <label class="label">Type de crédit</label>
          <select v-model="form.type" class="input-select">
            <option value="personal">Personnel</option>
            <option value="auto">Auto</option>
            <option value="housing">Immobilier</option>
          </select>
        </div>

        <!-- Montant -->
        <div>
          <label class="label">Montant (HTG)</label>
          <input
            type="number"
            v-model.number="form.amount"
            class="input-text"
            min="0"
          />
          <p v-if="form.amount <= 0" class="text-red-500 text-sm mt-1">
            Montant doit être supérieur à 0
          </p>
        </div>

        <!-- Durée -->
        <div>
          <label class="label">Durée (mois)</label>
          <input
            type="number"
            v-model.number="form.duration"
            class="input-text"
            min="1"
          />
          <p v-if="form.duration <= 0" class="text-red-500 text-sm mt-1">
            Durée doit être supérieure à 0
          </p>
        </div>

        <!-- Taux -->
        <div>
          <label class="label">Taux annuel (%)</label>
          <input
            type="number"
            v-model.number="form.rate"
            class="input-text"
            min="0"
            step="0.01"
          />
          <p v-if="form.rate < 0" class="text-red-500 text-sm mt-1">
            Le taux ne peut pas être négatif
          </p>
        </div>

      </div>
    </BaseCard>

    <BaseCard title="Résultat de la simulation">
      <div v-if="monthly === 0" class="text-sm text-muted">
        Remplissez correctement tous les champs pour voir la simulation.
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div>
          <p class="text-muted">Mensualité estimée</p>
          <p class="text-xl font-semibold text-primary">
            {{ formatCurrency(monthly) }}
          </p>
        </div>
        <div>
          <p class="text-muted">Coût total</p>
          <p class="font-semibold">
            {{ formatCurrency(totalCost) }}
          </p>
        </div>
        <div>
          <p class="text-muted">Intérêts</p>
          <p class="font-semibold">
            {{ formatCurrency(interests) }}
          </p>
        </div>
      </div>
    </BaseCard>

    <div class="flex justify-end">
      <RouterLink
        to="/credits/apply"
        class="btn-primary"
        :class="{ 'opacity-50 pointer-events-none': monthly === 0 }"
      >
        Faire une demande
      </RouterLink>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue"
import BaseCard from "@/components/BaseCard.vue"

interface CreditForm {
  type: "personal" | "auto" | "housing"
  amount: number
  duration: number
  rate: number
}

const form = reactive<CreditForm>({
  type: "personal",
  amount: 100000,
  duration: 12,
  rate: 12
})

// Calcul des mensualités
const monthly = computed(() => {
  if (form.amount <= 0 || form.duration <= 0 || form.rate < 0) return 0
  const r = form.rate / 100 / 12
  return Math.round((form.amount * r) / (1 - Math.pow(1 + r, -form.duration)))
})

const totalCost = computed(() => monthly.value * form.duration)
const interests = computed(() => totalCost.value - form.amount)

// Fonction de formatage HTG
const formatCurrency = (value: number) =>
  value.toLocaleString("fr-HT", { style: "currency", currency: "HTG" })
</script>
