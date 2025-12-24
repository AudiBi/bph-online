<template>
<section>
<h2>Effectuer un transfert</h2>
<form @submit.prevent="submitTransfer">
<input v-model="to" placeholder="Destinataire" />
<input v-model.number="amount" placeholder="Montant" type="number" />
<button type="submit">Envoyer</button>
</form>
</section>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'


export default defineComponent({
name: 'Transfers',
setup() {
const to = ref<string>('')
const amount = ref<number>(0)


function submitTransfer() {
alert(`Transfert de ${amount.value} vers ${to.value}`)
}


return { to, amount, submitTransfer }
}
})
</script>