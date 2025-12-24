<template>
  <BaseCard title="Journal activité">
    <table class="w-full text-sm table-auto">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 text-left">Date</th>
          <th class="p-2 text-left">Action</th>
          <th class="p-2 text-left">IP</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in logs" :key="log.id" class="border-b">
          <td class="p-2">{{ log.date }}</td>
          <td class="p-2">{{ log.action }}</td>
          <td class="p-2">{{ log.ip }}</td>
        </tr>
      </tbody>
    </table>
  </BaseCard>
</template>

<script setup lang="ts">
const logs = [
  { id: 1, date: "18/12/2025 14:23", action: "Connexion réussie", ip: "192.168.0.1" },
  { id: 2, date: "17/12/2025 09:11", action: "Modification profil", ip: "192.168.0.1" },
  { id: 3, date: "16/12/2025 20:45", action: "Changement mot de passe", ip: "192.168.0.1" }
]
</script>
