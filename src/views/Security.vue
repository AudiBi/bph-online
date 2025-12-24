<template>
  <BaseCard title="Sécurité">
    <form class="space-y-6" @submit.prevent="updatePassword">
      <div>
        <label>Mot de passe actuel</label>
        <input type="password" v-model="password.current" class="input-text" />
      </div>
      <div>
        <label>Nouveau mot de passe</label>
        <input type="password" v-model="password.new" class="input-text" />
      </div>
      <div>
        <label>Confirmer mot de passe</label>
        <input type="password" v-model="password.confirm" class="input-text" />
      </div>
      <button class="btn-primary w-full">Changer mot de passe</button>
    </form>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref } from "vue"

const password = ref({ current: "", new: "", confirm: "" })

const updatePassword = () => {
  if (password.value.new !== password.value.confirm) {
    alert("Les mots de passe ne correspondent pas !")
    return
  }
  console.log("Mot de passe mis à jour", password.value)
  alert("Mot de passe changé avec succès !")
}
</script>
