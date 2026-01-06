<script setup lang="ts">
import { uploadPayroll } from '@/services/payroll.service';

async function onFile(e: any) {
  const file = e.target.files[0];
  await uploadPayroll(file);
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-semibold">Service de paie</h1>
    <input type="file" @change="onFile" />
  </div>
</template>
