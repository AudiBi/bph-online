<template>
  <div class="card">
    <h2 class="title">Suivi des dépenses</h2>

    <ul>
      <li v-for="item in expenses" :key="item.category">
        {{ item.category }} : {{ item.amount }} USD
      </li>
    </ul>

    <p><strong>Total :</strong> {{ analysis.total }} USD</p>
    <p><strong>Moyenne :</strong> {{ analysis.average }} USD</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getExpenses, analyzeExpenses } from '@/services/expense.service';
import type { ExpenseItem } from '@/services/expense.types';

const expenses = ref<ExpenseItem[]>(getExpenses());
const analysis = analyzeExpenses(expenses.value);
</script>

<style scoped>
ul { margin: 8px 0; padding-left: 16px; }
li { margin-bottom: 4px; }
</style>
