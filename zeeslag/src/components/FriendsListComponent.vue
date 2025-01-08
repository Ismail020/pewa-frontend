<template>
    <div class="friends-list  bg-gray-800 p-4 text-white rounded-lg shadow-lg">
      <ul>
        <div class="flex flex-col gap-4">
          <li  v-for="friend in friends" :key="friend.id">
        
          <div class="flex gap-4 items-center">
            
          <div class="rounded-full h-10 w-10 bg-green-400">
          </div>
          {{ friend.name }} <span :class="friend.status"></span>
          </div>
        </li>
        </div>
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
  .in-game { color: green; }
  .online { color: blue; }
  .away { color: yellow; }
  </style>
  