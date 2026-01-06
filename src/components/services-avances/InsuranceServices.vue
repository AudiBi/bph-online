<template>
  <div class="card">
    <h2 class="title">Assurances</h2>

    <div v-for="product in products" :key="product.type" class="product">
      <p><strong>{{ product.type }}</strong> – Base : {{ product.base }} USD</p>
      <button class="btn" @click="getQuote(product.type)">
        Obtenir un devis
      </button>
      <p v-if="quotes[product.type]">
        Devis : {{ quotes[product.type] }} USD/mois
      </p>
      <hr />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAllInsurance, insuranceQuote } from '@/services/insurance.service';
import type { InsuranceProduct } from '@/services/insurance.types';

const products = ref<InsuranceProduct[]>(getAllInsurance());
const quotes = ref<Record<string, number>>({});

function getQuote(type: string) {
  const quote = insuranceQuote(type);
  if (quote !== null) quotes.value[type] = quote;
}
</script>

<style scoped>
.product { margin-bottom: 12px; }
.card { padding:16px; background:#fff; margin:8px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,.1);}
.title { font-weight:bold; margin-bottom:12px; }
.btn { background:#2563eb; color:#fff; padding:8px 12px; border-radius:6px; margin-top:4px; }

</style>
