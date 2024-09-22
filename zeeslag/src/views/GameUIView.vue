<script setup>
import GameUI from "@/components/GameUI.vue";
</script>

<template>
  <div class="game-ui-wrapper">
    <GameUI />
  </div>
</template>

<style scoped>
.game-ui-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background-color: #1E3A8A; /* Blue background for the game */
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

</style>
