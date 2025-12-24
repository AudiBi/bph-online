<template>
  <BaseCard title="Sécurité de la carte">
    <div class="space-y-4">
      <p class="text-sm text-muted">
        Paramètres de sécurité pour la carte <strong>{{ card.name }}</strong>
      </p>

      <!-- Activation carte -->
      <div class="flex items-center justify-between">
        <span>Activer / Désactiver la carte</span>
        <input type="checkbox" v-model="card.active" class="toggle-checkbox" />
      </div>

      <!-- Alertes SMS -->
      <div class="flex items-center justify-between">
        <span>Alertes SMS</span>
        <input type="checkbox" v-model="card.smsAlerts" class="toggle-checkbox" />
      </div>

      <!-- Alertes email -->
      <div class="flex items-center justify-between">
        <span>Alertes Email</span>
        <input type="checkbox" v-model="card.emailAlerts" class="toggle-checkbox" />
      </div>

      <!-- Bouton sauvegarder -->
      <button @click="saveSettings" class="btn-primary w-full">Enregistrer</button>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseCard from "@/components/BaseCard.vue";

interface CardSecurity {
  id: number;
  name: string;
  active: boolean;
  smsAlerts: boolean;
  emailAlerts: boolean;
}

// Simulé : liste de cartes
const allCards: CardSecurity[] = [
  { id: 1, name: "Visa Gold", active: true, smsAlerts: true, emailAlerts: false },
  { id: 2, name: "Mastercard Classic", active: true, smsAlerts: false, emailAlerts: true },
];

const route = useRoute();
const router = useRouter();

const cardId = Number(route.params.id);

// Chercher la carte et gérer le cas où elle n’existe pas
const foundCard = allCards.find(c => c.id === cardId);
if (!foundCard) {
  // Redirige vers la liste des cartes si l’ID est invalide
  router.replace("/cards");
  throw new Error("Carte introuvable");
}

// Réactif
const card = reactive(foundCard);

// Fonction sauvegarder
const saveSettings = () => {
  alert(`Paramètres de la carte "${card.name}" sauvegardés avec succès !`);
};
</script>

<style scoped>
/* Exemple pour toggle checkbox simple */
.toggle-checkbox {
  width: 2rem;
  height: 1rem;
  accent-color: #4f46e5; /* Couleur primaire */
}
</style>
