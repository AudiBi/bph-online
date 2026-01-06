<template>
  <!-- Overlay mobile -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/40 z-40 md:hidden"
    @click="close"
  />

  <!-- Sidebar -->
  <aside
    class="fixed md:static inset-y-0 left-0 z-50
           w-72 bg-white text-gray-700 flex flex-col
           transform transition-transform duration-200
           md:translate-x-0 border-r border-gray-200"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
  >
    <!-- Header -->
    <div class="p-6 border-b border-gray-200 flex items-center gap-3">
      <!-- Logo -->
      <img
        src="@/assets/logo-bph.png"
        alt="BPH Digital"
        class="h-10 w-10 object-contain"
      />

      <!-- Texte -->
      <div class="leading-tight">
        <h1 class="text-xl font-bold text-bph-primary">
          BPH <span class="text-bph-gold">Digital</span>
        </h1>
        <p class="text-sm text-gray-500">Espace client</p>
      </div>
    </div>


    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-1 text-sm overflow-y-auto">

      <!-- Tableau de bord -->
      <RouterLink
        to="/dashboard"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-bph-primary/10"
        :class="isActive('/dashboard') ? 'bg-bph-primary/15 text-bph-primary font-semibold' : 'text-gray-700'"
        @click="close"
      >
        <HomeIcon class="w-5 h-5" />
        Tableau de bord
      </RouterLink>

      <!-- Mes comptes -->
      <RouterLink
        to="/accounts"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-bph-primary/10"
        :class="isActive('/accounts') ? 'bg-bph-primary/15 text-bph-primary font-semibold' : 'text-gray-700'"
        @click="close"
      >
        <BanknotesIcon class="w-5 h-5" />
        Mes comptes
      </RouterLink>

      <!-- Relevés / Historique -->
      <!-- <RouterLink
        to="/accounts/statements"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-bph-primary/10"
        :class="isActive('/accounts/statements') ? 'bg-bph-primary/15 text-bph-primary font-semibold' : 'text-gray-700'"
        @click="close"
      >
        <DocumentTextIcon class="w-5 h-5" />
        Relevés
      </RouterLink>
      <RouterLink
        to="/accounts/transactions"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-bph-primary/10"
        :class="isActive('/accounts/transactions') ? 'bg-bph-primary/15 text-bph-primary font-semibold' : 'text-gray-700'"
        @click="close"
      >
        <ClockIcon class="w-5 h-5" />
        Historique
      </RouterLink> -->

      <!-- Virements avec sous-menu -->
      <div>
        <button @click="toggleTransfers" 
                class="flex justify-between w-full items-center px-4 py-2 rounded hover:bg-bph-primary/10"
                :class="isTransfersActive ? 'bg-bph-primary/15 font-semibold' : 'text-gray-700'">
          <span class="flex items-center gap-3">
            <ArrowsRightLeftIcon class="w-5 h-5" />
            Virements
          </span>
          <span class="text-bph-gold">{{ transfersOpen ? '▾' : '▸' }}</span>
        </button>

        <div v-if="transfersOpen" class="ml-6 flex flex-col mt-1 space-y-1">
          <RouterLink
            to="/transfers/local"
            class="px-4 py-2 rounded hover:bg-bph-primary/10 text-gray-600"
            :class="isActive('/transfers/local') ? 'text-bph-primary font-medium' : ''"
            @click="close"
          >
            <span class="flex items-center gap-3">
              <ArrowRightCircleIcon class="w-4 h-4" />
              Local
            </span>
          </RouterLink>
          <RouterLink
            to="/transfers/international"
            class="px-4 py-2 rounded hover:bg-bph-primary/10 text-gray-600"
            :class="isActive('/transfers/international') ? 'text-bph-primary font-medium' : ''"
            @click="close"
          >
            <span class="flex items-center gap-3">
              <GlobeAltIcon class="w-4 h-4" />
              International
            </span>
          </RouterLink>
        </div>
      </div>

      <!-- Bénéficiaires -->
      <RouterLink
        to="/beneficiaries"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-bph-primary/10"
        :class="isActive('/beneficiaries') ? 'bg-bph-primary/15 text-bph-primary font-semibold' : 'text-gray-700'"
        @click="close"
      >
        <UserGroupIcon class="w-5 h-5" />
        Bénéficiaires
      </RouterLink>

      <!-- <RouterLink
        to="/beneficiaries/new"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-bph-primary/10"
        :class="isActive('/beneficiaries/new') ? 'bg-bph-primary/15 text-bph-primary font-semibold' : 'text-gray-700'"
        @click="close"
      >
        <PlusCircleIcon class="w-5 h-5" />
        Ajouter bénéficiaire
      </RouterLink> -->
      <!-- Encaissements / Dépôts -->
      <RouterLink
        to="/deposits"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-bph-primary/10"
        :class="isActive('/deposits') ? 'bg-bph-primary/15 text-bph-primary font-semibold' : 'text-gray-700'"
        @click="close"
      >
        <ArrowRightCircleIcon class="w-5 h-5" />
        Encaissements
      </RouterLink>

      <!-- Paiements avec sous-menu -->
      <div>
        <button @click="togglePayments"
                class="flex justify-between w-full items-center px-4 py-2 rounded hover:bg-bph-primary/10"
                :class="isPaymentsActive ? 'bg-bph-primary/15 font-semibold' : 'text-gray-700'">
                <span class="flex items-center gap-3">
                  <CurrencyDollarIcon class="w-5 h-5" />
                  Paiements
                </span>
          <span class="text-bph-gold">{{ paymentsOpen ? '▾' : '▸' }}</span>
        </button>

        <div v-if="paymentsOpen" class="ml-6 flex flex-col mt-1 space-y-1">
          <RouterLink
            to="/payments/card"
            class="px-4 py-2 rounded hover:bg-bph-primary/10 text-gray-600"
            :class="isActive('/payments/bills') ? 'text-bph-primary font-medium' : ''"
            @click="close"
          >
            <span class="flex items-center gap-3">
              <CreditCardIcon class="w-4 h-4" />
              Par carte
            </span>
          </RouterLink>
          <RouterLink
            to="/payments/bills"
            class="px-4 py-2 rounded hover:bg-bph-primary/10 text-gray-600"
            :class="isActive('/payments/bills') ? 'text-bph-primary font-medium' : ''"
            @click="close"
          >
            <span class="flex items-center gap-3">
              <ReceiptPercentIcon class="w-4 h-4" />
              Factures
            </span>
          </RouterLink>
          <RouterLink
            to="/payments/mobile"
            class="px-4 py-2 rounded hover:bg-bph-primary/10 text-gray-600"
            :class="isActive('/payments/mobile') ? 'text-bph-primary font-medium' : ''"
            @click="close"
          >
            <span class="flex items-center gap-3">
              <DevicePhoneMobileIcon class="w-4 h-4" />
              Recharge mobile
            </span>
          </RouterLink>
          <RouterLink
            to="/payments/history"
            class="px-4 py-2 rounded hover:bg-bph-primary/10 text-gray-600"
            :class="isActive('/payments/history') ? 'text-bph-primary font-medium' : ''"
            @click="close"
          >
            <span class="flex items-center gap-3">
              <ClockIcon class="w-4 h-4" />
              Historique
            </span>
          </RouterLink>
        </div>
      </div>

      <!-- Cartes -->
      <RouterLink
        to="/cards"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-bph-primary/10"
        :class="isActive('/cards') ? 'bg-bph-primary/15 text-bph-primary font-semibold' : 'text-gray-700'"
        @click="close"
      >
        <CreditCardIcon class="w-5 h-5" />
        Cartes
      </RouterLink>

      <!-- Crédits -->
      <RouterLink
        to="/credits/simulate"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-bph-primary/10"
        :class="isActive('/credits/simulate') ? 'bg-bph-primary/15 text-bph-primary font-semibold' : 'text-gray-700'"
        @click="close"
      >
        <DocumentCheckIcon class="w-5 h-5" />
        Crédits
      </RouterLink>

      <!-- Suivi -->
      <RouterLink
        to="/processes"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-bph-primary/10"
        :class="isActive('/processes')
          ? 'bg-bph-primary/15 text-bph-primary font-semibold'
          : 'text-gray-700'"
        @click="close"
      >
        <ClipboardDocumentCheckIcon class="w-5 h-5" />
        Suivi des demandes
      </RouterLink>


      <!-- Épargne -->
      <RouterLink
        to="/savings"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-bph-primary/10"
        :class="isActive('/savings') ? 'bg-bph-primary/15 text-bph-primary font-semibold' : 'text-gray-700'"
        @click="close"
      >
        <ChartBarIcon class="w-5 h-5" />
        Épargne
      </RouterLink>

      <!-- Notifications -->
      <RouterLink
        to="/notifications"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-bph-primary/10"
        :class="isActive('/notifications') ? 'bg-bph-primary/15 text-bph-primary font-semibold' : 'text-gray-700'"
        @click="close"
      >
        <BellIcon class="w-5 h-5" />
        Notifications
      </RouterLink>

      <!-- Sous-menu Support -->
      <div>
        <button
          @click="toggleSupport"
           class="flex justify-between w-full items-center
         px-4 py-2 rounded-lg transition-colors
         hover:bg-bph-primary/10"
        :class="isSupportActive
          ? 'bg-bph-primary/15 text-bph-primary font-semibold'
          : 'text-gray-700'"
        >
            <span class="flex items-center gap-3">
              <LifebuoyIcon class="w-5 h-5" />
              Support
            </span>
          <span class="text-bph-gold">{{ supportOpen ? '▾' : '▸' }}</span>
        </button>

        <div v-if="supportOpen" class="ml-6 flex flex-col mt-1 space-y-1">
          <RouterLink
            to="/support/chat"
            class="px-4 py-2 rounded hover:bg-bph-primary/10 text-gray-600"
            :class="isActive('/support/chat') ? 'text-bph-primary font-medium' : ''"
            @click="close"
          >
            <span class="flex items-center gap-3">
              <ChatBubbleLeftRightIcon class="w-4 h-4" />
              Chat
            </span>
          </RouterLink>

          <RouterLink
            to="/support/tickets"
            class="px-4 py-2 rounded hover:bg-bph-primary/10 text-gray-600"
            :class="isActive('/support/tickets') ? 'text-bph-primary font-medium' : ''"
            @click="close"
          >
              <span class="flex items-center gap-3">
                <TicketIcon class="w-4 h-4" />
                  Tickets
              </span>
          </RouterLink>
          

          <RouterLink
            to="/support/appointments"
            class="px-4 py-2 rounded hover:bg-bph-primary/10 text-gray-600"
            :class="isActive('/support/appointments') ? 'text-bph-primary font-medium' : ''"
            @click="close"
          >
            <span class="flex items-center gap-3">
              <CalendarDaysIcon class="w-4 h-4" />
              RDV
            </span>
          </RouterLink>
        </div>
      </div>
      <!-- Autres Opérations -->
      <RouterLink
        to="/other-operations"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-bph-primary/10"
        :class="isActive('/other-operations') ? 'bg-bph-primary/15 text-bph-primary font-semibold' : 'text-gray-700'"
        @click="close"
      >
        <CogIcon class="w-5 h-5" />
        Autres opérations
      </RouterLink>

      <!-- Sécurité -->
      <RouterLink
        to="/settings/security"
        class="flex items-center gap-3 px-4 py-2 rounded hover:bg-bph-primary/10"
        :class="isActive('/settings/security') ? 'bg-bph-primary/15 text-bph-primary font-semibold' : 'text-gray-700'"
        @click="close"
      >
        <ShieldCheckIcon class="w-5 h-5" />
        Sécurité
      </RouterLink>

    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-gray-200 text-xs text-gray-500">
      © 2026 <span class="text-bph-primary font-medium">BPH </span>
      <span class="text-bph-gold">Digital</span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import {
  HomeIcon,
  BanknotesIcon,
  DocumentTextIcon,
  ClockIcon,
  ArrowsRightLeftIcon,
  CreditCardIcon,
  ClipboardDocumentCheckIcon,
  DocumentCheckIcon,
  ChartBarIcon,
  BellIcon,
  ShieldCheckIcon,
  LifebuoyIcon,
  ChatBubbleLeftRightIcon,
  TicketIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  PlusCircleIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ReceiptPercentIcon,
  DevicePhoneMobileIcon,
  ArrowRightCircleIcon,
  CogIcon
} from "@heroicons/vue/24/outline"

defineProps<{ isOpen?: boolean }>()
const emit = defineEmits(["close"])

const route = useRoute()
const close = () => emit("close")

// Sous-menu Virements
const transfersOpen = ref(false)
const toggleTransfers = () => transfersOpen.value = !transfersOpen.value
const isTransfersActive = computed(() => route.path.startsWith("/transfers"))

// Sous-menu Paiements
const paymentsOpen = ref(false)
const togglePayments = () => paymentsOpen.value = !paymentsOpen.value
const isPaymentsActive = computed(() => route.path.startsWith("/payments"))

const supportOpen = ref(false)
const toggleSupport = () => supportOpen.value = !supportOpen.value
const isSupportActive = computed(() => route.path.startsWith('/support'))

// Fonction helper pour surbrillance
const isActive = (path: string) => route.path.startsWith(path)
</script>
