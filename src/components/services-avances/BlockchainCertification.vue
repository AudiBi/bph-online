<template>
  <div class="card">
    <h2 class="title">Certification Blockchain</h2>

    <input
      v-model="hash"
      class="input"
      placeholder="Entrer le hash du document"
    />

    <button class="btn" @click="verify">
      Vérifier
    </button>

    <div v-if="record" class="success">
      <p><strong>Document :</strong> {{ record.document }}</p>
      <p><strong>Date :</strong> {{ record.timestamp }}</p>
      <p><strong>Statut :</strong> {{ record.status }}</p>
    </div>

    <div v-else-if="checked" class="error">
      Document non trouvé sur la blockchain
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { BlockchainRecord } from '@/services/blockchain.types';
import { verifyBlockchainHash } from '@/services/blockchain.service';

const hash = ref('');
const record = ref<BlockchainRecord | null>(null);
const checked = ref(false);

function verify() {
  record.value = verifyBlockchainHash(hash.value);
  checked.value = true;
}
</script>
<style scoped>
    .card {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
}
.title { font-weight: bold; margin-bottom: 8px; }
.input { border: 1px solid #ccc; padding: 8px; width: 100%; }
.btn {
  margin-top: 8px;
  background: #2563eb;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
}
.success { margin-top: 10px; color: #15803d; }
.error { margin-top: 10px; color: #b91c1c; }

</style>
