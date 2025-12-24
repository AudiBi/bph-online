<script setup lang="ts">
import { ref } from "vue"

// Heroicons
import {
  InformationCircleIcon,
  EyeIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  ChatBubbleBottomCenterTextIcon,
  QuestionMarkCircleIcon,
  WrenchScrewdriverIcon,
  XMarkIcon
} from "@heroicons/vue/24/outline"

// gestion du modal
const activeModal = ref<string | null>(null)

const openModal = (modal: string) => {
  activeModal.value = modal
}

const closeModal = () => {
  activeModal.value = null
}

// contenus modals
const modalContents: Record<string, any> = {
  about: {
    title: "À propos de nous",
    icon: InformationCircleIcon,
    content: `
      La Banque Populaire Haïtienne (BPH) est engagée depuis plus de 25 ans 
      dans la modernisation des services bancaires en Haïti. Nous offrons des solutions 
      financières fiables, sécurisées et adaptées aux besoins de nos clients particuliers, 
      professionnels et entreprises.

      Notre mission est de fournir une expérience bancaire moderne, 
      accessible et centrée sur la confiance, l'innovation et la proximité.
    `,
  },

  accessibility: {
    title: "Accessibilité",
    icon: EyeIcon,
    content: `
      Nous nous engageons à offrir une plateforme inclusive et accessible à tous.  
      Nos interfaces adoptent les standards WCAG 2.1 AA et incluent :

      • Contrastes optimisés  
      • Navigation clavier complète  
      • Texte adaptable  
      • Structure claire et compréhensible  
      • Compatibilité lecteurs d'écran  

      Notre objectif est de garantir une navigation simple et fluide
      pour tous nos utilisateurs.
    `,
  },

  privacy: {
    title: "Confidentialité",
    icon: ShieldCheckIcon,
    content: `
      La protection des données de nos clients est au cœur de nos priorités.  
      Nous appliquons des standards rigoureux :

      • Chiffrement avancé des données  
      • Politique stricte de gestion de l’information  
      • Aucune revente ou partage non autorisé  
      • Contrôles réguliers de conformité  

      Vos données personnelles sont traitées avec le plus haut niveau de confidentialité.
    `,
  },

  security: {
    title: "Sécurité",
    icon: LockClosedIcon,
    content: `
      Nos systèmes intégrent des mesures de cybersécurité de niveau bancaire :

      • Authentification renforcée  
      • Détection d’activités suspectes  
      • Protection anti-fraude 24/7  
      • Mise à jour permanente de nos infrastructures  
      • Audit régulier des systèmes  

      Nous protégeons chaque transaction et chaque connexion.
    `,
  },

  feedback: {
    title: "Feed-back",
    icon: ChatBubbleBottomCenterTextIcon,
    content: `
      Votre avis est essentiel pour l’amélioration continue de nos services.

      Vous pouvez partager :  
      • Vos suggestions  
      • Vos remarques  
      • Vos idées d'amélioration  
      • Vos signalements de bugs  

      Nous vous remercions d'aider la BPH à évoluer chaque jour.
    `,
  },

  faq: {
    title: "FAQ",
    icon: QuestionMarkCircleIcon,
    content: `
      Quelques réponses rapides :

      • Comment ouvrir un compte ?  
        → Via notre page d'inscription ou en agence.

      • Quels sont les frais ?  
        → Consultez notre grille tarifaire dans votre espace client.

      • Puis-je faire un transfert international ?  
        → Oui, via nos services SWIFT sécurisés.

      • L’application mobile est-elle disponible ?  
        → Oui, sur iOS et Android.
    `,
  },

  support: {
    title: "Support technique",
    icon: WrenchScrewdriverIcon,
    content: `
      Notre équipe technique est disponible 7j/7 pour vous aider.

      • Assistance connexion  
      • Problèmes techniques  
      • Support transactions  
      • Aide espace client  

      Contact : support@bph.ht  
      Téléphone : +509 29 00 0000
    `,
  },
}
</script>

<template>
  <footer class="w-full bg-white text-[#003366] text-sm py-4 px-4 border-t border-gray-200">
    <div class="max-w-6xl mx-auto flex flex-col items-center gap-3">

      <!-- Liens -->
      <nav class="flex flex-wrap justify-center gap-3 text-center font-medium">
        <button @click="openModal('about')" class="hover:text-bph-gold transition-colors">À propos de nous</button>
        <span class="text-gray-400">|</span>

        <button @click="openModal('accessibility')" class="hover:text-bph-gold transition-colors">Accessibilité</button>
        <span class="text-gray-400">|</span>

        <button @click="openModal('privacy')" class="hover:text-bph-gold transition-colors">Confidentialité</button>
        <span class="text-gray-400">|</span>

        <button @click="openModal('security')" class="hover:text-bph-gold transition-colors">Sécurité</button>
        <span class="text-gray-400">|</span>

        <button @click="openModal('feedback')" class="hover:text-bph-gold transition-colors">Feed-back</button>
        <span class="text-gray-400">|</span>

        <button @click="openModal('faq')" class="hover:text-bph-gold transition-colors">FAQ</button>
        <span class="text-gray-400">|</span>

        <button @click="openModal('support')" class="hover:text-bph-gold transition-colors">Support technique</button>
      </nav>

      <!-- Copyright -->
      <p class="text-center text-[#003366] leading-tight">
        Tous droits réservés © 2025
        <span class="font-semibold text-bph-primary">Banque Populaire Haïtienne</span>
      </p>
    </div>
  </footer>

  <!-- MODAL -->
  <div
    v-if="activeModal"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
    @click.self="closeModal"
  >
    <div class="bg-white max-w-lg w-full rounded-xl shadow-2xl p-6 relative border-t-4 border-bph-gold">

      <!-- Bouton fermer -->
      <button
        @click="closeModal"
        class="absolute top-3 right-3 text-gray-500 hover:text-bph-primary"
      >
        <XMarkIcon class="w-6 h-6" />
      </button>

      <!-- Icône -->
      <component
        :is="modalContents[activeModal].icon"
        class="w-12 h-12 text-bph-gold mx-auto mb-4"
      />

      <!-- Titre -->
      <h2 class="text-2xl font-bold text-center text-[#003366] mb-4">
        {{ modalContents[activeModal].title }}
      </h2>

      <!-- Contenu -->
      <p class="text-gray-700 whitespace-pre-line leading-relaxed text-center">
        {{ modalContents[activeModal].content }}
      </p>
    </div>
  </div>
</template>
