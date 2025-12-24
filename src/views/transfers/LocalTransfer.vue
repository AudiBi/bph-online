<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-primary">Virement local</h1>

    <BaseCard title="Effectuer un virement">
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-muted">De</label>
          <select class="input-select">
            <option>Compte courant - HTG 820,000</option>
            <option>Épargne - HTG 430,000</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-muted">Vers</label>
          <select class="input-select">
            <option>Bénéficiaire 1</option>
            <option>Bénéficiaire 2</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-muted">Montant</label>
          <input type="number" class="input-text" placeholder="0.00" />
        </div>

        <button type="submit" class="btn-primary w-full">Envoyer</button>
      </form>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseCard from "@/components/BaseCard.vue"
</script>
