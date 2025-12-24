<template>
  <div class="max-w-4xl mx-auto space-y-6">

    <Header
      title="Simulation de crédit"
      subtitle="Estimez vos mensualités avant de faire une demande"
    />

    <BaseCard title="Paramètres du crédit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label class="label">Type de crédit</label>
          <select v-model="form.type" class="input-select">
            <option value="personal">Personnel</option>
            <option value="auto">Auto</option>
            <option value="housing">Immobilier</option>
          </select>
        </div>

        <div>
          <label class="label">Montant (HTG)</label>
          <input type="number" v-model.number="form.amount" class="input-text" />
        </div>

        <div>
          <label class="label">Durée (mois)</label>
          <input type="number" v-model.number="form.duration" class="input-text" />
        </div>

        <div>
          <label class="label">Taux annuel (%)</label>
          <input type="number" v-model.number="form.rate" class="input-text" />
        </div>

      </div>
    </BaseCard>

    <BaseCard title="Résultat de la simulation">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div>
          <p class="text-muted">Mensualité estimée</p>
          <p class="text-xl font-semibold text-primary">
            {{ monthly.toLocaleString() }} HTG
          </p>
        </div>
        <div>
          <p class="text-muted">Coût total</p>
          <p class="font-semibold">
            {{ totalCost.toLocaleString() }} HTG
          </p>
        </div>
        <div>
          <p class="text-muted">Intérêts</p>
          <p class="font-semibold">
            {{ interests.toLocaleString() }} HTG
          </p>
        </div>
      </div>
    </BaseCard>

    <div class="flex justify-end">
      <RouterLink to="/credits/apply" class="btn-primary">
        Faire une demande
      </RouterLink>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue"
import BaseCard from "@/components/BaseCard.vue"

const form = reactive({
  type: "personal",
  amount: 100000,
  duration: 12,
  rate: 12
})

const monthly = computed(() => {
  const r = form.rate / 100 / 12
  return Math.round((form.amount * r) / (1 - Math.pow(1 + r, -form.duration)))
})

const totalCost = computed(() => monthly.value * form.duration)
const interests = computed(() => totalCost.value - form.amount)
</script>
