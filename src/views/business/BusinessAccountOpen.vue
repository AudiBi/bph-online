<script setup lang="ts">
import { ref } from 'vue';
import { openBusinessAccount } from '@/services/businessAccount.service';

const form = ref({
  companyName: '',
  registrationNumber: '',
  sector: '',
  phone: ''
});

async function submit() {
  const data = new FormData();
  Object.entries(form.value).forEach(([k, v]) => data.append(k, v));
  await openBusinessAccount(data);
}
</script>

<template>
  <div class="p-4 space-y-4">
    <h1 class="text-xl font-semibold">Ouverture compte entreprise</h1>

    <input v-model="form.companyName" placeholder="Nom de l’entreprise" class="input" />
    <input v-model="form.registrationNumber" placeholder="Numéro d’immatriculation" class="input" />
    <input v-model="form.sector" placeholder="Secteur d’activité" class="input" />
    <input v-model="form.phone" placeholder="Téléphone" class="input" />

    <button class="btn-primary" @click="submit">
      Soumettre la demande
    </button>
  </div>
</template>
