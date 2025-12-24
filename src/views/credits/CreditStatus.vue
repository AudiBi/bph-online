<template>
  <div class="max-w-5xl mx-auto space-y-6">

    <Header
      title="Suivi de votre demande"
      subtitle="État d’avancement de votre crédit"
    />

    <BaseCard title="Statut actuel">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <p class="text-sm text-muted">Statut</p>
          <p class="text-lg font-semibold text-primary">En cours d’analyse</p>
        </div>
        <span class="badge badge-warning">En traitement</span>
      </div>
    </BaseCard>

    <BaseCard title="Historique">
      <ul class="space-y-3 text-sm">
        <li>✔ Demande soumise</li>
        <li>⏳ Analyse en cours</li>
        <li>⏳ Décision finale</li>
      </ul>
    </BaseCard>

  </div>
</template>

<script setup lang="ts">
import BaseCard from "@/components/BaseCard.vue"
</script>
