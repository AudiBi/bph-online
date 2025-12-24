<template>
  <div class="max-w-5xl mx-auto space-y-6">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-primary">Centre de notifications</h1>
        <p class="text-sm text-muted">
          Restez informé de toutes vos activités
        </p>
      </div>

      <button class="btn-secondary" @click="markAllRead">
        Tout marquer comme lu
      </button>
    </div>

    <!-- Filtres -->
    <BaseCard>
      <div class="flex flex-col sm:flex-row gap-3">
        <select v-model="filter" class="input-select">
          <option value="all">Toutes</option>
          <option value="security">Sécurité</option>
          <option value="transaction">Transactions</option>
          <option value="credit">Crédits</option>
        </select>
      </div>
    </BaseCard>

    <!-- Liste notifications -->
    <BaseCard>
      <ul class="divide-y">
        <li
          v-for="n in filteredNotifications"
          :key="n.id"
          class="py-4 flex gap-4"
        >
          <span
            class="w-2 h-2 rounded-full mt-2"
            :class="n.read ? 'bg-gray-300' : 'bg-primary'"
          />

          <div class="flex-1">
            <p class="font-medium">{{ n.title }}</p>
            <p class="text-sm text-muted">{{ n.message }}</p>
            <p class="text-xs text-muted mt-1">{{ n.date }}</p>
          </div>

          <button
            v-if="!n.read"
            class="text-sm text-primary"
            @click="markRead(n.id)"
          >
            Marquer comme lu
          </button>
        </li>
      </ul>
    </BaseCard>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import BaseCard from "@/components/BaseCard.vue"

interface Notification {
  id: number
  title: string
  message: string
  date: string
  type: "security" | "transaction" | "credit"
  read: boolean
}

const filter = ref("all")

const notifications = ref<Notification[]>([
  {
    id: 1,
    title: "Connexion détectée",
    message: "Nouvelle connexion depuis Port-au-Prince",
    date: "02 Jan 2026 - 14:32",
    type: "security",
    read: false
  },
  {
    id: 2,
    title: "Virement effectué",
    message: "Virement de 10,000 HTG envoyé",
    date: "02 Jan 2026 - 10:12",
    type: "transaction",
    read: true
  },
  {
    id: 3,
    title: "Demande de crédit",
    message: "Votre demande est en cours d’analyse",
    date: "01 Jan 2026 - 09:00",
    type: "credit",
    read: false
  }
])

const filteredNotifications = computed(() => {
  if (filter.value === "all") return notifications.value
  return notifications.value.filter(n => n.type === filter.value)
})

const markRead = (id: number) => {
  const n = notifications.value.find(n => n.id === id)
  if (n) n.read = true
}

const markAllRead = () => {
  notifications.value.forEach(n => (n.read = true))
}
</script>
