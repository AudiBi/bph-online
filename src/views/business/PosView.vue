<script setup lang="ts">
import { requestPOS } from '@/services/pos.service';

async function request() {
  await requestPOS();
}
</script>

<template>
  <div class="p-4 space-y-3">
    <h1 class="text-xl font-semibold">Paiements commerçants (POS)</h1>
    <button class="btn-primary" @click="request">
      Demander un terminal POS
    </button>
  </div>
</template>
