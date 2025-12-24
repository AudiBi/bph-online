<template>
  <BaseCard title="Profil">
    <form class="space-y-6" @submit.prevent="updateProfile">
      <div>
        <label class="block mb-1">Nom complet</label>
        <input type="text" v-model="profile.fullName" class="input-text" />
      </div>
      <div>
        <label class="block mb-1">Email</label>
        <input type="email" v-model="profile.email" class="input-text" />
      </div>
      <div>
        <label class="block mb-1">Téléphone</label>
        <input type="tel" v-model="profile.phone" class="input-text" />
      </div>
      <button class="btn-primary w-full">Enregistrer</button>
    </form>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref } from "vue"

const profile = ref({
  fullName: "Jean Dupont",
  email: "jean.dupont@example.com",
  phone: "+509 1234 5678"
})

const updateProfile = () => {
  console.log("Profil mis à jour", profile.value)
  alert("Profil mis à jour avec succès !")
}
</script>
