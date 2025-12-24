<template>
  <BaseCard title="Prendre un RDV">
    <form @submit.prevent="bookAppointment" class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Nom</label>
        <input v-model="name" type="text" class="input-text w-full" />
      </div>
      <div>
        <label class="block text-sm font-medium">Date</label>
        <input v-model="date" type="date" class="input-text w-full" />
      </div>
      <div>
        <label class="block text-sm font-medium">Heure</label>
        <input v-model="time" type="time" class="input-text w-full" />
      </div>
      <button type="submit" class="btn-primary w-full">Confirmer RDV</button>
    </form>

    <div v-if="appointments.length" class="mt-4 space-y-2">
      <h3 class="font-medium">Mes RDV</h3>
      <ul>
        <li v-for="a in appointments" :key="a.id" class="text-sm bg-gray-50 p-2 rounded">
          {{ a.name }} - {{ a.date }} à {{ a.time }}
        </li>
      </ul>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Appointment { id: number; name: string; date: string; time: string }

const name = ref('')
const date = ref('')
const time = ref('')

const appointments = ref<Appointment[]>([])

const bookAppointment = () => {
  if (!name.value || !date.value || !time.value) return
  appointments.value.push({ id: Date.now(), name: name.value, date: date.value, time: time.value })
  name.value = ''
  date.value = ''
  time.value = ''
}
</script>
