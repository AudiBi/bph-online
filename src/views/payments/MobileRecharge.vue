<template>
  <BaseCard title="Recharge mobile">
    <form class="space-y-4" @submit.prevent="rechargeMobile">
      <div>
        <label class="block text-sm font-medium text-gray-700">Opérateur</label>
        <select v-model="mobile.operator" class="input-select w-full">
          <option value="" disabled>-- Sélectionnez --</option>
          <option value="MTN">MTN</option>
          <option value="Digicel">Digicel</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
        <input type="tel" v-model="mobile.number" placeholder="509 XXX XXXX" class="input-text w-full"/>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Montant</label>
        <input type="number" v-model.number="mobile.amount" placeholder="0.00" class="input-text w-full"/>
      </div>
      <button type="submit" class="btn-primary w-full">Recharger</button>
    </form>
  </BaseCard>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import BaseCard from "@/components/BaseCard.vue"

interface MobileRecharge {
  operator: string
  number: string
  amount: number
}

const mobile = reactive<MobileRecharge>({
  operator: "",
  number: "",
  amount: 0
})

const rechargeMobile = () => {
  if (!mobile.operator || !mobile.number || mobile.amount <= 0) {
    alert("Veuillez remplir tous les champs correctement")
    return
  }
  alert(`Recharge de ${mobile.amount} HTG effectuée pour ${mobile.number}`)
}
</script>
