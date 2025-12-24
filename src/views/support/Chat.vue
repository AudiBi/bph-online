<template>
  <BaseCard title="Chat en direct">
    <div class="flex flex-col h-[400px] md:h-[600px] border rounded p-4 overflow-y-auto space-y-3 bg-gray-50">
      <div v-for="msg in messages" :key="msg.id" class="flex" :class="msg.from === 'user' ? 'justify-end' : 'justify-start'">
        <div class="px-3 py-2 rounded-lg" :class="msg.from === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'">
          {{ msg.text }}
        </div>
      </div>
    </div>

    <form @submit.prevent="sendMessage" class="mt-3 flex gap-2">
      <input v-model="newMessage" type="text" placeholder="Écrire un message..." class="flex-1 input-text" />
      <button type="submit" class="btn-primary">Envoyer</button>
    </form>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Message { id: number; text: string; from: 'user' | 'support' }

const messages = ref<Message[]>([
  { id: 1, text: "Bonjour, comment puis-je vous aider ?", from: 'support' }
])

const newMessage = ref('')

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  messages.value.push({ id: Date.now(), text: newMessage.value, from: 'user' })
  newMessage.value = ''
}
</script>
