<template>
  <div class="game-menu relative flex flex-col items-center">
    <!-- Game Header -->
    <GameHeaderComponent />

    <!-- Friends List -->
    <div class="mt-6 w-full max-w-4xl">
      <FriendsListComponent />
    </div>

    <!-- Patch Notes Section -->
    <div class="mt-6 w-full max-w-4xl">
      <PatchNotesComponent />
    </div>

    <!-- News Section -->
    <div class="mt-6 w-full max-w-4xl">
      <NewsComponent />
    </div>

    <!-- Play Button -->
    <div class="mt-6 relative z-20">
      <PlayButtonComponent />
    </div>
  </div>
</template>

<script>
import GameHeaderComponent from '@/components/GameHeaderComponent.vue';
import FriendsListComponent from '@/components/FriendsListComponent.vue';
import PlayButtonComponent from '@/components/PlayButtonComponent.vue';
import PatchNotesComponent from '@/components/PatchNotesComponent.vue';
import NewsComponent from '@/components/NewsComponent.vue';  // Importeer het NewsComponent

export default {
  components: {
    GameHeaderComponent,
    FriendsListComponent,
    PlayButtonComponent,
    PatchNotesComponent,
    NewsComponent,
  }
};
</script>

<style scoped>
.game-menu {
  padding: 20px;
  background-image: url('@/assets/images/background-image.jpg');
  background-size: cover;
  height: 100vh;
  position: relative;
}

.play-button {
  position: relative;
  z-index: 10; /* Zorgt ervoor dat de button boven de achtergrond verschijnt */
}
</style>
