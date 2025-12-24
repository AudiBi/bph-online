<template>
  <header
    class="bg-white border-b px-4 md:px-6 py-3
           flex items-center justify-between"
  >
    <!-- GAUCHE -->
    <div class="flex items-center gap-3">
      <!-- Burger mobile -->
      <button
        class="md:hidden text-xl"
        aria-label="Ouvrir le menu"
        @click="$emit('toggle-sidebar')"
      >
        ☰
      </button>

      <!-- Bienvenue -->
      <div class="leading-tight">
        <p class="text-sm text-muted">Bienvenue</p>
        <p class="font-semibold text-primary">
          {{ user.fullName }}
        </p>
      </div>
    </div>

    <!-- DROITE -->
    <div class="flex items-center gap-4">

      <!-- Statut sécurité -->
      <div class="hidden md:flex items-center gap-2 text-xs">
        <span class="w-2 h-2 rounded-full bg-green-500"></span>
        <span class="text-muted">Session sécurisée</span>
      </div>

      <!-- Devise -->
      <select
        v-model="currency"
        class="text-sm bg-surface border rounded-md px-2 py-1
               focus:outline-none focus:ring"
        aria-label="Devise"
      >
        <option value="HTG">HTG</option>
        <option value="USD">USD</option>
      </select>

      <!-- Notifications -->
      <div class="relative">
        <button
          class="relative p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Notifications"
          @click="toggleNotifications"
        >
          <span class="text-lg">🔔</span>
          <span
            v-if="notifications.length"
            class="absolute -top-1 -right-1 bg-red-600 text-white
                   text-xs w-5 h-5 flex items-center justify-center rounded-full"
          >
            {{ notifications.length }}
          </span>
        </button>

        <!-- Dropdown notifications -->
        <div
          v-if="showNotifications"
          class="absolute right-0 mt-2 w-80 bg-white
                 border rounded-md shadow-lg z-50"
        >
          <div class="px-4 py-2 border-b text-sm font-medium">
            Notifications
          </div>

          <ul class="max-h-72 overflow-y-auto text-sm">
            <li
              v-for="n in notifications"
              :key="n.id"
              class="px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
            >
              <p class="font-medium">{{ n.title }}</p>
              <p class="text-xs text-muted">{{ n.date }}</p>
            </li>
          </ul>

          <RouterLink
            to="/notifications"
            class="block text-center text-sm py-2 text-primary hover:bg-gray-50"
          >
            Voir toutes
          </RouterLink>
        </div>
      </div>

      <!-- PROFIL -->
      <div class="relative">
        <button
          class="flex items-center gap-2 focus:outline-none"
          @click="toggleProfile"
          aria-label="Menu profil"
        >
          <img
            :src="user.avatar"
            alt="Avatar"
            class="w-8 h-8 rounded-full border"
          />
        </button>

        <!-- Dropdown profil -->
        <div
          v-if="showProfile"
          class="absolute right-0 mt-2 w-48 bg-white
                 border rounded-md shadow-lg z-50"
        >
          <ul class="text-sm">
            <li to="/settings/profile" class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="showProfile = false">
              Mon profil
            </li>
            <li to="/settings/security" class="px-4 py-2 hover:bg-gray-100 cursor-pointer"  @click="showProfile = false">
              Sécurité
            </li>
            <li
              class="border-t px-4 py-2 text-red-600
                     hover:bg-red-50 cursor-pointer"
              @click="logout"
            >
              Déconnexion
            </li>
          </ul>
        </div>
      </div>

    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue"

defineEmits(["toggle-sidebar"])

const user = {
  fullName: "Jean Dupont",
  avatar: "https://i.pravatar.cc/100"
}

const currency = ref("HTG")

const notifications = ref([
  { id: 1, title: "Virement sortant de 10 000 HTG", date: "02 Jan 2026" },
  { id: 2, title: "Connexion depuis un nouvel appareil", date: "01 Jan 2026" },
  { id: 3, title: "Facture électricité payée", date: "30 Déc 2025" }
])

const showNotifications = ref(false)
const showProfile = ref(false)

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  showProfile.value = false
}

const toggleProfile = () => {
  showProfile.value = !showProfile.value
  showNotifications.value = false
}

const logout = () => {
  // Appel API + purge session
  console.log("Déconnexion")
}
</script>
