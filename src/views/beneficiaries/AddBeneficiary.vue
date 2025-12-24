<template>
  <BaseCard title="Ajouter un bénéficiaire">
    <form class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Nom complet</label>
        <input type="text" class="input-text" />
      </div>

      <div>
        <label class="block text-sm font-medium">Numéro de compte / IBAN</label>
        <input type="text" class="input-text" />
      </div>

      <div>
        <label class="block text-sm font-medium">Banque</label>
        <input type="text" class="input-text" />
      </div>

      <button type="submit" class="btn-primary w-full">Ajouter</button>
    </form>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from "@/components/BaseCard.vue"
</script>
