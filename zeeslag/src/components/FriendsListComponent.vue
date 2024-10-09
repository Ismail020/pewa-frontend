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
  