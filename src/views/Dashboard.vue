<template>
  <div class="flex min-h-screen bg-gray-50">

    <div class="flex-1 flex flex-col">

      <!-- Contenu principal -->
      <main class="flex-grow p-4 md:p-6 space-y-6">

        <!-- Titre -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h1 class="text-2xl font-bold text-primary">Tableau de bord</h1>
          <span class="text-sm text-gray-500">
            Dernière connexion : 02 Jan 2026 à 14:32
          </span>
        </div>

        <!-- Résumé financier -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <BaseCard title="Solde total">
            <p class="text-2xl font-bold text-primary">HTG 1,250,000</p>
            <p class="text-xs text-muted">Tous comptes confondus</p>
          </BaseCard>

          <BaseCard title="Compte courant">
            <p class="text-xl font-semibold">HTG 820,000</p>
            <p class="text-xs text-muted">Disponible</p>
          </BaseCard>

          <BaseCard title="Épargne">
            <p class="text-xl font-semibold">HTG 430,000</p>
            <p class="text-xs text-muted">Objectif actif</p>
          </BaseCard>
        </section>

        <!-- Actions rapides -->
        <section>
          <BaseCard title="Actions rapides">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <QuickAction label="Virement" :icon="ArrowsRightLeftIcon" />
              <QuickAction label="Paiement" :icon="CurrencyDollarIcon" />
              <QuickAction label="Relevé" :icon="DocumentTextIcon" />
              <QuickAction label="Support" :icon="LifebuoyIcon" />
            </div>
          </BaseCard>
        </section>

        <!-- Comptes + Transactions -->
        <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <!-- Comptes -->
          <BaseCard title="Mes comptes" class="lg:col-span-1">
            <ul class="divide-y">
              <li class="py-3 flex justify-between">
                <span>Compte courant</span>
                <span class="font-medium">HTG 820,000</span>
              </li>
              <li class="py-3 flex justify-between">
                <span>Épargne</span>
                <span class="font-medium">HTG 430,000</span>
              </li>
              <li class="py-3 flex justify-between">
                <span>Compte USD</span>
                <span class="font-medium">$ 3,200</span>
              </li>
            </ul>
          </BaseCard>

          <!-- Transactions -->
          <BaseCard title="Dernières transactions" class="lg:col-span-2">
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead class="text-left text-muted border-b">
                  <tr>
                    <th class="py-2">Date</th>
                    <th>Libellé</th>
                    <th>Montant</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b">
                    <td class="py-2">02 Jan</td>
                    <td>Virement sortant</td>
                    <td class="text-red-600">-10,000</td>
                    <td class="text-success">Validé</td>
                  </tr>
                  <tr class="border-b">
                    <td class="py-2">01 Jan</td>
                    <td>Paiement électricité</td>
                    <td class="text-red-600">-3,200</td>
                    <td class="text-success">Payé</td>
                  </tr>
                  <tr>
                    <td class="py-2">30 Déc</td>
                    <td>Virement entrant</td>
                    <td class="text-green-600">+25,000</td>
                    <td class="text-success">Reçu</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </BaseCard>

        </section>

        <!-- Alertes sécurité -->
        <section>
          <BaseCard title="Alertes & sécurité">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <p class="text-sm">
                Aucun incident détecté. Vos accès sont sécurisés.
              </p>
              <button class="btn-secondary">
                Voir journal d’activité
              </button>
            </div>
          </BaseCard>
        </section>

      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseCard from "@/components/BaseCard.vue"
import QuickAction from "@/components/QuickAction.vue"
import {ArrowsRightLeftIcon,
        CurrencyDollarIcon,
        DocumentTextIcon,
        LifebuoyIcon
      } from "@heroicons/vue/24/outline"
</script>
