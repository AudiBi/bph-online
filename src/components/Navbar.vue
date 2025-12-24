<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from 'vue-router'

const route = useRoute()
const languages = [
  { code: "FR", label: "Français" },
  { code: "HT", label: "Kreyòl Ayisyen" }
]

const currentLang = ref("FR")
const mobileMenuOpen = ref(false)

const switchLang = (lang: string) => {
  currentLang.value = lang
}
const linkClass = (path: string) => {
  return route.path === path ? 'text-bph-gold font-semibold' : ''
}
</script>

<template>
  <header class="w-full bg-white fixed top-0 left-0 z-50 shadow-sm">

    <div class="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">

      <!-- Logo -->
      <img
        src="@/assets/logo-bph.png"
        alt="Logo Banque Populaire d'Haïti"
        class="h-10 md:h-14 object-contain"
      />

      <!-- Boutons Desktop -->
      <div class="hidden md:flex items-center gap-6">

       <nav class="flex gap-4 items-center text-[#003366] font-medium text-base">
        <router-link
          :to="'/localiser'"
          :class="['hover:text-bph-gold', 'transition-colors', linkClass('/localiser')]"
        >
          Localiser
        </router-link>

        <router-link
          :to="'/contact'"
          :class="['hover:text-bph-gold', 'transition-colors', linkClass('/contact')]"
        >
          Contactez-nous
        </router-link>
      </nav>


        <!-- Langue -->
        <select
          v-model="currentLang"
          @change="switchLang(currentLang)"
          class="bg-bph-gold text-[#003366] font-semibold rounded-md px-2 py-1.5
                 focus:outline-none focus:ring-2 focus:ring-[#003366]"
        >
          <option
            v-for="lang in languages"
            :key="lang.code"
            :value="lang.code"
          >
            {{ lang.label }}
          </option>
        </select>

      </div>

      <!-- Mobile: Bouton Hamburger -->
      <button
        class="md:hidden text-[#003366]"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

    </div>

    <!-- Menu Mobile -->
    <transition name="fade">
      <div
        v-if="mobileMenuOpen"
        class="md:hidden bg-white border-t shadow-md px-4 py-4 flex flex-col gap-4"
      >

        <a href="#" class="text-[#003366] text-sm font-medium hover:text-bph-gold">
          Localiser
        </a>

        <a href="#" class="text-[#003366] text-sm font-medium hover:text-bph-gold">
          Contact
        </a>

        <!-- Langue mobile -->
        <select
          v-model="currentLang"
          @change="switchLang(currentLang)"
          class="bg-bph-gold text-[#003366] font-semibold rounded-md px-2 py-2
                 focus:outline-none focus:ring-2 focus:ring-[#003366]"
        >
          <option
            v-for="lang in languages"
            :key="lang.code"
            :value="lang.code"
          >
            {{ lang.label }}
          </option>
        </select>

      </div>
    </transition>

  </header>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
