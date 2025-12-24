<template>
  <div class="max-w-4xl mx-auto space-y-6">

    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-primary">Paramètres des alertes</h1>
      <p class="text-sm text-muted">
        Personnalisez vos notifications
      </p>
    </div>

    <!-- Sécurité -->
    <BaseCard title="Alertes de sécurité">
      <div class="space-y-4">
        <Toggle label="Nouvelle connexion" v-model="settings.login" />
        <Toggle label="Changement de mot de passe" v-model="settings.password" />
        <Toggle label="Tentative suspecte" v-model="settings.suspicious" />
      </div>
    </BaseCard>

    <!-- Transactions -->
    <BaseCard title="Alertes de transactions">
      <div class="space-y-4">
        <Toggle label="Virement sortant" v-model="settings.transferOut" />
        <Toggle label="Virement entrant" v-model="settings.transferIn" />
        <Toggle label="Paiement effectué" v-model="settings.payment" />
      </div>
    </BaseCard>

    <!-- Crédits -->
    <BaseCard title="Alertes crédits">
      <Toggle label="Statut de demande" v-model="settings.creditStatus" />
    </BaseCard>

    <!-- Actions -->
    <div class="flex justify-end">
      <button class="btn-primary" @click="save">
        Enregistrer les paramètres
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import BaseCard from "@/components/BaseCard.vue"
import Toggle from "@/components/Toggle.vue"

const settings = reactive({
  login: true,
  password: true,
  suspicious: true,
  transferOut: true,
  transferIn: true,
  payment: true,
  creditStatus: true
})

const save = () => {
  alert("Paramètres enregistrés avec succès")
}
</script>
