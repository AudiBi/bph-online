<template>
  <div class="card">
    <h2 class="title">Projets de financement participatif</h2>
    <div v-for="project in projects" :key="project.id" class="project">
      <p><strong>{{ project.name }}</strong></p>
      <p>Objectif : {{ project.goal }} USD</p>
      <p>Collecté : {{ project.raised }} USD</p>
      <button class="btn" @click="invest(project.id)">Investir 500 USD</button>
      <hr />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAllProjects, invest as investProject } from '@/services/crowdfunding.service';
import type { CrowdfundingProject } from '@/services/crowdfunding.types';

const projects = ref<CrowdfundingProject[]>(getAllProjects());

function invest(projectId: number) {
  const updated = investProject(projectId, 500);
  if (updated) {
    projects.value = getAllProjects(); // refresh
  }
}
</script>

<style scoped>
.project { margin-bottom: 12px; }
.card { padding:16px; background:#fff; margin:8px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,.1);}
.title { font-weight:bold; margin-bottom:12px; }
.btn { background:#2563eb; color:#fff; padding:8px 12px; border-radius:6px; margin-top:4px; }
</style>
