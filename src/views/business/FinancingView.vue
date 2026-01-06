<script setup lang="ts">
import { ref } from 'vue';
import { requestFinancing } from '@/services/financing.service';

const amount = ref('');
const purpose = ref('');

async function submit() {
  await requestFinancing({
    amount: amount.value,
    purpose: purpose.value
  });
}
</script>

<template>
  <div class="p-4 space-y-3">
    <h1 class="text-xl font-semibold">Financement commercial</h1>
    <input v-model="amount" placeholder="Montant demandé" class="input" />
    <input v-model="purpose" placeholder="Objet du financement" class="input" />

    <button class="btn-primary" @click="submit">
      Soumettre la demande
    </button>
  </div>
</template>
