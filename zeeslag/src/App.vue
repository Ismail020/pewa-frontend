<script setup>
import { RouterLink, RouterView } from 'vue-router'
import './assets/tailwind.css'
import FooterComponent from './components/FooterComponent.vue';
import NavbarComponent from './components/NavbarComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
</script>

<template>
  <div>
    <HeaderComponent/>
    <RouterView />
    <FooterComponent/>
  </div>
</template>

<style scoped>
</style>
