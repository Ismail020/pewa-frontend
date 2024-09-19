<script setup>
import DummyHeader from '@/components/DummyComponent.vue'
import AboutComponent from '@/components/DummyAboutComponent.vue'
</script>

<template>
  <div>
    <!-- Add the DummyHeader component -->
    <DummyHeader />

    <!-- Add the AboutComponent -->
    <AboutComponent />
  </div>
</template>

<style scoped>

div {
  margin: 2rem auto;
  max-width: 1000px;
}
</style>
