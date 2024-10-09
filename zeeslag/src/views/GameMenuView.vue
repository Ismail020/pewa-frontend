<template>
    <div class="game-menu">
      <GameHeaderComponent />
  
      <div class="mt-6">
        <FriendsListComponent />
      </div>
    </div>
  </template>
  
  <script>
  import GameHeaderComponent from '@/components/GameHeaderComponent.vue';
  import FriendsListComponent from '@/components/FriendsListComponent.vue';
  
  export default {
    components: {
      GameHeaderComponent,
      FriendsListComponent,
    },
  };
  </script>
  
  <style scoped>
  .game-menu {
    padding: 20px;
  }
  
  </style>
  