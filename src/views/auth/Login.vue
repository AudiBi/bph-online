<template>
  <!-- Navbar -->
    <Navbar />
  <section class="relative flex flex-col min-h-screen px-6 md:px-12 pt-24 pb-0">

    <!-- Background -->
    <div
      class="absolute inset-0 bg-cover bg-center brightness-60 -z-10"
      :style="{ backgroundImage: `url(${bg})` }"
    ></div>

    <!-- Contenu principal -->
    <div class="flex flex-col md:flex-row justify-between items-start gap-10 w-full flex-grow">

      <!-- Formulaire (transparent glass) -->
      <div class="w-full md:w-auto max-w-sm bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        <h2 class="text-2xl font-bold text-white mb-6 text-center md:text-left">
          Connexion à votre compte
        </h2>

        <form class="space-y-6">

          <!-- User -->
          <div>
            <label class="block text-white font-medium mb-1" for="username">
              Nom d'utilisateur
            </label>
            <input
              id="username"
              type="text"
              placeholder="Entrez votre nom d'utilisateur"
              class="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70
                     border border-white/30 focus:outline-none focus:ring-2 focus:ring-bph-gold focus:border-bph-gold shadow-sm"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-white font-medium mb-1" for="password">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              class="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70
                     border border-white/30 focus:outline-none focus:ring-2 focus:ring-bph-gold focus:border-bph-gold shadow-sm"
            />
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="w-full py-3 bg-bph-gold text-[#003366] font-semibold rounded-lg
                   hover:bg-bph-gold/90 transition shadow-md"
          >
            Se connecter
          </button>

          <!-- Liens -->
          <div class="flex flex-col sm:flex-row justify-between items-center mt-1 text-sm text-white gap-2">
            <a href="#" class="hover:underline">Code utilisateur oublié ?</a>
            <a href="#" class="hover:underline">Mot de passe oublié ?</a>
          </div>

          <!-- Inscription -->
          <div class="mt-4 text-sm text-white">
            <p class="mb-2 font-medium">S'inscrire à BPH pour :</p>
            <ul class="list-disc list-inside space-y-1">
              <li><a href="#" class="text-white hover:underline">Entreprise</a></li>
              <li><a href="#" class="text-white hover:underline">Particulier</a></li>
            </ul>
          </div>

        </form>
      </div>

      <!-- Bloc slogan (transparent glass) -->
      <div class="w-full md:w-auto max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-center">
        <h3 class="text-xl font-bold text-white mb-3">
          Votre avenir financier commence ici
        </h3>
        <p class="text-white/90 leading-relaxed">
          Une banque moderne et sécurisée, dédiée à votre croissance.
          Profitez de services digitaux et d’une assistance personnalisée.
        </p>
      </div>

    </div>

    <!-- Contact collé en bas (semi-transparent) -->
    <div class="flex justify-end mt-auto w-full">
      <div class="w-full md:w-auto max-w-sm bg-white/20 backdrop-blur-xl rounded-t-2xl shadow-xl p-6 text-right border-t-4 border-bph-gold">
        <h4 class="text-white font-bold text-lg mb-4">Contactez-nous</h4>

        <div class="flex justify-end items-center gap-2 text-white font-semibold">
          <PhoneIcon class="w-5 h-5 text-bph-gold" />
          <span>(509) 00 00 0000</span>
        </div>

        <div class="flex justify-end items-center gap-2 text-white font-semibold mt-2">
          <EnvelopeIcon class="w-5 h-5 text-bph-gold" />
          <span>support@bph.com</span>
        </div>
      </div>
    </div>

  </section>
  <!-- Footer -->
    <Footer />
</template>

<script setup>
import bg from "@/assets/images/background-login.jpg";
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/vue/24/solid";
</script>
