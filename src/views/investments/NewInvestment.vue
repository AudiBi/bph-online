<template>
  <div class="space-y-6 max-w-5xl mx-auto">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-primary">Nouvel investissement</h1>
        <p class="text-sm text-muted">
          Faites fructifier votre capital selon votre profil
        </p>
      </div>

      <RouterLink
        to="/investments"
        class="btn-secondary"
      >
        ← Retour aux investissements
      </RouterLink>
    </div>

    <!-- Choix produit -->
    <BaseCard title="Produit d’investissement">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          v-for="p in products"
          :key="p.id"
          @click="form.product = p"
          class="border rounded-lg p-4 text-left transition"
          :class="form.product?.id === p.id
            ? 'border-primary bg-primary/5'
            : 'hover:border-primary/50'"
        >
          <h3 class="font-semibold">{{ p.name }}</h3>
          <p class="text-xs text-muted">{{ p.description }}</p>
          <p class="mt-2 text-sm font-medium">
            Rendement estimé : {{ p.return }}%
          </p>
        </button>
      </div>
    </BaseCard>

    <!-- Paramètres -->
    <BaseCard title="Paramètres d’investissement">
      <form class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <!-- Montant -->
        <div>
          <label class="label">Montant à investir (HTG)</label>
          <input
            v-model.number="form.amount"
            type="number"
            min="0"
            class="input-text"
          />
        </div>

        <!-- Profil risque -->
        <div>
          <label class="label">Profil de risque</label>
          <select v-model="form.risk" class="input-select">
            <option disabled value="">Sélectionnez</option>
            <option value="low">Prudent</option>
            <option value="medium">Équilibré</option>
            <option value="high">Dynamique</option>
          </select>
        </div>

        <!-- Horizon -->
        <div>
          <label class="label">Horizon d’investissement</label>
          <select v-model="form.horizon" class="input-select">
            <option value="short">Court terme</option>
            <option value="medium">Moyen terme</option>
            <option value="long">Long terme</option>
          </select>
        </div>

        <!-- Compte source -->
        <div>
          <label class="label">Compte source</label>
          <select v-model="form.account" class="input-select">
            <option disabled value="">Choisir un compte</option>
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

    <!-- Simulation -->
    <BaseCard title="Simulation de rendement">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div>
          <p class="text-muted">Capital investi</p>
          <p class="font-semibold">
            {{ form.amount.toLocaleString() }} HTG
          </p>
        </div>

        <div>
          <p class="text-muted">Rendement estimé</p>
          <p class="font-semibold">
            {{ estimatedReturn.toLocaleString() }} HTG
          </p>
        </div>

        <div>
          <p class="text-muted">Valeur estimée</p>
          <p class="font-semibold text-primary">
            {{ totalValue.toLocaleString() }} HTG
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
        Investir maintenant
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue"
import BaseCard from "@/components/BaseCard.vue"

interface Product {
  id: number
  name: string
  description: string
  return: number
}

const products: Product[] = [
  {
    id: 1,
    name: "Fonds sécurisé",
    description: "Faible risque, rendement stable",
    return: 5
  },
  {
    id: 2,
    name: "Fonds équilibré",
    description: "Risque modéré, bon potentiel",
    return: 9
  },
  {
    id: 3,
    name: "Fonds dynamique",
    description: "Risque élevé, rendement élevé",
    return: 15
  }
]

const accounts = [
  { id: 1, name: "Compte courant", balance: 820000, currency: "HTG" },
  { id: 2, name: "Épargne", balance: 430000, currency: "HTG" }
]

const form = reactive<{
  product: Product | null
  amount: number
  risk: string
  horizon: string
  account: string | number
}>({
  product: null,
  amount: 0,
  risk: "",
  horizon: "",
  account: ""
})

const estimatedReturn = computed(() => {
  if (!form.product) return 0
  return Math.round((form.amount * form.product.return) / 100)
})

const totalValue = computed(() => {
  return form.amount + estimatedReturn.value
})

const reset = () => {
  Object.assign(form, {
    product: null,
    amount: 0,
    risk: "",
    horizon: "",
    account: ""
  })
}

const submit = () => {
  if (!form.product || !form.amount || !form.account) {
    alert("Veuillez compléter les informations obligatoires")
    return
  }

  alert("Investissement créé avec succès")
}
</script>
