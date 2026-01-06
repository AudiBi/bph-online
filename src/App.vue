<template>
    <router-view />
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import { loadLanguage } from '@/services/languageService';

    onMounted(() => {
    loadLanguage();
    });
</script>

<style>
@import './assets/bph.css';
</style>
