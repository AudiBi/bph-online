<script setup lang="ts">
import { ref, computed } from "vue"

// Heroicons
import {
  MapPinIcon,
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  GlobeAmericasIcon
} from "@heroicons/vue/24/outline"
import Footer from "@/components/Footer.vue"
import Navbar from "@/components/Navbar.vue"

// Interface succursale
interface Branch {
  name: string
  address: string
  postal: string
  city: string
  department: string
}

// Liste des succursales
const branches = ref<Branch[]>([
  { name: "Siège Principal", address: "Angle Rue des Miracles & Rue du Quai", postal: "HT6110", city: "Port-au-Prince", department: "Ouest" },
  { name: "BPH – Carrefour", address: "Rue du Centre, Carrefour", postal: "HT6112", city: "Carrefour", department: "Ouest" },
  { name: "BPH – Cap-Haïtien", address: "Rue Cap-Haïtien", postal: "HT1110", city: "Cap-Haïtien", department: "Nord" },
])

// filtres
const searchPostal = ref("")
const selectedCity = ref("")
const selectedDepartment = ref("")

const cities = computed(() =>
  Array.from(new Set(branches.value.map(b => b.city)))
)

const departments = computed(() =>
  Array.from(new Set(branches.value.map(b => b.department)))
)

const filteredBranches = computed(() =>
  branches.value.filter(b => {
    const matchPostal = !searchPostal.value || b.postal.includes(searchPostal.value)
    const matchCity = !selectedCity.value || b.city === selectedCity.value
    const matchDept = !selectedDepartment.value || b.department === selectedDepartment.value
    return matchPostal && matchCity && matchDept
  })
)
</script>

<template>
  <!-- Navbar -->
    <Navbar />
  <div class="pt-20">
    

    <!-- HERO -->
    <section class="bg-[#003366] text-white py-16 text-center">
      <h1 class="text-4xl font-bold">Nos succursales BPH</h1>
      <p class="text-lg mt-2 opacity-80 flex justify-center gap-2">
        <GlobeAmericasIcon class="h-6 w-6" />
        Trouvez la succursale la plus proche
      </p>
    </section>

    <!-- FILTRES -->
    <section class="max-w-6xl mx-auto px-6 lg:px-8 py-8 space-y-4">
      
      <div class="flex flex-col lg:flex-row gap-4">

        <!-- Code postal -->
        <div class="relative flex-1">
          <MagnifyingGlassIcon class="w-5 h-5 absolute left-3 top-3 text-gray-500" />
          <input
            v-model="searchPostal"
            type="text"
            placeholder="Rechercher par code postal..."
            class="w-full pl-10 p-3 border rounded-md focus:ring-2 focus:ring-bph-gold outline-none"
          />
        </div>

        <!-- Ville -->
        <div class="relative w-full lg:w-60">
          <select
            v-model="selectedCity"
            class="w-full p-3 border rounded-md focus:ring-2 focus:ring-bph-gold outline-none appearance-none pr-10"
          >
            <option value="">Toutes les villes</option>
            <option v-for="city in cities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
          <ChevronDownIcon class="w-5 h-5 absolute right-3 top-3 text-gray-500" />
        </div>

        <!-- Département -->
        <div class="relative w-full lg:w-60">
          <select
            v-model="selectedDepartment"
            class="w-full p-3 border rounded-md focus:ring-2 focus:ring-bph-gold outline-none appearance-none pr-10"
          >
            <option value="">Tous les départements</option>
            <option v-for="dept in departments" :key="dept" :value="dept">
              {{ dept }}
            </option>
          </select>
          <ChevronDownIcon class="w-5 h-5 absolute right-3 top-3 text-gray-500" />
        </div>

      </div>

    </section>

    <!-- LISTE DES SUCCURSALES -->
    <section class="max-w-5xl mx-auto px-6 lg:px-8 pb-16">
      
      <h2 class="text-3xl font-bold text-[#003366] mb-6 flex items-center gap-2">
        <BuildingOfficeIcon class="w-8 h-8 text-bph-gold" />
        Nos agences
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div
          v-for="branch in filteredBranches"
          :key="branch.name"
          class="bg-white shadow-md rounded-lg p-5 border-l-4 border-bph-gold hover:shadow-lg transition cursor-pointer"
        >
          <div class="flex items-center gap-4">
            <MapPinIcon class="w-12 h-12 text-bph-gold" />

            <div>
              <h3 class="text-xl font-semibold text-[#003366]">
                {{ branch.name }}
              </h3>

              <p class="text-gray-700">{{ branch.address }}</p>
              <p class="text-gray-700">{{ branch.city }}, {{ branch.postal }}</p>
              <p class="text-gray-700">Département : {{ branch.department }}</p>
            </div>
          </div>
        </div>

      </div>
    </section>

  </div>
  
  <!-- Footer -->
  <Footer />
</template>

<style scoped>
</style>
