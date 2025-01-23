<template>
  <div class="game-menu flex-col flex items-center">
    <div>
      <GameHeaderComponent />
    </div>

    <div>
      <AddFriendComponent />
    </div>

    <div class="flex gap-10">
      <div class="mt-6 w-full max-w-4xl">
      <FriendsListComponent />
    </div>

    <div class="mt-6 w-full max-w-4xl">
      <PatchNotesComponent />
    </div>

    <div class="mt-6 w-full max-w-4xl">
      <NewsComponent />
    </div>
    </div>
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
import NewsComponent from '@/components/NewsComponent.vue';
import AddFriendComponent from '@/components/AddFriendComponent.vue';

export default {
  components: {
    GameHeaderComponent,
    FriendsListComponent,
    PlayButtonComponent,
    PatchNotesComponent,
    NewsComponent,
    AddFriendComponent,
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
