<template>
  <BaseCard title="Payer une facture">
    <form class="space-y-4" @submit.prevent="payBill">
      <div>
        <label class="block text-sm font-medium text-gray-700">Fournisseur</label>
        <select v-model="bill.provider" class="input-select w-full">
          <option value="" disabled>-- Sélectionnez --</option>
          <option value="EDH">EDH</option>
          <option value="MTN">MTN</option>
          <option value="Digicel">Digicel</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Montant</label>
        <input type="number" v-model.number="bill.amount" placeholder="0.00" class="input-text w-full"/>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Référence</label>
        <input type="text" v-model="bill.reference" placeholder="Ex: Facture 123" class="input-text w-full"/>
      </div>
      <button type="submit" class="btn-primary w-full">Payer</button>
    </form>
  </BaseCard>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import BaseCard from "@/components/BaseCard.vue"

interface Bill {
  provider: string
  amount: number
  reference: string
}

const bill = reactive<Bill>({
  provider: "",
  amount: 0,
  reference: ""
})

const payBill = () => {
  if (!bill.provider || bill.amount <= 0) {
    alert("Veuillez remplir tous les champs correctement")
    return
  }
  alert(`Paiement de ${bill.amount} HTG effectué pour ${bill.provider}`)
}
</script>
