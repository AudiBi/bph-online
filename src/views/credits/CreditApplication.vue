<template>
  <div class="max-w-4xl mx-auto space-y-6">

    <Header
      title="Demande de crédit"
      subtitle="Soumettez votre demande en toute sécurité"
    />

    <BaseCard title="Informations personnelles">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input class="input-text" placeholder="Nom complet" />
        <input class="input-text" placeholder="Téléphone" />
        <input class="input-text" placeholder="Email" />
        <input class="input-text" placeholder="Revenu mensuel (HTG)" />
      </div>
    </BaseCard>

    <BaseCard title="Détails du crédit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select class="input-select">
          <option>Personnel</option>
          <option>Auto</option>
          <option>Immobilier</option>
        </select>
        <input class="input-text" placeholder="Montant demandé" />
        <input class="input-text" placeholder="Durée (mois)" />
        <input class="input-text" placeholder="Objet du crédit" />
      </div>
    </BaseCard>

    <BaseCard title="Documents">
      <input type="file" class="input-text" />
    </BaseCard>

    <div class="flex justify-end">
      <button class="btn-primary">Soumettre la demande</button>
    </div>

  </div>
</template>

<script setup lang="ts">
import BaseCard from "@/components/BaseCard.vue"
</script>
