<template>
    <div class="friends-list">
      <ul>
        <li v-for="friend in friends" :key="friend.id">
          {{ friend.name }} <span :class="friend.status"></span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FriendsListComponent',
    data() {
      return {
        friends: [
          { id: 1, name: 'Johann1337', status: 'in-game' },
          { id: 2, name: 'Monkey11', status: 'online' },
          { id: 3, name: 'FreddyFazz', status: 'online' },
          { id: 4, name: 'JoeMama', status: 'online' },
          { id: 5, name: 'CEOofGame', status: 'away' },
          { id: 6, name: 'BattleShip1', status: 'offline' },
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  /* Stijl voor vriendenlijst */
  .in-game { color: green; }
  .online { color: blue; }
  .away { color: yellow; }
  </style>
  