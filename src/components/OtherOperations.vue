<template>
  <BaseCard title="Autres opérations">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Commande de chéquier -->
      <button
        @click="showChequeBook = true"
        class="p-4 bg-white rounded shadow hover:bg-gray-50 text-left"
      >
        <p class="font-medium">Commande de chéquier</p>
        <p class="text-sm text-muted">Demandez un nouveau chéquier</p>
      </button>

      <!-- Opérations de change -->
      <button
        @click="showCurrencyExchange = true"
        class="p-4 bg-white rounded shadow hover:bg-gray-50 text-left"
      >
        <p class="font-medium">Opérations de change</p>
        <p class="text-sm text-muted">Achetez ou vendez des devises</p>
      </button>

      <!-- Transactions crypto -->
      <button
        @click="showCryptoTrading = true"
        class="p-4 bg-white rounded shadow hover:bg-gray-50 text-left"
      >
        <p class="font-medium">Transactions crypto</p>
        <p class="text-sm text-muted">Achetez, vendez ou transférez vos crypto-monnaies</p>
      </button>

      <!-- Certificats bancaires -->
      <button
        @click="showCertificates = true"
        class="p-4 bg-white rounded shadow hover:bg-gray-50 text-left"
      >
        <p class="font-medium">Certificats bancaires</p>
        <p class="text-sm text-muted">Commandez ou consultez vos certificats</p>
      </button>
    </div>

    <!-- Modals dynamiques -->
    <ChequeBookModal v-if="showChequeBook" @close="showChequeBook = false" />
    <CurrencyExchangeModal v-if="showCurrencyExchange" @close="showCurrencyExchange = false" />
    <CryptoTradingModal v-if="showCryptoTrading" @close="showCryptoTrading = false" />
    <CertificatesModal v-if="showCertificates" @close="showCertificates = false" />
  </BaseCard>
</template>

<script setup lang="ts">
import { ref } from "vue"
import BaseCard from "@/components/BaseCard.vue"

// Modals
import ChequeBookModal from "@/components/operations/ChequeBookModal.vue"
import CurrencyExchangeModal from "@/components/operations/CurrencyExchangeModal.vue"
import CryptoTradingModal from "@/components/operations/CryptoTradingModal.vue"
import CertificatesModal from "@/components/operations/CertificatesModal.vue"

// Gestion des modals
const showChequeBook = ref(false)
const showCurrencyExchange = ref(false)
const showCryptoTrading = ref(false)
const showCertificates = ref(false)
</script>

<style scoped>
/* Optional: hover effects or card-specific styles */
</style>
