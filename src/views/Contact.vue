<script setup lang="ts">
import { ref } from "vue"

// Heroicons
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/vue/24/solid"
import Navbar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: ""
})

const errors = ref<{ [k: string]: string }>({})

const validate = () => {
  errors.value = {}

  if (!form.value.name) errors.value.name = "Votre nom est requis."
  if (!form.value.email) errors.value.email = "Votre email est requis."
  if (!form.value.subject) errors.value.subject = "Veuillez indiquer un sujet."
  if (!form.value.message) errors.value.message = "Veuillez écrire un message."

  return Object.keys(errors.value).length === 0
}

const submitForm = () => {
  if (!validate()) return
  alert("Votre message a été envoyé.")
}
</script>

<template>
  <!-- Navbar -->
    <Navbar />
  <div class="pt-20">

    <!-- HERO -->
    <section class="bg-[#003366] text-white py-16 text-center">
      <h1 class="text-4xl font-bold">Contactez-nous</h1>
      <p class="text-lg mt-2 opacity-80">
        La Banque Populaire d'Haïti est à votre service.
      </p>
    </section>

    <!-- MAIN CONTENT -->
    <section class="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

      <!-- LEFT COLUMN – INFORMATIONS DE CONTACT -->
      <div>
        <h2 class="text-2xl font-bold text-[#003366] mb-6">Informations de contact</h2>

        <div class="space-y-6">

          <!-- Adresse -->
          <div class="flex items-start gap-4 bg-white shadow-md rounded-lg p-6 border-l-4 border-bph-gold">
            <MapPinIcon class="h-8 w-8 text-bph-gold flex-shrink-0" />
            <div>
              <h3 class="text-lg font-semibold text-[#003366]">Siège Social</h3>
              <p class="text-gray-700">Angle Rue des Miracles & Rue du Quai</p>
              <p class="text-gray-700">Port-au-Prince, Haïti</p>
            </div>
          </div>

          <!-- Téléphone -->
          <div class="flex items-start gap-4 bg-white shadow-md rounded-lg p-6 border-l-4 border-bph-gold">
            <PhoneIcon class="h-8 w-8 text-bph-gold flex-shrink-0" />
            <div>
              <h3 class="text-lg font-semibold text-[#003366]">Téléphone</h3>
              <p class="text-gray-700">+509 29xx-xxxx</p>
              <p class="text-gray-700">+509 48xx-xxxx</p>
            </div>
          </div>

          <!-- Email -->
          <div class="flex items-start gap-4 bg-white shadow-md rounded-lg p-6 border-l-4 border-bph-gold">
            <EnvelopeIcon class="h-8 w-8 text-bph-gold flex-shrink-0" />
            <div>
              <h3 class="text-lg font-semibold text-[#003366]">Adresse Email</h3>
              <p class="text-gray-700">serviceclient@bph.ht</p>
            </div>
          </div>

          <!-- Horaires -->
          <div class="flex items-start gap-4 bg-white shadow-md rounded-lg p-6 border-l-4 border-bph-gold">
            <ClockIcon class="h-8 w-8 text-bph-gold flex-shrink-0" />
            <div>
              <h3 class="text-lg font-semibold text-[#003366]">Horaires d’ouverture</h3>
              <p class="text-gray-700">Lundi – Vendredi : 9h00 - 16h00</p>
              <p class="text-gray-700">Samedi : 9h00 - 12h00</p>
            </div>
          </div>

        </div>
      </div>

      <!-- RIGHT COLUMN – FORMULAIRE -->
      <div>
        <h2 class="text-2xl font-bold text-[#003366] mb-6">Envoyer un message</h2>

        <form @submit.prevent="submitForm" class="space-y-5">

          <!-- Nom -->
          <div>
            <label class="block text-sm font-medium text-[#003366]">Nom complet</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full border rounded-md p-3 focus:ring-2 focus:ring-bph-gold outline-none"
            />
            <p v-if="errors.name" class="text-red-600 text-sm">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-[#003366]">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="w-full border rounded-md p-3 focus:ring-2 focus:ring-bph-gold outline-none"
            />
            <p v-if="errors.email" class="text-red-600 text-sm">{{ errors.email }}</p>
          </div>

          <!-- Sujet -->
          <div>
            <label class="block text-sm font-medium text-[#003366]">Sujet</label>
            <input
              v-model="form.subject"
              type="text"
              class="w-full border rounded-md p-3 focus:ring-2 focus:ring-bph-gold outline-none"
            />
            <p v-if="errors.subject" class="text-red-600 text-sm">{{ errors.subject }}</p>
          </div>

          <!-- Message -->
          <div>
            <label class="block text-sm font-medium text-[#003366]">Message</label>
            <textarea
              v-model="form.message"
              rows="5"
              class="w-full border rounded-md p-3 resize-none focus:ring-2 focus:ring-bph-gold outline-none"
            ></textarea>
            <p v-if="errors.message" class="text-red-600 text-sm">{{ errors.message }}</p>
          </div>

          <!-- Bouton -->
          <button
            type="submit"
            class="w-full bg-bph-gold text-[#003366] font-bold py-3 rounded-md
                   hover:bg-[#d4a021] transition"
          >
            Envoyer le message
          </button>

        </form>
      </div>

    </section>

    <!-- MAP -->
    <section class="w-full h-72 mt-10">
      <iframe
        class="w-full h-full"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        src="https://maps.google.com/maps?q=port-au-prince&t=&z=13&ie=UTF8&iwloc=&output=embed"
      ></iframe>
    </section>

  </div>
  
     <!-- Footer -->
    <Footer />
</template>
