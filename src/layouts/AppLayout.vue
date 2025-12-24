<!-- src/layouts/AppLayout.vue -->
<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar
      :isOpen="sidebarOpen"
      @close="sidebarOpen = false"
    />

    <!-- Contenu principal -->
    <div class="flex-1 flex flex-col">
      <Topbar @toggle-sidebar="sidebarOpen = true" />

      <main class="flex-grow p-4 md:p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Sidebar from "@/components/Sidebar.vue"
import Topbar from "@/components/Topbar.vue"

const sidebarOpen = ref(false)
</script>
